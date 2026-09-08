import { useEffect, useMemo, useState } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { SiteFooter } from './components/SiteFooter'
import { SiteHeader } from './components/SiteHeader'
import { translations } from './i18n'
import { AboutPage } from './pages/AboutPage'
import { ContributePage } from './pages/ContributePage'
import { ExplorePage } from './pages/ExplorePage'
import { HomePage } from './pages/HomePage'
import { IdeaDetailPage } from './pages/IdeaDetailPage'
import { NotFoundPage } from './pages/NotFoundPage'
import type { Locale } from './types'

const usePageTitle = (locale: Locale) => {
  const location = useLocation()
  const t = translations[locale]

  useEffect(() => {
    if (location.pathname.startsWith('/explore')) {
      document.title = `Idea Zoo · ${t.nav.explore}`
      return
    }

    if (location.pathname.startsWith('/ideas/')) {
      document.title = 'Idea Zoo · Idea Detail'
      return
    }

    if (location.pathname.startsWith('/about')) {
      document.title = `Idea Zoo · ${t.nav.about}`
      return
    }

    if (location.pathname.startsWith('/contribute')) {
      document.title = `Idea Zoo · ${t.nav.contribute}`
      return
    }

    document.title = 'Idea Zoo · Open AI Research Idea Commons'
  }, [location.pathname, t.nav.about, t.nav.contribute, t.nav.explore])
}

const AppShell = () => {
  const initialLocale = useMemo<Locale>(() => {
    return 'en'
  }, [])

  const [locale, setLocale] = useState<Locale>(initialLocale)

  usePageTitle(locale)

  return (
    <div className="app-shell">
      <SiteHeader locale={locale} onLocaleChange={setLocale} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage locale={locale} />} />
          <Route path="/explore" element={<ExplorePage locale={locale} />} />
          <Route path="/ideas/:slug" element={<IdeaDetailPage locale={locale} />} />
          <Route path="/about" element={<AboutPage locale={locale} />} />
          <Route path="/contribute" element={<ContributePage locale={locale} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <SiteFooter locale={locale} />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AppShell />
    </BrowserRouter>
  )
}

export default App
