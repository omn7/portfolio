"use client";
import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { useDark } from "@/hooks/useDark";
import SiteFooter from "@/components/SiteFooter";
import { hackathons } from "@/data/hackathons";
import { ImageSlider } from "@/components/ImageSlider";

const HackathonsSection = () => {
  const [dark, setDark] = useDark();

  return (
    <main className="max-w-4xl mx-auto px-6 py-6 flex flex-col min-h-[100dvh] font-mono">
      <div className="mb-4 mt-2 sm:mt-6">
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="text-[var(--text-alt)] hover:text-[var(--text)] hover:underline inline-block">
            ← back to index
          </Link>
          <button
            onClick={() => setDark(d => !d)}
            aria-label="Toggle theme"
            className="p-2 -mr-2 text-[var(--text-alt)] hover:text-[var(--text)] transition-colors shrink-0"
          >
            {dark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>

      <div className="mb-16">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Hackathon Projects</h1>
        <div className="h-px bg-[var(--text)] opacity-20 w-full mb-10" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {hackathons.map((h) => (
            <div key={h.id} className="group flex flex-col gap-3 border border-[var(--text)] border-opacity-20 rounded-md p-4 hover:border-opacity-40 transition-all">
              <a href={h.link} target="_blank" rel="noopener noreferrer" className="block relative overflow-hidden rounded-md border border-[var(--text)] border-opacity-10 bg-[var(--bg)] aspect-video">
                <ImageSlider images={h.images} name={h.name} />
              </a>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <a href={h.link} target="_blank" rel="noopener noreferrer" className="text-lg font-bold hover:underline underline-offset-4">
                    {h.name}
                  </a>
                  <span className="text-sm font-medium px-2 py-0.5 border border-[var(--text)] border-opacity-20 text-[var(--text-alt)] rounded-sm whitespace-nowrap ml-2">
                    {h.position}
                  </span>
                </div>
                <p className="text-[var(--text-alt)] text-sm mb-2">{h.date} — {h.location}</p>
                <p className="text-[var(--text-alt)] text-sm leading-relaxed mb-3">
                  {h.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {h.technologies.map(tech => (
                    <span key={tech} className="text-xs font-medium text-[var(--text-alt)] px-1.5 py-0.5 border border-[var(--text)] border-opacity-20 rounded-sm">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <Link href={`/hackathon/${h.id}`} className="text-sm font-bold text-[var(--text)] hover:underline underline-offset-4">
                    Read more →
                  </Link>
                  {h.github && (
                    <a href={h.github} target="_blank" rel="noopener noreferrer" className="text-[var(--text-alt)] hover:text-[var(--text)] transition-colors text-sm flex items-center gap-1.5">
                      github ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <SiteFooter />
    </main>
  );
};

export default HackathonsSection;