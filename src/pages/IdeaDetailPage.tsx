import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { demoIdeas } from '../data/ideas'
import { translations } from '../i18n'
import { localeLabel } from '../lib/locale-labels'
import {
  communityGateway,
  type IdeaCommunitySnapshot,
} from '../services/community'
import type { Locale } from '../types'

type IdeaDetailPageProps = {
  locale: Locale
}

export const IdeaDetailPage = ({ locale }: IdeaDetailPageProps) => {
  const { slug } = useParams()
  const t = translations[locale]
  const idea = demoIdeas.find((item) => item.slug === slug)
  const [community, setCommunity] = useState<IdeaCommunitySnapshot | null>(null)

  useEffect(() => {
    if (!idea) {
      return
    }

    let isMounted = true

    const loadCommunity = async () => {
      const snapshot = await communityGateway.getIdeaCommunitySnapshot(idea.id)

      if (isMounted) {
        setCommunity(snapshot)
      }
    }

    void loadCommunity()

    return () => {
      isMounted = false
    }
  }, [idea])

  if (!idea) {
    return (
      <div className="page section-block">
        <h1>Idea not found</h1>
        <Link to="/explore">{t.idea.backToExplore}</Link>
      </div>
    )
  }

  const handleVote = async (direction: 'up' | 'down') => {
    const snapshot = await communityGateway.vote({ ideaId: idea.id, direction })
    setCommunity(snapshot)
  }

  const upvotes = community?.votes.upvotes ?? idea.upvotes
  const downvotes = community?.votes.downvotes ?? idea.downvotes
  const comments =
    community?.discussion.commentsCount ??
    Math.max(0, Math.round((idea.upvotes + idea.downvotes) / 7))
  const viewerVote = community?.viewerVote ?? null
  const discussionUrl = community?.discussion.url ?? null
  const discussionStatus = community?.discussion.status ?? 'draft'
  const hasDiscussion = Boolean(discussionUrl)

  return (
    <div className="page detail-page">
      <section className="section-block detail-hero">
        <Link to="/explore" className="detail-back">
          ← {t.idea.backToExplore}
        </Link>
        <div className="detail-tags">
          <span className="pill">{localeLabel(idea.area, locale)}</span>
          <span className="pill muted">{localeLabel(idea.status, locale)}</span>
          <span className="pill muted">{localeLabel(idea.compute, locale)}</span>
        </div>
        <h1 className="page-title">{idea.title[locale]}</h1>
        <p className="page-subtitle">{idea.tagline[locale]}</p>
        <div className="idea-flags">
          <span className="flag">🤖 {t.idea.aiGenerated}</span>
          {idea.humanReviewed && <span className="flag">✓ {t.idea.humanReviewed}</span>}
        </div>
      </section>

      <section className="section-block detail-layout">
        <article className="detail-main">
          <h2>🧠 {t.idea.summary}</h2>
          <p>{idea.summary[locale]}</p>

          <h2>🧩 {t.idea.challenge}</h2>
          <p>{idea.challenge[locale]}</p>

          <h2>🛠️ {t.idea.method}</h2>
          <p>{idea.method[locale]}</p>

          <h2>🎯 {t.idea.expectedOutcome}</h2>
          <p>{idea.expectedOutcome[locale]}</p>

          <h2>⏱️ {t.idea.whyNow}</h2>
          <p>{idea.whyNow[locale]}</p>

          <h2>🗂️ {t.idea.executionContext}</h2>
          <p>
            <strong>🧠 {t.idea.model}:</strong> {idea.model}
            <br />
            <strong>🧪 {t.idea.dataset}:</strong> {idea.dataset}
            <br />
            <strong>🏷️ {t.idea.keywords}:</strong> {idea.keywords.join(', ')}
          </p>

          <h2>📊 {t.idea.qualityScores}</h2>
          <p>
            <strong>{t.idea.implementability}:</strong> {idea.qualityScores.implementability}/10
            <br />
            <strong>{t.idea.operability}:</strong> {idea.qualityScores.operability}/10
            <br />
            <strong>{t.idea.innovation}:</strong> {idea.qualityScores.innovation}/10
            <br />
            <strong>{t.idea.similarityRisk}:</strong> {idea.qualityScores.similarityRisk}/10
            <br />
            <strong>{t.idea.verificationConfidence}:</strong>{' '}
            {idea.qualityScores.verificationConfidence}/10
            <br />
            <strong>{t.idea.potentialImpact}:</strong> {idea.qualityScores.potentialImpact}/10
          </p>

          <h2>🧪 {t.idea.verification}</h2>
          <p>
            <strong>{localeLabel(idea.verificationVerdict, locale)}</strong>
            <br />
            {idea.verificationNote[locale]}
          </p>
        </article>

        <aside className="detail-side">
          <div className="vote-box">
            <h3>🗳️ {t.idea.voting}</h3>
            <div className="community-grid">
              <button
                type="button"
                className={`community-item vote-card ${viewerVote === 'up' ? 'voted' : ''}`}
                onClick={() => void handleVote('up')}
                disabled={viewerVote === 'up'}
                title={viewerVote === 'up' ? '已投赞同，可改投反对' : '投赞同票'}
              >
                <span>👍 {t.idea.upvotes}</span>
                <strong>{upvotes}</strong>
              </button>
              <button
                type="button"
                className={`community-item vote-card ${viewerVote === 'down' ? 'voted' : ''}`}
                onClick={() => void handleVote('down')}
                disabled={viewerVote === 'down'}
                title={viewerVote === 'down' ? '已投反对，可改投赞同' : '投反对票'}
              >
                <span>👎 {t.idea.downvotes}</span>
                <strong>{downvotes}</strong>
              </button>
              {hasDiscussion ? (
                <a
                  className="community-item community-link"
                  href={discussionUrl as string}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>💬 {t.idea.comments}</span>
                  <strong>{comments}</strong>
                </a>
              ) : (
                <div className="community-item community-disabled" title="本地 mock 未配置真实讨论链接">
                  <span>💬 {t.idea.comments}</span>
                  <strong>{comments}</strong>
                </div>
              )}

              {hasDiscussion ? (
                <a
                  className="community-item community-link"
                  href={discussionUrl as string}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>{t.idea.discussOnGitHub}</span>
                  <strong>
                    💬 {discussionStatus === 'live'
                      ? (locale === 'zh' ? '打开讨论' : 'Open Discussion')
                      : (locale === 'zh' ? '创建讨论' : 'Create Discussion')}
                  </strong>
                </a>
              ) : (
                <div className="community-item community-disabled" title="本地 mock 未配置真实讨论链接">
                  <span>{t.idea.discussOnGitHub}</span>
                  <strong>💬 {locale === 'zh' ? '本地模拟模式不可用' : 'Unavailable in local mock'}</strong>
                </div>
              )}
            </div>
            <p>{t.idea.voteHint}</p>
          </div>
        </aside>
      </section>
    </div>
  )
}
