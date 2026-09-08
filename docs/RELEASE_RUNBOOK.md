# Idea Zoo Release Runbook (MVP)

## 1) Pre-release local checks
Run from repository root:

```bash
npm ci
npm run check
```

## 2) Manual smoke checks
- Open `/` and confirm hero + featured/trending blocks render correctly.
- Open `/explore` and verify search/filter/sort interactions.
- Open at least 3 idea detail pages and verify metadata + community block.
- Open `/about` and `/contribute` and verify layout stability.
- Verify EN/中文 switch on each major page.

## 3) Push and deploy
- Push to `main`.
- Wait for workflow `Build and Deploy Idea Zoo` to finish.
- Validate published site on GitHub Pages.

## 4) Post-deploy quick verification
- Ensure routing works for direct URL access (`/explore`, `/ideas/:slug`) via SPA fallback.
- Verify social preview metadata is present in page source.

## 5) Rollback option
- Revert the last commit on `main` and push.
- GitHub Pages workflow will redeploy previous stable version.
