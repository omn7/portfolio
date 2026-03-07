import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { useDark } from "@/components/Layout";
import SiteFooter from "@/components/SiteFooter";
import { projects } from "@/data/projects";

export default function Projects() {
    const [dark, setDark] = useDark();

    return (
        <main className="max-w-4xl mx-auto px-6 py-6 flex flex-col min-h-screen font-mono">
            <div className="mb-4 mt-2 sm:mt-6">
                <div className="flex items-center justify-between mb-8">
                    <Link to="/" className="text-[var(--text-alt)] hover:text-[var(--text)] hover:underline inline-block">
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
                <h1 className="text-3xl font-bold tracking-tight mb-6">Selected Work & Projects</h1>
                <div className="h-px bg-[var(--text)] opacity-20 w-full mb-10" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {projects.map((p) => (
                        <div key={p.id} className="group flex flex-col border border-[var(--text)] border-opacity-15 hover:border-opacity-50 transition-all">
                            <Link to={`/project/${p.id}`} className="block relative overflow-hidden aspect-video">
                                <img
                                    src={p.image}
                                    alt={p.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </Link>
                            <div className="flex flex-col flex-1 p-4 border-t border-[var(--text)] border-opacity-10">
                                <div className="flex items-center justify-between mb-1">
                                    <Link to={`/project/${p.id}`} className="text-lg font-bold hover:underline underline-offset-4">
                                        {p.name}
                                    </Link>
                                </div>
                                <p className="text-[var(--text-alt)] text-sm leading-relaxed mb-3 line-clamp-2">
                                    {p.description}
                                </p>
                                <div className="flex items-center gap-4 text-sm mt-auto">
                                    <Link to={`/project/${p.id}`} className="text-[var(--text)] font-medium hover:underline underline-offset-4">
                                        docs
                                    </Link>
                                    {p.github && (
                                        <a href={p.github} target="_blank" rel="noopener noreferrer" className="text-[var(--text-alt)] hover:text-[var(--text)] transition-colors">
                                            github ↗
                                        </a>
                                    )}
                                    {p.live && (
                                        <a href={p.live} target="_blank" rel="noopener noreferrer" className="text-[var(--text-alt)] hover:text-[var(--text)] transition-colors">
                                            live ↗
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
}
