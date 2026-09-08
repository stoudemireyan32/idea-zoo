import { demoIdeas } from '../data/ideas'
import type {
  ComputeRequirement,
  DemoIdea,
  IdeaDifficulty,
  IdeaSource,
  IdeaStatus,
  Locale,
  SortOption,
} from '../types'

export type ExploreFilters = {
  query: string
  area: string
  difficulty: string
  status: string
  compute: string
  source: string
  sort: SortOption
}

const normalize = (value: string) => value.toLowerCase().trim()

const textInLocale = (idea: DemoIdea, locale: Locale) => {
  const bundle = [
    idea.title[locale],
    idea.tagline[locale],
    idea.summary[locale],
    idea.challenge[locale],
    idea.method[locale],
    idea.model,
    idea.dataset,
    ...idea.keywords,
  ]

  return normalize(bundle.join(' '))
}

const compareBySort = (sort: SortOption) => {
  switch (sort) {
    case 'upvotes':
      return (a: DemoIdea, b: DemoIdea) => b.upvotes - a.upvotes
    case 'downvotes':
      return (a: DemoIdea, b: DemoIdea) => b.downvotes - a.downvotes
    case 'score':
      return (a: DemoIdea, b: DemoIdea) => b.score - a.score
    case 'newest':
      return (a: DemoIdea, b: DemoIdea) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    case 'oldest':
      return (a: DemoIdea, b: DemoIdea) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    case 'random':
      return () => Math.random() - 0.5
    case 'trending':
    default:
      return (a: DemoIdea, b: DemoIdea) => b.trending - a.trending
  }
}

export const filterAndSortIdeas = (
  filters: ExploreFilters,
  locale: Locale,
): DemoIdea[] => {
  const query = normalize(filters.query)

  return demoIdeas
    .filter((idea) => {
      if (filters.area !== 'all' && idea.area !== filters.area) {
        return false
      }

      if (
        filters.difficulty !== 'all' &&
        idea.difficulty !== (filters.difficulty as IdeaDifficulty)
      ) {
        return false
      }

      if (filters.status !== 'all' && idea.status !== (filters.status as IdeaStatus)) {
        return false
      }

      if (
        filters.compute !== 'all' &&
        idea.compute !== (filters.compute as ComputeRequirement)
      ) {
        return false
      }

      if (filters.source !== 'all' && idea.source !== (filters.source as IdeaSource)) {
        return false
      }

      if (!query) {
        return true
      }

      return textInLocale(idea, locale).includes(query)
    })
    .sort(compareBySort(filters.sort))
}

export const randomIdea = () => {
  const index = Math.floor(Math.random() * demoIdeas.length)
  return demoIdeas[index]
}
