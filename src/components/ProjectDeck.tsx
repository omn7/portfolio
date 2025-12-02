import { useMemo, useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion, PanInfo } from "framer-motion";
import { Github, ExternalLink, Star, ChevronLeft, ChevronRight } from "lucide-react";

export type Project = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  stars: number;
  xp: number;
  image: string;
  githubUrl: string;
  liveUrl: string;
  status?: string;
};

const initialProjects: Project[] = [
  {
    id: "boop",
    title: "Boop",
    description: "Boop is a modern social media platform for pets and their humans. It lets users share adorable moments, connect with furry friends, and join a vibrant community of pet lovers. With fun features and an engaging environment, Boop brings together people and their pets to celebrate companionship, creativity, and everyday joy.",
    technologies: ["MongoDB Atlas", "AWS S3", "React.js", "Node.js", "Express.js", "Tailwind CSS", "JavaScript"],
    githubUrl: "https://github.com/omn7/Boop",
    liveUrl: "https://boopsocial.vercel.app",
    stars: 4,
    xp: 1080,
    status: "WORKING",
    image: "/p5.png"
  },
  {
    id: "deburger",
    title: "DeBurger",
    description: "AI-powered debugging assistant. Fix code issues instantly.",
    technologies: ["React", "TypeScript", "OpenAI", "Gemini", "Tailwind"],
    githubUrl: "https://github.com/omn7",
    liveUrl: "https://deburger.omnarkhede.tech/",
    stars: 5,
    xp: 1000,
    image: "/debugger.png"
  },
  {
    id: "upliftx",
    title: "UpLiftx",
    description: "Event Management Platform. Freelance Mission.",
    technologies: ["React", "Node.js", "SupaBase", "Clerk API", "Tailwind"],
    githubUrl: "https://github.com/omn7",
    liveUrl: "https://upliftx.vercel.app/",
    stars: 1,
    xp: 500,
    image: "/image.png"
  },
  {
    id: "doubtbot",
    title: "Doubtbot AI",
    description: "Chatbot powered by Gemini AI. Knowledge Base.",
    technologies: ["TypeScript", "React", "Gemini API", "Express"],
    githubUrl: "https://github.com/omn7/chat-ai",
    liveUrl: "https://doubtbot.netlify.app/",
    stars: 2,
    xp: 350,
    image: "/p1.png"
  },
  {
    id: "crypto",
    title: "Crypto Tracker",
    description: "Real-time cryptocurrency price tracker.",
    technologies: ["React.js", "JS", "CoinGecko API", "Chart.js"],
    githubUrl: "https://github.com/omn7/Crypto-Price-Tracking-App-",
    liveUrl: "https://findmycrypto.netlify.app/",
    stars: 3,
    xp: 300,
    image: "/p4.png"
  },
  {
    id: "quiz",
    title: "College Quiz",
    description: "BVCOEL QUIZ CHAMPIONSHIP Website.",
    technologies: ["TypeScript", "Tailwind", "React"],
    githubUrl: "https://github.com/omn7",
    liveUrl: "https://quizzers-bvcoel.vercel.app/",
    stars: 2,
    xp: 250,
    image: "/p3.png"
  }
];

const randomTilt = () => Number((Math.random() * 10 - 5).toFixed(2));
const SWIPE_THRESHOLD = 100;

interface ProjectDeckProps {
  onProjectChange?: (project: Project) => void;
}

