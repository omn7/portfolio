import { useState } from "react";
import { motion } from "framer-motion";

interface PixelTreasureChestProps {
  onClick?: () => void;
}

export default function PixelTreasureChest({ onClick }: PixelTreasureChestProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative flex flex-col items-center cursor-pointer select-none group"
      style={{ width: 140 }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onClick={onClick}
      role="button"
      aria-label="Open Hackathon Logs"
    >
      <motion.svg
        viewBox="0 0 120 120"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-full h-auto text-[var(--text)] transition-transform duration-300 group-hover:scale-105"
        style={{ overflow: "visible" }}
      >
        {/* Glow / Sparkles when open */}
        <motion.g
          initial={{ opacity: 0, y: 10 }}
          animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.4 }}
        >
          {/* Sparkles */}
          <path d="M 20 25 Q 20 15 30 15 Q 20 15 20 5 Q 20 15 10 15 Q 20 15 20 25" fill="currentColor" stroke="none" />
          <path d="M 95 30 Q 95 23 102 23 Q 95 23 95 16 Q 95 23 88 23 Q 95 23 95 30" fill="currentColor" stroke="none" />
          <path d="M 50 15 Q 50 9 56 9 Q 50 9 50 3 Q 50 9 44 9 Q 50 9 50 15" fill="currentColor" stroke="none" />
          {/* Documents popping out */}
          <path d="M 40 60 L 40 35 C 40 32 42 30 45 30 L 75 30 C 78 30 80 32 80 35 L 80 60" fill="var(--bg)" stroke="currentColor" strokeWidth="2.5" />
          <path d="M 50 40 L 70 40 M 50 48 L 65 48" stroke="currentColor" strokeWidth="2.5" />
        </motion.g>

        {/* Chest Base */}
        <path
          d="M 25 60 L 95 60 L 92 95 C 92 100 88 105 82 105 L 38 105 C 32 105 28 100 28 95 Z"
          fill="var(--bg-secondary)"
          stroke="currentColor"
        />
        {/* Base Straps */}
        <path d="M 45 60 L 42 104 M 75 60 L 78 104" stroke="currentColor" />
        {/* Base Lock Hole */}
        <circle cx="60" cy="74" r="4" fill="currentColor" stroke="none" />
        <path d="M 58 74 L 62 74 L 61 82 L 59 82 Z" fill="currentColor" stroke="none" />

        {/* Animated Lid */}
        <motion.g
          animate={open ? { rotateX: 60, y: -15 } : { rotateX: 0, y: 0 }}
          style={{ transformOrigin: "60px 60px" }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          {/* Lid Background/Outline */}
          <path
            d="M 22 60 C 22 25 98 25 98 60 Z"
            fill="var(--bg)"
            stroke="currentColor"
          />
          {/* Lid Bottom Edge */}
          <path d="M 22 60 L 98 60" stroke="currentColor" />
          {/* Lid Straps */}
          <path d="M 45 60 C 45 40 50 35 60 35 C 70 35 75 40 75 60" stroke="currentColor" fill="none" />
          {/* Rivets */}
          <circle cx="45" cy="50" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="75" cy="50" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="60" cy="42" r="1.5" fill="currentColor" stroke="none" />

          {/* Top lock latch */}
          <path d="M 54 60 L 54 66 C 54 68 66 68 66 66 L 66 60" fill="var(--bg)" stroke="currentColor" />
        </motion.g>

        {/* Highlight details for Notion style */}
        {/* Small misaligned accent fill */}
        <path
          d="M 28 95 C 28 100 32 105 38 105 L 82 105 C 88 105 92 100 92 95"
          fill="none"
          stroke="var(--border)"
          strokeWidth="6"
          className="opacity-20"
          style={{ transform: "translate(-2px, 2px)" }}
        />
      </motion.svg>

      {/* Label below chest */}
      <p className="mt-3 font-heading text-center tracking-widest text-xs font-semibold text-[var(--text-secondary)] transition-colors duration-300 group-hover:text-[var(--text)]">
        HACKATHON LOGS
      </p>
    </div>
  );
}
