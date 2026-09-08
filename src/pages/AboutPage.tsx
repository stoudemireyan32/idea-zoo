import { translations } from '../i18n'
import type { Locale } from '../types'

type AboutPageProps = {
  locale: Locale
}

export const AboutPage = ({ locale }: AboutPageProps) => {
  const t = translations[locale]

  return (
    <div className="page">
      <section className="section-block">
        <h1 className="page-title">{t.about.title}</h1>
        <p className="page-subtitle">{t.about.subtitle}</p>
        <p className="about-founder">{t.about.founder}</p>
      </section>

      <section className="section-block about-body">
        {t.about.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>
    </div>
  )
}
