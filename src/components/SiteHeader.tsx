import { Link, NavLink } from 'react-router-dom'
import { translations } from '../i18n'
import type { Locale } from '../types'

type SiteHeaderProps = {
  locale: Locale
  onLocaleChange: (locale: Locale) => void
}

export const SiteHeader = ({ locale, onLocaleChange }: SiteHeaderProps) => {
  const t = translations[locale]

  return (
    <header className="site-header">
      <Link to="/" className="brand">
        <span className="brand-mark">✦</span>
        <div>
          <p className="brand-name">Idea Zoo</p>
          <p className="brand-subtitle">{t.brandSubtitle}</p>
        </div>
      </Link>
      <nav className="top-nav" aria-label="Main">
        <NavLink to="/">{t.nav.home}</NavLink>
        <NavLink to="/explore">{t.nav.explore}</NavLink>
        <NavLink to="/about">{t.nav.about}</NavLink>
        <NavLink to="/contribute">{t.nav.contribute}</NavLink>
      </nav>
      <div className="header-actions">
        <button
          type="button"
          className={`lang-toggle ${locale === 'en' ? 'active' : ''}`}
          onClick={() => onLocaleChange('en')}
        >
          EN
        </button>
        <button
          type="button"
          className={`lang-toggle ${locale === 'zh' ? 'active' : ''}`}
          onClick={() => onLocaleChange('zh')}
        >
          中文
        </button>
      </div>
    </header>
  )
}
