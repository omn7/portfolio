import Hero from "@/components/Hero";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ResumeSection from "@/components/sections/ResumeSection";
import Footer from "@/components/Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { motion } from "framer-motion";
import { RetroCard } from "@/components/ui/retro-card";
import Typewriter from 'typewriter-effect';
import PixelShooterGame from "@/components/PixelShooterGame";
import MarioVideo from "@/components/MarioVideo";
import ScrollGuide from "@/components/ScrollGuide";

const aboutText = `I'm Om, a second-year Computer Engineering student with a strong passion for technology and innovation. Currently diving deep into areas like Generative AI, neural networks, transformers, and software development, I enjoy building practical projects that solve real-world problems. From experimenting with tools like Hugging Face and LangChain to creating web applications, I'm always eager to learn and apply new concepts in AI and coding.`;

const Index = () => {
  const [showFullAbout, setShowFullAbout] = useState(false);
  const navigate = useNavigate();

  const handleExploreHackathons = () => {
    navigate('/hackathons');
  };

  return (
    <div className="bg-retro-bg min-h-screen font-sans text-white selection:bg-retro-green selection:text-black">
      <div id="hero" data-guide-key="hero">
        <Hero />
      </div>
      
      {/* Player Bio Section */}
      <section id="about" data-guide-key="about" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - Retro Window Interface */}
            <div className="relative group transform hover:-translate-y-2 transition-transform duration-300 max-w-sm mx-auto lg:mx-0">
              {/* Window Header */}
              <div className="bg-[#1a1a1a] rounded-t-lg p-3 flex items-center justify-between border-4 border-b-0 border-[#00ffff]/30">
                <div className="ml-2 text-xs font-mono text-[#00ffff]/70">user_profile.exe</div>
                <div className="flex gap-2 mr-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
              </div>
              
              {/* Window Content */}
              <PixelShooterGame />
              
              {/* Decorative Elements behind */}
              <div className="absolute -z-10 top-4 -right-4 w-full h-full border-4 border-[#ff00ff]/20 rounded-lg" />
            </div>

            {/* Right Side - Text Content */}
            <div className="space-y-8 text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl font-heading text-white leading-tight drop-shadow-[0_0_10px_rgba(0,255,255,0.3)]">
                PLAYER <span className="text-[#00ffff]">BIO</span>
              </h2>
              
              <div className="font-sans text-lg text-gray-300 leading-relaxed space-y-6 min-h-[150px]">
                <div className={showFullAbout ? '' : 'line-clamp-4'}>
                  {showFullAbout ? (
                    <p>{aboutText}</p>
                  ) : (
                    <Typewriter
                      onInit={(typewriter) => {
                        typewriter.typeString(aboutText)
                          .start();
                      }}
                      options={{
                        delay: 30,
                        cursor: '█',
                        autoStart: true,
                      }}
                    />
                  )}
                </div>
                
                <div className="pt-2">
                  <button
                    onClick={() => setShowFullAbout(!showFullAbout)}
                    className="px-6 py-3 font-heading text-xs border-2 border-white bg-cyan-500 text-black shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all"
                  >
                    {showFullAbout ? 'COLLAPSE LOG' : 'READ FULL LOG'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hackathons / Side Quests */}
      <section id="hackathons" data-guide-key="hackathons" className="relative h-80 bg-black border-y-4 border-[#ff00ff] overflow-hidden font-sans">
        
        {/* Static Text (Title) */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none text-center">
            <h2 className="text-xl md:text-2xl font-heading text-white drop-shadow-[0_0_10px_rgba(255,0,255,0.5)]">
                SIDE QUESTS
            </h2>
            <p className="text-xs md:text-sm font-mono text-[#ff00ff] tracking-widest">(HACKATHONS)</p>
        </div>

        {/* Mario World Scenery */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Moving Clouds */}
            <motion.div 
                className="absolute top-10 left-0 w-full h-full opacity-30"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
            >
                <div className="absolute top-4 left-1/4 text-white/20 text-6xl">☁️</div>
                <div className="absolute top-12 left-3/4 text-white/20 text-4xl">☁️</div>
            </motion.div>

            {/* Moving Hills/Bushes Layer */}
            <motion.div 
                className="absolute bottom-16 left-0 w-[200%] h-32 flex items-end gap-32 opacity-60"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            >
                 <div className="w-32 h-16 bg-[#009900] rounded-t-full border-4 border-black relative">
                    <div className="absolute bottom-0 w-full h-2 bg-black/20" />
                 </div>
                 <div className="w-24 h-12 bg-[#00cc00] rounded-t-xl border-4 border-black relative flex items-end justify-center">
                    <div className="w-full h-2 bg-black/20 absolute bottom-2" />
                 </div>
                 <div className="w-48 h-24 bg-[#008800] rounded-t-full border-4 border-black relative">
                    <div className="absolute bottom-0 w-full h-2 bg-black/20" />
                 </div>
                 <div className="w-32 h-16 bg-[#009900] rounded-t-full border-4 border-black relative">
                    <div className="absolute bottom-0 w-full h-2 bg-black/20" />
                 </div>
                 <div className="w-24 h-12 bg-[#00cc00] rounded-t-xl border-4 border-black relative flex items-end justify-center">
                    <div className="w-full h-2 bg-black/20 absolute bottom-2" />
                 </div>
            </motion.div>
        </div>

        {/* The Button (Target) */}
        <div className="absolute top-28 left-1/2 -translate-x-1/2 z-30">
          <motion.div
            animate={{ y: [0, 0, -15, 0, 0] }}
            transition={{ 
              duration: 5, 
              times: [0, 0.48, 0.5, 0.52, 1],
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <InteractiveHoverButton
              text="VIEW HACKATHON LOGS"
              onClick={handleExploreHackathons}
              className="font-heading text-sm bg-[#ff00ff] border-2 border-white text-white hover:bg-white hover:text-[#ff00ff] rounded-none min-w-[280px] px-8 py-1.5 shadow-[0_0_10px_#ff00ff]"
            />
          </motion.div>
        </div>

        {/* Mario (The Player) */}
        <div className="absolute bottom-16 left-0 z-30 pointer-events-none">
           <motion.div
            className="w-24 h-20 md:w-32 md:h-24"
            animate={{ 
              // Start farther left, hit center at 50vw, then exit right
              x: ["-25vw", "45vw", "50vw", "55vw", "125vw"], 
              // Jump arc: peak at the button timing
              y: [0, 0, -145, 0, 0] 
            }}
            transition={{ 
              duration: 5,
              repeat: Infinity,
              ease: "linear",
              // Synchronized times so 50vw occurs exactly at 0.5
              times: [0, 0.45, 0.5, 0.55, 1]
            }}
           >
            <MarioVideo />
           </motion.div>
        </div>

        {/* Ground (The Land) */}
        <div className="absolute bottom-0 w-full h-16 bg-[#c84c0c] border-t-4 border-[#00aa00] z-20">
            <div 
                className="w-full h-full opacity-30" 
                style={{ 
                    backgroundImage: `
                        repeating-linear-gradient(90deg, transparent 0, transparent 30px, rgba(0,0,0,0.4) 30px, rgba(0,0,0,0.4) 34px),
                        repeating-linear-gradient(0deg, transparent 0, transparent 10px, rgba(0,0,0,0.4) 10px, rgba(0,0,0,0.4) 14px)
                    ` 
                }} 
            />
            <div className="absolute top-0 w-full h-2 bg-[#00cc00]/50" />
        </div>
      </section>

      <section id="projects" data-guide-key="projects">
        <ProjectsSection />
      </section>
      <section id="skills" data-guide-key="skills">
        <SkillsSection />
      </section>
      <section id="resume" data-guide-key="resume">
        <ResumeSection />
      </section>
      <div id="footer" data-guide-key="footer">
        <Footer />
      </div>

      <ScrollGuide />
    </div>
  );
};

export default Index;
