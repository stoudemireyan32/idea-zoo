# Community Proxy Plan (Server-side Token Safe)

## Goal
Keep GitHub tokens on server side only, while frontend reads/writes community data through a same-origin proxy API.

## Frontend Provider
Set:

```bash
VITE_COMMUNITY_PROVIDER=proxy
VITE_COMMUNITY_PROXY_BASE_URL=/api/community
```

Frontend adapter: `CommunityProxyGateway` in `src/services/community.ts`.

## Local end-to-end run
From repo root:

```bash
npm install
cp .env.example .env.local
npm run dev:full
```

This starts:
- Vite app on `http://localhost:5173`
- Community proxy on `http://localhost:8899`

Quick check:

```bash
curl http://localhost:8899/health
```

## What is realistically simulated locally
- Vote UX logic is simulated end-to-end with one-vote-per-idea and mutual exclusion.
- Discussion/comment counters are simulated unless real GitHub mapping and token are configured.
- If real discussion mapping is not configured, discussion CTA can route to repository home as a safe fallback.

## Suggested Proxy Endpoints
Base: `/api/community`

### 1) Get idea community snapshot
- Method: `GET`
- Path: `/ideas/:ideaId`
- Response:

```json
{
  "ideaId": "idea-001",
  "discussion": {
    "provider": "github-discussions",
    "owner": "stoudemireyan32",
    "repo": "idea-zoo",
    "number": 1,
    "url": "https://github.com/.../discussions/1",
    "title": "Reasoning with Verification Games",
    "categorySlug": "ideas",
    "commentsCount": 18,
    "updatedAt": "2026-09-08T08:00:00.000Z"
  },
  "votes": {
    "upvotes": 132,
    "downvotes": 20,
    "score": 112,
    "source": "github-reactions"
  }
}
```

### 2) Vote
- Method: `POST`
- Path: `/ideas/:ideaId/vote`
- Body:

```json
{ "direction": "up" }
```

- Response: same shape as `GET /ideas/:ideaId`

### 3) Submit draft discussion
- Method: `POST`
- Path: `/drafts`
- Body:

```json
{
  "title": "Your idea title",
  "area": "Reasoning",
  "summary": "Your summary"
}
```

- Response:

```json
{ "ok": true }
```

## Server-side responsibilities
- Store GitHub token in server env (not client env).
- Map `ideaId -> discussion number` from persisted metadata.
- Call GitHub Discussions API and transform responses to `IdeaCommunitySnapshot`.
- Apply per-IP/user rate limits for vote endpoint.
- Optionally enforce auth (GitHub OAuth) before vote/write operations.

## Rollout Strategy
1. Keep frontend on `mock` in production until proxy is available.
2. Deploy proxy and test with staging token.
3. Switch frontend to `VITE_COMMUNITY_PROVIDER=proxy`.
4. Later remove direct `github-api` mode from client bundle.
