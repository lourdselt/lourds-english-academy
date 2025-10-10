import React from 'react'

export default function TestList({ tests = [] }) {
  if (!tests.length) {
    return (
      <div className="text-gray-600 italic">No tests available yet. Please check back tomorrow.</div>
    )
  }
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {tests.map((t) => (
        <a
          key={t.id}
          href={t.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group p-6 rounded-2xl bg-white shadow hover:shadow-lg transition-shadow border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">{t.series}</div>
              <div className="text-xl font-semibold text-gray-900 group-hover:text-purple-600">
                {t.label}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {t.isNew ? (
                <span className="text-[11px] font-semibold uppercase bg-green-100 text-green-700 px-2 py-1 rounded-full">New</span>
              ) : null}
              <span className="text-purple-600 text-2xl">→</span>
            </div>
          </div>
          {t.meta?.topics?.length ? (
            <div className="mt-3 text-sm text-gray-600">
              Topics: {t.meta.topics.join(', ')}
            </div>
          ) : null}
          {t.date ? (
            <div className="mt-2 text-xs text-gray-500">{new Date(t.date).toLocaleDateString()}</div>
          ) : null}
        </a>
      ))}
    </div>
  )
}
