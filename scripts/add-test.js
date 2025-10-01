// Node script to add a new TET Practice Test
// Usage: node scripts/add-test.js 03 "2025-10-03" "Grammar,Pedagogy"
// - It will prepend a tests.json entry pointing to the external GitHub Pages URL

import fs from 'fs'
import path from 'path'

const root = process.cwd()
const [,, numberArg, dateArg, topicsArg] = process.argv

if (!numberArg) {
  console.error('Missing test number. Usage: node scripts/add-test.js 03 [YYYY-MM-DD] [topicsCsv]')
  process.exit(1)
}

const num = numberArg.padStart(2, '0')
const date = dateArg || new Date().toISOString().slice(0,10)
const topics = (topicsArg || '').split(',').filter(Boolean)

const testsJsonPath = path.join(root, 'src', 'data', 'tests.json')

// Read/parse tests.json
const json = JSON.parse(fs.readFileSync(testsJsonPath, 'utf-8'))

const id = `test-${num}`
const href = `https://lourdselt.github.io/TET-English-Quiz/test-${num}.html`

if (json.some(t => t.id === id)) {
  console.error(`Test ${id} already exists in tests.json`)
  process.exit(1)
}

// Prepend new test (so newest appears first)
json.unshift({
  id,
  label: `Test ${num}`,
  series: 'TET Practice Tests',
  href,
  date,
  meta: topics.length ? { topics } : undefined,
})

fs.writeFileSync(testsJsonPath, JSON.stringify(json, null, 2) + '\n')

console.log(`Added ${id}: ${href} on ${date} (external link)`) 
