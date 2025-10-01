import tests from './data/tests.json'
import TestList from './components/TestList.jsx'

function App() {
  // Sort by numeric test number ascending: Test 01, Test 02, ...
  const toNum = (t) => {
    const m = String(t.id || '').match(/(\d+)/)
    return m ? parseInt(m[1], 10) : Number.MAX_SAFE_INTEGER
  }
  const testsSorted = [...tests].sort((a, b) => toNum(a) - toNum(b))
  const topTwo = testsSorted.slice(0, 2)
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#222] font-sans">
      {/* Navbar */}
      <header className="flex justify-between items-center px-12 py-6 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-purple-600">Lourds English Academy</h1>
        <nav className="flex gap-8 text-lg">
          <a href="#home" className="hover:text-purple-600">Home</a>
          <a href="#tet-tests" className="hover:text-purple-600">TET Tests</a>
          <a href="#about" className="hover:text-purple-600">About</a>
          <a href="#contact" className="hover:text-purple-600">Contact</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="relative flex flex-col items-center justify-center text-center px-6 py-28 bg-gradient-to-r from-purple-100 via-white to-purple-50"
      >
        <h2 className="text-6xl font-bold max-w-4xl leading-snug text-gray-900">
          Empower your <span className="text-purple-600">English Journey</span><br />
          with confidence
        </h2>
  <p className="mt-6 max-w-2xl text-lg text-gray-600">Take free TET Practice Test</p>
        <div className="flex flex-wrap gap-4 mt-10 justify-center">
          {topTwo.map((t) => (
            <a
              key={t.id}
              href={t.href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-600 text-white rounded-full px-8 py-4 shadow-md hover:opacity-90 text-lg"
            >
              {t.label}
            </a>
          ))}
          <a
            href="#tet-tests"
            className="border-2 border-purple-600 text-purple-600 rounded-full px-8 py-4 hover:bg-purple-50 text-lg"
          >
            View All Tests
          </a>
        </div>
      </section>

      {/* TET Tests Section */}
      <section id="tet-tests" className="px-12 py-20">
        <h3 className="text-3xl font-semibold mb-6 text-purple-600">TET Practice Tests</h3>
        <p className="text-gray-700 mb-8">Take a Free Practice Test.</p>
        <TestList tests={testsSorted} />
      </section>

      {/* About Section */}
      <section id="about" className="px-12 py-20 text-center bg-purple-50 rounded-2xl mx-12">
        <h3 className="text-3xl font-semibold mb-6 text-purple-600">About</h3>
        <p className="text-gray-700 max-w-3xl mx-auto">
          Lourds English Academy is created to support English teachers and learners.
          Starting with free quizzes, the site will grow to include resources, games,
          video lessons, and interactive materials for effective learning.
        </p>
      </section>

      {/* Contact Section */}
      <section id="contact" className="px-12 py-20 text-center">
        <h3 className="text-3xl font-semibold mb-6 text-purple-600">Contact</h3>
        <p className="text-gray-700 mb-4">Have questions or suggestions? Reach us at:</p>
        <a href="mailto:doss.elt@gmail.com" className="text-purple-600 underline">doss.elt@gmail.com</a>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 text-center py-8 text-gray-600 mt-12">
        © 2025 Lourds English Academy. All Rights Reserved.
      </footer>
    </div>
  )
}

export default App
