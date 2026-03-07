import { useParams, Link } from "react-router-dom";
import { projects } from "@/data/projects";
import { useDark } from "@/components/Layout";
import { Moon, Sun } from "lucide-react";
import SiteFooter from "@/components/SiteFooter";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const [dark, setDark] = useDark();

  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-6 flex flex-col items-center justify-center min-h-screen font-mono">
        <h1 className="text-2xl font-bold mb-4">Project not found</h1>
        <Link to="/projects" className="text-[var(--text-alt)] hover:text-[var(--text)] hover:underline">
          ← back to projects
        </Link>
      </main>
    );
  }

  // Parse the fullDescription markdown-like text into structured sections
  const content = (project.fullDescription || project.description).trim();
  const lines = content.split("\n");

  const renderContent = () => {
    const elements: JSX.Element[] = [];
    let listItems: string[] = [];
    let key = 0;

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={key++} className="space-y-1.5 text-[var(--text-alt)] text-[0.95rem] leading-relaxed pl-5 mb-6">
            {listItems.map((item, i) => (
              <li key={i} className="list-disc">{item}</li>
            ))}
          </ul>
        );
        listItems = [];
      }
    };

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) {
        flushList();
        continue;
      }

      if (trimmed.startsWith("# ")) {
        flushList();
        // Skip the main title — we render it separately
        continue;
      }

      if (trimmed.startsWith("### ")) {
        flushList();
        elements.push(
          <h3 key={key++} className="text-lg font-bold text-[var(--text)] mt-8 mb-3">
            {trimmed.replace("### ", "")}
          </h3>
        );
        continue;
      }

      if (trimmed.startsWith("*   **") || trimmed.startsWith("- **")) {
        // Bold list item: extract bold part and rest
        const match = trimmed.match(/\*\*(.+?)\*\*:?\s*(.*)/);
        if (match) {
          listItems.push(`${match[1]}${match[2] ? ": " + match[2] : ""}`);
        } else {
          listItems.push(trimmed.replace(/^[\*\-]\s+/, ""));
        }
        continue;
      }

      if (trimmed.startsWith("*") || trimmed.startsWith("-")) {
        listItems.push(trimmed.replace(/^[\*\-]\s+/, ""));
        continue;
      }

      if (/^\d+\.\s+/.test(trimmed)) {
        // Numbered list item
        const match = trimmed.match(/^\d+\.\s+\*\*(.+?)\*\*:?\s*(.*)/);
        if (match) {
          listItems.push(`${match[1]}${match[2] ? ": " + match[2] : ""}`);
        } else {
          listItems.push(trimmed.replace(/^\d+\.\s+/, ""));
        }
        continue;
      }

      flushList();
      elements.push(
        <p key={key++} className="text-[var(--text-alt)] text-[0.95rem] leading-relaxed mb-4">
          {trimmed}
        </p>
      );
    }
    flushList();
    return elements;
  };

  // Extract a clean title from fullDescription (the # heading) or fallback to project.name
  const titleMatch = content.match(/^#\s+(.+)$/m);
  const pageTitle = titleMatch ? titleMatch[1] : project.name;

  return (
    <main className="max-w-4xl mx-auto px-6 py-6 flex flex-col min-h-screen font-mono">
      {/* Header */}
      <div className="mb-4 mt-2 sm:mt-6">
        <div className="flex items-center justify-between mb-8">
          <Link to="/projects" className="text-[var(--text-alt)] hover:text-[var(--text)] hover:underline inline-block">
            ← back to projects
          </Link>
          <button
            onClick={() => setDark((d) => !d)}
            aria-label="Toggle theme"
            className="p-2 -mr-2 text-[var(--text-alt)] hover:text-[var(--text)] transition-colors shrink-0"
          >
            {dark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>

      {/* Project Hero */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-2">{pageTitle}</h1>
        <p className="text-[var(--text-alt)] text-[0.95rem] mb-6">{project.description}</p>

        {/* Links */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm mb-8">
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-[var(--text)] hover:underline underline-offset-4">
            github ↗
          </a>
          <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-[var(--text)] hover:underline underline-offset-4">
            live ↗
          </a>
        </div>

        {/* Hero Image */}
        <div className="border border-[var(--text)] border-opacity-20 overflow-hidden mb-8">
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Tech Stack */}
        {project.tech && project.tech.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            {project.tech.map(t => (
              <span key={t} className="text-xs font-medium text-[var(--text-alt)] px-2.5 py-1 border border-[var(--text)] border-opacity-20">
                {t}
              </span>
            ))}
          </div>
        )}

        <div className="h-px bg-[var(--text)] opacity-20 w-full mb-10" />

        {/* Content */}
        <div>{renderContent()}</div>

        {/* Features */}
        {project.features && project.features.length > 0 && (
          <>
            <h3 className="text-lg font-bold text-[var(--text)] mt-8 mb-3">Features</h3>
            <ul className="space-y-1.5 text-[var(--text-alt)] text-[0.95rem] leading-relaxed pl-5 mb-6">
              {project.features.map((f, i) => (
                <li key={i} className="list-disc">{f}</li>
              ))}
            </ul>
          </>
        )}
      </div>

      <SiteFooter />
    </main>
  );
}
