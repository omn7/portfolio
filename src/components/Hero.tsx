import { Download, Play, Github, Linkedin, Mail } from "lucide-react";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

// Custom X (Twitter) icon
const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// Custom Discord icon
const DiscordIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

const Hero = () => {
  const handleResumeDownload = () => {
    window.open('https://drive.google.com/file/d/1kdkcr4ii43_6OZDs39wJLYM2whZZ49td/view?usp=drivesdk', '_blank');
  };

  const portfolioData = {
    heading: "Om Narkhede",
    description: "Class: AI Engineer | Lvl 20 Developer",
    stats: {
      Logic: 95,
      Backend: 85,
      Frontend: 90,
      "AI/ML": 80
    }
  };

  // Typing effect state
  const [typed, setTyped] = useState("");

  useEffect(() => {
    const fullText = portfolioData.heading;
    let idx = 0;
    const baseSpeed = 150; // Slower for retro feel

    const tick = () => {
      const char = fullText[idx];
      setTyped((prev) => prev + char);
      idx++;
      if (idx >= fullText.length) return;
      setTimeout(tick, baseSpeed);
    };

    const startTimer = setTimeout(tick, 500);
    return () => clearTimeout(startTimer);
  }, []);

  return (
    <section
      id="hero"
      className="pt-32 pb-20 relative overflow-hidden min-h-screen flex items-center justify-center"
    >
      {/* Parallax Background Layers */}
      <div className="absolute inset-0 z-0">
         {/* Background - Static Sky */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("/Futuristic City Parallax/background.png")' }}
        />
         {/* Sun - Static or very slow */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("/Futuristic City Parallax/sun.png")' }}
        />
         {/* City 4 (Furthest) - Slowest */}
        <div 
          className="parallax-layer"
          style={{ 
            backgroundImage: 'url("/Futuristic City Parallax/city4plan.png")',
            animationDuration: '240s'
          }}
        />
         {/* Smog 2 */}
        <div 
          className="parallax-layer opacity-60"
          style={{ 
            backgroundImage: 'url("/Futuristic City Parallax/smog2.png")',
            animationDuration: '200s'
          }}
        />
         {/* City 3 */}
        <div 
          className="parallax-layer"
          style={{ 
            backgroundImage: 'url("/Futuristic City Parallax/city3plan.png")',
            animationDuration: '160s'
          }}
        />
         {/* City 2 */}
        <div 
          className="parallax-layer"
          style={{ 
            backgroundImage: 'url("/Futuristic City Parallax/city2plan.png")',
            animationDuration: '120s'
          }}
        />
         {/* Smog 1 */}
        <div 
          className="parallax-layer opacity-60"
          style={{ 
            backgroundImage: 'url("/Futuristic City Parallax/smog1.png")',
            animationDuration: '100s'
          }}
        />
         {/* Lights - Overlay */}
        <div 
          className="parallax-layer mix-blend-screen"
          style={{ 
            backgroundImage: 'url("/Futuristic City Parallax/light.png")',
            animationDuration: '60s'
          }}
        />
         {/* City 1 (Closest) - Fastest */}
        <div 
          className="parallax-layer"
          style={{ 
            backgroundImage: 'url("/Futuristic City Parallax/city1plan.png")',
            animationDuration: '60s'
          }}
        />
        
        {/* Overlay to darken for text readability */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="container relative z-10">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          
          {/* Hero Content */}
          <div className="max-w-3xl text-center space-y-6">
            <div className="space-y-4">
              <h2 className="text-[#00ff00] font-heading text-xs sm:text-sm animate-pulse bg-black/50 inline-block px-3 py-1 rounded-full border border-[#00ff00]/30">
                SYSTEM INITIALIZED
              </h2>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-heading text-white mb-4 drop-shadow-[4px_4px_0_#000] leading-tight">
                {typed}<span className="animate-pulse">_</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-200 font-sans tracking-wider bg-black/30 inline-block px-4 py-2 rounded-lg backdrop-blur-sm">
                {portfolioData.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button 
                onClick={handleResumeDownload}
                className="bg-[#ff00ff] hover:bg-[#d100d1] text-white font-heading text-xs sm:text-sm py-6 px-8 border-b-4 border-[#800080] active:border-b-0 active:translate-y-1 rounded-none shadow-[0_0_15px_rgba(255,0,255,0.3)] hover:shadow-[0_0_25px_rgba(255,0,255,0.5)] transition-all"
              >
                <Download className="mr-2 h-4 w-4" />
                DOWNLOAD DATA
              </Button>
              <Button 
                variant="outline"
                className="bg-black/50 text-[#00ffff] border-2 border-[#00ffff] hover:bg-[#00ffff] hover:text-black font-heading text-xs sm:text-sm py-6 px-8 rounded-none backdrop-blur-sm shadow-[0_0_15px_rgba(0,255,255,0.3)] hover:shadow-[0_0_25px_rgba(0,255,255,0.5)] transition-all"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Play className="mr-2 h-4 w-4" />
                START GAME
              </Button>
            </div>

            {/* Social Media Hotbar (compact) */}
            <div className="inline-flex items-center gap-3 p-0">
              <a
                href="https://x.com/mr_codex"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 w-7 h-7 flex items-center justify-center transition-all duration-300 ease-out hover:text-cyan-400 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                title="X (Twitter)"
              >
                <XIcon className="w-6 h-6" />
              </a>
              <a
                href="https://linkedin.com/in/omnarkhede"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 w-7 h-7 flex items-center justify-center transition-all duration-300 ease-out hover:text-cyan-400 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                title="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="https://github.com/omn7"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 w-7 h-7 flex items-center justify-center transition-all duration-300 ease-out hover:text-cyan-400 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                title="GitHub"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://discord.com/users/ox717"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 w-7 h-7 flex items-center justify-center transition-all duration-300 ease-out hover:text-cyan-400 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                title="Discord: ox717"
              >
                <DiscordIcon className="w-6 h-6" />
              </a>
              <a
                href="mailto:dev.om@outlook.com"
                className="text-gray-300 w-7 h-7 flex items-center justify-center transition-all duration-300 ease-out hover:text-cyan-400 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                title="Email"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
