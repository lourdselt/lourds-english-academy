import React from 'react'
import words from '../data/words.json'

function pickWordToday(list) {
  if (!list?.length) return null
  const today = new Date()
  const iso = today.toISOString().slice(0,10)
  // Prefer item with matching date
  const dated = list.find(w => w.date === iso)
  if (dated) return dated
  // Otherwise rotate deterministically by day index
  const dayIndex = Math.floor(Date.now() / (1000 * 60 * 60 * 24))
  return list[dayIndex % list.length]
}

export default function WordOfDay() {
  const w = pickWordToday(words)
  if (!w) return null
  return (
    <section className="px-12 py-12">
      <div className="max-w-3xl mx-auto p-8 rounded-2xl bg-gradient-to-br from-purple-50 via-white to-purple-50 shadow">
        <div className="flex items-start justify-between">
          <h3 className="text-2xl font-semibold text-purple-700">Word of the Day</h3>
          <button
            className="text-sm px-3 py-1 rounded-full border border-purple-200 text-purple-700 hover:bg-purple-50"
            onClick={() => {
              const text = `${w.word} (${w.pos}) - ${w.definition}\nExample: ${w.example}`
              navigator.clipboard?.writeText(text)
            }}
            aria-label="Copy word"
          >
            Copy
          </button>
        </div>
        <div className="mt-4">
          <div className="text-4xl font-bold text-gray-900">{w.word}</div>
          {w.pronunciation ? (
            <div className="text-gray-600 mt-1">/{w.pronunciation}/</div>
          ) : null}
          <div className="mt-4 text-gray-800">
            <span className="uppercase text-xs tracking-wide bg-purple-100 text-purple-800 px-2 py-1 rounded-full mr-2">{w.pos}</span>
            <span>{w.definition}</span>
          </div>
          {w.example ? (
            <div className="mt-3 text-gray-600 italic">“{w.example}”</div>
          ) : null}
          {w.synonyms?.length ? (
            <div className="mt-4 text-sm text-gray-700">
              <span className="font-medium text-gray-900">Synonyms:</span> {w.synonyms.join(', ')}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
