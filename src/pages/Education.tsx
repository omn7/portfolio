import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { useDark } from "@/components/Layout";

export default function Education() {
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
                <h1 className="text-3xl font-bold tracking-tight mb-6">Education</h1>
                <div className="h-px bg-[var(--text)] opacity-20 w-full mb-10" />

                <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 group">
                        <h3 className="font-semibold text-lg text-[var(--text)]">B.E. Computer Science</h3>
                        <div className="flex items-center gap-3 text-[var(--text-alt)] border-b border-dashed border-[var(--text-alt)] border-opacity-30 flex-1 opacity-0 sm:opacity-100 hidden sm:block"></div>
                        <p className="text-[var(--text-alt)]">Bharati Vidyapeeth College of Engineering <span className="text-sm ml-2 px-2 py-0.5 rounded-full bg-[var(--text)] text-[var(--bg)] font-medium">2024–2028</span></p>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 group">
                        <h3 className="font-semibold text-lg text-[var(--text)]">Higher Secondary (12th)</h3>
                        <div className="flex items-center gap-3 text-[var(--text-alt)] border-b border-dashed border-[var(--text-alt)] border-opacity-30 flex-1 opacity-0 sm:opacity-100 hidden sm:block"></div>
                        <p className="text-[var(--text-alt)]">Kothari High School & Jr College <span className="text-sm ml-2 px-2 py-0.5 rounded-full bg-[var(--text)] text-[var(--bg)] font-medium">2022–2024</span></p>
                    </div>
                </div>
            </div>
        </main>
    );
}
