import { useState } from 'react'
import LandingPage from './pages/LandingPage'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const showPage = (pageId) => {
    setCurrentPage(pageId)
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* HOME PAGE */}
      {currentPage === 'home' && <LandingPage />}

      {/* TEMPLATES PAGE */}
      {currentPage === 'templates' && (
        <div className="min-h-screen px-8 py-16 animate-fade-in">
          <section className="max-w-[1400px] mx-auto">
            <div className="text-center">
              <h1 className="text-5xl font-extrabold mb-8 text-white">Resume Templates</h1>
              <p className="text-gray-400">Templates page coming soon...</p>
            </div>
          </section>
        </div>
      )}

      {/* ABOUT PAGE */}
      {currentPage === 'about' && (
        <div className="min-h-screen px-8 py-16 animate-fade-in">
          <section className="max-w-6xl mx-auto">
            <div className="text-center">
              <div className="mb-16">
                <h1 className="text-5xl font-extrabold mb-4 text-white">About UptoSkills</h1>
                <p className="text-xl text-gray-400">
                  UptoSkills helps professionals build resumes that recruiters love using AI-driven optimization.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-12 transition-all duration-300 hover:bg-white/[0.08] hover:border-[#00d9ff] hover:-translate-y-1">
                  <h3 className="text-3xl font-bold mb-4 text-white flex items-center justify-center gap-4">
                    <i className="fas fa-bullseye text-[#00d9ff]"></i>
                    Our Mission
                  </h3>
                  <p className="text-lg text-gray-400 leading-relaxed">
                    Empower job seekers with intelligent resume tools.
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-12 transition-all duration-300 hover:bg-white/[0.08] hover:border-[#00d9ff] hover:-translate-y-1">
                  <h3 className="text-3xl font-bold mb-4 text-white flex items-center justify-center gap-4">
                    <i className="fas fa-sparkles text-[#00d9ff]"></i>
                    Our Vision
                  </h3>
                  <p className="text-lg text-gray-400 leading-relaxed">
                    Make career growth accessible to everyone.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}

export default App