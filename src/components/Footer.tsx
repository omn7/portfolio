import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { useEffect, useState } from "react";

const quotes = [
  "Why do Indian programmers never get lost? They always follow the path variable!",
  "In India, chai breaks are for debugging life and code.",
  "My code runs, I don't know why. My code doesn't run, I don't know why. #IndianDeveloper",
  "Stack Overflow > Google > Mom's advice. The Indian dev's debugging flow.",
  "If at first you don't succeed, call it version 1.0 (and have some samosas).",
  "Code like Sharmaji's son is watching!",
  "Ctrl+C, Ctrl+V: The Indian way to meet deadlines.",
  "When in doubt, add more masala (or semicolons).",
  "Why did the Indian coder refuse to use tabs? Because spaces are vastu compliant!",
  "404: Chai not found. Please refill to continue coding."
];

const Footer = () => {
  const [quoteIndex, setQuoteIndex] = useState(() => Math.floor(Math.random() * quotes.length));

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="border-t border-border py-8 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/bg2.jpg"
          alt="Footer background"
          className="w-full h-full object-cover"
          style={{ opacity: 0.15 }}
        />
      </div>
      <div className="container mx-auto flex flex-col items-center justify-center gap-3 text-center relative z-10">
        <div className="flex gap-5 mb-2">
          <a
            href="https://github.com/omn7"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="rounded-full p-2 bg-white/5 hover:bg-primary/20 transition-all duration-200 shadow-md animate-bounce-slow"
          >
            <Github className="h-5 w-5 text-muted-foreground" />
          </a>
          <a
            href="https://linkedin.com/in/omnarkhede"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="rounded-full p-2 bg-white/5 hover:bg-primary/20 transition-all duration-200 shadow-md animate-bounce-slow"
          >
            <Linkedin className="h-5 w-5 text-muted-foreground" />
          </a>
          <a
            href="https://x.com/mr_codex"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="rounded-full p-2 bg-white/5 hover:bg-primary/20 transition-all duration-200 shadow-md animate-bounce-slow"
          >
            <Twitter className="h-5 w-5 text-muted-foreground" />
          </a>
        </div>
        <div className="text-base text-muted-foreground font-semibold">
          &copy; {new Date().getFullYear()} Om Narkhede. All rights reserved. Made with ❤️.
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Mail className="h-5 w-5" />
          <a href="mailto:dev.om@outlook.com" className="underline hover:text-primary transition-colors">dev.om@outlook.com</a>
        </div>
        <div className="mt-3 text-xs italic text-muted-foreground transition-opacity duration-500 animate-pulse">
          {quotes[quoteIndex]}
        </div>
      </div>
    </footer>
  );
};

export default Footer;