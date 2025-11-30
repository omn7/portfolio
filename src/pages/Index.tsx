import Hero from "@/components/Hero";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ResumeSection from "@/components/sections/ResumeSection";
import Footer from "@/components/Footer";
import { useCallback, useEffect, useRef, useState } from "react";
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
  const [coinMuted, setCoinMuted] = useState<boolean>(() => {
    try { return localStorage.getItem('guideMuted') === '1'; } catch { return false; }
  });
  const navigate = useNavigate();
  const coinAudioRef = useRef<HTMLAudioElement | null>(null);
  const coinSoundGate = useRef(false);

  const handleExploreHackathons = () => {
    navigate('/hackathons');
  };

  const tinyStars = [
    { top: '4%', left: '6%', size: 3, delay: 0 },
    { top: '7%', left: '18%', size: 2, delay: 0.8 },
    { top: '3%', left: '26%', size: 2.5, delay: 1.2 },
    { top: '9%', left: '32%', size: 2, delay: 0.4 },
    { top: '5%', left: '45%', size: 3.5, delay: 1.5 },
    { top: '2%', left: '52%', size: 2, delay: 0.2 },
    { top: '6%', left: '60%', size: 2.5, delay: 1 },
    { top: '3%', left: '68%', size: 2, delay: 0.6 },
    { top: '8%', left: '75%', size: 3, delay: 1.8 },
    { top: '4%', left: '84%', size: 2.2, delay: 1.1 },
    { top: '9%', left: '12%', size: 2, delay: 0.5 },
    { top: '2%', left: '38%', size: 2.3, delay: 1.4 },
    { top: '7%', left: '57%', size: 2, delay: 0.9 },
    { top: '3%', left: '90%', size: 3, delay: 1.7 },
    { top: '6%', left: '15%', size: 2.4, delay: 1.3 },
  ];

  const coinBounces = [
    { offset: 0, xShift: -24 },
    { offset: 0.02, xShift: 0 },
    { offset: 0.04, xShift: 24 }
  ];

  useEffect(() => {
    const baseAudio = new Audio('/guide/mario_coin_sound.mp3');
    baseAudio.preload = 'auto';
    baseAudio.volume = 0.6;
    coinAudioRef.current = baseAudio;
    return () => {
      coinAudioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as boolean | undefined;
      if (typeof detail === 'boolean') {
        setCoinMuted(detail);
      }
    };
    window.addEventListener('guide:mute', handler);
    return () => window.removeEventListener('guide:mute', handler);
  }, []);

  const playCoinSound = useCallback(() => {
    if (!coinAudioRef.current || coinMuted) return;
    const clone = coinAudioRef.current.cloneNode(true) as HTMLAudioElement;
    clone.volume = coinAudioRef.current.volume;
    clone.play().catch(() => {});
  }, [coinMuted]);

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

            {/* Tiny Stars */}
            <div className="absolute inset-0 z-0">
              {tinyStars.map((star, index) => (
                <motion.span
                  key={`tiny-star-${index}`}
                  className="absolute rounded-full bg-white"
                  style={{
                    top: star.top,
                    left: star.left,
                    width: star.size,
                    height: star.size,
                    boxShadow: '0 0 6px rgba(255,255,255,0.7)'
                  }}
                  animate={{ opacity: [0.3, 0.9, 0.3] }}
                  transition={{ duration: 2 + star.size * 0.2, repeat: Infinity, delay: star.delay }}
                />
              ))}
            </div>

            {/* Moving Skyline Layer */}
            <motion.div 
              className="absolute bottom-16 left-0 w-[250%] h-44"
              style={{
                backgroundImage: "url('/guide/building.png')",
                backgroundRepeat: "repeat-x",
                backgroundSize: "contain",
                backgroundPosition: "bottom",
                filter: "brightness(0.8) blur(0.35px)"
              }}
              animate={{ x: ["0%", "-30%"] }}
              transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
            />
            <div className="absolute bottom-16 left-0 w-full h-44 pointer-events-none" style={{
              background: "linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.15) 45%, transparent 100%)"
            }} />

            {/* Foreground Cloud Layer removed per request */}
        </div>

        {/* The Button (Target) */}
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-30">
          {coinBounces.map((coin, idx) => (
            <motion.div
              key={`coin-${idx}`}
              className="absolute -top-12 left-1/2 -translate-x-1/2"
              style={{ marginLeft: `${coin.xShift}px` }}
              animate={{ y: [0, 0, -60, -75, -60, 0], opacity: [0, 0, 1, 1, 0, 0] }}
              transition={{
                duration: 7,
                times: [0, 0.44 + coin.offset, 0.5 + coin.offset, 0.54 + coin.offset, 0.58 + coin.offset, 1],
                repeat: Infinity,
                ease: "linear"
              }}
              onUpdate={(latest) => {
                if (idx !== 1) return;
                const rawY = latest.y;
                const yPos = typeof rawY === 'number'
                  ? rawY
                  : typeof rawY === 'string'
                    ? parseFloat(rawY)
                    : NaN;
                if (Number.isNaN(yPos)) return;
                if (yPos <= -30 && !coinSoundGate.current) {
                  coinSoundGate.current = true;
                  playCoinSound();
                } else if (yPos >= -2 && coinSoundGate.current) {
                  coinSoundGate.current = false;
                }
              }}
            >
              <div className="w-8 h-8 rounded-full border-2 border-yellow-400 bg-gradient-to-b from-yellow-200 to-yellow-600 shadow-[0_0_12px_rgba(255,255,0,0.6)]" />
            </motion.div>
          ))}
          <motion.div
            animate={{ y: [0, 0, -15, 0, 0] }}
            transition={{ 
              duration: 7, 
              times: [0, 0.48, 0.5, 0.52, 1],
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <InteractiveHoverButton
              text="HACKATHON LOGS"
              onClick={handleExploreHackathons}
              className="font-heading text-sm text-white rounded-[6px] min-w-[360px] px-12 py-1 border-4 border-[#6b5b8d] shadow-[0_12px_0_#110920] tracking-[0.35em]"
              style={{
                backgroundImage: `
                  linear-gradient(#4b3c5f 0, #4b3c5f 40%, #3a2a4d 40%, #3a2a4d 70%, #2b1c3a 70%, #2b1c3a 100%),
                  repeating-linear-gradient(90deg, rgba(0,0,0,0.25) 0, rgba(0,0,0,0.25) 6px, transparent 6px, transparent 20px)
                `,
                boxShadow: '0 0 18px rgba(137,104,255,0.6)',
                textShadow: '0 0 6px rgba(0,0,0,0.8)'
              }}
            />
          </motion.div>
        </div>

        {/* Mario (The Player) */}
        <div className="absolute bottom-0 left-0 z-30 pointer-events-none">
           <motion.div
          className="w-42 h-48 md:w-52 md:h-45"
            animate={{ 
              // Start farther left, hit center at 50vw, then exit right
              x: ["-25vw", "45vw", "50vw", "55vw", "125vw"], 
              // Jump arc: peak at the button timing
              y: [0, 0, -90, 0, 0] 
            }}
            transition={{ 
              duration: 7,
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
        <div className="absolute bottom-0 w-full h-20 z-20">
          <div
            className="relative w-full h-full bg-[#795548] border-t-4 border-[#3c2211]"
            style={{
              backgroundImage: `
                linear-gradient(135deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 40%),
                repeating-linear-gradient(0deg, rgba(0,0,0,0.08) 0px, rgba(0,0,0,0.08) 4px, transparent 4px, transparent 8px),
                repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 6px, transparent 6px, transparent 18px)
              `
            }}
          >
            <div className="absolute top-0 left-0 w-full h-4 bg-[#5CB338] border-b-4 border-[#2f180a]" style={{ boxShadow: "0 5px 0 #3c2211" }} />
            <div
              className="absolute top-2 left-0 w-full h-4"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #3e7519 0px, #3e7519 10px, transparent 10px, transparent 22px), linear-gradient(90deg, transparent 0px, transparent 8px, #4fa627 8px, #4fa627 16px)",
                backgroundSize: "24px 100%, 32px 100%",
                opacity: 0.9
              }}
            />
            <div
              className="absolute top-6 left-0 w-full h-2"
              style={{
                backgroundImage: "linear-gradient(90deg, #5CB338 0px, #5CB338 14px, transparent 14px, transparent 28px)",
                backgroundSize: "28px 100%",
                opacity: 0.7
              }}
            />
          </div>
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
