export type Locale = 'en' | 'zh'

export type ResearchArea =
  | 'Reasoning & Reliability'
  | 'RAG, Memory & Knowledge'
  | 'Agentic Systems'
  | 'Multimodal & Vision-Language'
  | 'Training & Alignment'
  | 'Inference & Systems Optimization'
  | 'Evaluation & Benchmarks'
  | 'AI for Science'
  | 'Safety, Governance & Policy'
  | 'Human-AI Interaction'
  | 'Data & Synthetic Data Engineering'
  | 'Open Source Community Mechanics'

export type IdeaDifficulty = 'Beginner' | 'Intermediate' | 'Advanced'
export type IdeaStatus = 'Open' | 'Debate' | 'Claimed' | 'In Progress'
export type ComputeRequirement = 'Low' | 'Medium' | 'High'
export type IdeaSource = 'AI-generated' | 'Community' | 'Hybrid'

export type BilingualText = {
  en: string
  zh: string
}

export type IdeaQualityScores = {
  implementability: number
  operability: number
  innovation: number
  similarityRisk: number
  verificationConfidence: number
  potentialImpact: number
}

export type VerificationVerdict = 'Strong' | 'Promising' | 'Speculative'

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
  qualityScores: IdeaQualityScores
  verificationVerdict: VerificationVerdict
  verificationNote: BilingualText
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
