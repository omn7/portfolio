import { Github, Mail, ExternalLink, Twitter, Sun, Moon, Download } from "lucide-react";
import { useState, useEffect } from "react";

const Professional = () => {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('prof-theme');
      return saved ? saved === 'dark' : true;
    }
    return true;
  });

  useEffect(() => {
    localStorage.setItem('prof-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const theme = {
    bg: darkMode ? 'bg-[#0a0a0a]' : 'bg-[#fafafa]',
    sidebar: darkMode ? 'bg-[#0a0a0a] border-gray-800' : 'bg-[#fafafa] border-gray-200',
    text: darkMode ? 'text-gray-300' : 'text-gray-600',
    textMuted: darkMode ? 'text-gray-500' : 'text-gray-400',
    textHeading: darkMode ? 'text-white' : 'text-gray-900',
    border: darkMode ? 'border-gray-800' : 'border-gray-200',
    card: darkMode ? 'bg-gray-900/50 border-gray-800 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-gray-300 shadow-sm',
    tag: darkMode ? 'bg-gray-800/50 text-gray-400 border-gray-700' : 'bg-gray-100 text-gray-600 border-gray-200',
    expTag: {
      freelance: darkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600',
      project: darkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600',
      learning: darkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600',
    },
    link: darkMode ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-gray-900',
    expBorder: darkMode ? 'border-gray-700' : 'border-gray-300',
  };

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} transition-colors duration-300`} style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        
        .heading-font {
          font-family: 'Space Grotesk', sans-serif;
        }
      `}</style>

      {/* Fixed Sidebar */}
      <aside className={`fixed left-0 top-0 h-full w-64 ${theme.sidebar} border-r p-8 hidden lg:flex flex-col justify-between transition-colors duration-300`}>
        <div>
          {/* Profile */}
          <div className="mb-10">
            <img 
              src="/logo.jpg" 
              alt="Om Narkhede" 
              className="w-16 h-16 rounded-full object-cover mb-4"
            />
            <h1 className={`${theme.textHeading} font-semibold text-2xl heading-font`}>Om Narkhede</h1>
            <p className={`${theme.textMuted} text-sm`}>Full Stack Developer</p>
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            <a href="#about" className={`block py-2 text-sm ${theme.link} transition-colors`}>About</a>
            <a href="#experience" className={`block py-2 text-sm ${theme.link} transition-colors`}>Experience</a>
            <a href="#projects" className={`block py-2 text-sm ${theme.link} transition-colors`}>Projects</a>
            <a href="#skills" className={`block py-2 text-sm ${theme.link} transition-colors`}>Skills</a>
            <a href="https://drive.google.com/file/d/1kdkcr4ii43_6OZDs39wJLYM2whZZ49td/view" target="_blank" rel="noopener noreferrer" className={`block py-2 text-sm ${theme.link} transition-colors flex items-center gap-2`}>
              <Download className="w-4 h-4" /> Resume
            </a>
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="space-y-4">
          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`flex items-center gap-2 text-sm ${theme.link} transition-colors`}
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>

          {/* Social Links */}
          <div className="flex gap-4">
            <a href="https://github.com/omn7" target="_blank" rel="noopener noreferrer" className={`${theme.link} transition-colors`}>
              <Github className="w-5 h-5" />
            </a>
            <a href="https://twitter.com/omarkhede" target="_blank" rel="noopener noreferrer" className={`${theme.link} transition-colors`}>
              <Twitter className="w-5 h-5" />
            </a>
            <a href="mailto:contact@omnarkhede.tech" className={`${theme.link} transition-colors`}>
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className={`lg:hidden fixed top-0 left-0 right-0 ${theme.bg}/95 backdrop-blur-sm border-b ${theme.border} p-4 z-50 transition-colors duration-300`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/logo.jpg" 
              alt="Om Narkhede" 
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className={`${theme.textHeading} font-semibold text-lg heading-font`}>Om Narkhede</span>
          </div>
          <div className="flex gap-3 items-center">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`${theme.link} transition-colors p-1`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <a href="https://github.com/omn7" target="_blank" rel="noopener noreferrer" className={theme.link}>
              <Github className="w-5 h-5" />
            </a>
            <a href="mailto:contact@omnarkhede.tech" className={theme.link}>
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="lg:ml-64 px-6 lg:px-16 py-20 lg:py-16 max-w-3xl">
        
        {/* About Section */}
        <section id="about" className="mb-20">
          <h2 className={`${theme.textMuted} text-sm mb-6 heading-font tracking-wide`}>## About Me</h2>
          <p className={`${theme.text} leading-relaxed mb-6`}>
            I am a Full Stack Developer passionate about building web applications and exploring AI-powered solutions.
          </p>
          <p className={`${theme.text} leading-relaxed mb-6`}>
            Mainly work in React, TypeScript, Node.js and love creating innovative digital experiences.
          </p>
          <div className="flex flex-wrap gap-2">
            {["react", "typescript", "node.js", "ai/ml", "web dev"].map((tag) => (
              <span key={tag} className={`px-3 py-1 ${theme.tag} text-xs rounded-full border transition-colors`}>
                {tag}
              </span>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="mb-20">
          <h2 className={`${theme.textMuted} text-sm mb-6 heading-font tracking-wide`}>## Experience</h2>
          <div className="space-y-6">
            <div className={`border-l-2 ${theme.expBorder} pl-4`}>
              <div className="flex items-center gap-2 text-xs mb-1">
                <span className={`px-2 py-0.5 ${theme.expTag.freelance} rounded`}>freelance</span>
                <span className={theme.textMuted}>2024 - present</span>
              </div>
              <h3 className={`${theme.textHeading} font-medium heading-font`}>Full Stack Developer</h3>
              <p className={`${theme.textMuted} text-sm`}>Building web applications for clients</p>
            </div>
            <div className={`border-l-2 ${theme.expBorder} pl-4`}>
              <div className="flex items-center gap-2 text-xs mb-1">
                <span className={`px-2 py-0.5 ${theme.expTag.project} rounded`}>project</span>
                <span className={theme.textMuted}>2024</span>
              </div>
              <h3 className={`${theme.textHeading} font-medium heading-font`}>UpliftX - Event Management</h3>
              <p className={`${theme.textMuted} text-sm`}>Freelance project for event platform</p>
            </div>
            <div className={`border-l-2 ${theme.expBorder} pl-4`}>
              <div className="flex items-center gap-2 text-xs mb-1">
                <span className={`px-2 py-0.5 ${theme.expTag.learning} rounded`}>learning</span>
                <span className={theme.textMuted}>ongoing</span>
              </div>
              <h3 className={`${theme.textHeading} font-medium heading-font`}>Computer Science Student</h3>
              <p className={`${theme.textMuted} text-sm`}>BVCOEL</p>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-20">
          <h2 className={`${theme.textMuted} text-sm mb-6 heading-font tracking-wide`}>## Projects</h2>
          <div className="space-y-4">
            <a 
              href="https://deburger.omnarkhede.tech/" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`block p-4 ${theme.card} border rounded-lg transition-all group`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className={`${theme.textHeading} font-medium text-lg heading-font group-hover:text-blue-500 transition-colors`}>Deburger</h3>
                  <p className={`${theme.textMuted} text-sm mt-1`}>AI-powered debugging assistant using OpenAI & Gemini</p>
                </div>
                <ExternalLink className={`w-4 h-4 ${theme.textMuted} group-hover:${theme.textHeading} transition-colors`} />
              </div>
              <div className="flex gap-2 mt-3">
                {["react", "typescript", "openai"].map((t) => (
                  <span key={t} className={`text-xs ${theme.textMuted}`}>{t}</span>
                ))}
              </div>
            </a>

            <a 
              href="https://upliftx.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`block p-4 ${theme.card} border rounded-lg transition-all group`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className={`${theme.textHeading} font-medium text-lg heading-font group-hover:text-blue-500 transition-colors`}>UpliftX</h3>
                  <p className={`${theme.textMuted} text-sm mt-1`}>Event management platform - Freelance project</p>
                </div>
                <ExternalLink className={`w-4 h-4 ${theme.textMuted} group-hover:${theme.textHeading} transition-colors`} />
              </div>
              <div className="flex gap-2 mt-3">
                {["react", "node.js", "supabase"].map((t) => (
                  <span key={t} className={`text-xs ${theme.textMuted}`}>{t}</span>
                ))}
              </div>
            </a>

            <a 
              href="https://doubtbot.netlify.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`block p-4 ${theme.card} border rounded-lg transition-all group`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className={`${theme.textHeading} font-medium text-lg heading-font group-hover:text-blue-500 transition-colors`}>DoubtBot AI</h3>
                  <p className={`${theme.textMuted} text-sm mt-1`}>Intelligent chatbot powered by Gemini AI</p>
                </div>
                <ExternalLink className={`w-4 h-4 ${theme.textMuted} group-hover:${theme.textHeading} transition-colors`} />
              </div>
              <div className="flex gap-2 mt-3">
                {["typescript", "gemini api", "express"].map((t) => (
                  <span key={t} className={`text-xs ${theme.textMuted}`}>{t}</span>
                ))}
              </div>
            </a>

            <a 
              href="https://findmycrypto.netlify.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`block p-4 ${theme.card} border rounded-lg transition-all group`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className={`${theme.textHeading} font-medium text-lg heading-font group-hover:text-blue-500 transition-colors`}>Crypto Tracker</h3>
                  <p className={`${theme.textMuted} text-sm mt-1`}>Real-time cryptocurrency price tracker</p>
                </div>
                <ExternalLink className={`w-4 h-4 ${theme.textMuted} group-hover:${theme.textHeading} transition-colors`} />
              </div>
              <div className="flex gap-2 mt-3">
                {["react", "coingecko api", "chart.js"].map((t) => (
                  <span key={t} className={`text-xs ${theme.textMuted}`}>{t}</span>
                ))}
              </div>
            </a>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="mb-20">
          <h2 className={`${theme.textHeading} text-sm mb-6 heading-font tracking-wide`}>## Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <h3 className={`${theme.textMuted} text-xs uppercase tracking-wider mb-3`}>frontend</h3>
              <ul className={`space-y-1 text-sm ${theme.textMuted}`}>
                <li>react</li>
                <li>typescript</li>
                <li>next.js</li>
                <li>tailwind css</li>
              </ul>
            </div>
            <div>
              <h3 className={`${theme.textMuted} text-xs uppercase tracking-wider mb-3`}>backend</h3>
              <ul className={`space-y-1 text-sm ${theme.textMuted}`}>
                <li>node.js</li>
                <li>express</li>
                <li>postgresql</li>
                <li>mongodb</li>
              </ul>
            </div>
            <div>
              <h3 className={`${theme.textMuted} text-xs uppercase tracking-wider mb-3`}>tools</h3>
              <ul className={`space-y-1 text-sm ${theme.textMuted}`}>
                <li>git</li>
                <li>docker</li>
                <li>aws</li>
                <li>linux</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Back Link */}
        <div className={`pt-10 border-t ${theme.border}`}>
          <a 
            href="/" 
            className={`text-sm ${theme.link} transition-colors`}
          >
            ← Back to Retro Version
          </a>
        </div>

        {/* Footer */}
        <footer className={`mt-16 text-center ${theme.textMuted} text-xs`}>
          © 2025 Om Narkhede
        </footer>
      </main>
    </div>
  );
};

export default Professional;
