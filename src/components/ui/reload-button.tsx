import { useState } from "react";

const ReloadButton = ({ className }: { className?: string }) => {
  const [spinning, setSpinning] = useState(false);

  const handleReload = () => {
    if (spinning) return;
    setSpinning(true);
    // give a short spin animation before reloading
    setTimeout(() => {
      // full reload
      window.location.reload();
    }, 700);
  };

  return (
    <button
      aria-label="Reload page"
      onClick={handleReload}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-200 text-sm font-medium ${className || ""}`}
    >
      <span
        className={`inline-block ${spinning ? "animate-spin" : ""} w-5 h-5 rounded-full flex items-center justify-center`}
      >
        {/* simple refresh icon */}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
          <path d="M21 12a9 9 0 10-3.16 6.3L21 21v-9z" />
        </svg>
      </span>
      <span>Reload</span>
    </button>
  );
};

export default ReloadButton;
