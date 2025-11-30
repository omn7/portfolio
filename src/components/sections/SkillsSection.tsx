import { 
  Atom, 
  FileCode, 
  FileType, 
  Zap, 
  Layout, 
  Server, 
  Database, 
  Globe, 
  GitBranch, 
  Container, 
  Cloud, 
  Terminal, 
  Code2, 
  Coffee
} from "lucide-react";
import RetroSnake from "@/components/ui/retro-snake";
import { useRef } from "react";

const SkillsSection = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  const skillCategories = [
    {
      title: "FRONTEND",
      color: "text-retro-yellow",
      borderColor: "group-hover:border-retro-yellow",
      skills: [
        { name: "React", icon: Atom, image: "/skillsicon/reactjs.png" },
        { name: "TypeScript", icon: FileCode, image: "/skillsicon/typescript.png" },
        { name: "JavaScript", icon: FileType, image: "/skillsicon/javascript.png" },
        { name: "Vite", icon: Zap, image: "/skillsicon/vite.png" },
        { name: "Next.js", icon: Globe, image: "/skillsicon/nextjs.png" },
        { name: "Tailwind", icon: Layout, image: "/skillsicon/tailwind.png" }
      ]
    },
    {
      title: "BACKEND",
      color: "text-retro-red",
      borderColor: "group-hover:border-retro-red",
      skills: [
        { name: "Node.js", icon: Server, image: "/skillsicon/Nodejs.png" },
        { name: "Supabase", icon: Database, image: "/skillsicon/supabase.png" },
        { name: "Postgres", icon: Database, image: "/skillsicon/postgress.png" },
        { name: "MongoDB", icon: Database, image: "/skillsicon/mongodb.png" },
        { name: "Express", icon: Server, image: "/skillsicon/expressjs.png" },
        { name: "Django", icon: Code2, image: "/skillsicon/django.png" }
      ]
    },
    {
      title: "TOOLS",
      color: "text-retro-blue",
      borderColor: "group-hover:border-retro-blue",
      skills: [
        { name: "Git", icon: GitBranch, image: "/skillsicon/git.png" },
        { name: "Docker", icon: Container, image: "/skillsicon/docker.png" },
        { name: "AWS", icon: Cloud, image: "/skillsicon/aws.png" },
        { name: "Postman", icon: Globe, image: "/skillsicon/postman.png" },
        { name: "VS Code", icon: Terminal, image: "/skillsicon/vscode.png" },
        { name: "Linux", icon: Terminal }
      ]
    },
    {
      title: "LANGS",
      color: "text-retro-green",
      borderColor: "group-hover:border-retro-green",
      skills: [
        { name: "Python", icon: FileCode, image: "/skillsicon/python.png" },
        { name: "Java", icon: Coffee, image: "/skillsicon/java.png" },
        { name: "SQL", icon: Database }
      ]
    }
  ];

  return (
    <section className="py-12 bg-black relative overflow-hidden">
      {/* Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      />

      {/* Retro Snake Animation */}
      <RetroSnake gridRef={gridRef} />

      {/* CRT Scanline Effect Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,6px_100%] bg-repeat" />
      
      <div className="container mx-auto px-4 relative z-20">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading text-white mb-4 tracking-tighter uppercase drop-shadow-[4px_4px_0px_rgba(0,0,0,0.8)]">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500">
              TECH ARSENAL
            </span>
          </h2>
          <div className="inline-block px-4 py-1 bg-white/10 border border-white/20 text-xs font-mono text-gray-400 tracking-[0.2em]">
            SYSTEM_STATUS: ONLINE
          </div>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 max-w-6xl mx-auto">
          {skillCategories.map((category, idx) => (
            <div key={idx} className={`
              relative flex flex-col items-center gap-6
              border-4 p-6 bg-black
              ${category.color.replace('text-', 'border-')}
              shadow-[8px_8px_0px_0px_rgba(30,30,30,1)]
            `}>
              {/* Decorative Corner Squares */}
              <div className={`absolute top-0 left-0 w-2 h-2 ${category.color.replace('text-', 'bg-')}`} />
              <div className={`absolute top-0 right-0 w-2 h-2 ${category.color.replace('text-', 'bg-')}`} />
              <div className={`absolute bottom-0 left-0 w-2 h-2 ${category.color.replace('text-', 'bg-')}`} />
              <div className={`absolute bottom-0 right-0 w-2 h-2 ${category.color.replace('text-', 'bg-')}`} />

              <div className="w-full text-center pt-2 shrink-0">
                <h3 className={`text-xs font-heading tracking-widest ${category.color} uppercase border-b-4 ${category.color.replace('text-', 'border-')} pb-2 inline-block`}>
                  {category.title}
                </h3>
              </div>
              
              <div className="flex flex-wrap justify-center gap-4">
                {category.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="flex flex-col items-center group cursor-pointer">
                    <div className={`
                      w-14 h-14 flex items-center justify-center
                      border-2 
                      ${category.borderColor.replace('group-hover:', '')} 
                      border-opacity-30
                      group-hover:border-opacity-100
                      group-hover:bg-[#1a1a20]
                      group-hover:scale-110
                      group-hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]
                      transition-all duration-100 ease-steps
                      ${(skill.name === "Node.js" || skill.name === "Express" || skill.name === "Next.js") ? "bg-white" : "bg-[#0a0a10]"}
                    `}>
                      {skill.image ? (
                        <img 
                          src={skill.image} 
                          alt={skill.name} 
                          className="w-8 h-8 object-contain opacity-70 group-hover:opacity-100 transition-opacity" 
                        />
                      ) : (
                        <skill.icon className={`w-8 h-8 ${category.color} opacity-70 group-hover:opacity-100 transition-opacity`} />
                      )}
                    </div>
                    <span className="mt-2 text-[8px] font-heading text-gray-500 uppercase tracking-wider group-hover:text-white transition-colors">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
