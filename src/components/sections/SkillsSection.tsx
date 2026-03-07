import { Layers } from "lucide-react";

const skills = {
  Frontend: {
    icon: "🎨",
    items: [
      { name: "React", icon: "⚛️" },
      { name: "Next.js", icon: "N" },
      { name: "TypeScript", icon: "TS" },
      { name: "JavaScript", icon: "JS" },
      { name: "Tailwind", icon: "🌊" },
      { name: "Vite", icon: "⚡" },
    ]
  },
  Backend: {
    icon: "⚙️",
    items: [
      { name: "Node.js", icon: "🟢" },
      { name: "Express", icon: "EX" },
      { name: "Django", icon: "🕸️" },
      { name: "PostgreSQL", icon: "🐘" },
      { name: "MongoDB", icon: "🍃" },
      { name: "Supabase", icon: "⚡" },
    ]
  },
  "AI & ML": {
    icon: "🤖",
    items: [
      { name: "Python", icon: "🐍" },
      { name: "HuggingFace", icon: "🤗" },
      { name: "LangChain", icon: "🦜" },
      { name: "SQL", icon: "💾" },
    ]
  },
  Tools: {
    icon: "🛠️",
    items: [
      { name: "Git", icon: "🌱" },
      { name: "Docker", icon: "🐋" },
      { name: "AWS", icon: "☁️" },
      { name: "VS Code", icon: "💻" },
      { name: "Linux", icon: "🐧" },
      { name: "Postman", icon: "🚀" },
    ]
  },
};

const SkillsSection = () => (
  <section id="skills" className="scroll-mt-24 border-t border-[var(--border)] pt-12">
    <div className="flex items-center gap-2 mb-8">
      <Layers className="text-[var(--text-muted)]" size={24} />
      <h2 className="notion-h2">Tech Stack</h2>
    </div>

    <div className="space-y-12">
      {Object.entries(skills).map(([category, data]) => (
        <div key={category} className="space-y-4">
          <div className="flex items-center gap-2 border-b border-[var(--border)] pb-2">
            <span className="text-xl">{data.icon}</span>
            <h3 className="text-md font-semibold text-[var(--text)]">{category}</h3>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {data.items.map(skill => (
              <div key={skill.name} className="skill-pill">
                <span className="text-[12px] opacity-80">{skill.icon}</span>
                {skill.name}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default SkillsSection;
