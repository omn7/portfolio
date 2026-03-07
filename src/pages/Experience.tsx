import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { useDark } from "@/components/Layout";

export default function Experience() {
    const [dark, setDark] = useDark();

    return (
        <main className="max-w-4xl mx-auto px-6 py-6 flex flex-col min-h-[100dvh] font-mono">
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
                <h1 className="text-3xl font-bold tracking-tight mb-6">Experience</h1>
                <div className="h-px bg-[var(--text)] opacity-20 w-full mb-10" />

                <div className="space-y-6">
                    <p className="text-[var(--text-alt)] italic">Actively seeking software engineering and devops internships...</p>
                </div>
            </div>
        </main>
    );
}
