import { useEffect, useState } from "react";
import { Project } from "./ProjectDeck";

interface ProjectTerminalProps {
  project: Project | null;
}

const ProjectTerminal = ({ project }: ProjectTerminalProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [loadingDots, setLoadingDots] = useState(".");

  // Loading animation for footer
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingDots(prev => prev.length >= 3 ? "." : prev + ".");
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Reset typing when project changes
  useEffect(() => {
    setDisplayedText("");
    setCurrentLineIndex(0);
    setCurrentCharIndex(0);
  }, [project]);

  useEffect(() => {
    if (!project) return;

    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { hour12: false });
    
    const lines = [
      `[${timeString}] > CONNECTING TO DATABASE...`,
      `[${timeString}] > ACCESSING PROJECT FILE: ${project.id.toUpperCase()}`,
      `[${timeString}] > TITLE: ${project.title}`,
      `[${timeString}] > STATUS: ${project.status ? project.status : 'COMPLETED'}`,
      `[${timeString}] > DESCRIPTION: ${project.description}`,
      `[${timeString}] > TECH_STACK: [${project.technologies.join(', ')}]`,
      `[${timeString}] > END_OF_FILE`
    ];

    if (currentLineIndex >= lines.length) return;

    const currentLine = lines[currentLineIndex];

    if (currentCharIndex < currentLine.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => {
            const isNewLine = currentCharIndex === 0 && currentLineIndex > 0;
            return prev + (isNewLine ? "\n" : "") + currentLine[currentCharIndex];
        });
        setCurrentCharIndex(prev => prev + 1);
      }, 10); // Slightly faster typing
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1);
        setCurrentCharIndex(0);
      }, 100); // Faster line break
      return () => clearTimeout(timeout);
    }
  }, [project, currentLineIndex, currentCharIndex]);

  if (!project) return null;

  const renderStyledText = (text: string) => {
    return text.split('\n').map((line, i) => {
      // Match: [TIMESTAMP] > (optional LABEL:) CONTENT
      const match = line.match(/^(\[.*?\] >)(?:\s+([A-Z_]+):)?(.*)$/);
      
      if (match) {
        const [_, prefix, label, content] = match;
        return (
          <div key={i} className="leading-relaxed">
            <span className="text-amber-500">{prefix}</span>
            {label && <span className="text-amber-600"> {label}:</span>}
            <span className="text-gray-100">{content}</span>
          </div>
        );
      }
      return <div key={i} className="text-gray-100">{line}</div>;
    });
  };

  return (
    <div className="w-full max-w-md h-[350px] bg-black border-2 border-amber-500/50 font-sans text-lg shadow-[0_0_20px_rgba(245,158,11,0.2)] relative overflow-hidden rounded-md flex flex-col mx-auto lg:mx-0">
      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] bg-repeat opacity-10 z-20" />
      
      {/* Header */}
      <div className="flex items-center justify-between bg-neutral-900 text-amber-500 p-2 font-bold text-base border-b border-amber-500/50 z-10 select-none">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-700/80"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-amber-600/80"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
          </div>
          <span className="tracking-wider opacity-80">[ SYSTEM: ttyS1.onarkhede ]</span>
        </div>
        <span className="tracking-wider opacity-80">[ STATUS: OK ]</span>
      </div>

      {/* Content */}
      <div className="relative z-10 p-6 flex-1 overflow-y-auto scrollbar-hide">
        <div className="text-lg md:text-xl font-medium leading-snug">
          {renderStyledText(displayedText)}
          <span className="animate-pulse inline-block w-2.5 h-5 bg-amber-500 ml-1 align-middle mt-1"></span>
        </div>
      </div>

      {/* Footer */}
      <div className="p-2 text-sm border-t border-amber-500/30 flex justify-end items-center text-amber-500/70 z-10 select-none bg-neutral-900/50">
         <span>PROCESSING_DATA [ {loadingDots.padEnd(3, ' ')} ]</span>
      </div>
    </div>
  );
};

export default ProjectTerminal;
