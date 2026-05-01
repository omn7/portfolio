"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { hackathons } from "@/data/hackathons";
import { useDark } from "@/hooks/useDark";
import { Moon, Sun } from "lucide-react";
import SiteFooter from "@/components/SiteFooter";
import { ImageSlider } from "@/components/ImageSlider";

export default function HackathonDetail({ params: propParams }: { params?: { id: string } }) {
  const routeParams = useParams();
  const id = (propParams?.id ?? routeParams?.id) as string;
  const [dark, setDark] = useDark();

  const hackathon = hackathons.find(h => h.id.toString() === id);

  if (!hackathon) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-6 flex flex-col items-center justify-center min-h-screen font-mono">
        <h1 className="text-2xl font-bold mb-4">Hackathon not found</h1>
        <Link href="/hackathons" className="text-[var(--text-alt)] hover:text-[var(--text)] hover:underline">
          ← back to hackathons
        </Link>
      </main>
    );
  }

  // Parse the fullDescription markdown-like text into structured sections
  const content = (hackathon.fullDescription || hackathon.description).trim();
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
              <li key={i} className="list-disc" dangerouslySetInnerHTML={{ __html: item }}></li>
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

      let parsedLine = trimmed;
      // Bold text handling
      parsedLine = parsedLine.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      // Italic text handling
      parsedLine = parsedLine.replace(/\*(.*?)\*/g, '<em>$1</em>');

      if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
        listItems.push(parsedLine.replace(/^[\*\-]\s+/, ""));
        continue;
      }

      if (/^\d+\.\s+/.test(trimmed)) {
        listItems.push(parsedLine.replace(/^\d+\.\s+/, ""));
        continue;
      }

      flushList();
      elements.push(
        <p key={key++} className="text-[var(--text-alt)] text-[0.95rem] leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: parsedLine }} />
      );
    }
    flushList();
    return elements;
  };

  const titleMatch = content.match(/^#\s+(.+)$/m);
  const pageTitle = titleMatch ? titleMatch[1] : hackathon.name;

  return (
    <main className="max-w-4xl mx-auto px-6 py-6 flex flex-col min-h-[100dvh] font-mono">
      {/* Header */}
      <div className="mb-4 mt-2 sm:mt-6">
        <div className="flex items-center justify-between mb-8">
          <Link href="/hackathons" className="text-[var(--text-alt)] hover:text-[var(--text)] hover:underline inline-block">
            ← back to hackathons
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

      {/* Hackathon Hero */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-2">{pageTitle}</h1>
        <p className="text-[var(--text-alt)] text-[0.95rem] mb-2">{hackathon.description}</p>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-[var(--text-alt)] text-sm mb-6">
          <span className="font-medium text-[var(--text)]">{hackathon.name}</span>
          <span className="hidden sm:inline">•</span>
          <span>{hackathon.date}</span>
          <span className="hidden sm:inline">•</span>
          <span>{hackathon.position}</span>
          <span className="hidden sm:inline">•</span>
          <span>{hackathon.location}</span>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm mb-8">
          {hackathon.github && (
            <a href={hackathon.github} target="_blank" rel="noopener noreferrer" className="text-[var(--text)] hover:underline underline-offset-4">
              github ↗
            </a>
          )}
          {hackathon.link && hackathon.link !== "#" && (
            <a href={hackathon.link} target="_blank" rel="noopener noreferrer" className="text-[var(--text)] hover:underline underline-offset-4">
              live ↗
            </a>
          )}
        </div>

        {/* Hero Image Slider */}
        <div className="border border-[var(--text)] border-opacity-20 overflow-hidden mb-8 rounded-md bg-[var(--bg)] aspect-video group">
          <ImageSlider images={hackathon.images} name={hackathon.name} />
        </div>

        {/* Tech Stack */}
        {hackathon.technologies && hackathon.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            {hackathon.technologies.map(t => (
              <span key={t} className="text-xs font-medium text-[var(--text-alt)] px-2.5 py-1 border border-[var(--text)] border-opacity-20 rounded-sm">
                {t}
              </span>
            ))}
          </div>
        )}

        <div className="h-px bg-[var(--text)] opacity-20 w-full mb-10" />

        {/* Content */}
        <div>{renderContent()}</div>
      </div>

      <SiteFooter />
    </main>
  );
}