const ProjectDeck = ({ onProjectChange }: ProjectDeckProps) => {
  const [deck, setDeck] = useState(() =>
    initialProjects.map((project) => ({ ...project, rotation: randomTilt() }))
  );

  useEffect(() => {
    if (onProjectChange && deck.length > 0) {
      onProjectChange(deck[0]);
    }
  }, [deck, onProjectChange]);

  const nextCard = useCallback(() => {
    setDeck((prev) => {
      const [first, ...rest] = prev;
      return [...rest, { ...first, rotation: randomTilt() }];
    });
  }, []);

  const handleDragEnd = useCallback((_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (Math.abs(info.offset.x) < SWIPE_THRESHOLD) return;
    nextCard();
  }, [nextCard]);

  const shadow = useMemo(() => {
    const rotation = deck[0]?.rotation ?? 0;
    const intensity = Math.abs(rotation) / 60;
    return `0 ${intensity * 18}px ${18 + intensity * 10}px rgba(0,0,0,0.35)`;
  }, [deck]);

  return (
    <div className="relative flex flex-col items-center gap-6 select-none w-full">
      <style>{`
        @keyframes border-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-border-spin {
          animation: border-spin 4s linear infinite;
        }
      `}</style>
      <div className="text-center space-y-2">
        <p className="font-heading text-amber-500 tracking-[0.35em] text-xs">QUEST DECK</p>
        <p className="text-sm text-gray-400 font-mono">Swipe or click arrows to shuffle</p>
      </div>

      <div className="flex items-center justify-center w-full gap-4 md:gap-8">
        <button
          onClick={nextCard}
          className="p-3 bg-[#0a0a10] border-2 border-amber-500 text-amber-500 shadow-[3px_3px_0px_0px_#f59e0b] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#f59e0b] active:translate-y-[3px] active:shadow-none transition-all z-10 hidden md:block"
          aria-label="Previous card"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="relative w-full max-w-sm h-[400px]">
          <AnimatePresence mode="sync">
            {deck.map((project, index) => {
            const isTop = index === 0;
            const zIndex = deck.length - index;
            const cardScale = 1 - index * 0.03;
            const yOffset = index * 8;
            return (
              <motion.div
                key={project.id}
                className="absolute left-0 top-0 w-full cursor-grab active:cursor-grabbing touch-none"
                style={{ zIndex, transformOrigin: "center", pointerEvents: isTop ? "auto" : "none" }}
                initial={{ scale: cardScale, y: yOffset, rotate: project.rotation }}
                animate={{ scale: cardScale, y: yOffset, rotate: project.rotation }}
                exit={{ opacity: 0, y: yOffset - 40, rotate: project.rotation * 4 }}
              >
                <motion.div
                  drag={isTop ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={handleDragEnd}
                  whileDrag={{
                    rotate: project.rotation + (project.rotation > 0 ? 4 : -4),
                    boxShadow: "0 25px 30px rgba(0,0,0,0.45)",
                  }}
                  className="relative bg-[#0a0a10] text-white shadow-2xl overflow-hidden group"
                  style={{ borderRadius: 4, boxShadow: shadow }}
                >
                  {/* Moving Neon Border */}
                  <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[conic-gradient(from_0deg,#f59e0b,#78350f,#f59e0b)] animate-border-spin opacity-100" />
                  
                  {/* Inner Content Container */}
                  <div className="relative h-full w-full bg-[#0a0a10] m-[2px] overflow-hidden rounded-[2px]" style={{ width: "calc(100% - 4px)", height: "calc(100% - 4px)" }}>
                    <div className="absolute inset-0 pointer-events-none z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] bg-repeat" />

                    <div className="relative">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-40 md:h-44 lg:h-48 object-cover border-b-4 border-amber-500"
                        draggable={false}
                      />
                      <div className="absolute top-3 left-3 px-2 py-1 bg-black text-amber-500 text-xs border-2 border-amber-500 font-mono font-bold tracking-widest shadow-[2px_2px_0px_0px_rgba(245,158,11,0.5)]">
                        XP: {project.xp}
                      </div>
                    </div>

                    <div className="relative p-4 space-y-3 font-mono">
                      <div>
                        <h3 className="text-2xl font-black text-amber-500 drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] uppercase tracking-tighter">{project.title}</h3>
                        <div className="flex items-center gap-1 text-[#FACC15] mt-2">
                          {[...Array(project.stars)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-[#FACC15] stroke-black stroke-1" />
                          ))}
                        </div>
                      </div>

                      <p className="text-xs text-gray-300 leading-relaxed line-clamp-2 border-l-2 border-amber-500/50 pl-2">
                        {">"} {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] font-bold uppercase px-2 py-1 bg-amber-500/10 border border-amber-500/40 text-amber-500 hover:bg-amber-500 hover:text-black transition-colors cursor-default"
                          >
                            [{tech}]
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-6 pt-3">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gray-300 hover:text-white transition-colors font-bold"
                        >
                          <Github className="w-4 h-4" />
                          SOURCE
                        </a>
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-amber-500 hover:text-white transition-colors font-bold"
                        >
                          <ExternalLink className="w-4 h-4" />
                          LAUNCH
                        </a>
                      </div>
                    </div>
                  </div>

                  {isTop && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none mix-blend-screen"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0.2, 0] }}
                      transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    >
                      <div className="w-full h-full bg-[radial-gradient(circle,rgba(255,0,255,0.15),transparent_55%)]" />
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
          </AnimatePresence>
        </div>

        <button
          onClick={nextCard}
          className="p-3 bg-[#0a0a10] border-2 border-amber-500 text-amber-500 shadow-[3px_3px_0px_0px_#f59e0b] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#f59e0b] active:translate-y-[3px] active:shadow-none transition-all z-10 hidden md:block"
          aria-label="Next card"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <p className="text-xs uppercase tracking-[0.35em] text-gray-500 font-mono">swipe to shuffle the deck</p>
    </div>
  );
};

export default ProjectDeck;
