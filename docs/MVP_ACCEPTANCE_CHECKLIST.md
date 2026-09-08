# Idea Zoo V0.1 MVP Acceptance Checklist

Status date: 2026-09-08

## Core Pages
- [x] `/` Homepage
- [x] `/explore` Explore + Search + Filter + Sort
- [x] `/ideas/:slug` Idea Detail
- [x] `/about` About
- [x] `/contribute` Contribution Guide

## Product Capabilities
- [x] Premium research-oriented visual direction
- [x] English / 中文 language switch
- [x] 10 demo ideas seeded in frontend
- [x] Random idea entry points
- [x] Search across title/topic/method/model/dataset/keywords
- [x] Filter by area / difficulty / status / compute / source
- [x] Sort by trending / upvotes / downvotes / score / newest / oldest / random
- [x] Community voting UI (MVP mock)
- [x] GitHub Discussion entry on idea detail

## Architecture / Scope Guardrails
- [x] No backend
- [x] No database
- [x] No payment
- [x] No complex auth
- [x] No LLM API
- [x] Future integration seam for GitHub OAuth / Discussions API in `src/services/community.ts`

## Open Source Community Readiness
- [x] README with setup and deployment guide
- [x] Idea PR template (`.github/pull_request_template.md`)
- [x] Idea content template (`ideas/TEMPLATE.md`)

## Build / QA
- [x] `npm run lint` passes
- [x] `npm run build` passes
- [x] GitHub Pages deploy workflow configured
- [ ] Cross-device manual QA signoff (desktop/tablet/mobile)
- [ ] Final copyediting pass for all 10 ideas

## Final Signoff Notes
- This checklist is the release gate for MVP V0.1.
- Any unchecked item above should be explicitly accepted as deferred before launch.
