import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IdeaCard } from '../components/IdeaCard'
import { demoIdeas, researchAreas } from '../data/ideas'
import { translations } from '../i18n'
import { filterAndSortIdeas, type ExploreFilters } from '../lib/idea-utils'
import type { Locale } from '../types'

type ExplorePageProps = {
  locale: Locale
}

const difficultyOptions = ['Beginner', 'Intermediate', 'Advanced']
const statusOptions = ['Open', 'Debate', 'Claimed', 'In Progress']
const computeOptions = ['Low', 'Medium', 'High']
const sourceOptions = ['AI-generated', 'Community', 'Hybrid']

export const ExplorePage = ({ locale }: ExplorePageProps) => {
  const t = translations[locale]
  const navigate = useNavigate()

  const [filters, setFilters] = useState<ExploreFilters>({
    query: '',
    area: 'all',
    difficulty: 'all',
    status: 'all',
    compute: 'all',
    source: 'all',
    sort: 'trending',
  })

  const filteredIdeas = useMemo(
    () => filterAndSortIdeas(filters, locale),
    [filters, locale],
  )

  const updateFilter = (key: keyof ExploreFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const resetFilters = () => {
    setFilters({
      query: '',
      area: 'all',
      difficulty: 'all',
      status: 'all',
      compute: 'all',
      source: 'all',
      sort: 'trending',
    })
  }

  const sortOptions = [
    { value: 'trending', label: t.sorts.trending },
    { value: 'upvotes', label: t.sorts.upvotes },
    { value: 'downvotes', label: t.sorts.downvotes },
    { value: 'score', label: t.sorts.score },
    { value: 'newest', label: t.sorts.newest },
    { value: 'oldest', label: t.sorts.oldest },
    { value: 'random', label: t.sorts.random },
  ]

  return (
    <div className="page">
      <section className="section-block">
        <h1 className="page-title">{t.explore.title}</h1>
        <p className="page-subtitle">{t.explore.subtitle}</p>
      </section>

      <section className="section-block explore-controls">
        <input
          type="search"
          value={filters.query}
          onChange={(event) => updateFilter('query', event.target.value)}
          placeholder={t.explore.searchPlaceholder}
          className="search-input"
        />

        <div className="filter-grid">
          <label>
            {t.filters.area}
            <select
              value={filters.area}
              onChange={(event) => updateFilter('area', event.target.value)}
            >
              <option value="all">{t.filters.all}</option>
              {researchAreas.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </label>

          <label>
            {t.filters.difficulty}
            <select
              value={filters.difficulty}
              onChange={(event) => updateFilter('difficulty', event.target.value)}
            >
              <option value="all">{t.filters.all}</option>
              {difficultyOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label>
            {t.filters.status}
            <select
              value={filters.status}
              onChange={(event) => updateFilter('status', event.target.value)}
            >
              <option value="all">{t.filters.all}</option>
              {statusOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label>
            {t.filters.compute}
            <select
              value={filters.compute}
              onChange={(event) => updateFilter('compute', event.target.value)}
            >
              <option value="all">{t.filters.all}</option>
              {computeOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label>
            {t.filters.source}
            <select
              value={filters.source}
              onChange={(event) => updateFilter('source', event.target.value)}
            >
              <option value="all">{t.filters.all}</option>
              {sourceOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label>
            {t.filters.sort}
            <select
              value={filters.sort}
              onChange={(event) => updateFilter('sort', event.target.value)}
            >
              {sortOptions.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="explore-tools">
          <button type="button" className="secondary-button" onClick={resetFilters}>
            {t.explore.clearFilter}
          </button>
          <button
            type="button"
            className="ghost-button"
            onClick={() => navigate(`/ideas/${demoIdeas[Math.floor(Math.random() * demoIdeas.length)].slug}`)}
          >
            {t.explore.random}
          </button>
          <span className="result-count">
            {filteredIdeas.length} {t.explore.resultCount}
          </span>
        </div>
      </section>

      <section className="idea-grid section-block">
        {filteredIdeas.length === 0 && <p>{t.explore.noResult}</p>}
        {filteredIdeas.map((idea) => (
          <IdeaCard key={idea.id} idea={idea} locale={locale} />
        ))}
      </section>
    </div>
  )
}
