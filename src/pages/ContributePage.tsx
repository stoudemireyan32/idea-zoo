import { translations } from '../i18n'
import type { Locale } from '../types'

type ContributePageProps = {
  locale: Locale
}

export const ContributePage = ({ locale }: ContributePageProps) => {
  const t = translations[locale]

  return (
    <div className="page">
      <section className="section-block">
        <h1 className="page-title">{t.contribute.title}</h1>
        <p className="page-subtitle">{t.contribute.subtitle}</p>
      </section>

      <section className="section-block">
        <h2>{t.contribute.stepsTitle}</h2>
        <ol className="contrib-steps">
          {t.contribute.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <a
          className="primary-button contribute-cta"
          href="https://github.com/stoudemireyan32/idea-zoo"
          target="_blank"
          rel="noreferrer"
        >
          {t.contribute.cta}
        </a>
      </section>
    </div>
  )
}
