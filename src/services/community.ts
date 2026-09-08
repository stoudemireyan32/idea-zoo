import { demoIdeas } from '../data/ideas'

export type VoteDirection = 'up' | 'down'
export type ViewerVote = VoteDirection | null

export type VotePayload = {
  ideaId: string
  direction: VoteDirection
}

export type ContributionDraft = {
  title: string
  area: string
  summary: string
}

export type VoteStats = {
  upvotes: number
  downvotes: number
  score: number
  source: 'mock' | 'github-reactions' | 'custom-backend'
}

export type GitHubDiscussionRef = {
  provider: 'github-discussions'
  owner: string
  repo: string
  number: number | null
  url: string | null
  title: string
  categorySlug: string
  commentsCount: number
  updatedAt: string
}

export type IdeaCommunitySnapshot = {
  ideaId: string
  discussion: GitHubDiscussionRef
  votes: VoteStats
  viewerVote: ViewerVote
}

export type CommunityProvider = {
  name: 'github'
  kind: 'mock' | 'api' | 'proxy'
}

export interface CommunityGateway {
  readonly provider: CommunityProvider
  getIdeaCommunitySnapshot(ideaId: string): Promise<IdeaCommunitySnapshot>
  vote(payload: VotePayload): Promise<IdeaCommunitySnapshot>
  submitDraft(payload: ContributionDraft): Promise<void>
}

type ProxySnapshotResponse = IdeaCommunitySnapshot
type ProxyVoteResponse = IdeaCommunitySnapshot

type GitHubDiscussionApiRecord = {
  number: number
  title: string
  html_url: string
  category?: {
    slug?: string
  }
  comments?: number
  updated_at?: string
  reactions?: {
    '+1'?: number
    '-1'?: number
  }
}

const discussionOwner = 'stoudemireyan32'
const discussionRepo = 'idea-zoo'
const githubApiBaseUrl = 'https://api.github.com'
const voteStorageKey = 'idea-zoo:viewer-votes'
const clientIdStorageKey = 'idea-zoo:client-id'

const discussionNumberByIdeaId = new Map<string, number>(
  demoIdeas.map((idea, index) => [idea.id, index + 1]),
)

const canUseStorage = () => typeof window !== 'undefined' && !!window.localStorage

const readVoteStore = (): Record<string, VoteDirection> => {
  if (!canUseStorage()) {
    return {}
  }

  const raw = window.localStorage.getItem(voteStorageKey)

  if (!raw) {
    return {}
  }

  try {
    return JSON.parse(raw) as Record<string, VoteDirection>
  } catch {
    return {}
  }
}

const getViewerVote = (ideaId: string): ViewerVote => {
  const vote = readVoteStore()[ideaId]
  return vote === 'up' || vote === 'down' ? vote : null
}

const writeViewerVote = (ideaId: string, vote: VoteDirection) => {
  if (!canUseStorage()) {
    return
  }

  const store = readVoteStore()
  store[ideaId] = vote
  window.localStorage.setItem(voteStorageKey, JSON.stringify(store))
}

const getOrCreateClientId = (): string => {
  if (!canUseStorage()) {
    return 'anonymous-client'
  }

  const existing = window.localStorage.getItem(clientIdStorageKey)

  if (existing) {
    return existing
  }

  const generated = `client-${Date.now()}-${Math.random().toString(16).slice(2, 10)}`
  window.localStorage.setItem(clientIdStorageKey, generated)
  return generated
}

const computeVoteTransition = (
  current: VoteStats,
  previousVote: ViewerVote,
  requestedVote: VoteDirection,
): VoteStats => {
  if (previousVote === requestedVote) {
    return current
  }

  let upvotes = current.upvotes
  let downvotes = current.downvotes

  if (previousVote === 'up') {
    upvotes -= 1
  }

  if (previousVote === 'down') {
    downvotes -= 1
  }

  if (requestedVote === 'up') {
    upvotes += 1
  }

  if (requestedVote === 'down') {
    downvotes += 1
  }

  return {
    ...current,
    upvotes,
    downvotes,
    score: upvotes - downvotes,
  }
}

const toVoteStats = (
  upvotes: number,
  downvotes: number,
  source: VoteStats['source'],
): VoteStats => ({
  upvotes,
  downvotes,
  score: upvotes - downvotes,
  source,
})

const mapDiscussionRecord = (
  record: GitHubDiscussionApiRecord,
  owner: string,
  repo: string,
): GitHubDiscussionRef => ({
  provider: 'github-discussions',
  owner,
  repo,
  number: record.number,
  url: record.html_url || null,
  title: record.title,
  categorySlug: record.category?.slug ?? 'ideas',
  commentsCount: record.comments ?? 0,
  updatedAt: record.updated_at ?? new Date().toISOString(),
})

