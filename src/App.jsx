function App() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#222] font-sans">
      {/* Navbar */}
      <header className="flex justify-between items-center px-12 py-6 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-purple-600">Lourds English Academy</h1>
        <nav className="flex gap-8 text-lg">
          <a href="#home" className="hover:text-purple-600">Home</a>
          <a href="#quiz" className="hover:text-purple-600">Quiz</a>
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
          Empower your <span className="text-purple-600">English journey</span><br />
          with confidence
        </h2>
        <p className="mt-6 max-w-2xl text-lg text-gray-600">
          Practice English with interactive quizzes, resources, and tools designed for teachers and learners.
        </p>
        <div className="flex gap-4 mt-10">
          <a
            href="https://lourdselt.github.io/TET-English-Quiz/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-purple-600 text-white rounded-full px-10 py-4 shadow-md hover:opacity-90 text-lg"
          >
            Start Quiz
          </a>
          <a
            href="#about"
            className="border-2 border-purple-600 text-purple-600 rounded-full px-10 py-4 hover:bg-purple-50 text-lg"
          >
            Learn More
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section id="quiz" className="px-12 py-20 grid md:grid-cols-3 gap-8">
        <div className="p-8 rounded-2xl shadow-md bg-white">
          <h3 className="text-2xl font-semibold mb-4 text-purple-600">Quizzes</h3>
          <p className="text-gray-700">Challenge yourself with daily quizzes to improve English skills.</p>
        </div>
        <div className="p-8 rounded-2xl shadow-md bg-white">
          <h3 className="text-2xl font-semibold mb-4 text-purple-600">Resources</h3>
          <p className="text-gray-700">Access free materials, question papers, and study guides (coming soon).</p>
        </div>
        <div className="p-8 rounded-2xl shadow-md bg-white">
          <h3 className="text-2xl font-semibold mb-4 text-purple-600">Community</h3>
          <p className="text-gray-700">Join fellow teachers and learners in sharing tips and experiences (future feature).</p>
        </div>
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
        <a href="mailto:lourdselt@gmail.com" className="text-purple-600 underline">xxxxxxxx@gmail.com</a>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 text-center py-8 text-gray-600 mt-12">
        © 2025 Lourds English Academy. All Rights Reserved.
      </footer>
    </div>
  )
}

export default App
