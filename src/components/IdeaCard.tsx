import { Link } from 'react-router-dom'
import { translations } from '../i18n'
import { localeLabel } from '../lib/locale-labels'
import type { DemoIdea, Locale } from '../types'

type IdeaCardProps = {
  idea: DemoIdea
  locale: Locale
}

export const IdeaCard = ({ idea, locale }: IdeaCardProps) => {
  const t = translations[locale]

  return (
    <article className="idea-card">
      <div className="idea-card-top">
        <span className="pill">{localeLabel(idea.area, locale)}</span>
        <span className="pill muted">{localeLabel(idea.difficulty, locale)}</span>
        <span className="pill muted">{localeLabel(idea.compute, locale)}</span>
      </div>
      <h3>{idea.title[locale]}</h3>
      <p>{idea.tagline[locale]}</p>
      <div className="idea-metrics">
        <span>👍 {idea.upvotes}</span>
        <span>👎 {idea.downvotes}</span>
        <span>⚡ {idea.score}</span>
      </div>
      <div className="idea-flags">
        <span className="flag">🤖 {t.idea.aiGenerated}</span>
        {idea.humanReviewed && <span className="flag">✓ {t.idea.humanReviewed}</span>}
      </div>
      <Link className="detail-link" to={`/ideas/${idea.slug}`}>
        {locale === 'zh' ? '查看想法' : 'View Idea'} →
      </Link>
    </article>
  )
}
