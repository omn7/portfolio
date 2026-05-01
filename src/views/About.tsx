"use client";
import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { useDark } from "@/hooks/useDark";
import SiteFooter from "@/components/SiteFooter";

export default function About() {
    const [dark, setDark] = useDark();

    return (
        <main className="max-w-4xl mx-auto px-6 py-6 flex flex-col min-h-screen font-mono">
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
                <h1 className="text-3xl font-bold tracking-tight mb-6">About Me</h1>
                <div className="h-px bg-[var(--text)] opacity-20 w-full mb-10" />

                <div className="space-y-6 text-[1.05rem] leading-relaxed text-[var(--text-alt)] max-w-2xl">
                    <p>
                        I'm a passionate second-year <span className="text-[var(--text)] font-semibold">Computer Engineering</span> student at <span className="text-[var(--text)]">Bharati Vidyapeeth College of Engineering (BVCOE)</span> with a strong interest in building modern web applications and exploring innovative technologies.
                    </p>

                    <p>
                        I work as a <span className="text-[var(--text)] font-semibold">Full-Stack Developer</span>, building dynamic, scalable, and user-friendly web applications while focusing on performance and great user experience. I enjoy transforming ideas into practical digital solutions.
                    </p>

                    <p>
                        Previously, I worked as an Intern at <Link href="/experience" className="text-[var(--text)] underline underline-offset-4 hover:opacity-80 transition-opacity">SR Analytics</Link>, where I gained real-world exposure to development workflows and problem-solving in a professional environment.
                    </p>

                    <p>
                        Alongside development, I'm strengthening my problem-solving skills by learning <span className="text-[var(--text)]">Data Structures and Algorithms (DSA)</span> using Java, which helps me write efficient and optimized code.
                    </p>

                    <p>
                        I also serve as the <Link href="/experience" className="text-[var(--text)] font-semibold underline underline-offset-4 hover:opacity-80 transition-opacity">President of BV Codeverse</Link>, the official coding club of our college, where I help organize technical events, encourage collaborative learning, and build a strong coding community among students.
                    </p>

                    <p>
                        I'm also passionate about <span className="text-[var(--text)]">AI integration</span> in applications and enjoy exploring innovative ways to enhance digital experiences.
                    </p>

                    <p>
                        I strongly believe in continuous learning, refining my coding skills, and staying updated with emerging technologies to grow as both a developer and a leader in the tech community.
                    </p>
                </div>

                <div className="mt-10 flex flex-wrap gap-6">
                    <a href="https://github.com/omn7" target="_blank" rel="noopener noreferrer" className="text-[var(--text)] hover:underline underline-offset-4 font-semibold text-lg">github</a>
                    <a href="https://linkedin.com/in/omnarkhede" target="_blank" rel="noopener noreferrer" className="text-[var(--text)] hover:underline underline-offset-4 font-semibold text-lg">linkedin</a>
                    <a href="mailto:dev.om@outlook.com" className="text-[var(--text)] hover:underline underline-offset-4 font-semibold text-lg">email</a>
                </div>

                <div className="mt-10 border border-[var(--text)] border-opacity-20 p-6">
                    <h3 className="text-sm uppercase tracking-wider text-[var(--text-alt)] mb-4">contact</h3>
                    <div className="space-y-2 text-[0.95rem]">
                        <p className="text-[var(--text-alt)]">Email: <a href="mailto:dev.om@outlook.com" className="text-[var(--text)] underline underline-offset-4 hover:opacity-80 transition-opacity">dev.om@outlook.com</a></p>
                        <p className="text-[var(--text-alt)]">GitHub: <a href="https://github.com/omn7" target="_blank" rel="noopener noreferrer" className="text-[var(--text)] underline underline-offset-4 hover:opacity-80 transition-opacity">github.com/omn7</a></p>
                        <p className="text-[var(--text-alt)]">LinkedIn: <a href="https://linkedin.com/in/omnarkhede" target="_blank" rel="noopener noreferrer" className="text-[var(--text)] underline underline-offset-4 hover:opacity-80 transition-opacity">in/omnarkhede</a></p>
                        <p className="text-[var(--text-alt)]">Twitter: <a href="https://twitter.com/mr_codex" target="_blank" rel="noopener noreferrer" className="text-[var(--text)] underline underline-offset-4 hover:opacity-80 transition-opacity">@mr_codex</a></p>
                        <p className="text-[var(--text-alt)]">Location: Pune, Maharashtra, India</p>
                    </div>
                </div>
            </div>

            {/* Skills Section */}
            <div className="mb-16">
                <h2 className="text-2xl font-bold tracking-tight mb-6">Skills</h2>
                <div className="h-px bg-[var(--text)] opacity-20 w-full mb-10" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Frontend */}
                    <div className="border border-[var(--text)] border-opacity-20 p-5">
                        <h3 className="text-xs uppercase tracking-wider text-[var(--text-alt)] mb-5">frontend</h3>
                        <div className="space-y-3">
                            {[
                                { name: "React", icon: "/skillsicon/reactjs.png" },
                                { name: "TypeScript", icon: "/skillsicon/typescript.png" },
                                { name: "JavaScript", icon: "/skillsicon/javascript.png" },
                                { name: "Next.js", icon: "/skillsicon/nextjs.png" },
                                { name: "Tailwind CSS", icon: "/skillsicon/tailwind.png" },
                                { name: "Vite", icon: "/skillsicon/vite.png" },
                            ].map((skill) => (
                                <div key={skill.name} className="flex items-center gap-3 group">
                                    <img src={skill.icon} alt={skill.name} className="w-5 h-5 object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" />
                                    <span className="text-sm text-[var(--text-alt)] group-hover:text-[var(--text)] transition-colors">{skill.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Backend */}
                    <div className="border border-[var(--text)] border-opacity-20 p-5">
                        <h3 className="text-xs uppercase tracking-wider text-[var(--text-alt)] mb-5">backend</h3>
                        <div className="space-y-3">
                            {[
                                { name: "Node.js", icon: "/skillsicon/Nodejs.png" },
                                { name: "Express.js", icon: "/skillsicon/expressjs.png" },
                                { name: "Python", icon: "/skillsicon/python.png" },
                                { name: "Java", icon: "/skillsicon/java.png" },
                                { name: "PostgreSQL", icon: "/skillsicon/postgress.png" },
                                { name: "MongoDB", icon: "/skillsicon/mongodb.png" },
                                { name: "Supabase", icon: "/skillsicon/supabase.png" },
                                { name: "Firebase", icon: "/skillsicon/firebase.png" },
                                { name: "Django", icon: "/skillsicon/django.png" },
                            ].map((skill) => (
                                <div key={skill.name} className="flex items-center gap-3 group">
                                    <img src={skill.icon} alt={skill.name} className="w-5 h-5 object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" />
                                    <span className="text-sm text-[var(--text-alt)] group-hover:text-[var(--text)] transition-colors">{skill.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tools */}
                    <div className="border border-[var(--text)] border-opacity-20 p-5">
                        <h3 className="text-xs uppercase tracking-wider text-[var(--text-alt)] mb-5">tools</h3>
                        <div className="space-y-3">
                            {[
                                { name: "Git", icon: "/skillsicon/git.png" },
                                { name: "GitHub", icon: "/skillsicon/github.png" },
                                { name: "Docker", icon: "/skillsicon/docker.png" },
                                { name: "AWS", icon: "/skillsicon/aws.png" },
                                { name: "Postman", icon: "/skillsicon/postman.png" },
                                { name: "VS Code", icon: "/skillsicon/vscode.png" },
                            ].map((skill) => (
                                <div key={skill.name} className="flex items-center gap-3 group">
                                    <img src={skill.icon} alt={skill.name} className="w-5 h-5 object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" />
                                    <span className="text-sm text-[var(--text-alt)] group-hover:text-[var(--text)] transition-colors">{skill.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <SiteFooter />
        </main>
    );
}