const makeFallbackDiscussion = (): GitHubDiscussionRef => ({
  provider: 'github-discussions',
  owner: discussionOwner,
  repo: discussionRepo,
  number: null,
  url: null,
  title: 'Discussion unavailable in local mock',
  categorySlug: 'ideas',
  commentsCount: 0,
  updatedAt: new Date().toISOString(),
})

const buildInitialSnapshotMap = () => {
  const map = new Map<string, IdeaCommunitySnapshot>()

  demoIdeas.forEach((idea, index) => {
    const comments = Math.max(3, Math.round((idea.upvotes + idea.downvotes) / 7))

    const discussionRecord: GitHubDiscussionApiRecord = {
      number: index + 1,
      title: idea.title.en,
      html_url: '',
      category: { slug: 'ideas' },
      comments,
      updated_at: `${idea.createdAt}T09:00:00Z`,
      reactions: {
        '+1': idea.upvotes,
        '-1': idea.downvotes,
      },
    }

    map.set(idea.id, {
      ideaId: idea.id,
      discussion: mapDiscussionRecord(discussionRecord, discussionOwner, discussionRepo),
      votes: toVoteStats(idea.upvotes, idea.downvotes, 'mock'),
      viewerVote: getViewerVote(idea.id),
    })
  })

  return map
}

export class MockGitHubCommunityGateway implements CommunityGateway {
  readonly provider: CommunityProvider = {
    name: 'github',
    kind: 'mock',
  }

  private readonly snapshots = buildInitialSnapshotMap()

  async getIdeaCommunitySnapshot(ideaId: string): Promise<IdeaCommunitySnapshot> {
    const snapshot = this.snapshots.get(ideaId)

    if (snapshot) {
      return {
        ...snapshot,
        viewerVote: getViewerVote(ideaId),
      }
    }

    return {
      ideaId,
      discussion: makeFallbackDiscussion(),
      votes: toVoteStats(0, 0, 'mock'),
      viewerVote: getViewerVote(ideaId),
    }
  }

  async vote(payload: VotePayload): Promise<IdeaCommunitySnapshot> {
    const snapshot = await this.getIdeaCommunitySnapshot(payload.ideaId)
    const previousVote = snapshot.viewerVote

    if (previousVote === payload.direction) {
      return snapshot
    }

    const nextVotes = computeVoteTransition(
      snapshot.votes,
      previousVote,
      payload.direction,
    )

    writeViewerVote(payload.ideaId, payload.direction)

    const updated: IdeaCommunitySnapshot = {
      ...snapshot,
      votes: {
        ...nextVotes,
        source: 'mock',
      },
      viewerVote: payload.direction,
    }

    this.snapshots.set(payload.ideaId, updated)

    return updated
  }

  async submitDraft(_payload: ContributionDraft): Promise<void> {
    return Promise.resolve()
  }
}

export class GitHubDiscussionsApiGateway implements CommunityGateway {
  readonly provider: CommunityProvider = {
    name: 'github',
    kind: 'api',
  }

  private readonly fallback = new MockGitHubCommunityGateway()

  private readonly config: {
    owner: string
    repo: string
    apiBaseUrl: string
    categorySlug: string
    token: string
  }

  constructor(config: {
    owner: string
    repo: string
    apiBaseUrl: string
    categorySlug: string
    token: string
  }) {
    this.config = config
  }

