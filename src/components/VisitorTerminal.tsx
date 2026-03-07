import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

// ════════════════════════════════════════════════════════
//  TECH NEWS — RSS feed popup via rss2json.com
// ════════════════════════════════════════════════════════

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  thumbnail: string;
  source: string;
}

const RSS_FEEDS = [
  { url: "https://techcrunch.com/feed/", source: "TechCrunch" },
  { url: "https://www.theverge.com/rss/index.xml", source: "The Verge" },
  { url: "https://hnrss.org/frontpage", source: "Hacker News" },
];

const RSS2JSON = "https://api.rss2json.com/v1/api.json?rss_url=";

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

async function fetchAllFeeds(): Promise<NewsItem[]> {
  const results = await Promise.allSettled(
    RSS_FEEDS.map(async (feed) => {
      const res = await fetch(`${RSS2JSON}${encodeURIComponent(feed.url)}`);
      const data = await res.json();
      if (data.status !== "ok" || !data.items) return [];
      return data.items.slice(0, 4).map((item: any) => ({
        title: item.title || "",
        link: item.link || "",
        pubDate: item.pubDate || "",
        thumbnail: item.thumbnail || item.enclosure?.link || "",
        source: feed.source,
      }));
    })
  );

  const all: NewsItem[] = [];
  for (const r of results) {
    if (r.status === "fulfilled") all.push(...r.value);
  }

  // Sort by date descending, take top 8
  all.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
  return all.slice(0, 8);
}

// ════════════════════════════════════════════════════════
//  COMPONENT
// ════════════════════════════════════════════════════════

