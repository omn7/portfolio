import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";

type SectionKey = "hero" | "about" | "hackathons" | "projects" | "skills" | "resume" | "footer";

const sectionOrder: SectionKey[] = [
  "hero",
  "about",
  "hackathons",
  "projects",
  "skills",
  "resume",
  "footer",
];

const messages: Record<SectionKey, string> = {
  hero: "Welcome! Scroll to explore the levels.",
  about: "This is the player bio. Get to know me!",
  hackathons: "Side Quests: Hackathons I've joined.",
  projects: "Featured builds and experiments ahead.",
  skills: "Power-ups: My core skills stack.",
  resume: "Grab the resume for full details.",
  footer: "That's the end! Links + socials here.",
};

// Progressive image source resolution: try /guide/N.png → /N.png → /guides/N.png
function useGuideImage(index: number) {
  const tried = useRef(0);
  const candidates = useMemo(() => [
    `/guide/${index}.png`,
    `/${index}.png`,
    `/guides/${index}.png`,
  ], [index]);
  const [src, setSrc] = useState(candidates[0]);
  useEffect(() => {
    tried.current = 0;
    setSrc(candidates[0]);
  }, [candidates]);
  const onError = () => {
    tried.current += 1;
    if (tried.current < candidates.length) setSrc(candidates[tried.current]);
  };
  return { src, onError };
}

