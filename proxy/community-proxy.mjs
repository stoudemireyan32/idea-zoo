import express from 'express'

const app = express()
app.use(express.json())

const PORT = Number(process.env.COMMUNITY_PROXY_PORT || 8899)
const owner = process.env.GITHUB_OWNER || 'stoudemireyan32'
const repo = process.env.GITHUB_REPO || 'idea-zoo'
const categorySlug = process.env.GITHUB_DISCUSSION_CATEGORY || 'ideas'
const token = process.env.GITHUB_TOKEN || ''
const githubApiBase = 'https://api.github.com'

const ideaIds = Array.from({ length: 10 }, (_, index) => `idea-${String(index + 1).padStart(3, '0')}`)
const ideaToDiscussion = new Map(ideaIds.map((ideaId, index) => [ideaId, index + 1]))
const voteByClient = new Map()

const mockStore = new Map(
  ideaIds.map((ideaId, index) => {
    const upvotes = 50 + index * 9
    const downvotes = 8 + index * 2
    return [
      ideaId,
      {
        ideaId,
        discussion: {
          provider: 'github-discussions',
          owner,
          repo,
          number: index + 1,
          url: null,
          title: `Idea Discussion #${index + 1}`,
          categorySlug,
          commentsCount: Math.max(3, Math.round((upvotes + downvotes) / 7)),
          updatedAt: new Date().toISOString(),
        },
        votes: {
          upvotes,
          downvotes,
          score: upvotes - downvotes,
          source: 'mock',
        },
      },
    ]
  }),
)

const fallbackSnapshot = (ideaId) => ({
  ideaId,
  discussion: {
    provider: 'github-discussions',
    owner,
    repo,
    number: null,
    url: null,
    title: 'Start a discussion for this idea',
    categorySlug,
    commentsCount: 0,
    updatedAt: new Date().toISOString(),
  },
  votes: {
    upvotes: 0,
    downvotes: 0,
    score: 0,
    source: 'mock',
  },
})

const githubRequest = async (path, init = {}) => {
  if (!token) {
    throw new Error('Missing GITHUB_TOKEN')
  }

  const response = await fetch(`${githubApiBase}${path}`, {
    ...init,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      ...(init.headers || {}),
    },
  })

  if (!response.ok) {
    const reason = await response.text()
    throw new Error(`GitHub API ${response.status}: ${reason}`)
  }

  return response.json()
}

const toSnapshotFromDiscussion = (ideaId, discussion) => {
  const upvotes = discussion.reactions?.['+1'] || 0
  const downvotes = discussion.reactions?.['-1'] || 0

  return {
    ideaId,
    discussion: {
      provider: 'github-discussions',
      owner,
      repo,
      number: discussion.number,
      url: discussion.html_url,
      title: discussion.title,
      categorySlug: discussion.category?.slug || categorySlug,
      commentsCount: discussion.comments || 0,
      updatedAt: discussion.updated_at || new Date().toISOString(),
    },
    votes: {
      upvotes,
      downvotes,
      score: upvotes - downvotes,
      source: 'github-reactions',
    },
  }
}

const getSnapshot = async (ideaId) => {
  const discussionNumber = ideaToDiscussion.get(ideaId)

  if (!discussionNumber) {
    return fallbackSnapshot(ideaId)
  }

  try {
    const discussion = await githubRequest(
      `/repos/${owner}/${repo}/discussions/${discussionNumber}`,
    )
    return toSnapshotFromDiscussion(ideaId, discussion)
  } catch {
    return mockStore.get(ideaId) || fallbackSnapshot(ideaId)
  }
}

const applyVoteTransition = (currentVotes, previous, next) => {
  if (previous === next) {
    return currentVotes
  }

  let upvotes = currentVotes.upvotes
  let downvotes = currentVotes.downvotes

  if (previous === 'up') {
    upvotes -= 1
  }

  if (previous === 'down') {
    downvotes -= 1
  }

  if (next === 'up') {
    upvotes += 1
  }

  if (next === 'down') {
    downvotes += 1
  }

  return {
    ...currentVotes,
    upvotes,
    downvotes,
    score: upvotes - downvotes,
  }
}

app.get('/health', (_req, res) => {
  res.json({ ok: true, mode: token ? 'github-api' : 'mock-fallback' })
})

app.get('/api/community/ideas/:ideaId', async (req, res) => {
  const ideaId = req.params.ideaId
  const clientId = req.get('x-idea-zoo-client-id') || req.ip || 'anonymous-client'
  const viewerVote = voteByClient.get(`${clientId}:${ideaId}`) || null

  const snapshot = await getSnapshot(ideaId)
  res.json({ ...snapshot, viewerVote })
})

app.post('/api/community/ideas/:ideaId/vote', async (req, res) => {
  const ideaId = req.params.ideaId
  const direction = req.body?.direction
  const clientId = req.get('x-idea-zoo-client-id') || req.ip || 'anonymous-client'
  const voteKey = `${clientId}:${ideaId}`
  const previousVote = voteByClient.get(voteKey) || null

  if (direction !== 'up' && direction !== 'down') {
    res.status(400).json({ error: 'direction must be up or down' })
    return
  }

  const discussionNumber = ideaToDiscussion.get(ideaId)

  if (!discussionNumber || !token) {
    const current = mockStore.get(ideaId) || fallbackSnapshot(ideaId)
    const updatedVotes = applyVoteTransition(current.votes, previousVote, direction)

    voteByClient.set(voteKey, direction)

    const updated = {
      ...current,
      votes: updatedVotes,
      viewerVote: direction,
    }

    mockStore.set(ideaId, updated)
    res.json(updated)
    return
  }

  try {
    if (previousVote === direction) {
      const snapshot = await getSnapshot(ideaId)
      res.json({ ...snapshot, viewerVote: direction })
      return
    }

    await githubRequest(
      `/repos/${owner}/${repo}/discussions/${discussionNumber}/reactions`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: direction === 'up' ? '+1' : '-1' }),
      },
    )

    voteByClient.set(voteKey, direction)

    const snapshot = await getSnapshot(ideaId)
    res.json({ ...snapshot, viewerVote: direction })
  } catch {
    const current = mockStore.get(ideaId) || fallbackSnapshot(ideaId)
    res.json({ ...current, viewerVote: previousVote })
  }
})

app.post('/api/community/drafts', async (req, res) => {
  const payload = req.body || {}
  const title = String(payload.title || '').trim()
  const area = String(payload.area || '').trim()
  const summary = String(payload.summary || '').trim()

  if (!title) {
    res.status(400).json({ error: 'title is required' })
    return
  }

  if (!token) {
    res.json({ ok: true, mode: 'mock-fallback' })
    return
  }

  const body = [
    `### Research Area\n${area || 'TBD'}`,
    `### Summary\n${summary || 'TBD'}`,
    '---',
    'Submitted from Idea Zoo proxy API.',
  ].join('\n\n')

  try {
    await githubRequest(`/repos/${owner}/${repo}/discussions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        body,
        category: categorySlug,
      }),
    })

    res.json({ ok: true, mode: 'github-api' })
  } catch (error) {
    res.status(500).json({ ok: false, error: String(error) })
  }
})

app.listen(PORT, () => {
  console.log(`[community-proxy] listening on http://localhost:${PORT}`)
})