  private async githubRequest<T>(
    path: string,
    init?: RequestInit,
  ): Promise<T> {
    const response = await fetch(`${this.config.apiBaseUrl}${path}`, {
      ...init,
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${this.config.token}`,
        'X-GitHub-Api-Version': '2022-11-28',
        ...(init?.headers ?? {}),
      },
    })

    if (!response.ok) {
      const reason = await response.text()
      throw new Error(`GitHub API ${response.status}: ${reason}`)
    }

    return (await response.json()) as T
  }

  private getDiscussionNumber(ideaId: string): number | null {
    return discussionNumberByIdeaId.get(ideaId) ?? null
  }

  private async fetchDiscussionRecord(
    discussionNumber: number,
  ): Promise<GitHubDiscussionApiRecord> {
    return this.githubRequest<GitHubDiscussionApiRecord>(
      `/repos/${this.config.owner}/${this.config.repo}/discussions/${discussionNumber}`,
    )
  }

  private toSnapshotFromRecord(
    ideaId: string,
    record: GitHubDiscussionApiRecord,
  ): IdeaCommunitySnapshot {
    const upvotes = record.reactions?.['+1'] ?? 0
    const downvotes = record.reactions?.['-1'] ?? 0

    return {
      ideaId,
      discussion: mapDiscussionRecord(record, this.config.owner, this.config.repo),
      votes: toVoteStats(upvotes, downvotes, 'github-reactions'),
      viewerVote: getViewerVote(ideaId),
    }
  }

  async getIdeaCommunitySnapshot(ideaId: string): Promise<IdeaCommunitySnapshot> {
    const discussionNumber = this.getDiscussionNumber(ideaId)

    if (!discussionNumber) {
      return this.fallback.getIdeaCommunitySnapshot(ideaId)
    }

    try {
      const record = await this.fetchDiscussionRecord(discussionNumber)
      return this.toSnapshotFromRecord(ideaId, record)
    } catch {
      return this.fallback.getIdeaCommunitySnapshot(ideaId)
    }
  }

  async vote(payload: VotePayload): Promise<IdeaCommunitySnapshot> {
    const current = await this.getIdeaCommunitySnapshot(payload.ideaId)

    if (current.viewerVote === payload.direction) {
      return current
    }

    const discussionNumber = this.getDiscussionNumber(payload.ideaId)

    if (!discussionNumber) {
      return this.fallback.vote(payload)
    }

    try {
      const content = payload.direction === 'up' ? '+1' : '-1'

      await this.githubRequest<{ id: number }>(
        `/repos/${this.config.owner}/${this.config.repo}/discussions/${discussionNumber}/reactions`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content }),
        },
      )

      writeViewerVote(payload.ideaId, payload.direction)

      const record = await this.fetchDiscussionRecord(discussionNumber)
      return this.toSnapshotFromRecord(payload.ideaId, record)
    } catch {
      return this.fallback.vote(payload)
    }
  }

  async submitDraft(payload: ContributionDraft): Promise<void> {
    const title = payload.title.trim()

    if (!title) {
      throw new Error('Draft title is required')
    }

    const categorySlug = this.config.categorySlug || 'ideas'

    const draftBody = [
      `### Research Area\n${payload.area || 'TBD'}`,
      `### Summary\n${payload.summary || 'TBD'}`,
      '---',
      'Submitted from Idea Zoo MVP draft flow.',
    ].join('\n\n')

    try {
      await this.githubRequest<{ id: number }>(
        `/repos/${this.config.owner}/${this.config.repo}/discussions`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title,
            body: draftBody,
            category: categorySlug,
          }),
        },
      )
    } catch {
      return this.fallback.submitDraft(payload)
    }
  }
}

export class CommunityProxyGateway implements CommunityGateway {
  readonly provider: CommunityProvider = {
    name: 'github',
    kind: 'proxy',
  }

  private readonly fallback = new MockGitHubCommunityGateway()

  private readonly config: {
    baseUrl: string
  }

  constructor(config: { baseUrl: string }) {
    this.config = config
  }

  private async proxyRequest<T>(
    path: string,
    init?: RequestInit,
  ): Promise<T> {
    const response = await fetch(`${this.config.baseUrl}${path}`, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        'X-Idea-Zoo-Client-Id': getOrCreateClientId(),
        ...(init?.headers ?? {}),
      },
    })

    if (!response.ok) {
      const reason = await response.text()
      throw new Error(`Community proxy ${response.status}: ${reason}`)
    }

    return (await response.json()) as T
  }

  async getIdeaCommunitySnapshot(ideaId: string): Promise<IdeaCommunitySnapshot> {
    try {
      return await this.proxyRequest<ProxySnapshotResponse>(`/ideas/${ideaId}`)
    } catch {
      return this.fallback.getIdeaCommunitySnapshot(ideaId)
    }
  }

  async vote(payload: VotePayload): Promise<IdeaCommunitySnapshot> {
    try {
      return await this.proxyRequest<ProxyVoteResponse>(`/ideas/${payload.ideaId}/vote`, {
        method: 'POST',
        body: JSON.stringify({ direction: payload.direction }),
      })
    } catch {
      return this.fallback.vote(payload)
    }
  }

  async submitDraft(payload: ContributionDraft): Promise<void> {
    try {
      await this.proxyRequest<{ ok: boolean }>(`/drafts`, {
        method: 'POST',
        body: JSON.stringify(payload),
      })
    } catch {
      return this.fallback.submitDraft(payload)
    }
  }
}

const createCommunityGateway = (): CommunityGateway => {
  const provider = import.meta.env.VITE_COMMUNITY_PROVIDER
  const token = import.meta.env.VITE_GITHUB_TOKEN ?? ''
  const proxyBaseUrl = import.meta.env.VITE_COMMUNITY_PROXY_BASE_URL || '/api/community'

  if (provider === 'proxy') {
    return new CommunityProxyGateway({
      baseUrl: proxyBaseUrl,
    })
  }

  if (provider === 'github-api' && token) {
    return new GitHubDiscussionsApiGateway({
      owner: discussionOwner,
      repo: discussionRepo,
      apiBaseUrl: githubApiBaseUrl,
      categorySlug: 'ideas',
      token,
    })
  }

  return new MockGitHubCommunityGateway()
}

export const communityGateway: CommunityGateway = createCommunityGateway()
