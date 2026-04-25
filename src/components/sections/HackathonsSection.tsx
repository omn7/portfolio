"use client";
import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { useDark } from "@/hooks/useDark";
import SiteFooter from "@/components/SiteFooter";

const HackathonsSection = () => {
  const [dark, setDark] = useDark();

  const hackathons = [
    {
      id: 3,
      name: "DEV CLASH 2026",
      date: "APR 2026",
      position: "2nd Runner-up",
      location: "Zeal College of Engineering, Pune, India",
      description: "BrainSync — an AI-powered personal planner built on Telegram. Just send a message like 'Finish assignment by 6 PM tomorrow' and BrainSync extracts time, priority, and deadlines using NLP, then automatically schedules and reminds you.",
      technologies: ["Next.js", "Tailwind CSS", "Python", "Prisma", "Neon", "OpenClaw", "Telegram Bot API"],
      link: "#",
      image: "/hackathonp1.png"
    },
    {
      id: 2,
      name: "INNOHACK 2025",
      date: "July 2025",
      position: "Finalist",
      location: "VIT Pune, India",
      description: "AI-powered debugging assistant that helps developers understand and fix code issues using AI. Get clear explanations of complex errors in simple English and receive practical solutions instantly.",
      technologies: ["Reactjs", "ExpressJS", "PostgreSQL", "OpenAI API", "Gemini APIs"],
      link: "https://deburger.omnarkhede.tech/",
      image: "/debugger.png"
    }
  ];

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
                <img
                  src={h.image}
                  alt={h.name}
                  className="w-full h-full object-cover transition-all duration-500 scale-[1.01] group-hover:scale-105"
                />
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