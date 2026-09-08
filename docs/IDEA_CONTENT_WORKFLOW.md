# Idea Content Workflow (GitHub-native)

## Goal
Make every idea a standalone markdown asset so contributors can propose ideas via PRs and have them auto-published without touching frontend code.

## Source of Truth
- `ideas/<category>/<slug>.md`
- Template: `ideas/TEMPLATE.md`

## File Format
Each markdown file contains:
1. Frontmatter block (`---`) with JSON-literal values (`key: "value"`, `key: 1`, `key: ["a","b"]`)
2. Required bilingual sections (`## Title EN`, `## Title ZH`, etc.)

## Build Chain
- Script: `node scripts/build-ideas-index.mjs`
- Reads and validates all `ideas/**/*.md` (excluding `ideas/TEMPLATE.md`)
- Produces generated index used by frontend:
  - `src/data/ideas.ts`

## Validation Rules
- Required metadata keys must exist
- Enum fields must be valid (`difficulty`, `status`, `source`, etc.)
- Score fields must be integer in `[1,10]`
- `id` and `slug` must be globally unique
- All required bilingual sections must be present and non-empty

Schema reference:
- `schemas/idea.schema.json`

## Contributor Flow
1. Fork repo
2. Create `ideas/<category>/<slug>.md` from template
3. Fill metadata and bilingual sections
4. Open PR
5. CI validates and builds
6. Merge PR -> GitHub Pages deploy -> idea appears on site
