import { useParams, Link } from "react-router-dom";
import { projects } from "@/data/projects";
import { useDark } from "@/components/Layout";
import { Moon, Sun, ArrowLeft, Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const [dark, setDark] = useDark();
  
  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Project not found</h1>
        <Link to="/projects">
          <Button variant="outline">Back to Projects</Button>
        </Link>
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-6 flex flex-col min-h-screen font-mono">
      {/* Header */}
      <div className="mb-8 mt-2 sm:mt-6 flex items-center justify-between">
        <Link to="/projects" className="text-[var(--text-alt)] hover:text-[var(--text)] hover:underline flex items-center gap-2">
          <ArrowLeft size={16} /> back to projects
        </Link>
        <button
          onClick={() => setDark((d) => !d)}
          aria-label="Toggle theme"
          className="p-2 -mr-2 text-[var(--text-alt)] hover:text-[var(--text)] transition-colors shrink-0"
        >
          {dark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <article className="prose dark:prose-invert max-w-none">
        
        {/* Title & Links */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <h1 className="text-4xl font-bold tracking-tight m-0">{project.name}</h1>
            <div className="flex gap-3">
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="gap-2">
                        <Github size={16} /> GitHub
                    </Button>
                </a>
                <a href={project.live} target="_blank" rel="noopener noreferrer">
                     <Button className="gap-2">
                        <ExternalLink size={16} /> Live Project
                    </Button>
                </a>
            </div>
        </div>

        {/* Hero Image */}
        <div className="mb-10 border border-[var(--text)] border-opacity-20 rounded-xl overflow-hidden bg-[var(--bg)]">
            <img 
                src={project.image} 
                alt={project.name} 
                className="w-full h-auto object-cover max-h-[500px]"
            />
        </div>

        {/* Tech Stack */}
        {project.tech && (
            <div className="flex flex-wrap gap-2 mb-8">
                {project.tech.map(t => (
                    <Badge key={t} variant="secondary" className="text-sm font-normal px-3 py-1">
                        {t}
                    </Badge>
                ))}
            </div>
        )}

        {/* Description / Content */}
        <div className="text-[var(--text)] opacity-90 leading-relaxed whitespace-pre-line text-lg">
             {project.fullDescription || project.description}
        </div>

      </article>

      {/* Footer */}
      <div className="mt-20 pt-10 border-t border-[var(--text)] border-opacity-10 text-center text-sm text-[var(--text-alt)]">
        &copy; {new Date().getFullYear()} Om Narkhede. All rights reserved.
      </div>
    </main>
  );
}
