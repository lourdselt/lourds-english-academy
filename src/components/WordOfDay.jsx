import React, { useEffect, useState } from 'react'
import words from '../data/words.json'

// Fisher–Yates shuffle
function shuffle(arr) {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
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
  const N = list.length
  const key = 'wotdStateV1'
  let state
  try { state = JSON.parse(localStorage.getItem(key) || 'null') } catch {}

  const today = getIstDayNumber()

  // (Re)initialize state if missing or size changed
  if (!state || !Array.isArray(state.order) || state.order.length !== N) {
    state = {
      order: shuffle([...Array(N).keys()]),
      pointer: 0,
      lastDay: today,
    }
  }

  // Advance pointer at a new IST day
  if (state.lastDay !== today) {
    state.pointer = (state.pointer + 1) % N
    state.lastDay = today
  }

  // Persist state
  try { localStorage.setItem(key, JSON.stringify(state)) } catch {}

  const idx = state.order[state.pointer] ?? 0
  return list[idx]
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
