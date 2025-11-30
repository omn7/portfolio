import { RetroCard } from "@/components/ui/retro-card";

const SkillsSection = () => {
  const skillCategories = [
    {
      title: "FRONTEND (DEX)",
      color: "bg-retro-yellow",
      skills: [
        { name: "React", level: 90 },
        { name: "TypeScript", level: 85 },
        { name: "JavaScript", level: 95 },
        { name: "Vite.js", level: 80 },
        { name: "Next.js", level: 85 },
        { name: "Tailwind CSS", level: 95 }
      ]
    },
    {
      title: "BACKEND (STR)",
      color: "bg-retro-red",
      skills: [
        { name: "Node.js", level: 80 },
        { name: "Supabase", level: 75 },
        { name: "PostgreSQL", level: 70 },
        { name: "MongoDB", level: 75 },
        { name: "Express.js", level: 80 },
        { name: "Django", level: 60 }
      ]
    },
    {
      title: "TOOLS (INT)",
      color: "bg-retro-blue",
      skills: [
        { name: "Git", level: 85 },
        { name: "Docker", level: 65 },
        { name: "AWS", level: 50 },
        { name: "Postman", level: 80 },
        { name: "VS Code", level: 95 },
        { name: "Linux", level: 70 }
      ]
    },
    {
      title: "LANGUAGES (WIS)",
      color: "bg-retro-green",
      skills: [
        { name: "Python", level: 85 },
        { name: "Java", level: 70 },
        { name: "SQL", level: 75 }
      ]
    }
  ];

  return (
    <section
      className="py-20 bg-[#0a0a16]"
      style={{
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }}
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading text-white mb-4 animate-pulse drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">SKILL TREE</h2>
          <p className="text-lg font-sans text-gray-400 max-w-2xl mx-auto">
            Current attribute distribution and ability levels.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {skillCategories.map((category, categoryIndex) => (
            <RetroCard key={categoryIndex} className="p-6 bg-[#13132b] border-[#00ffff]/30">
              <h3 className="text-xl font-heading text-white mb-6 border-b-2 border-white/20 pb-2 flex justify-between items-center">
                {category.title}
                <div className={`w-3 h-3 ${category.color} animate-pulse shadow-[0_0_5px_currentColor]`} />
              </h3>
              
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-1">
                    <div className="flex justify-between text-sm font-heading text-gray-300">
                      <span>{skill.name}</span>
                      <span>LVL {Math.floor(skill.level / 10)}</span>
                    </div>
                    <div className="h-4 bg-black border-2 border-white/20 relative">
                      <div 
                        className={`h-full ${category.color} transition-all duration-1000 ease-out shadow-[0_0_5px_currentColor]`}
                        style={{ width: `${skill.level}%` }}
                      />
                      {/* Grid lines on bar */}
                      <div className="absolute inset-0 flex justify-between px-1">
                        {[...Array(9)].map((_, i) => (
                          <div key={i} className="w-[1px] h-full bg-black/20" />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </RetroCard>
          ))}
        </div>

        {/* Soft Skills / Perks */}
        <div className="mt-16">
          <h3 className="text-2xl font-heading text-center text-white mb-8">PASSIVE PERKS</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Research +10",
              "Problem Solving +15",
              "Teamwork +20",
              "Leadership +12"
            ].map((perk, index) => (
              <div
                key={index}
                className="px-6 py-3 bg-black border-2 border-[#00ffff] text-[#00ffff] font-heading text-xs hover:bg-[#00ffff] hover:text-black transition-colors cursor-default shadow-[0_0_5px_rgba(0,255,255,0.3)]"
              >
                {perk}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;