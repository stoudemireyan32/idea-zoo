# Community API Integration Plan

## Current Status
- Runtime default is `mock` provider.
- Data contract is already aligned to GitHub Discussions fields.
- UI consumes `discussion` and `votes` from `IdeaCommunitySnapshot`.

## Provider switch
Set environment variables:

```bash
VITE_COMMUNITY_PROVIDER=github-api
VITE_GITHUB_TOKEN=<github_token>
```

If `VITE_GITHUB_TOKEN` is missing, API provider safely falls back to mock behavior.

Proxy mode (recommended for production):

```bash
VITE_COMMUNITY_PROVIDER=proxy
VITE_COMMUNITY_PROXY_BASE_URL=/api/community
```

## Security note
- `VITE_*` variables are bundled into browser code at build time.
- Do not use high-privilege personal tokens in production frontend builds.
- Recommended production path: move GitHub API calls behind a server-side proxy or backend.

## Files
- Provider selection and adapters: `src/services/community.ts`
- Consumer page: `src/pages/IdeaDetailPage.tsx`
- Proxy contract doc: `docs/COMMUNITY_PROXY_PLAN.md`

## Next implementation step
- Add server-side token handling (proxy/backend) and remove client-side PAT usage.
- Replace discussion-number mapping with persisted idea-to-discussion metadata.
