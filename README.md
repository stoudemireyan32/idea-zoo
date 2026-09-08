# 🦓 Idea Zoo

**Open AI Research Idea Commons**

Discover. Debate. Build. Share.

## Vision
Idea Zoo is an open-source editorial research platform for AI/ML ideas.
It helps researchers find meaningful research questions, not just runnable code.

Positioning:
**Premium AI Research Lab × Open Source Community × Editorial Research Platform**

Founder: **Yan Li**

## MVP V0.1 Scope
- Homepage with premium research visual language
- Explore page with search / filter / sort
- Random idea jump
- Idea detail page
- About page
- Contribution guide page
- English / 中文 language switch
- 10 demo ideas across 10 research areas

Not in V0.1:
- Backend / DB
- Complex auth
- Payments
- AI agents or LLM API integration

## Tech Stack
- React + TypeScript + Vite
- React Router
- Handcrafted CSS system (no heavy UI dependency)
- GitHub Pages + GitHub Actions deployment

## Local Development
```bash
npm install
npm run dev
```

For full local end-to-end community flow (frontend + proxy):

```bash
cp .env.example .env.local
npm run dev:full
```

## Build
```bash
npm run build
npm run lint
npm run check
```

## Deployment (GitHub Pages)
1. In GitHub repo settings, enable **Pages** and choose **GitHub Actions** as source.
2. Push to `main`.
3. Workflow `.github/workflows/deploy.yml` builds and deploys automatically.

## Release Checklists
- Acceptance gate: `docs/MVP_ACCEPTANCE_CHECKLIST.md`
- Release runbook: `docs/RELEASE_RUNBOOK.md`

## Community API Adapter
- Integration notes: `docs/COMMUNITY_API_INTEGRATION.md`
- Proxy integration plan: `docs/COMMUNITY_PROXY_PLAN.md`
- Default runtime provider is mock.
- To enable API mode: set `VITE_COMMUNITY_PROVIDER=github-api` and `VITE_GITHUB_TOKEN`.
- Recommended production mode: `VITE_COMMUNITY_PROVIDER=proxy`.

## Contributing Ideas
- Use `ideas/TEMPLATE.md`
- Submit via Pull Request
- Discuss in PR / GitHub Discussions

## Future-ready Architecture
Current frontend keeps extension points for:
- GitHub OAuth
- Community voting
- Comments
- richer contribution workflows

See `src/services/community.ts` for future integration contract.
