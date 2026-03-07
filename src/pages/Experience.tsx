import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { useDark } from "@/components/Layout";
import SiteFooter from "@/components/SiteFooter";

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

                <div className="space-y-12">
                    {/* SR Analytics */}
                    <div className="border border-[var(--text)] border-opacity-20 p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                            <h2 className="text-xl font-bold text-[var(--text)]">SR Analytics</h2>
                            <span className="text-sm text-[var(--text-alt)]">Intern</span>
                        </div>
                        <p className="text-sm text-[var(--text-alt)] mb-4">Development Intern · Nov 2025 — Feb 2026</p>
                        <ul className="space-y-2 text-[var(--text-alt)] text-[0.95rem] leading-relaxed list-disc list-inside">
                            <li>Developed Python-based ETL pipelines and SQL data validation to streamline data processing workflows.</li>
                            <li>Built Power BI embedded analytics dashboards for data-driven insights and reporting.</li>
                            <li>Designed and implemented a user-focused chat interface UI to enhance client interaction.</li>
                            <li>Gained real-world exposure to professional development workflows and collaborative team environments.</li>
                        </ul>
                    </div>

                    {/* BV Codeverse */}
                    <div className="border border-[var(--text)] border-opacity-20 p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                            <h2 className="text-xl font-bold text-[var(--text)]">BV Codeverse</h2>
                            <span className="text-sm text-[var(--text-alt)]">President</span>
                        </div>
                        <p className="text-sm text-[var(--text-alt)] mb-4">Official Coding Club of BVCOE · Jun 2025 — Present</p>
                        <ul className="space-y-2 text-[var(--text-alt)] text-[0.95rem] leading-relaxed list-disc list-inside">
                            <li>Lead and manage the official coding club of Bharati Vidyapeeth College of Engineering.</li>
                            <li>Organize technical events, workshops, and hackathons to encourage collaborative learning among students.</li>
                            <li>Build and nurture a strong coding community, mentoring peers in web development and competitive programming.</li>
                        </ul>
                    </div>

                    {/* Full-Stack Developer */}
                    <div className="border border-[var(--text)] border-opacity-20 p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                            <h2 className="text-xl font-bold text-[var(--text)]">Freelance</h2>
                            <span className="text-sm text-[var(--text-alt)]">Full-Stack Developer</span>
                        </div>
                        <p className="text-sm text-[var(--text-alt)] mb-4">Self-employed</p>
                        <ul className="space-y-2 text-[var(--text-alt)] text-[0.95rem] leading-relaxed list-disc list-inside">
                            <li>Build dynamic, scalable, and user-friendly web applications focused on performance and great user experience.</li>
                            <li>Transform ideas into practical digital solutions for clients using modern web technologies.</li>
                            <li>Work across the full stack — from responsive frontends with React and TypeScript to robust backends with Node.js.</li>
                        </ul>
                    </div>
                </div>
            </div>

            <SiteFooter />
        </main>
    );
}
