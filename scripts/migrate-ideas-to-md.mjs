import fs from 'node:fs'
import path from 'node:path'
import vm from 'node:vm'

const repoRoot = process.cwd()
const sourcePath = path.join(repoRoot, 'src/data/ideas.ts')
const ideasRoot = path.join(repoRoot, 'ideas')

const source = fs.readFileSync(sourcePath, 'utf8')

const ideasMatch = source.match(/export const demoIdeas: DemoIdea\[\] = (\[[\s\S]*\])\s*$/)
if (!ideasMatch) {
  throw new Error('Cannot parse demoIdeas from src/data/ideas.ts')
}

const ideas = vm.runInNewContext(`(${ideasMatch[1]})`)

const toDirSlug = (value) =>
  String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const sectionPairs = [
  ['Title EN', (idea) => idea.title.en],
  ['Title ZH', (idea) => idea.title.zh],
  ['Tagline EN', (idea) => idea.tagline.en],
  ['Tagline ZH', (idea) => idea.tagline.zh],
  ['Summary EN', (idea) => idea.summary.en],
  ['Summary ZH', (idea) => idea.summary.zh],
  ['Challenge EN', (idea) => idea.challenge.en],
  ['Challenge ZH', (idea) => idea.challenge.zh],
  ['Method EN', (idea) => idea.method.en],
  ['Method ZH', (idea) => idea.method.zh],
  ['Expected Outcome EN', (idea) => idea.expectedOutcome.en],
  ['Expected Outcome ZH', (idea) => idea.expectedOutcome.zh],
  ['Why Now EN', (idea) => idea.whyNow.en],
  ['Why Now ZH', (idea) => idea.whyNow.zh],
  ['Verification Note EN', (idea) => idea.verificationNote.en],
  ['Verification Note ZH', (idea) => idea.verificationNote.zh],
]

for (const idea of ideas) {
  const categoryDir = path.join(ideasRoot, toDirSlug(idea.area))
  fs.mkdirSync(categoryDir, { recursive: true })

  const discussionNumber = idea.discussionNumber ?? null

  const frontmatter = {
    id: idea.id,
    slug: idea.slug,
    category: idea.area,
    difficulty: idea.difficulty,
    status: idea.status,
    compute: idea.compute,
    source: idea.source,
    model: idea.model,
    dataset: idea.dataset,
    keywords: idea.keywords,
    upvotes: idea.upvotes,
    downvotes: idea.downvotes,
    trending: idea.trending,
    created_at: idea.createdAt,
    human_reviewed: idea.humanReviewed,
    discussion_number: discussionNumber,
    verification_verdict: idea.verificationVerdict,
    score_implementability: idea.qualityScores.implementability,
    score_operability: idea.qualityScores.operability,
    score_innovation: idea.qualityScores.innovation,
    score_similarity_risk: idea.qualityScores.similarityRisk,
    score_verification_confidence: idea.qualityScores.verificationConfidence,
    score_potential_impact: idea.qualityScores.potentialImpact,
    author_github: 'community',
  }

  const frontmatterLines = Object.entries(frontmatter).map(
    ([key, value]) => `${key}: ${JSON.stringify(value)}`,
  )

  const sections = sectionPairs
    .map(([title, getter]) => `## ${title}\n${getter(idea)}\n`)
    .join('\n')

  const content = `---\n${frontmatterLines.join('\n')}\n---\n\n${sections}`

  fs.writeFileSync(path.join(categoryDir, `${idea.slug}.md`), content)
}

console.log(`Migrated ${ideas.length} ideas into markdown files under ideas/`) 
