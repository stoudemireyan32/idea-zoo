import { Link, useNavigate } from 'react-router-dom'
import { demoIdeas, researchAreas } from '../data/ideas'
import { translations } from '../i18n'
import { randomIdea } from '../lib/idea-utils'
import { IdeaCard } from '../components/IdeaCard'
import type { Locale } from '../types'

type HomePageProps = {
  locale: Locale
}

export const HomePage = ({ locale }: HomePageProps) => {
  const t = translations[locale]
  const navigate = useNavigate()

  const featured = demoIdeas.slice(0, 3)
  const trending = [...demoIdeas].sort((a, b) => b.trending - a.trending).slice(0, 3)
  const bannerStyle = {
    backgroundImage: `linear-gradient(100deg, rgba(5, 13, 15, 0.84) 0%, rgba(7, 20, 27, 0.68) 44%, rgba(8, 18, 20, 0.46) 100%), url(${import.meta.env.BASE_URL}hero-cosmos-art.png)`,
  }

  return (
    <div className="page page-home">
      <section className="hero-block">
        <div className="hero-banner" style={bannerStyle}>
          <div className="hero-copy">
            <p className="hero-badge">{t.hero.badge}</p>
            <h1>{t.hero.title}</h1>
            <p className="hero-subtitle">{t.hero.subtitle}</p>
            <div className="hero-actions">
              <Link to="/explore" className="primary-button">
                {t.hero.primary}
              </Link>
              <button
                type="button"
                className="secondary-button"
                onClick={() => navigate(`/ideas/${randomIdea().slug}`)}
              >
                {t.hero.secondary}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-grid" aria-label="Idea Zoo stats">
        <div>
          <p className="stats-value">10+</p>
          <p>{t.stats.ideas}</p>
        </div>
        <div>
          <p className="stats-value">10</p>
          <p>{t.stats.areas}</p>
        </div>
        <div>
          <p className="stats-value">∞</p>
          <p>{t.stats.open}</p>
        </div>
      </section>

      <section className="home-section">
        <div className="section-headline">
          <h2>{t.sections.featured}</h2>
          <Link to="/explore">Explore all</Link>
        </div>
        <div className="idea-grid">
          {featured.map((idea) => (
            <IdeaCard key={idea.id} idea={idea} locale={locale} />
          ))}
        </div>
      </section>

      <section className="home-section">
        <div className="section-headline">
          <h2>{t.sections.trending}</h2>
        </div>
        <div className="idea-grid">
          {trending.map((idea) => (
            <IdeaCard key={idea.id} idea={idea} locale={locale} />
          ))}
        </div>
      </section>

      <section className="home-section areas-panel">
        <h2>{t.sections.areas}</h2>
        <div className="area-tags">
          {researchAreas.map((area) => (
            <span key={area} className="pill">
              {area}
            </span>
          ))}
        </div>
      </section>

      <section className="home-section how-panel">
        <h2>{t.sections.how}</h2>
        <ol>
          {t.howSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="home-section">
        <div className="section-headline">
          <h2>GitHub / Contribute</h2>
          <a href="https://github.com/stoudemireyan32/idea-zoo" target="_blank" rel="noreferrer">Open Repository</a>
        </div>
        <p className="page-subtitle">
          This MVP is intentionally open. Submit ideas, challenge assumptions, and help build the public research commons.
        </p>
      </section>
    </div>
  )
}
