import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { useDark } from "@/components/Layout";
import SiteFooter from "@/components/SiteFooter";

export default function ExperienceEducation() {
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

            {/* ── Experience ── */}
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

                    {/* Freelance */}
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

            {/* ── Education ── */}
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
