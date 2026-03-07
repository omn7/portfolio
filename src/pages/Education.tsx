import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { useDark } from "@/components/Layout";
import SiteFooter from "@/components/SiteFooter";

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

                <div className="space-y-12">
                    {/* BVCOE */}
                    <div className="border border-[var(--text)] border-opacity-20 p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                            <h2 className="text-xl font-bold text-[var(--text)]">Bharati Vidyapeeth College of Engineering</h2>
                            <span className="text-sm text-[var(--text-alt)]">2024 — 2028</span>
                        </div>
                        <p className="text-sm text-[var(--text-alt)] mb-1">B.E. Computer Engineering · Pune, Maharashtra</p>
                        <p className="text-sm text-[var(--text)] font-medium mb-4">CGPA: 8.2 / 10</p>
                        <ul className="space-y-2 text-[var(--text-alt)] text-[0.95rem] leading-relaxed list-disc list-inside">
                            <li>Currently in second year, pursuing a Bachelor of Engineering in Computer Engineering.</li>
                            <li>Serving as President of <span className="text-[var(--text)]">BV Codeverse</span>, the official coding club of the college — organizing hackathons, workshops, and coding events.</li>
                            <li>Active in full-stack web development projects, building real-world applications alongside academics.</li>
                            <li>Strengthening problem-solving foundations through Data Structures and Algorithms (DSA) with Java.</li>
                            <li>Coursework includes Object-Oriented Programming, Database Management, Computer Networks, Operating Systems, and Data Structures.</li>
                        </ul>
                    </div>

                    {/* Kothari */}
                    <div className="border border-[var(--text)] border-opacity-20 p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                            <h2 className="text-xl font-bold text-[var(--text)]">Kothari High School & Jr College</h2>
                            <span className="text-sm text-[var(--text-alt)]">2022 — 2024</span>
                        </div>
                        <p className="text-sm text-[var(--text-alt)] mb-1">Higher Secondary Certificate (HSC) · Science Stream</p>
                        <p className="text-sm text-[var(--text)] font-medium mb-4">Percentage: 76.17%</p>
                        <ul className="space-y-2 text-[var(--text-alt)] text-[0.95rem] leading-relaxed list-disc list-inside">
                            <li>Completed 12th standard in Science stream with a focus on Physics, Chemistry, and Mathematics.</li>
                            <li>Developed early interest in programming and computer science during this period.</li>
                            <li>Built foundational knowledge in mathematics and logical thinking that laid the groundwork for engineering studies.</li>
                        </ul>
                    </div>
                </div>
            </div>

            <SiteFooter />
        </main>
    );
}
