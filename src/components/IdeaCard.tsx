import { Link } from 'react-router-dom'
import { translations } from '../i18n'
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
        <span className="pill">{idea.area}</span>
        <span className="pill muted">{idea.difficulty}</span>
        <span className="pill muted">{idea.compute}</span>
      </div>
      <h3>{idea.title[locale]}</h3>
      <p>{idea.tagline[locale]}</p>
      <div className="idea-metrics">
        <span>👍 {idea.upvotes}</span>
        <span>👎 {idea.downvotes}</span>
        <span>⚡ {idea.score}</span>
      </div>
      <div className="idea-metrics">
        <span>✨ {idea.qualityScores.innovation}/10</span>
        <span>🛠️ {idea.qualityScores.operability}/10</span>
        <span>🧪 {idea.qualityScores.verificationConfidence}/10</span>
      </div>
      <div className="idea-flags">
        <span className="flag">🤖 {t.idea.aiGenerated}</span>
        {idea.humanReviewed && <span className="flag">✓ {t.idea.humanReviewed}</span>}
      </div>
      <Link className="detail-link" to={`/ideas/${idea.slug}`}>
        View Idea →
      </Link>
    </article>
  )
}
