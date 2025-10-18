import React, { useEffect, useState } from 'react'
import words from '../data/words.json'

// Deterministic PRNG (Mulberry32)
function mulberry32(seed) {
  return function() {
    let t = (seed += 0x6D2B79F5) >>> 0
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Seeded Fisher–Yates shuffle
function seededShuffleIndices(n, seed = 2025) {
  const idx = [...Array(n).keys()]
  const rnd = mulberry32(seed)
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1))
    ;[idx[i], idx[j]] = [idx[j], idx[i]]
  }
  return idx
}

function istNowMs() {
  const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000
  return Date.now() + IST_OFFSET_MS
}

function getIstDayNumber() {
  return Math.floor(istNowMs() / 86400000)
}

function pickWordToday(list) {
  if (!list?.length) return null
  // Use only entries with all key fields so IPA/definition/synonyms/antonyms always show
  const eligible = list.filter(
    (w) => w && w.ipa && w.definition && Array.isArray(w.synonyms) && w.synonyms.length && Array.isArray(w.antonyms) && w.antonyms.length
  )
  const pool = eligible.length ? eligible : list
  const N = pool.length
  // Create a deterministic order shared by all users
  const order = seededShuffleIndices(N, 20251018) // fixed seed; change to reshuffle globally
  const index = getIstDayNumber() % N
  const idx = order[index]
  return pool[idx]
}

export default function WordOfDay() {
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000
    const MS_DAY = 86400000
    const nowUtcMs = Date.now()
    const istNowMs = nowUtcMs + IST_OFFSET_MS
    const istDayStartMs = Math.floor(istNowMs / MS_DAY) * MS_DAY
    const msUntilNextIstMidnight = istDayStartMs + MS_DAY - istNowMs

    const timeoutId = setTimeout(() => {
      setTick((t) => t + 1)
      // After the first flip, refresh every 24h at the same IST time
      const intervalId = setInterval(() => setTick((t) => t + 1), MS_DAY)
      // Store on window to clear on unmount
      window.__wotdIntervalId && clearInterval(window.__wotdIntervalId)
      window.__wotdIntervalId = intervalId
    }, msUntilNextIstMidnight)

    return () => {
      clearTimeout(timeoutId)
      if (window.__wotdIntervalId) clearInterval(window.__wotdIntervalId)
    }
  }, [])

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
          {w.ipa ? (
            <div className="text-gray-600 mt-1">/{w.ipa}/</div>
          ) : null}
          <div className="mt-4 text-gray-800">
            {w.pos ? (
              <span className="uppercase text-xs tracking-wide bg-purple-100 text-purple-800 px-2 py-1 rounded-full mr-2">{w.pos}</span>
            ) : null}
            {w.definition ? <span>{w.definition}</span> : null}
          </div>
          {w.example ? (
            <div className="mt-3 text-gray-600 italic">“{w.example}”</div>
          ) : null}
          {w.synonyms?.length ? (
            <div className="mt-4 text-sm text-gray-700">
              <span className="font-medium text-gray-900">Synonyms:</span> {w.synonyms.join(', ')}
            </div>
          ) : null}
          {w.antonyms?.length ? (
            <div className="mt-2 text-sm text-gray-700">
              <span className="font-medium text-gray-900">Antonyms:</span> {w.antonyms.join(', ')}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
