"use client";
import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { useDark } from "@/hooks/useDark";
import { useState, useEffect } from "react";
import SiteFooter from "@/components/SiteFooter";

export default function Index() {
  const RESUME_URL = "/OmResume.pdf";
  const [dark, setDark] = useDark();

  const greetings = ["Hello,", "नमस्ते,", "Hola,", "Bonjour,", "Hallo,", "こんにちは,"];

  const [greetingIndex, setGreetingIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [toolsOpen, setToolsOpen] = useState(false);
  const fullText = "I am Om Narkhede";

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    const greetingInterval = setInterval(() => {
      setGreetingIndex((prev) => (prev + 1) % greetings.length);
    }, 2500);

    return () => {
      clearInterval(typingInterval);
      clearInterval(greetingInterval);
    };
  }, []);

  return (
    <main className="max-w-6xl mx-auto px-6 flex flex-col min-h-[100dvh] font-mono">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 lg:gap-20 w-full my-auto py-4">

        {/* Left Content Area */}
        <div className="flex-1 w-full flex flex-col justify-center mt-0 md:mt-4">
          <div className="flex items-start mb-4 gap-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight flex flex-wrap items-center">
              <span className="inline-block transition-opacity duration-500 min-w-[3.5em] xl:min-w-[4em] text-left">{greetings[greetingIndex]}</span>
              <span className="min-w-[15ch]">{displayText}<span className="animate-[pulse_1s_step-end_infinite] font-light">|</span></span>
            </h1>
            <button
              onClick={() => setDark(d => !d)}
              aria-label="Toggle theme"
              className="p-2 text-[var(--text-alt)] hover:text-[var(--text)] transition-colors shrink-0 outline-none -mt-3 sm:-mt-4 lg:-mt-5 hidden md:block"
            >
              {dark ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          </div>

          <div className="h-px bg-[var(--text)] opacity-20 w-full mb-8" />

          <div className="space-y-6 text-[1.05rem] lg:text-[1.15rem] leading-relaxed text-[var(--text-alt)] max-w-2xl">
            <p>
              20 y/o undergraduate studying computer Engineering.
            </p>
            <p>
              My areas of interest are computer vision, machine learning, cloud and devops.
              I like building systems that scale and automate processes.{" "}
              <Link href="/about" className="text-[var(--text)] font-medium hover:underline underline-offset-4">read more →</Link>
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <a href="https://github.com/omn7" target="_blank" rel="noopener noreferrer" className="text-[var(--text)] hover:underline underline-offset-4 font-semibold text-lg">github</a>
            <a href="https://linkedin.com/in/omnarkhede" target="_blank" rel="noopener noreferrer" className="text-[var(--text)] hover:underline underline-offset-4 font-semibold text-lg">linkedin</a>
            <a href="mailto:dev.om@outlook.com" className="text-[var(--text)] hover:underline underline-offset-4 font-semibold text-lg">email</a>
          </div>
        </div>

        {/* Right Navigation Area */}
        <div className="w-full md:w-[320px] lg:w-[380px] flex flex-col gap-3 shrink-0 md:pt-4">
          <div className="md:hidden flex justify-end mb-2">
            <button
              onClick={() => setDark(d => !d)}
              aria-label="Toggle theme"
              className="p-2 -mr-2 text-[var(--text-alt)] hover:text-[var(--text)] transition-colors shrink-0"
            >
              {dark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
          <Link href="/projects" className="flex items-center justify-between h-14 border border-[var(--text)] border-opacity-20 hover:border-opacity-100 hover:bg-[var(--text)] hover:text-[var(--bg)] transition-all px-5 font-bold text-[0.95rem] tracking-normal">
            <span>1. Projects</span>
            <span className="opacity-50">→</span>
          </Link>
          <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between h-14 border border-[var(--text)] border-opacity-20 hover:border-opacity-100 hover:bg-[var(--text)] hover:text-[var(--bg)] transition-all px-5 font-bold text-[0.95rem] tracking-normal">
            <span>2. Resume / CV (PDF)</span>
            <span className="opacity-50">↗</span>
          </a>
          <Link href="/experience-education" className="flex items-center justify-between h-14 border border-[var(--text)] border-opacity-20 hover:border-opacity-100 hover:bg-[var(--text)] hover:text-[var(--bg)] transition-all px-5 font-bold text-[0.95rem] tracking-normal">
            <span>3. Experience & Education</span>
            <span className="opacity-50">→</span>
          </Link>
          <Link href="/hackathons" className="flex items-center justify-between h-14 border border-[var(--text)] border-opacity-20 hover:border-opacity-100 hover:bg-[var(--text)] hover:text-[var(--bg)] transition-all px-5 font-bold text-[0.95rem] tracking-normal">
            <span>4. Hackathon Projects</span>
            <span className="opacity-50">→</span>
          </Link>
          <Link href="/blogs" className="flex items-center justify-between h-14 border border-[var(--text)] border-opacity-20 hover:border-opacity-100 hover:bg-[var(--text)] hover:text-[var(--bg)] transition-all px-5 font-bold text-[0.95rem] tracking-normal">
            <span>5. Blogs</span>
            <span className="opacity-50">→</span>
          </Link>
          <Link href="/about" className="flex items-center justify-between h-14 border border-[var(--text)] border-opacity-20 hover:border-opacity-100 hover:bg-[var(--text)] hover:text-[var(--bg)] transition-all px-5 font-bold text-[0.95rem] tracking-normal">
            <span>6. About Me</span>
            <span className="opacity-50">→</span>
          </Link>

          <div className="flex flex-col gap-2">
            <button
              onClick={() => setToolsOpen(!toolsOpen)}
              className={`flex items-center justify-between h-14 border border-[var(--text)] ${toolsOpen ? 'border-opacity-100 bg-[var(--text)] text-[var(--bg)]' : 'border-opacity-20 hover:border-opacity-100 hover:bg-[var(--text)] hover:text-[var(--bg)]'} transition-all px-5 font-bold text-[0.95rem] tracking-normal w-full`}
            >
              <span>7. Tools</span>
              <span className={`opacity-50 transition-transform duration-300 ${toolsOpen ? 'rotate-90' : ''}`}>→</span>
            </button>
            <div
              className={`flex flex-col gap-2 overflow-hidden transition-all duration-300 ${toolsOpen ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'}`}
            >
              <Link href="/news" className="flex items-center justify-between h-12 ml-6 border border-[var(--text)] border-opacity-20 hover:border-opacity-100 hover:bg-[var(--text)] hover:text-[var(--bg)] transition-all px-4 font-bold text-[0.85rem]">
                <span>World Radar</span>
                <span className="opacity-50">→</span>
              </Link>

            </div>
          </div>
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}
