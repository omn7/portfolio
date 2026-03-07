import { useState, useEffect } from "react";

const quotes = [
    "The only way to do great work is to love what you do.",
    "Code is like humor. When you have to explain it, it's bad.",
    "First, solve the problem. Then, write the code.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Experience is the name everyone gives to their mistakes.",
    "Simplicity is the soul of efficiency.",
    "Make it work, make it right, make it fast.",
];

export default function SiteFooter() {
    const [quote, setQuote] = useState("");

    useEffect(() => {
        setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
        const interval = setInterval(() => {
            setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <footer className="w-full flex flex-col md:flex-row justify-between items-center gap-2 text-sm text-[var(--text)] mt-auto pb-6 pt-4">
            <div className="italic text-center md:text-left max-w-sm">"{quote}"</div>
            <div className="text-center md:text-right">© {new Date().getFullYear()} Om Narkhede. All rights reserved.</div>
        </footer>
    );
}
