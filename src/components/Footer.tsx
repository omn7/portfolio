import { Github, Linkedin, Twitter, Mail, Heart } from "lucide-react";
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
    <footer className="bg-[#0a0a16] border-t-4 border-[#ff00ff] py-12 relative overflow-hidden">
      <div className="container mx-auto flex flex-col items-center justify-center gap-6 text-center relative z-10">
        
        <h2 className="text-2xl font-heading text-[#ff00ff] animate-pulse drop-shadow-[0_0_10px_#ff00ff]">GAME OVER</h2>
        
        <div className="flex gap-6 mb-2">
          {[
            { icon: Github, href: "https://github.com/omn7", label: "GitHub" },
            { icon: Linkedin, href: "https://linkedin.com/in/omnarkhede", label: "LinkedIn" },
            { icon: Twitter, href: "https://x.com/mr_codex", label: "Twitter" }
          ].map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="p-3 bg-[#13132b] border-2 border-white hover:border-[#00ffff] hover:text-[#00ffff] text-white transition-all duration-200 shadow-retro hover:translate-y-1 hover:shadow-none"
            >
              <social.icon className="h-5 w-5" />
            </a>
          ))}
        </div>

        <div className="font-heading text-xs text-gray-400">
          CREDITS: &copy; {new Date().getFullYear()} OM NARKHEDE
        </div>

        <div className="flex items-center gap-2 text-sm font-sans text-[#00ffff]">
          <Mail className="h-4 w-4" />
          <a href="mailto:dev.om@outlook.com" className="hover:text-white transition-colors">dev.om@outlook.com</a>
        </div>

        <div className="mt-4 max-w-md p-4 border-2 border-dashed border-[#00ffff]/30 bg-[#13132b]">
          <p className="text-xs font-heading text-[#00ff00] leading-relaxed">
            NPC SAYS: "{quotes[quoteIndex]}"
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;