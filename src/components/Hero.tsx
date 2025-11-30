import { Download, Play } from "lucide-react";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

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
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
