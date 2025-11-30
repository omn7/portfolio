import { Button } from "@/components/ui/button";
import { RetroCard } from "@/components/ui/retro-card";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink, Star, Trophy } from "lucide-react";

const ProjectsSection = () => {
  const projects = [
    {
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
      title: "College Quiz",
      description: "BVCOEL QUIZ CHAMPIONSHIP Website.",
      technologies: ["Typescript", "Tailwind", "React"],
      githubUrl: "https://github.com/omn7",
      liveUrl: "https://quizzers-bvcoel.vercel.app/",
      stars: 2,
      xp: 250,
      image: "/p3.png"
    }
  ];

  return (
    <section id="projects" data-guide-key="projects" className="py-16 bg-[#0a0a16]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 data-guide-key="projects" className="text-2xl md:text-4xl font-heading text-[#00ffff] mb-4 animate-pulse drop-shadow-[0_0_5px_rgba(0,255,255,0.5)]">
            COMPLETED QUESTS
          </h2>
          <p className="text-lg font-sans text-gray-400 max-w-xl mx-auto">
            Mission logs and loot obtained from past adventures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <RetroCard key={index} className="p-0 overflow-hidden group bg-[#13132b] border-[#00ffff]/30 hover:border-[#00ffff] transition-colors">
              {/* Cartridge Header / Image */}
              <div className="relative aspect-video border-b-2 border-black overflow-hidden">
                <div className="absolute top-2 right-2 z-10 bg-black/80 text-[#00ff00] font-heading text-[10px] px-2 py-1 border border-[#00ff00] rounded shadow-[0_0_5px_#00ff00]">
                  +{project.xp} XP
                </div>
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
              </div>

              <div className="p-4 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-heading text-white group-hover:text-[#00ffff] transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Star className="h-3 w-3 text-[#FACC15] fill-[#FACC15]" />
                      <span className="text-xs font-sans text-gray-400">{project.stars} stars</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 border-2 border-gray-600 hover:border-white hover:bg-white hover:text-black transition-all rounded-sm"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 border-2 border-gray-600 hover:border-[#00ff00] hover:bg-[#00ff00] hover:text-black transition-all rounded-sm"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>

                <p className="text-sm font-sans text-gray-300 leading-relaxed border-l-2 border-[#00ffff] pl-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex} 
                      className="text-[10px] font-heading px-2 py-1 bg-black border border-gray-700 text-gray-300 rounded-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </RetroCard>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            className="font-heading text-xs border-2 border-white bg-transparent text-white hover:bg-white hover:text-black rounded-none px-6 py-4"
            asChild
          >
            <a href="https://github.com/omn7/" target="_blank" rel="noopener noreferrer">
              <Trophy className="mr-2 h-4 w-4" />
              VIEW ALL QUESTS
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;