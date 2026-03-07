import { ArrowUpRight, Github, Folder } from "lucide-react";

const projects = [
  {
    name: "Vura",
    description: "Certificate management SaaS — issue, verify, and revoke digital credentials with an API-first approach.",
    tech: ["Next.js", "Supabase", "PostgreSQL", "TypeScript"],
    github: "https://github.com/omn7/vura",
    live: "https://vurakit.vercel.app",
    icon: "📄"
  },
  {
    name: "Boop",
    description: "A modern social media platform for pets and their humans. Share moments, connect with friends, and join a vibrant community.",
    tech: ["React.js", "MongoDB", "Express", "Node.js"],
    github: "https://github.com/omn7/boop",
    live: "",
    icon: "🐾"
  },
  {
    name: "DSA Practice Hub",
    description: "A curated open-source hub for data structures and algorithms practice with categorized problems and solutions.",
    tech: ["JavaScript", "GitHub Pages"],
    github: "https://github.com/omn7/DSA",
    live: "https://omn7.github.io/DSA/",
    icon: "🧠"
  },
  {
    name: "AI Portfolio",
    description: "This portfolio — built with React, Vite, Tailwind CSS, and Framer Motion. Focused on clean design and performance.",
    tech: ["React", "TypeScript", "Tailwind", "Framer Motion"],
    github: "https://github.com/omn7/portfolio",
    live: "https://omnarkhede.tech",
    icon: "✨"
  },
];

const ProjectCard = ({ project }: { project: typeof projects[0] }) => (
  <div className="notion-card flex flex-col p-6 h-full relative cursor-default hover:bg-[var(--bg-hover)]">
    {/* Emoji icon */}
    <div className="text-3xl mb-4">{project.icon}</div>

    <div className="flex items-start justify-between mb-2">
      <h3 className="text-[16px] font-semibold text-[var(--text)]">{project.name}</h3>
      <div className="flex gap-2 text-[var(--text-muted)] group-hover:text-[var(--text)] transition-colors">
        {project.github && (
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text)]" aria-label="GitHub">
            <Github size={16} />
          </a>
        )}
        {project.live && (
          <a href={project.live} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text)]" aria-label="Live site">
            <ArrowUpRight size={16} />
          </a>
        )}
      </div>
    </div>

    <p className="text-[14px] leading-relaxed mb-6 flex-1 text-[var(--text-secondary)]">
      {project.description}
    </p>

    <div className="flex flex-wrap gap-2 mt-auto">
      {project.tech.map(t => (
        <span key={t} className="notion-tag">{t}</span>
      ))}
    </div>
  </div>
);

const ProjectsSection = () => (
  <section id="projects" className="scroll-mt-24 border-t border-[var(--border)] pt-12">
    <div className="flex items-center gap-2 mb-6">
      <Folder className="text-[var(--text-muted)]" size={24} />
      <h2 className="notion-h2">Projects</h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {projects.map(p => <ProjectCard key={p.name} project={p} />)}
    </div>
  </section>
);

export default ProjectsSection;