export default function VisitorTerminal() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [articles, setArticles] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleOpen = useCallback(async () => {
    setOpen(true);
    setLoading(true);
    setError("");
    setArticles([]);

    try {
      const items = await fetchAllFeeds();
      if (items.length === 0) {
        setError("No articles found. Try again later.");
      } else {
        setArticles(items);
      }
    } catch {
      setError("Failed to fetch news. Check your connection.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setOpen(false);
      setClosing(false);
      setArticles([]);
      setError("");
    }, 200);
  };

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [open]);

  const sourceColor = (source: string) => {
    switch (source) {
      case "TechCrunch": return "#0a9b00";
      case "The Verge": return "#e8503a";
      case "Hacker News": return "#ff6600";
      default: return "var(--text-alt)";
    }
  };

  return (
    <>
      {/* Circular "NEWS IN TECH" icon */}
      <button
        onClick={handleOpen}
        aria-label="Tech news"
        className="group relative"
        style={{ cursor: "pointer" }}
      >
        <svg
          width="38"
          height="38"
          viewBox="0 0 100 100"
          className="transition-transform duration-300 group-hover:scale-110"
          style={{ filter: "drop-shadow(0 0 0px transparent)", transition: "filter 0.3s, transform 0.3s" }}
          onMouseEnter={e => { (e.currentTarget as SVGSVGElement).style.filter = "drop-shadow(0 0 6px var(--text))"; }}
          onMouseLeave={e => { (e.currentTarget as SVGSVGElement).style.filter = "drop-shadow(0 0 0px transparent)"; }}
        >
          {/* Outer circle */}
          <circle cx="50" cy="50" r="47" fill="none" stroke="var(--text)" strokeWidth="1.5" opacity="0.5" />
          <circle cx="50" cy="50" r="40" fill="none" stroke="var(--text)" strokeWidth="0.5" opacity="0.25" />

          {/* Circular text "NEWS IN TECH" */}
          <defs>
            <path id="circleTextPath" d="M 50,50 m -33,0 a 33,33 0 1,1 66,0 a 33,33 0 1,1 -66,0" />
          </defs>
          <text fill="var(--text)" opacity="0.7" fontSize="10.5" fontFamily="monospace" letterSpacing="5.5" fontWeight="bold">
            <textPath href="#circleTextPath" startOffset="3%">
              NEWS IN TECH
            </textPath>
          </text>

          {/* Center news icon — newspaper/document */}
          <g transform="translate(50,50)" fill="var(--text)" opacity="0.85">
            {/* Paper body */}
            <rect x="-10" y="-11" width="20" height="22" rx="1.5" fill="none" stroke="var(--text)" strokeWidth="1.5" />
            {/* Text lines */}
            <line x1="-6" y1="-6" x2="6" y2="-6" stroke="var(--text)" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="-6" y1="-1" x2="6" y2="-1" stroke="var(--text)" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="-6" y1="4" x2="2" y2="4" stroke="var(--text)" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        </svg>
      </button>

      {/* Modal overlay */}
      {open && (
        <div
          className={`fixed inset-0 z-[9999] flex items-center justify-center px-4 ${closing ? "animate-fadeOut" : "animate-fadeIn"}`}
          style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)" }}
          onClick={handleClose}
        >
          <div
            className={`relative w-full max-w-2xl border border-[var(--text)] border-opacity-20 shadow-2xl ${closing ? "animate-scaleOut" : "animate-scaleIn"}`}
            style={{ backgroundColor: "var(--bg)" }}
            onClick={e => e.stopPropagation()}
          >
            {/* Title bar */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--text)] border-opacity-15">
              <span className="text-sm text-[var(--text)] font-mono tracking-wider">📰 Live Tech News</span>
              <button
                onClick={handleClose}
                className="text-[var(--text-alt)] hover:text-[var(--text)] transition-colors text-sm font-bold leading-none"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* News body */}
            <div
              className="p-4 overflow-y-auto"
              style={{ maxHeight: "72vh" }}
            >
              {loading && (
                <div className="flex flex-col items-center justify-center py-16 gap-3">
                  <div
                    className="w-6 h-6 border-2 border-[var(--text-alt)] border-t-[var(--text)] rounded-full animate-spin"
                  />
                  <span className="text-xs text-[var(--text-alt)] font-mono">Fetching latest articles...</span>
                </div>
              )}

              {error && (
                <div className="flex items-center justify-center py-16">
                  <span className="text-sm text-[var(--text-alt)] font-mono">{error}</span>
                </div>
              )}

              {!loading && !error && articles.length > 0 && (
                <div className="flex flex-col gap-3">
                  {articles.map((article, i) => (
                    <a
                      key={i}
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="no-underline group/card flex gap-3 p-3 border border-[var(--text)] border-opacity-10 hover:border-opacity-30 transition-all duration-200"
                      style={{ backgroundColor: "var(--bg)" }}
                    >
                      {/* Thumbnail */}
                      {article.thumbnail && (
                        <div className="flex-shrink-0 w-20 h-16 sm:w-24 sm:h-[72px] overflow-hidden">
                          <img
                            src={article.thumbnail}
                            alt=""
                            className="w-full h-full object-cover"
                            onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
                          />
                        </div>
                      )}

                      {/* Content */}
                      <div className="flex flex-col justify-between min-w-0 flex-1">
                        <h3 className="text-[13px] sm:text-sm leading-snug text-[var(--text)] font-medium line-clamp-2 group-hover/card:underline m-0">
                          {article.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span
                            className="text-[10px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5"
                            style={{ color: sourceColor(article.source), border: `1px solid ${sourceColor(article.source)}40` }}
                          >
                            {article.source}
                          </span>
                          <span className="text-[11px] text-[var(--text-alt)] font-mono">
                            {timeAgo(article.pubDate)}
                          </span>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {!loading && articles.length > 0 && (
              <div className="px-5 py-2.5 border-t border-[var(--text)] border-opacity-10 flex items-center justify-between">
                <span className="text-[10px] text-[var(--text-alt)] font-mono">
                  {articles.length} articles from {[...new Set(articles.map(a => a.source))].length} sources
                </span>
                <div className="flex items-center gap-4">
                  <button
                    onClick={(e) => { e.stopPropagation(); navigate("/news"); handleClose(); }}
                    className="text-[10px] text-[var(--text)] hover:underline font-mono transition-colors no-underline"
                  >
                    View detailed news →
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleOpen(); }}
                    className="text-[10px] text-[var(--text-alt)] hover:text-[var(--text)] font-mono transition-colors no-underline"
                  >
                    ↻ refresh
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