export default function ScrollGuide() {
  const [active, setActive] = useState<SectionKey>("hero");
  const lastActive = useRef<SectionKey>("hero");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioPrimed = useRef(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const lastIndexRef = useRef<number>(0);
  const [muted, setMuted] = useState<boolean>(() => {
    try { return localStorage.getItem('guideMuted') === '1'; } catch { return false; }
  });
  const playRing = () => {
    const base = audioRef.current;
    // Try file-based playback first
    if (base && base.src && !base.src.endsWith(".html")) {
      try {
        const a = new Audio(base.src);
        a.volume = base.volume;
        a.play().catch((err) => {
          console.warn("ring play blocked:", err);
          playSynthRing();
        });
        return;
      } catch (err) {
        console.warn("ring init error:", err);
      }
    }
    // Fallback: synthesize a short ring using WebAudio
    playSynthRing();
  };

  const playSynthRing = () => {
    try {
      const AudioCtx: any = (window as any).AudioContext || (window as any).webkitAudioContext;
      if (!audioCtxRef.current && AudioCtx) audioCtxRef.current = new AudioCtx();
      const ctx = audioCtxRef.current;
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      osc1.type = "sine"; osc2.type = "square";
      osc1.frequency.setValueAtTime(1400, now);
      osc2.frequency.setValueAtTime(2100, now);
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.25, now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc1.connect(gain); osc2.connect(gain); gain.connect(ctx.destination);
      osc1.start(now); osc2.start(now);
      osc1.stop(now + 0.26); osc2.stop(now + 0.26);
    } catch (e) {
      console.warn("synth ring failed", e);
    }
  };
  const manualOverride = useRef<SectionKey | null>(null);

  // Lazy init audio element
  useEffect(() => {
    if (!audioRef.current) {
      const a = new Audio("/sonic_rings.mp3");
      a.preload = "auto";
      a.volume = 0.6;
      audioRef.current = a;
    }
  }, []);

  // Prime audio on first user interaction to satisfy autoplay policies
  useEffect(() => {
    const prime = async () => {
      if (audioPrimed.current) return;
      try {
        // Prepare WebAudio context
        const AudioCtx: any = (window as any).AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) {
          if (!audioCtxRef.current) audioCtxRef.current = new AudioCtx();
          await audioCtxRef.current.resume();
        }
        // Lightly touch the <audio> element (silent) to satisfy policies
        const a = audioRef.current;
        if (a) {
          const original = a.volume;
          a.volume = 0; // silent
          await a.play().catch(() => {});
          a.pause();
          a.currentTime = 0;
          a.volume = original;
        }
        audioPrimed.current = true;
      } catch {
        // ignore
      }
    };
    const events = ["pointerdown", "keydown", "touchstart"]; // user-gesture only
    events.forEach((e) => window.addEventListener(e, prime, { once: true } as any));
    return () => events.forEach((e) => window.removeEventListener(e, prime as any));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (manualOverride.current) return; // respect manual override until cleared
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const key = visible.target.getAttribute("data-guide-key") as SectionKey | null;
        if (key && key !== active) setActive(key);
      },
      // A thin band near the top of the viewport so change happens when
      // the heading reaches the top, not middle
      { root: null, threshold: [0], rootMargin: "-96% 0px -4% 0px" }
    );

    // Observe known section anchors if present
    sectionOrder.forEach((k) => {
      const node = document.querySelector(`[data-guide-key="${k}"]`);
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, [active]);

  // Allow other components to request a specific character/section via event
  useEffect(() => {
    const aliasMap: Record<string, SectionKey> = {
      "completed-quests": "projects",
      projects: "projects",
      hackathons: "hackathons",
      about: "about",
      hero: "hero",
      skills: "skills",
      resume: "resume",
      footer: "footer",
    };
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as string | undefined;
      if (!detail) return;
      const key = aliasMap[detail.toLowerCase?.() || detail];
      if (key) {
        manualOverride.current = key;
        setActive(key);
        // clear override shortly so scrolling continues to work
        window.setTimeout(() => {
          manualOverride.current = null;
        }, 800);
      }
    };
    window.addEventListener("guide:set", handler as EventListener);
    return () => window.removeEventListener("guide:set", handler as EventListener);
  }, []);

  // Play ring sound when character (section) changes only when scrolling down
  useEffect(() => {
    if (lastActive.current === active) return;
    const prevIdx = lastIndexRef.current;
    const nextIdx = sectionOrder.indexOf(active);
    const scrollingDown = nextIdx > prevIdx;
    lastActive.current = active;
    lastIndexRef.current = nextIdx;
    if (!muted && scrollingDown) playRing();
  }, [active]);

  // Listen for external mute toggles
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as boolean | undefined;
      if (typeof detail === 'boolean') {
        setMuted(detail);
        try { localStorage.setItem('guideMuted', detail ? '1' : '0'); } catch {}
      }
    };
    window.addEventListener('guide:mute', handler as EventListener);
    return () => window.removeEventListener('guide:mute', handler as EventListener);
  }, []);

  const index = useMemo(() => sectionOrder.indexOf(active) + 1, [active]);
  const { src, onError } = useGuideImage(index);

  return (
    <div className="fixed right-4 bottom-4 md:right-6 md:bottom-6 z-50">
      {/* Relative stage so cloud overlays IN FRONT of the character */}
      <div className="relative pointer-events-none w-[320px] md:w-[380px] h-[160px] md:h-[180px]">
        {/* Hidden audio element to ensure asset is loaded by the browser */}
        <audio ref={audioRef} src="/sonic_rings.mp3" preload="auto" className="hidden" />
        {/* Character (behind) */}
        <motion.img
          src={src}
          onError={onError}
          alt={`Guide ${index}`}
          className="absolute right-0 bottom-0 w-20 h-20 md:w-24 md:h-24 object-contain drop-shadow-xl pointer-events-auto z-0"
          animate={{ y: [0, -2, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        />

        {/* Message box (no image) placed IN FRONT of the face */}
        <div className="absolute right-14 md:right-16 bottom-10 md:bottom-12 z-10 pointer-events-auto select-none">
          {messages[active] ? (
            <div className="bg-black/75 border-2 border-white/70 rounded-md px-4 py-3 md:px-5 md:py-4 drop-shadow-[0_0_10px_rgba(0,0,0,0.4)] max-w-[18rem] md:max-w-[24rem]">
              <div className="text-[12px] md:text-base font-mono leading-snug text-white">
                <Typewriter
                  key={active}
                  onInit={(tw) => {
                    tw.typeString(messages[active]).start();
                  }}
                  options={{
                    delay: 20,
                    cursor: "",
                    autoStart: true,
                  }}
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
