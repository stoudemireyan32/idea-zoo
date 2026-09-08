import { translations } from '../i18n'
import type { Locale } from '../types'

type SiteFooterProps = {
  locale: Locale
}

export const SiteFooter = ({ locale }: SiteFooterProps) => {
  const t = translations[locale]

  return (
    <footer className="site-footer">
      <p>{t.footer.note}</p>
      <p>
        Founder: <strong>Yan Li</strong> · Idea Zoo · 2026
      </p>
    </footer>
  )
}
