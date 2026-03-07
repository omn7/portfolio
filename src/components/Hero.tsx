import { ArrowRight, FileText } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section id="hero" className="flex flex-col items-start justify-center max-w-4xl mx-auto px-6 pt-32 pb-20 gap-8 min-h-[85vh] text-left">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-start space-y-8 w-full"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--accent-bg)] text-[var(--accent)] rounded-full text-xs font-semibold tracking-wide border border-[var(--accent)]/20"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--accent)]"></span>
          </span>
          Available for opportunities
        </motion.div>

        <h1 className="notion-h1 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text)] max-w-3xl leading-tight">
          20 y/o undergraduate studying computer Engineering.
        </h1>

        <p className="notion-body text-lg md:text-xl max-w-2xl text-[var(--text-muted)] leading-relaxed">
          My areas of interest are computer vision, machine learning, cloud and devops. I like building systems that scale and automate processes.
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full sm:w-auto"
        >
          <button
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            className="notion-btn-primary flex items-center justify-center gap-2 px-6 py-2.5 text-sm md:text-base w-full sm:w-auto transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Explore my work <ArrowRight size={16} />
          </button>
          <a
            href="https://drive.google.com/file/d/1kdkcr4ii43_6OZDs39wJLYM2whZZ49td/view?usp=drivesdk"
            target="_blank"
            rel="noopener noreferrer"
            className="notion-btn-ghost flex items-center justify-center gap-2 px-6 py-2.5 text-sm md:text-base w-full sm:w-auto transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <FileText size={16} /> View Resume
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
