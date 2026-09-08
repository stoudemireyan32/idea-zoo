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
- Premium visual homepage + multi-page research editorial experience
- Explore page with search / filter / sort / random idea
- Idea detail page with voting, discussion entry, quality scores, verification notes
- About + Contribution pages
- English / 中文 language switch
- Curated idea catalog (markdown-native)

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
- GitHub-native content pipeline (`ideas/*.md` -> generated frontend index)

## Content Architecture (GitHub-native)
Idea Zoo now treats each idea as a standalone markdown file:

- Source of truth: `ideas/<category>/<slug>.md`
- Template: `ideas/TEMPLATE.md`
- Validation schema: `schemas/idea.schema.json`
- Build script: `scripts/build-ideas-index.mjs`
- Generated frontend index: `src/data/ideas.ts`

### How auto-publish works
1. Contributor adds/edits idea markdown files in `ideas/`.
2. Open PR.
3. CI runs `npm run ideas:build` and validates schema + required sections.
4. After PR merge, deploy workflow rebuilds index and publishes GitHub Pages.
5. New ideas appear automatically on Explore/Home/Detail pages.

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

## Build & Content Commands
```bash
npm run ideas:build     # rebuild frontend index from ideas/*.md
npm run ideas:migrate   # one-time migration helper: ts data -> markdown files
npm run build           # ideas:build + tsc + vite build
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
- Copy `ideas/TEMPLATE.md` into `ideas/<category>/<slug>.md`
- Fill metadata + bilingual sections
- Open Pull Request
- After merge, idea auto-publishes to website via Actions

## Future-ready Architecture
Current frontend keeps extension points for:
- GitHub OAuth
- Community voting
- Comments
- richer contribution workflows

See `src/services/community.ts` for future integration contract.
