"use client";
import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { useDark } from "@/components/Layout";
import SiteFooter from "@/components/SiteFooter";
import { blogs } from "@/data/blogs";

const BlogsSection = () => {
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
        <h1 className="text-3xl font-bold tracking-tight mb-6">Blogs</h1>
        <div className="h-px bg-[var(--text)] opacity-20 w-full mb-8" />

        <div className="space-y-6">
          {[...blogs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((b) => (
            <Link
              key={b.id}
              href={`/blogs/${b.id}`}
              className="block no-underline border border-[var(--text)] border-opacity-20 hover:border-opacity-50 transition-all group"
            >
              <div className="flex flex-col md:flex-row">
                {/* Image */}
                <div className="md:w-72 md:shrink-0 overflow-hidden">
                  <img
                    src={b.image}
                    alt={b.title}
                    className="w-full h-48 md:h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    <p className="text-xs text-[var(--text-alt)] mb-1">{b.date}</p>
                    <h2 className="text-lg font-bold text-[var(--text)] mb-2 group-hover:underline underline-offset-4">
                      {b.title}
                    </h2>
                    <p className="text-[var(--text-alt)] text-sm leading-relaxed mb-3">
                      {b.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {b.tags.map((tag) => (
                      <span key={tag} className="text-xs text-[var(--text-alt)] px-2 py-0.5 border border-[var(--text)] border-opacity-20">
                        {tag}
                      </span>
                    ))}
                    <span className="text-xs text-[var(--text-alt)] ml-auto">read ↗</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 border border-dashed border-[var(--text)] border-opacity-20 p-4 text-center">
          <p className="text-[var(--text-alt)] text-sm">More posts coming soon.</p>
        </div>
      </div>

      <SiteFooter />
    </main>
  );
};

export default BlogsSection;