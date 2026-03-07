import { useState, useEffect } from "react";

const quotes = [
    "He who knows others is wise; he who knows himself is enlightened.",
    "The unexamined life is not worth living.",
    "Happiness depends upon ourselves.",
    "Man is condemned to be free.",
    "We are what we repeatedly do.",
    "Knowing yourself is the beginning of wisdom.",
    "To live is to suffer, to survive is to find meaning in the suffering.",
    "No man ever steps in the same river twice.",
    "The mind is everything. What you think you become.",
    "Freedom is nothing but a chance to be better.",
    "Life must be understood backward but lived forward.",
    "The only true wisdom is knowing you know nothing.",
    "He who has a why to live can bear almost any how.",
    "Reality is created by perception.",
    "Man suffers because he takes seriously what the gods made for fun.",
    "The greater the difficulty, the greater the glory.",
    "Peace comes from within. Do not seek it without.",
    "Everything that irritates us about others can lead us to ourselves.",
    "Between stimulus and response there is freedom.",
    "Time is the wisest counselor of all.",
    "The wound is the place where the light enters you.",
    "A man who conquers himself is the mightiest warrior.",
    "Silence is sometimes the deepest answer.",
    "He who fears death will never do anything worth living.",
    "To understand everything is to forgive everything.",
    "Your vision becomes clear only when you look into your heart.",
    "The privilege of a lifetime is to become who you truly are.",
    "What you seek is seeking you.",
    "Where there is ruin, there is hope for a treasure.",
    "A person often meets his destiny on the road he took to avoid it.",
    "The mind that is stretched by new ideas never returns to its original size.",
    "You become what you give your attention to.",
    "He who opens a school door closes a prison.",
    "The price of anything is the amount of life you exchange for it.",
    "The quieter you become, the more you can hear.",
    "The meaning of life is to give life meaning.",
    "Every man takes the limits of his own vision for the limits of the world.",
    "Knowing others is intelligence; knowing yourself is true wisdom.",
    "In the middle of chaos lies opportunity.",
    "Nothing in life is to be feared, only understood.",
    "Life is really simple, but we insist on making it complicated.",
    "A journey of a thousand miles begins with a single step.",
    "The soul becomes dyed with the color of its thoughts.",
    "Happiness is not an ideal of reason but of imagination.",
    "To love oneself is the beginning of a lifelong romance.",
    "Truth is rarely pure and never simple.",
    "The deeper the sorrow, the greater the joy.",
    "Man is the measure of all things.",
    "He who controls others may be powerful, but he who has mastered himself is mightier still.",
    "The universe is change; our life is what our thoughts make it.",
];

export default function SiteFooter() {
    const [quote, setQuote] = useState("");
    const [elapsed, setElapsed] = useState(() => {
        try { return parseInt(localStorage.getItem("timeSpent") || "0", 10); } catch { return 0; }
    });

    useEffect(() => {
        setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
        const quoteInterval = setInterval(() => {
            setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
        }, 10000);

        const timerInterval = setInterval(() => {
            setElapsed(prev => {
                const next = prev + 1;
                try { localStorage.setItem("timeSpent", String(next)); } catch {}
                return next;
            });
        }, 1000);

        return () => {
            clearInterval(quoteInterval);
            clearInterval(timerInterval);
        };
    }, []);

    const mins = Math.floor(elapsed / 60);
    const secs = elapsed % 60;
    const timeStr = mins > 0 ? `${mins}m ${secs.toString().padStart(2, "0")}s` : `${secs}s`;

    return (
        <footer className="w-full flex flex-col md:flex-row justify-between items-center gap-2 text-sm text-[var(--text)] mt-auto pb-6 pt-4">
            <div className="italic text-center md:text-left max-w-sm">"{quote}"</div>
            <div className="text-[var(--text-alt)] text-xs">time spent: {timeStr}</div>
            <div className="text-center md:text-right">© {new Date().getFullYear()} Om Narkhede. All rights reserved.</div>
        </footer>
    );
}
