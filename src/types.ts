export type Locale = 'en' | 'zh'

export type ResearchArea =
  | 'Track A · LLM Reasoning & Reliability'
  | 'Track B · RAG, Memory & Knowledge'
  | 'Track C · Multimodal & Agentic Workflow'
  | 'Track D · Open Community & Evaluation'

export type IdeaDifficulty = 'Beginner' | 'Intermediate' | 'Advanced'
export type IdeaStatus = 'Open' | 'Debate' | 'Claimed' | 'In Progress'
export type ComputeRequirement = 'Low' | 'Medium' | 'High'
export type IdeaSource = 'AI-generated' | 'Community' | 'Hybrid'

export type BilingualText = {
  en: string
  zh: string
}

export type DemoIdea = {
  id: string
  slug: string
  title: BilingualText
  tagline: BilingualText
  summary: BilingualText
  challenge: BilingualText
  method: BilingualText
  expectedOutcome: BilingualText
  whyNow: BilingualText
  area: ResearchArea
  difficulty: IdeaDifficulty
  status: IdeaStatus
  compute: ComputeRequirement
  source: IdeaSource
  model: string
  dataset: string
  keywords: string[]
  upvotes: number
  downvotes: number
  score: number
  trending: number
  createdAt: string
  humanReviewed: boolean
}

export type SortOption =
  | 'trending'
  | 'upvotes'
  | 'downvotes'
  | 'score'
  | 'newest'
  | 'oldest'
  | 'random'
