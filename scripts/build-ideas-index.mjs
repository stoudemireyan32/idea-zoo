import fs from 'node:fs'
import path from 'node:path'

const repoRoot = process.cwd()
const ideasRoot = path.join(repoRoot, 'ideas')
const outPath = path.join(repoRoot, 'src/data/ideas.ts')

const REQUIRED_FRONTMATTER = [
  'id',
  'slug',
  'category',
  'difficulty',
  'status',
  'compute',
  'source',
  'model',
  'dataset',
  'keywords',
  'upvotes',
  'downvotes',
  'trending',
  'created_at',
  'human_reviewed',
  'verification_verdict',
  'score_implementability',
  'score_operability',
  'score_innovation',
  'score_similarity_risk',
  'score_verification_confidence',
  'score_potential_impact',
]

const SECTION_KEYS = {
  'Title EN': 'titleEn',
  'Title ZH': 'titleZh',
  'Tagline EN': 'taglineEn',
  'Tagline ZH': 'taglineZh',
  'Summary EN': 'summaryEn',
  'Summary ZH': 'summaryZh',
  'Challenge EN': 'challengeEn',
  'Challenge ZH': 'challengeZh',
  'Method EN': 'methodEn',
  'Method ZH': 'methodZh',
  'Expected Outcome EN': 'expectedOutcomeEn',
  'Expected Outcome ZH': 'expectedOutcomeZh',
  'Why Now EN': 'whyNowEn',
  'Why Now ZH': 'whyNowZh',
  'Verification Note EN': 'verificationNoteEn',
  'Verification Note ZH': 'verificationNoteZh',
}

const REQUIRED_SECTION_VALUES = Object.values(SECTION_KEYS)

const VALID_DIFFICULTY = new Set(['Beginner', 'Intermediate', 'Advanced'])
const VALID_STATUS = new Set(['Open', 'Debate', 'Claimed', 'In Progress'])
const VALID_COMPUTE = new Set(['Low', 'Medium', 'High'])
const VALID_SOURCE = new Set(['AI-generated', 'Community', 'Hybrid'])
const VALID_VERDICT = new Set(['Strong', 'Promising', 'Speculative'])

const readMarkdownFiles = (dir) => {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    if (entry.name === 'TEMPLATE.md') {
      continue
    }

    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...readMarkdownFiles(full))
      continue
    }

    if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(full)
    }
  }

  return files
}

const parseFrontmatter = (content, filePath) => {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) {
    throw new Error(`Missing frontmatter in ${filePath}`)
  }

  const [, rawFrontmatter, body] = match
  const metadata = {}

  for (const rawLine of rawFrontmatter.split('\n')) {
    const line = rawLine.trim()
    if (!line) continue

    const sepIndex = line.indexOf(':')
    if (sepIndex <= 0) {
      throw new Error(`Invalid frontmatter line in ${filePath}: ${line}`)
    }

    const key = line.slice(0, sepIndex).trim()
    const rawValue = line.slice(sepIndex + 1).trim()

    try {
      metadata[key] = JSON.parse(rawValue)
    } catch {
      throw new Error(
        `Frontmatter value must be JSON literal in ${filePath}: ${key}: ${rawValue}`,
      )
    }
  }

  return { metadata, body }
}

const parseSections = (body, filePath) => {
  const sections = {}
  const regex = /^##\s+(.+)\n([\s\S]*?)(?=\n##\s+|$)/gm
  let match = regex.exec(body)

  while (match) {
    const heading = match[1].trim()
    const content = match[2].trim()
    const key = SECTION_KEYS[heading]

    if (key) {
      sections[key] = content
    }

    match = regex.exec(body)
  }

  for (const key of REQUIRED_SECTION_VALUES) {
    if (!sections[key]) {
      throw new Error(`Missing section content (${key}) in ${filePath}`)
    }
  }

  return sections
}

const assertRange = (value, label, filePath) => {
  if (!Number.isInteger(value) || value < 1 || value > 10) {
    throw new Error(`${label} must be integer in [1,10] in ${filePath}`)
  }
}

