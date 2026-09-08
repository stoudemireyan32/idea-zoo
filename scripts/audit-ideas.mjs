import fs from 'node:fs'
import path from 'node:path'

const root = path.join(process.cwd(), 'ideas')
const files = fs.readdirSync(root, { recursive: true })
  .filter((name) => name.endsWith('.md') && name !== 'TEMPLATE.md')
  .map((name) => path.join(root, name))
const headings = ['Title', 'Tagline', 'Summary', 'Challenge', 'Method', 'Expected Outcome', 'Why Now', 'Verification Note']
const seen = new Map()
const errors = []

for (const file of files) {
  const raw = fs.readFileSync(file, 'utf8')
  for (const heading of headings) {
    const en = raw.match(new RegExp(`^## ${heading} EN\\n([\\s\\S]*?)(?=\\n## |$)`, 'm'))?.[1].trim()
    const zh = raw.match(new RegExp(`^## ${heading} ZH\\n([\\s\\S]*?)(?=\\n## |$)`, 'm'))?.[1].trim()
    if (!en || !zh) errors.push(`${file}: missing ${heading} pair`)
    if (zh && !/[\u3400-\u9fff]/.test(zh)) errors.push(`${file}: ${heading} ZH contains no Chinese`)
    if (heading === 'Title' && zh && /[A-Z]{2,}/.test(zh.replaceAll('AI', '').replaceAll('RAG', '').replaceAll('OCR', '').replaceAll('KPI', '').replaceAll('PR', '').replaceAll('P95', ''))) errors.push(`${file}: Title ZH contains untranslated words`)
    if (en && /[\u3400-\u9fff]/.test(en)) errors.push(`${file}: ${heading} EN contains Chinese`)
    for (const [locale, value] of [['EN', en], ['ZH', zh]]) {
      if (!value) continue
      const key = `${heading}:${locale}:${value}`
      const previous = seen.get(key)
      if (previous) errors.push(`${file}: duplicate ${heading} ${locale} from ${previous}`)
      seen.set(key, file)
    }
  }
}

if (errors.length) {
  console.error(errors.join('\n'))
  process.exit(1)
}
console.log(`Audited ${files.length} ideas: all ${headings.length} bilingual pairs present and unique.`)