const validateMetadata = (metadata, filePath) => {
  for (const key of REQUIRED_FRONTMATTER) {
    if (!(key in metadata)) {
      throw new Error(`Missing frontmatter key '${key}' in ${filePath}`)
    }
  }

  if (!VALID_DIFFICULTY.has(metadata.difficulty)) {
    throw new Error(`Invalid difficulty in ${filePath}`)
  }

  if (!VALID_STATUS.has(metadata.status)) {
    throw new Error(`Invalid status in ${filePath}`)
  }

  if (!VALID_COMPUTE.has(metadata.compute)) {
    throw new Error(`Invalid compute in ${filePath}`)
  }

  if (!VALID_SOURCE.has(metadata.source)) {
    throw new Error(`Invalid source in ${filePath}`)
  }

  if (!VALID_VERDICT.has(metadata.verification_verdict)) {
    throw new Error(`Invalid verification_verdict in ${filePath}`)
  }

  if (!Array.isArray(metadata.keywords) || metadata.keywords.length === 0) {
    throw new Error(`keywords must be a non-empty array in ${filePath}`)
  }

  assertRange(metadata.score_implementability, 'score_implementability', filePath)
  assertRange(metadata.score_operability, 'score_operability', filePath)
  assertRange(metadata.score_innovation, 'score_innovation', filePath)
  assertRange(metadata.score_similarity_risk, 'score_similarity_risk', filePath)
  assertRange(
    metadata.score_verification_confidence,
    'score_verification_confidence',
    filePath,
  )
  assertRange(metadata.score_potential_impact, 'score_potential_impact', filePath)

  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(metadata.created_at))) {
    throw new Error(`created_at must be YYYY-MM-DD in ${filePath}`)
  }
}

const toIdea = (metadata, sections) => ({
  id: metadata.id,
  slug: metadata.slug,
  title: {
    en: sections.titleEn,
    zh: sections.titleZh,
  },
  tagline: {
    en: sections.taglineEn,
    zh: sections.taglineZh,
  },
  summary: {
    en: sections.summaryEn,
    zh: sections.summaryZh,
  },
  challenge: {
    en: sections.challengeEn,
    zh: sections.challengeZh,
  },
  method: {
    en: sections.methodEn,
    zh: sections.methodZh,
  },
  expectedOutcome: {
    en: sections.expectedOutcomeEn,
    zh: sections.expectedOutcomeZh,
  },
  whyNow: {
    en: sections.whyNowEn,
    zh: sections.whyNowZh,
  },
  area: metadata.category,
  difficulty: metadata.difficulty,
  status: metadata.status,
  compute: metadata.compute,
  source: metadata.source,
  model: metadata.model,
  dataset: metadata.dataset,
  keywords: metadata.keywords,
  discussionNumber: metadata.discussion_number ?? null,
  qualityScores: {
    implementability: metadata.score_implementability,
    operability: metadata.score_operability,
    innovation: metadata.score_innovation,
    similarityRisk: metadata.score_similarity_risk,
    verificationConfidence: metadata.score_verification_confidence,
    potentialImpact: metadata.score_potential_impact,
  },
  verificationVerdict: metadata.verification_verdict,
  verificationNote: {
    en: sections.verificationNoteEn,
    zh: sections.verificationNoteZh,
  },
  upvotes: metadata.upvotes,
  downvotes: metadata.downvotes,
  score: metadata.upvotes - metadata.downvotes,
  trending: metadata.trending,
  createdAt: metadata.created_at,
  humanReviewed: metadata.human_reviewed,
})

const ideaFiles = readMarkdownFiles(ideasRoot)
if (ideaFiles.length === 0) {
  throw new Error('No idea markdown files found under ideas/')
}

const ideas = []
const seenIds = new Set()
const seenSlugs = new Set()

for (const filePath of ideaFiles) {
  const content = fs.readFileSync(filePath, 'utf8')
  const { metadata, body } = parseFrontmatter(content, filePath)
  validateMetadata(metadata, filePath)
  const sections = parseSections(body, filePath)
  const idea = toIdea(metadata, sections)

  if (seenIds.has(idea.id)) {
    throw new Error(`Duplicate id '${idea.id}' in ${filePath}`)
  }

  if (seenSlugs.has(idea.slug)) {
    throw new Error(`Duplicate slug '${idea.slug}' in ${filePath}`)
  }

  seenIds.add(idea.id)
  seenSlugs.add(idea.slug)
  ideas.push(idea)
}

ideas.sort((a, b) => a.id.localeCompare(b.id))

const researchAreas = []
const areaSet = new Set()
for (const idea of ideas) {
  if (!areaSet.has(idea.area)) {
    areaSet.add(idea.area)
    researchAreas.push(idea.area)
  }
}

const generated = `import type { DemoIdea } from '../types'\n\nexport const researchAreas = ${JSON.stringify(researchAreas, null, 2)} as const\n\nexport const demoIdeas: DemoIdea[] = ${JSON.stringify(ideas, null, 2)}\n`

fs.writeFileSync(outPath, generated)
console.log(`Built ideas index from markdown: ${ideas.length} ideas, ${researchAreas.length} categories.`)
