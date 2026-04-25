"use client";
import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { useDark } from "@/components/Layout";
import { useState, useEffect, useCallback } from "react";
import SiteFooter from "@/components/SiteFooter";

// ════════════════════════════════════════════════════════
//  RSS FEED TYPES & HELPERS
// ════════════════════════════════════════════════════════

interface NewsArticle {
  title: string;
  link: string;
  pubDate: string;
  thumbnail: string;
  description: string;
  content: string;
  author: string;
  source: string;
}

interface CategoryDef {
  id: string;
  label: string;
  icon: string;
  feeds: { url: string; source: string }[];
}

const CATEGORIES: CategoryDef[] = [
  {
    id: "tech", label: "Tech", icon: "💻",
    feeds: [
      { url: "https://techcrunch.com/feed/", source: "TechCrunch" },
      { url: "https://www.theverge.com/rss/index.xml", source: "The Verge" },
      { url: "https://www.wired.com/feed/rss", source: "Wired" },
      { url: "https://feeds.arstechnica.com/arstechnica/index", source: "Ars Technica" },
    ],
  },
  {
    id: "ai", label: "AI", icon: "🤖",
    feeds: [
      { url: "https://hnrss.org/frontpage", source: "Hacker News" },
      { url: "https://dev.to/feed", source: "Dev.to" },
      { url: "https://www.smashingmagazine.com/feed/", source: "Smashing Magazine" },
    ],
  },
  {
    id: "cybersecurity", label: "Cybersecurity", icon: "🔐",
    feeds: [
      { url: "https://krebsonsecurity.com/feed/", source: "Krebs on Security" },
      { url: "https://feeds.feedburner.com/TheHackersNews", source: "The Hacker News" },
      { url: "https://www.darkreading.com/rss.xml", source: "Dark Reading" },
    ],
  },
  {
    id: "space", label: "Space", icon: "🚀",
    feeds: [
      { url: "https://www.nasa.gov/rss/dyn/breaking_news.rss", source: "NASA" },
      { url: "https://www.space.com/feeds/all", source: "Space.com" },
      { url: "https://www.esa.int/rssfeed/Our_Activities/Space_News", source: "ESA" },
    ],
  },
  {
    id: "launches", label: "Rocket Launches", icon: "🛰️",
    feeds: [
      { url: "https://spaceflightnow.com/feed/", source: "Spaceflight Now" },
      { url: "https://www.nasa.gov/rss/dyn/launches.rss", source: "NASA Launches" },
    ],
  },
  {
    id: "astronomy", label: "Astronomy", icon: "🔭",
    feeds: [
      { url: "https://skyandtelescope.org/feed/", source: "Sky & Telescope" },
      { url: "https://www.universetoday.com/feed/", source: "Universe Today" },
    ],
  },
  {
    id: "science", label: "Science", icon: "🔬",
    feeds: [
      { url: "https://www.sciencedaily.com/rss/all.xml", source: "ScienceDaily" },
      { url: "https://www.nature.com/nature.rss", source: "Nature" },
    ],
  },
  {
    id: "robotics", label: "Robotics", icon: "🤖",
    feeds: [
      { url: "https://spectrum.ieee.org/rss/robotics/fulltext", source: "IEEE Spectrum" },
      { url: "https://www.roboticsbusinessreview.com/feed/", source: "Robotics Business Review" },
    ],
  },
  {
    id: "quantum", label: "Quantum", icon: "🧠",
    feeds: [
      { url: "https://quantumcomputingreport.com/feed/", source: "Quantum Computing Report" },
      { url: "https://physicsworld.com/feed/", source: "Physics World" },
    ],
  },
  {
    id: "war", label: "War", icon: "⚔️",
    feeds: [
      { url: "https://www.defensenews.com/arc/outboundfeeds/rss/?outputType=xml", source: "Defense News" },
      { url: "https://www.reutersagency.com/feed/?best-topics=world", source: "Reuters" },
      { url: "http://feeds.bbci.co.uk/news/world/rss.xml", source: "BBC World" },
    ],
  },
  {
    id: "sports", label: "Sports", icon: "⚽",
    feeds: [
      { url: "https://www.espn.com/espn/rss/news", source: "ESPN" },
      { url: "http://feeds.bbci.co.uk/sport/rss.xml", source: "BBC Sport" },
      { url: "https://www.skysports.com/rss/12040", source: "Sky Sports" },
    ],
  },
  {
    id: "business", label: "Business", icon: "💰",
    feeds: [
      { url: "https://www.forbes.com/business/feed/", source: "Forbes" },
      { url: "https://feeds.bloomberg.com/markets/news.rss", source: "Bloomberg" },
    ],
  },
  {
    id: "finance", label: "Finance", icon: "📈",
    feeds: [
      { url: "https://finance.yahoo.com/news/rssindex", source: "Yahoo Finance" },
      { url: "https://feeds.marketwatch.com/marketwatch/topstories/", source: "MarketWatch" },
    ],
  },
  {
    id: "environment", label: "Environment", icon: "🌱",
    feeds: [
      { url: "https://www.nationalgeographic.com/content/natgeo/en_us/index.rss", source: "National Geographic" },
      { url: "https://e360.yale.edu/rss.xml", source: "Yale Environment 360" },
    ],
  },
  {
    id: "earthquakes", label: "Earthquakes", icon: "🌍",
    feeds: [
      { url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.atom", source: "USGS All" },
      { url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_day.atom", source: "USGS Significant" },
    ],
  },
  {
    id: "gaming", label: "Gaming", icon: "🎮",
    feeds: [
      { url: "https://feeds.ign.com/ign/games-all", source: "IGN" },
      { url: "https://www.gamespot.com/feeds/news/", source: "GameSpot" },
    ],
  },
  {
    id: "movies", label: "Movies", icon: "🎬",
    feeds: [
      { url: "https://variety.com/feed/", source: "Variety" },
      { url: "https://editorial.rottentomatoes.com/feed/", source: "Rotten Tomatoes" },
    ],
  },
  {
    id: "weird", label: "Weird", icon: "😂",
    feeds: [
      { url: "https://www.reddit.com/r/interestingasfuck/.rss", source: "r/interestingasfuck" },
      { url: "https://www.reddit.com/r/todayilearned/.rss", source: "r/todayilearned" },
      { url: "https://www.reddit.com/r/Damnthatsinteresting/.rss", source: "r/Damnthatsinteresting" },
    ],
  },
  {
    id: "trivia", label: "Trivia", icon: "🧩",
    feeds: [
      { url: "https://www.mentalfloss.com/rss.xml", source: "Mental Floss" },
    ],
  },
  {
    id: "world", label: "World", icon: "🌎",
    feeds: [
      { url: "http://feeds.bbci.co.uk/news/rss.xml", source: "BBC News" },
      { url: "https://www.reutersagency.com/feed/?best-topics=world", source: "Reuters World" },
    ],
  },
  {
    id: "india", label: "India", icon: "🇮🇳",
    feeds: [
      { url: "https://timesofindia.indiatimes.com/rssfeedstopstories.cms", source: "Times of India" },
      { url: "https://indianexpress.com/feed/", source: "Indian Express" },
      { url: "https://www.thehindu.com/news/national/feeder/default.rss", source: "The Hindu" },
      { url: "https://www.firstpost.com/rss", source: "Firstpost" },
      { url: "https://news.abplive.com/news/india/feed", source: "ABP Live" },
      { url: "https://www.oneindia.com/rss/feeds/news-india-fb.xml", source: "Oneindia" },
    ],
  },
  {
    id: "india-tech", label: "Indian Tech", icon: "🇮🇳",
    feeds: [
      { url: "https://gadgets360.com/rss/news", source: "Gadgets 360" },
      { url: "https://news.abplive.com/technology/feed", source: "ABP Tech" },
    ],
  },
  {
    id: "india-biz", label: "Indian Business", icon: "🇮🇳",
    feeds: [
      { url: "https://inc42.com/feed/", source: "Inc42" },
      { url: "https://www.moneycontrol.com/rss/latestnews.xml", source: "Moneycontrol" },
      { url: "https://www.livemint.com/rss/news", source: "Livemint" },
      { url: "https://news.abplive.com/business/feed", source: "ABP Business" },
    ],
  },
  {
    id: "india-ent", label: "Indian Entertainment", icon: "🇮🇳",
    feeds: [
      { url: "https://www.bollywoodhungama.com/rss/news.xml", source: "Bollywood Hungama" },
    ],
  },
  {
    id: "india-markets", label: "Indian Markets", icon: "🇮🇳",
    feeds: [
      { url: "https://news.google.com/rss/search?q=sensex+nifty+BSE+NSE+stock+market&hl=en-IN&gl=IN&ceid=IN:en", source: "Google News • Indian Markets" },
      { url: "https://news.google.com/rss/search?q=indian+stock+market+today&hl=en-IN&gl=IN&ceid=IN:en", source: "Google News • Stocks India" },
      { url: "https://www.reddit.com/r/IndianStockMarket/.rss", source: "r/IndianStockMarket" },
    ],
  },
  {
    id: "global-markets", label: "Global Markets", icon: "📈",
    feeds: [
      { url: "https://news.google.com/rss/search?q=stock+market+S%26P+500+NASDAQ+Dow&hl=en&gl=US&ceid=US:en", source: "Google News • Wall Street" },
      { url: "https://news.google.com/rss/search?q=global+stock+market+trading&hl=en&gl=US&ceid=US:en", source: "Google News • Global Markets" },
      { url: "https://feeds.marketwatch.com/marketwatch/topstories/", source: "MarketWatch" },
    ],
  },
  {
    id: "crypto", label: "Crypto", icon: "🪙",
    feeds: [
      { url: "https://news.google.com/rss/search?q=cryptocurrency+bitcoin+ethereum&hl=en&gl=US&ceid=US:en", source: "Google News • Crypto" },
      { url: "https://cointelegraph.com/rss", source: "Cointelegraph" },
      { url: "https://www.reddit.com/r/CryptoCurrency/.rss", source: "r/CryptoCurrency" },
    ],
  },
];

// Build source→category lookup
const SOURCE_TO_CATEGORY: Record<string, { id: string; label: string; icon: string }> = {};
CATEGORIES.forEach(cat => {
  cat.feeds.forEach(f => {
    SOURCE_TO_CATEGORY[f.source] = { id: cat.id, label: cat.label, icon: cat.icon };
  });
});

const ALL_CATEGORY_IDS = CATEGORIES.map(c => c.id);

const RSS2JSON = "https://api.rss2json.com/v1/api.json?rss_url=";
const SAVED_KEY = "savedNewsArticles";
const CATS_KEY = "newsSelectedCategories";

interface SavedArticle extends NewsArticle {
  note: string;
  tags: string[];
  savedAt: string;
}

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

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return dateStr;
  }
}

function stripHtml(html: string): string {
  if (typeof window === "undefined") return html.replace(/<[^>]*>?/gm, "");
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}

function extractFirstImage(html: string): string {
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match ? match[1] : "";
}

// In-memory cache to survive HMR and avoid re-fetching on every code save
const articleCache: { key: string; articles: NewsArticle[]; ts: number } = { key: "", articles: [], ts: 0 };
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function parseFeedItems(data: any, source: string): NewsArticle[] {
  if (data.status !== "ok" || !data.items) return [];
  return data.items.slice(0, 8).map((item: any) => {
    const contentHtml = item.content || item.description || "";
    const descriptionText = stripHtml(item.description || item.content || "");
    const thumb = item.thumbnail || item.enclosure?.link || extractFirstImage(contentHtml) || "";
    return {
      title: item.title || "",
      link: item.link || "",
      pubDate: item.pubDate || "",
      thumbnail: thumb,
      description: descriptionText.slice(0, 300) + (descriptionText.length > 300 ? "..." : ""),
      content: descriptionText,
      author: item.author || "",
      source,
    };
  });
}

/**
 * Streams articles to the UI as each feed resolves.
 * Uses a concurrency limiter (max 4 in-flight) to avoid 429s.
 */
async function fetchAllArticles(
  feeds: { url: string; source: string }[],
  onUpdate?: (articlesSoFar: NewsArticle[]) => void,
): Promise<NewsArticle[]> {
  const cacheKey = feeds.map(f => f.url).sort().join("|");
  if (articleCache.key === cacheKey && articleCache.articles.length > 0 && Date.now() - articleCache.ts < CACHE_TTL) {
    return articleCache.articles;
  }

  const all: NewsArticle[] = [];
  const MAX_CONCURRENT = 4;
  let running = 0;
  let idx = 0;

  await new Promise<void>((resolve) => {
    function next() {
      // All done
      if (idx >= feeds.length && running === 0) { resolve(); return; }

      // Launch up to MAX_CONCURRENT
      while (running < MAX_CONCURRENT && idx < feeds.length) {
        const feed = feeds[idx++];
        running++;
        fetch(`${RSS2JSON}${encodeURIComponent(feed.url)}`)
          .then(res => {
            if (!res.ok) return null;
            return res.json();
          })
          .then(data => {
            if (data) {
              const items = parseFeedItems(data, feed.source);
              if (items.length > 0) {
                all.push(...items);
                onUpdate?.(interleaveArticles(all));
              }
            }
          })
          .catch(() => {})
          .finally(() => {
            running--;
            // Tiny stagger to be kind to rss2json
            setTimeout(next, 300);
          });
      }
    }
    next();
  });

  const final = interleaveArticles(all);
  if (final.length > 0) {
    articleCache.key = cacheKey;
    articleCache.articles = final;
    articleCache.ts = Date.now();
  }
  return final;
}

/** Interleave articles so the same source doesn't appear back-to-back */
function interleaveArticles(articles: NewsArticle[]): NewsArticle[] {
  const sorted = [...articles].sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
  const interleaved: NewsArticle[] = [];
  const bySource: Record<string, NewsArticle[]> = {};
  for (const a of sorted) {
    (bySource[a.source] ??= []).push(a);
  }
  const queues = Object.values(bySource);
  queues.sort((a, b) => b.length - a.length);
  let lastSource = "";
  while (queues.some(q => q.length > 0)) {
    let picked = false;
    for (const q of queues) {
      if (q.length > 0 && q[0].source !== lastSource) {
        const item = q.shift()!;
        interleaved.push(item);
        lastSource = item.source;
        picked = true;
        break;
      }
    }
    if (!picked) {
      for (const q of queues) {
        if (q.length > 0) {
          const item = q.shift()!;
          interleaved.push(item);
          lastSource = item.source;
          break;
        }
      }
    }
    queues.sort((a, b) => b.length - a.length);
  }
  return interleaved;
}

// ════════════════════════════════════════════════════════
//  SOURCE COLORS
// ════════════════════════════════════════════════════════

function sourceColor(source: string): string {
  const colors: Record<string, string> = {
    TechCrunch: "#0a9b00",
    "The Verge": "#e8503a",
    Wired: "#9b59b6",
    "Ars Technica": "#ff4500",
    "Hacker News": "#ff6600",
    "Dev.to": "#3b49df",
    "Smashing Magazine": "#e44d2a",
    "Krebs on Security": "#2ecc71",
    "The Hacker News": "#27ae60",
    "Dark Reading": "#1a1a2e",
    NASA: "#4a7fb5",
    "NASA Launches": "#4a7fb5",
    "Space.com": "#1e3a5f",
    ESA: "#003399",
    "Spaceflight Now": "#2c3e50",
    "Sky & Telescope": "#2e86de",
    "Universe Today": "#5b2c6f",
    ScienceDaily: "#17a589",
    Nature: "#3b6fa0",
    "IEEE Spectrum": "#00629b",
    "Robotics Business Review": "#e67e22",
    "Quantum Computing Report": "#8e44ad",
    "Physics World": "#2980b9",
    "Defense News": "#7d3c98",
    Reuters: "#ff8200",
    "Reuters World": "#ff8200",
    "BBC World": "#c0392b",
    "BBC News": "#c0392b",
    "BBC Sport": "#c0392b",
    ESPN: "#cc2200",
    "Sky Sports": "#e74c3c",
    Forbes: "#b71234",
    Bloomberg: "#472f92",
    "Yahoo Finance": "#6001d2",
    MarketWatch: "#1e824c",
    "National Geographic": "#f1c40f",
    "Yale Environment 360": "#27ae60",
    "USGS All": "#d35400",
    "USGS Significant": "#d35400",
    IGN: "#bf1313",
    GameSpot: "#f39c12",
    Variety: "#c94050",
    "Rotten Tomatoes": "#f93208",
    "r/interestingasfuck": "#ff4500",
    "r/todayilearned": "#ff4500",
    "r/Damnthatsinteresting": "#ff4500",
    "Mental Floss": "#0db3d9",
    "Times of India": "#d42b24",
    "Indian Express": "#c11b17",
    "The Hindu": "#1a3c6e",
    Firstpost: "#e03c31",
    "ABP Live": "#e53935",
    "ABP Tech": "#e53935",
    "ABP Business": "#e53935",
    Oneindia: "#ff6f00",
    "Gadgets 360": "#e91e63",
    Inc42: "#1565c0",
    Moneycontrol: "#522e91",
    Livemint: "#36454f",
    "Bollywood Hungama": "#ff1744",
    "Google News \u2022 Indian Markets": "#e53935",
    "Google News \u2022 Stocks India": "#d32f2f",
    "r/IndianStockMarket": "#ff4500",
    "Google News \u2022 Wall Street": "#1565c0",
    "Google News \u2022 Global Markets": "#0d47a1",
    "Google News \u2022 Crypto": "#f7931a",
    Cointelegraph: "#27ae60",
    "r/CryptoCurrency": "#ff4500",
  };
  return colors[source] || "var(--text-alt)";
}

// ════════════════════════════════════════════════════════
//  LOCALSTORAGE HELPERS
// ════════════════════════════════════════════════════════

function loadSaved(): SavedArticle[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(SAVED_KEY);
    if (!raw) return [];
    // Migrate old format (NewsArticle[]) to SavedArticle[]
    const parsed = JSON.parse(raw);
    return parsed.map((a: any) => ({
      ...a,
      note: a.note || "",
      tags: a.tags || [],
      savedAt: a.savedAt || a.pubDate || new Date().toISOString(),
    }));
  } catch {
    return [];
  }
}

function persistSaved(items: SavedArticle[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(SAVED_KEY, JSON.stringify(items));
  } catch {}
}

function loadCategories(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CATS_KEY);
    if (!raw) return []; // first visit — no preferences yet
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
    return [];
  } catch {
    return [];
  }
}

function hasStoredPreferences(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(CATS_KEY) !== null;
}

function persistCategories(ids: string[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CATS_KEY, JSON.stringify(ids));
  } catch {}
}

// ════════════════════════════════════════════════════════
//  TOAST WARNING COMPONENT
// ════════════════════════════════════════════════════════

function Toast({ message, type, onClose }: { message: string; type: "save" | "remove"; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] animate-fadeIn font-mono border border-[var(--text)] border-opacity-30 px-5 py-3 shadow-lg max-w-sm w-[90vw] sm:w-auto"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <div className="flex items-start gap-3">
        <span className="text-sm mt-0.5">
          {type === "save" ? "⚠" : "✕"}
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-[var(--text)] font-bold mb-0.5">
            {type === "save" ? "Saved to localStorage" : "Removed from saved"}
          </p>
          <p className="text-[11px] text-[var(--text-alt)] leading-snug line-clamp-2">
            {message}
          </p>
          <p className="text-[10px] text-[var(--text-alt)] mt-1 opacity-60">
            {type === "save"
              ? "This article is stored locally in your browser. It will persist until you clear site data."
              : "Article removed from your reading list."}
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-[var(--text-alt)] hover:text-[var(--text)] text-xs font-bold no-underline shrink-0"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════
//  SAVE DIALOG — note + tags before saving
// ════════════════════════════════════════════════════════

const SUGGESTED_TAGS = ["important", "read later", "AI/ML", "startups", "web", "security", "mobile", "cloud"];

function SaveDialog({ article, onSave, onCancel }: {
  article: NewsArticle;
  onSave: (note: string, tags: string[]) => void;
  onCancel: () => void;
}) {
  const [note, setNote] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  function addTag(tag: string) {
    const t = tag.trim().toLowerCase();
    if (t && !tags.includes(t)) setTags(prev => [...prev, t]);
  }

  function removeTag(tag: string) {
    setTags(prev => prev.filter(t => t !== tag));
  }

  function handleTagKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(tagInput);
      setTagInput("");
    }
  }

  // Close on Escape
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onCancel(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onCancel]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4 animate-fadeIn"
      style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
      onClick={onCancel}
    >
      <div
        className="w-full max-w-md border border-[var(--text)] border-opacity-20 shadow-2xl animate-scaleIn"
        style={{ backgroundColor: "var(--bg)" }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--text)] border-opacity-15">
          <span className="text-xs text-[var(--text)] font-mono font-bold">Save article</span>
          <button onClick={onCancel} className="text-[var(--text-alt)] hover:text-[var(--text)] text-sm font-bold no-underline">✕</button>
        </div>

        <div className="p-5 space-y-4">
          {/* Article preview */}
          <div className="border-l-2 border-[var(--text)] border-opacity-20 pl-3">
            <p className="text-xs text-[var(--text)] font-medium line-clamp-2 leading-snug">{article.title}</p>
            <p className="text-[10px] text-[var(--text-alt)] mt-0.5">{article.source}</p>
          </div>

          {/* Note */}
          <div>
            <label className="text-[10px] text-[var(--text-alt)] font-mono uppercase tracking-wider block mb-1.5">Note (optional)</label>
            <textarea
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="Why are you saving this?"
              rows={2}
              className="w-full bg-transparent border border-[var(--text)] border-opacity-20 focus:border-opacity-50 text-xs text-[var(--text)] font-mono p-2.5 outline-none resize-none placeholder:text-[var(--text-alt)] placeholder:opacity-50"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="text-[10px] text-[var(--text-alt)] font-mono uppercase tracking-wider block mb-1.5">Tags (optional)</label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {tags.map(tag => (
                <span key={tag} className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 border border-[var(--text)] border-opacity-30 text-[var(--text)]">
                  {tag}
                  <button onClick={() => removeTag(tag)} className="text-[var(--text-alt)] hover:text-[var(--text)] no-underline font-bold">×</button>
                </span>
              ))}
            </div>
            <input
              type="text"
              value={tagInput}
              onChange={e => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              placeholder="Type a tag and press Enter"
              className="w-full bg-transparent border border-[var(--text)] border-opacity-20 focus:border-opacity-50 text-xs text-[var(--text)] font-mono p-2 outline-none placeholder:text-[var(--text-alt)] placeholder:opacity-50"
            />
            {/* Suggested tags */}
            <div className="flex flex-wrap gap-1 mt-2">
              {SUGGESTED_TAGS.filter(t => !tags.includes(t)).slice(0, 6).map(t => (
                <button
                  key={t}
                  onClick={() => addTag(t)}
                  className="text-[9px] font-mono px-1.5 py-0.5 border border-[var(--text)] border-opacity-10 text-[var(--text-alt)] hover:border-opacity-30 hover:text-[var(--text)] transition-colors no-underline"
                >
                  + {t}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-1">
            <button
              onClick={onCancel}
              className="text-xs font-mono text-[var(--text-alt)] hover:text-[var(--text)] no-underline transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => onSave(note.trim(), tags)}
              className="text-xs font-mono px-4 py-1.5 border border-[var(--text)] bg-[var(--text)] text-[var(--bg)] hover:opacity-80 transition-all no-underline font-bold"
            >
              Save article
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════
//  COMPONENT
// ════════════════════════════════════════════════════════

export default function News() {
  const [dark, setDark] = useDark();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<string>("All");
  const [saved, setSaved] = useState<SavedArticle[]>([]);
  const [toast, setToast] = useState<{ message: string; type: "save" | "remove" } | null>(null);
  const [showSaved, setShowSaved] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [saveDialogArticle, setSaveDialogArticle] = useState<NewsArticle | null>(null);
  const [sidebarTagFilter, setSidebarTagFilter] = useState<string | null>(null);
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [onboarding, setOnboarding] = useState(false);

  useEffect(() => {
    setSaved(loadSaved());
    const cats = loadCategories();
    setSelectedCats(cats);
    setOnboarding(!hasStoredPreferences());
  }, []);
  const [sidebarTab, setSidebarTab] = useState<"categories" | "saved">("categories");
  const [expandedArticle, setExpandedArticle] = useState<NewsArticle | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [showAllSources, setShowAllSources] = useState(false);

  const loadArticles = useCallback(async () => {
    const feeds = CATEGORIES
      .filter(c => selectedCats.includes(c.id))
      .flatMap(c => c.feeds);
    if (feeds.length === 0) {
      setArticles([]);
      setLoading(false);
      setError("Select at least one category to see news.");
      return;
    }
    setLoading(true);
    setLoadingMore(false);
    setError("");
    try {
      const items = await fetchAllArticles(feeds, (partial) => {
        // Show articles as they stream in
        setArticles(partial);
        setLoading(false);
        setLoadingMore(true);
      });
      if (items.length === 0) {
        setError("No articles found. Try again later.");
      } else {
        setArticles(items);
      }
    } catch {
      setError("Failed to fetch news. Check your connection.");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [selectedCats]);

  useEffect(() => {
    window.scrollTo(0, 0);

    // SEO: dynamic meta tags for /news
    const SITE = "https://omnarkhede.tech";
    const title = "World Radar — News From Every Corner | Om Narkhede";
    const description = "Stay updated with curated tech news, AI, web dev, science, Indian & global markets, crypto, and more — all in one feed. World Radar by Om Narkhede.";
    const url = `${SITE}/news`;
    const image = `${SITE}/worldradar.png`;

    document.title = title;

    const metaTags: Record<string, string> = {
      description,
      "og:title": title,
      "og:description": description,
      "og:url": url,
      "og:image": image,
      "og:image:width": "1200",
      "og:image:height": "630",
      "og:type": "website",
      "og:site_name": "Om Narkhede",
      "twitter:card": "summary_large_image",
      "twitter:title": title,
      "twitter:description": description,
      "twitter:image": image,
    };

    const cleanup: (() => void)[] = [];
    for (const [key, value] of Object.entries(metaTags)) {
      const isOg = key.startsWith("og:");
      const isTwitter = key.startsWith("twitter:");
      const attr = isOg ? "property" : "name";
      let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
      const existed = !!el;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      const prev = el.getAttribute("content");
      el.setAttribute("content", value);
      cleanup.push(() => {
        if (existed && prev !== null) el!.setAttribute("content", prev);
        else if (!existed) el!.remove();
      });
    }

    return () => { cleanup.forEach(fn => fn()); };
  }, []);

  useEffect(() => {
    loadArticles();
  }, [loadArticles]);

  function toggleCategory(catId: string) {
    setSelectedCats(prev => {
      const next = prev.includes(catId) ? prev.filter(id => id !== catId) : [...prev, catId];
      persistCategories(next);
      return next;
    });
    setFilter("All");
    setPage(1);
  }

  function selectAllCategories() {
    setSelectedCats(ALL_CATEGORY_IDS);
    persistCategories(ALL_CATEGORY_IDS);
    setFilter("All");
    setPage(1);
  }

  function clearAllCategories() {
    setSelectedCats([]);
    persistCategories([]);
    setFilter("All");
    setPage(1);
  }

  function confirmOnboarding() {
    if (selectedCats.length === 0) return;
    persistCategories(selectedCats);
    setOnboarding(false);
  }

  const isSaved = useCallback((link: string) => saved.some(s => s.link === link), [saved]);

  function handleSaveClick(article: NewsArticle, e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    if (isSaved(article.link)) {
      // Remove directly
      const next = saved.filter(s => s.link !== article.link);
      setSaved(next);
      persistSaved(next);
      setToast({ message: article.title, type: "remove" });
    } else {
      // Open save dialog
      setSaveDialogArticle(article);
    }
  }

  function handleConfirmSave(note: string, tags: string[]) {
    if (!saveDialogArticle) return;
    const savedArticle: SavedArticle = {
      ...saveDialogArticle,
      note,
      tags,
      savedAt: new Date().toISOString(),
    };
    const next = [savedArticle, ...saved];
    setSaved(next);
    persistSaved(next);
    setToast({ message: saveDialogArticle.title, type: "save" });
    setSaveDialogArticle(null);
  }

  function handleRemoveSaved(link: string) {
    const article = saved.find(s => s.link === link);
    const next = saved.filter(s => s.link !== link);
    setSaved(next);
    persistSaved(next);
    setToast({ message: article?.title || "Article", type: "remove" });
  }

  function clearAllSaved() {
    setSaved([]);
    persistSaved([]);
    setToast({ message: "All saved articles cleared", type: "remove" });
  }

  const activeSources = CATEGORIES
    .filter(c => selectedCats.includes(c.id))
    .flatMap(c => c.feeds.map(f => f.source));
  const sources = ["All", ...activeSources];
  const filtered = filter === "All" ? articles : articles.filter(a => a.source === filter);

  // Pagination
  const PER_PAGE = 10;
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  // All unique tags across saved articles
  const allSavedTags = [...new Set(saved.flatMap(s => s.tags))];
  const filteredSaved = sidebarTagFilter
    ? saved.filter(s => s.tags.includes(sidebarTagFilter))
    : saved;

  // ─── ONBOARDING GATE ───
  if (onboarding) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-6 flex flex-col min-h-[100dvh] font-mono">
        <div className="mb-4 mt-2 sm:mt-6">
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="text-[var(--text-alt)] hover:text-[var(--text)] hover:underline inline-block">
              ← back to index
            </Link>
            <button
              onClick={() => setDark(d => !d)}
              aria-label="Toggle theme"
              className="p-2 -mr-2 text-[var(--text-alt)] hover:text-[var(--text)] transition-colors shrink-0"
            >
              {dark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">What do you want to read?</h1>
          <p className="text-[var(--text-alt)] text-sm mb-8 max-w-md">
            Pick the topics you care about. We'll only show news from your selected categories. You can change this anytime from the sidebar.
          </p>

          <div className="flex flex-wrap gap-2.5 justify-center max-w-2xl mb-10">
            {CATEGORIES.map(cat => {
              const active = selectedCats.includes(cat.id);
              return (
                <button
                  key={cat.id}
                  onClick={() => toggleCategory(cat.id)}
                  className={`text-sm font-mono px-4 py-2 border transition-all no-underline flex items-center gap-2 ${
                    active
                      ? "border-[var(--text)] text-[var(--text)] font-bold"
                      : "border-[var(--text)] border-opacity-15 text-[var(--text-alt)] opacity-50 hover:opacity-80"
                  }`}
                >
                  <span className="text-base">{cat.icon}</span>
                  {cat.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={selectAllCategories}
              className="text-xs font-mono text-[var(--text-alt)] hover:text-[var(--text)] no-underline transition-colors"
            >
              select all
            </button>
            <button
              onClick={confirmOnboarding}
              disabled={selectedCats.length === 0}
              className="text-sm font-mono px-6 py-2.5 border border-[var(--text)] bg-[var(--text)] text-[var(--bg)] hover:opacity-80 transition-all no-underline font-bold disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Show my feed →
            </button>
          </div>

          {selectedCats.length > 0 && (
            <p className="text-[10px] text-[var(--text-alt)] mt-4 opacity-60">
              {selectedCats.length} of {ALL_CATEGORY_IDS.length} categories selected
            </p>
          )}
        </div>

        <SiteFooter />
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-4 flex flex-col min-h-[100dvh] font-mono">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-baseline gap-2">
          <Link href="/" className="text-[var(--text-alt)] hover:text-[var(--text)] hover:underline text-lg font-semibold no-underline">
            Home
          </Link>
          <span className="text-[var(--text-alt)] opacity-30">/</span>
          <h1 className="text-xl font-bold tracking-tight">World Radar</h1>
          <button
            onClick={loadArticles}
            disabled={loading}
            className="text-sm text-[var(--text-alt)] hover:text-[var(--text)] font-mono transition-colors no-underline disabled:opacity-40 border border-[var(--text)] border-opacity-20 hover:border-opacity-50 px-2 py-0.5 rounded-sm ml-1"
            title="Refresh feed"
          >
            {loading ? "⟳" : "↻"} reload
          </button>
        </div>
        <div className="flex items-center gap-2">
          {/* Sidebar toggle for mobile */}
          <button
            onClick={() => setShowSaved(s => !s)}
            className="lg:hidden text-xs font-mono text-[var(--text-alt)] hover:text-[var(--text)] border border-[var(--text)] border-opacity-20 px-2.5 py-1 no-underline transition-colors"
          >
            {showSaved ? "← Feed" : "☰ Menu"}
          </button>
          {/* Sidebar toggle for desktop */}
          {!sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="hidden lg:inline-flex text-xs font-mono text-[var(--text-alt)] hover:text-[var(--text)] border border-[var(--text)] border-opacity-20 px-2.5 py-1 no-underline transition-colors items-center gap-1.5"
            >
              ☰ Sidebar
            </button>
          )}
          <button
            onClick={() => setDark(d => !d)}
            aria-label="Toggle theme"
            className="p-1.5 text-[var(--text-alt)] hover:text-[var(--text)] transition-colors shrink-0"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>

      <div className="flex-1 flex gap-8">
        {/* ── LEFT: News feed ── */}
        <div className={`flex-1 min-w-0 ${showSaved ? "hidden lg:block" : ""}`}>
          <p className="text-[var(--text-alt)] text-sm mb-4">
            Showing {selectedCats.length} of {ALL_CATEGORY_IDS.length} categories.
          </p>

          {/* Active category chips */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {CATEGORIES.filter(c => selectedCats.includes(c.id)).map(cat => (
              <button
                key={cat.id}
                onClick={() => toggleCategory(cat.id)}
                className="text-[10px] font-mono px-2 py-1 border border-[var(--text)] border-opacity-30 text-[var(--text)] no-underline transition-all flex items-center gap-1 hover:border-opacity-60 group/chip"
              >
                <span>{cat.icon}</span>
                {cat.label}
                <span className="text-[var(--text-alt)] opacity-0 group-hover/chip:opacity-100 transition-opacity ml-0.5">×</span>
              </button>
            ))}
            {selectedCats.length < ALL_CATEGORY_IDS.length && (
              <button
                onClick={() => { setSidebarOpen(true); setSidebarTab("categories"); }}
                className="text-[10px] font-mono px-2 py-1 border border-dashed border-[var(--text)] border-opacity-20 text-[var(--text-alt)] no-underline transition-all hover:border-opacity-40 hover:text-[var(--text)]"
              >
                + add more
              </button>
            )}
          </div>

          <div className="h-px bg-[var(--text)] opacity-20 w-full mb-5" />

          {/* Source filter tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {(showAllSources ? sources : sources.slice(0, 5)).map((s) => (
              <button
                key={s}
                onClick={() => { setFilter(s); setPage(1); }}
                className={`text-xs font-mono px-3 py-1.5 border transition-all no-underline ${
                  filter === s
                    ? "border-[var(--text)] text-[var(--text)] font-bold"
                    : "border-[var(--text)] border-opacity-20 text-[var(--text-alt)] hover:border-opacity-50"
                }`}
              >
                {s}
              </button>
            ))}
            {sources.length > 5 && (
              <button
                onClick={() => setShowAllSources(p => !p)}
                className="text-xs font-mono px-3 py-1.5 border border-dashed border-[var(--text)] border-opacity-20 text-[var(--text-alt)] hover:text-[var(--text)] hover:border-opacity-50 transition-all no-underline"
              >
                {showAllSources ? `− show less` : `+ ${sources.length - 5} more`}
              </button>
            )}
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-24 gap-3">
              <div className="w-6 h-6 border-2 border-[var(--text-alt)] border-t-[var(--text)] rounded-full animate-spin" />
              <span className="text-xs text-[var(--text-alt)] font-mono">Fetching latest articles...</span>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <span className="text-sm text-[var(--text-alt)] font-mono">{error}</span>
              <button
                onClick={loadArticles}
                className="text-xs text-[var(--text)] font-mono border border-[var(--text)] border-opacity-30 px-4 py-2 hover:bg-[var(--text)] hover:text-[var(--bg)] transition-all no-underline"
              >
                Try again
              </button>
            </div>
          )}

          {/* Expanded article detail */}
          {expandedArticle && (
            <div className="border border-[var(--text)] border-opacity-20 mb-6 animate-fadeIn">
              <div className="p-5 sm:p-6">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <span
                    className="text-[11px] font-mono font-bold uppercase tracking-wider"
                    style={{ color: sourceColor(expandedArticle.source) }}
                  >
                    {expandedArticle.source}
                  </span>
                  <button
                    onClick={() => setExpandedArticle(null)}
                    className="text-[var(--text-alt)] hover:text-[var(--text)] text-sm font-mono no-underline shrink-0"
                  >
                    ✕ close
                  </button>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold leading-snug text-[var(--text)] mb-3">
                  {expandedArticle.title}
                </h2>

                <div className="flex items-center gap-2 text-[12px] text-[var(--text-alt)] font-mono mb-4">
                  {expandedArticle.author && (
                    <>
                      <span className="font-semibold">{expandedArticle.author}</span>
                      <span className="opacity-30">·</span>
                    </>
                  )}
                  <span>{formatDate(expandedArticle.pubDate)}</span>
                  <span className="opacity-30">·</span>
                  <span>{timeAgo(expandedArticle.pubDate)}</span>
                </div>

                {expandedArticle.thumbnail && (
                  <div className="w-full max-h-80 overflow-hidden mb-4">
                    <img
                      src={expandedArticle.thumbnail}
                      alt=""
                      className="w-full h-full object-cover"
                      onError={e => { (e.target as HTMLImageElement).parentElement!.style.display = "none"; }}
                    />
                  </div>
                )}

                <p className="text-sm text-[var(--text)] leading-relaxed mb-5 opacity-90">
                  {expandedArticle.content || expandedArticle.description || "No preview available."}
                </p>

                <div className="flex items-center gap-3 pt-3 border-t border-[var(--text)] border-opacity-10">
                  <a
                    href={expandedArticle.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono px-4 py-2 border border-[var(--text)] bg-[var(--text)] text-[var(--bg)] hover:opacity-80 transition-all no-underline font-bold"
                  >
                    Read full article →
                  </a>
                  <button
                    onClick={(e) => handleSaveClick(expandedArticle, e)}
                    className={`text-xs font-mono px-3 py-2 border transition-all no-underline ${
                      isSaved(expandedArticle.link)
                        ? "border-[var(--text)] bg-[var(--text)] text-[var(--bg)] hover:opacity-80"
                        : "border-[var(--text)] border-opacity-30 text-[var(--text-alt)] hover:bg-[var(--text)] hover:text-[var(--bg)]"
                    }`}
                  >
                    {isSaved(expandedArticle.link) ? "✓ saved" : "☆ save"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Articles */}
          {!loading && !error && filtered.length > 0 && (
            <div className="space-y-0">
              {paginated.map((article, i) => (
                <div
                  key={`${article.source}-${i}`}
                  className={`border-b border-[var(--text)] border-opacity-10 hover:bg-[var(--text)] hover:bg-opacity-[0.03] transition-all group relative cursor-pointer ${
                    expandedArticle?.link === article.link ? "bg-[var(--text)] bg-opacity-[0.06]" : ""
                  }`}
                  onClick={() => setExpandedArticle(expandedArticle?.link === article.link ? null : article)}
                >
                  <div className="flex gap-5 py-5 px-2">
                    {/* Thumbnail — left */}
                    {article.thumbnail ? (
                      <div className="w-24 h-24 sm:w-32 sm:h-32 shrink-0 overflow-hidden">
                        <img
                          src={article.thumbnail}
                          alt=""
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                          onError={e => { (e.target as HTMLImageElement).parentElement!.style.display = "none"; }}
                        />
                      </div>
                    ) : (
                      <div className="w-24 h-24 sm:w-32 sm:h-32 shrink-0 flex items-center justify-center border border-[var(--text)] border-opacity-10">
                        <span className="text-2xl opacity-20">{SOURCE_TO_CATEGORY[article.source]?.icon || "📰"}</span>
                      </div>
                    )}

                    {/* Content — right */}
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      {/* Category / source label */}
                      <span
                        className="text-[11px] font-mono font-bold uppercase tracking-wider mb-1.5 block"
                        style={{ color: sourceColor(article.source) }}
                      >
                        {article.source}
                      </span>

                      {/* Title */}
                      <h2 className="text-base sm:text-lg font-bold leading-snug text-[var(--text)] group-hover:underline underline-offset-4 mb-1.5 mt-0">
                        {article.title}
                      </h2>

                      {/* Description preview */}
                      {article.description && (
                        <p className="text-xs text-[var(--text-alt)] leading-relaxed mb-1.5 line-clamp-2 hidden sm:block">
                          {article.description.slice(0, 160)}{article.description.length > 160 ? "..." : ""}
                        </p>
                      )}

                      {/* Author + time */}
                      <div className="flex items-center gap-1.5 text-[12px] text-[var(--text-alt)] font-mono">
                        {article.author && (
                          <>
                            <span>{article.author}</span>
                            <span className="opacity-30">–</span>
                          </>
                        )}
                        <span>{timeAgo(article.pubDate)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Save button — overlaid top-right */}
                  <button
                    onClick={(e) => { e.stopPropagation(); handleSaveClick(article, e); }}
                    className={`absolute top-4 right-2 z-10 text-[10px] font-mono px-2 py-0.5 border transition-all no-underline ${
                      isSaved(article.link)
                        ? "border-[var(--text)] bg-[var(--text)] text-[var(--bg)] hover:opacity-80"
                        : "border-[var(--text)] border-opacity-20 text-[var(--text-alt)] bg-[var(--bg)] hover:bg-[var(--text)] hover:text-[var(--bg)] opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    {isSaved(article.link) ? "✓ saved" : "☆ save"}
                  </button>
                </div>
              ))}

              {/* Still loading more feeds */}
              {loadingMore && (
                <div className="flex items-center gap-2 py-6 px-2 text-[var(--text-alt)]">
                  <div className="w-4 h-4 border-2 border-[var(--text-alt)] border-t-[var(--text)] rounded-full animate-spin" />
                  <span className="text-xs font-mono">Loading more sources...</span>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <nav className="flex items-center justify-center gap-1 py-6 font-mono text-sm select-none">
                  {/* Prev */}
                  <button
                    onClick={() => { setPage(p => Math.max(1, p - 1)); setExpandedArticle(null); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    disabled={page === 1}
                    className="px-3 py-1.5 text-xs border border-[var(--text)] border-opacity-20 text-[var(--text-alt)] hover:text-[var(--text)] hover:border-opacity-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all no-underline"
                  >
                    ← Prev
                  </button>

                  {/* Page numbers */}
                  {(() => {
                    const pages: (number | string)[] = [];
                    if (totalPages <= 10) {
                      for (let i = 1; i <= totalPages; i++) pages.push(i);
                    } else {
                      pages.push(1);
                      if (page > 4) pages.push("...");
                      const start = Math.max(2, page - 2);
                      const end = Math.min(totalPages - 1, page + 2);
                      for (let i = start; i <= end; i++) pages.push(i);
                      if (page < totalPages - 3) pages.push("...");
                      pages.push(totalPages);
                    }
                    return pages.map((p, idx) =>
                      typeof p === "string" ? (
                        <span key={`ellipsis-${idx}`} className="px-2 py-1.5 text-[var(--text-alt)] opacity-50">…</span>
                      ) : (
                        <button
                          key={p}
                          onClick={() => { setPage(p); setExpandedArticle(null); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                          className={`min-w-[36px] px-2 py-1.5 text-xs border transition-all no-underline ${
                            p === page
                              ? "border-[var(--text)] bg-[var(--text)] text-[var(--bg)] font-bold"
                              : "border-[var(--text)] border-opacity-20 text-[var(--text-alt)] hover:text-[var(--text)] hover:border-opacity-50"
                          }`}
                        >
                          {p}
                        </button>
                      )
                    );
                  })()}

                  {/* Next */}
                  <button
                    onClick={() => { setPage(p => Math.min(totalPages, p + 1)); setExpandedArticle(null); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    disabled={page === totalPages}
                    className="px-3 py-1.5 text-xs border border-[var(--text)] border-opacity-20 text-[var(--text-alt)] hover:text-[var(--text)] hover:border-opacity-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all no-underline"
                  >
                    Next →
                  </button>
                </nav>
              )}

              {/* Page info */}
              {totalPages > 1 && (
                <div className="text-center text-[11px] font-mono text-[var(--text-alt)] opacity-60 pb-6">
                  Page {page} of {totalPages} · {filtered.length} articles
                </div>
              )}
            </div>
          )}

          {/* No results for filter */}
          {!loading && !error && filtered.length === 0 && articles.length > 0 && (
            <div className="flex items-center justify-center py-16">
              <span className="text-sm text-[var(--text-alt)] font-mono">No articles from {filter}.</span>
            </div>
          )}
        </div>

        {/* ── RIGHT: Sidebar ── */}
        <div className={`${showSaved ? "block" : "hidden"} ${sidebarOpen ? "lg:block" : "lg:hidden"} w-full lg:w-[300px] xl:w-[340px] shrink-0`}>
          <div className="lg:sticky lg:top-6">
            {/* Sidebar tabs */}
            <div className="flex border-b border-[var(--text)] border-opacity-15 mb-4">
              <button
                onClick={() => setSidebarTab("categories")}
                className={`flex-1 text-xs font-mono py-2 transition-all no-underline ${
                  sidebarTab === "categories"
                    ? "text-[var(--text)] font-bold border-b-2 border-[var(--text)]"
                    : "text-[var(--text-alt)] hover:text-[var(--text)]"
                }`}
              >
                Categories ({selectedCats.length})
              </button>
              <button
                onClick={() => setSidebarTab("saved")}
                className={`flex-1 text-xs font-mono py-2 transition-all no-underline ${
                  sidebarTab === "saved"
                    ? "text-[var(--text)] font-bold border-b-2 border-[var(--text)]"
                    : "text-[var(--text-alt)] hover:text-[var(--text)]"
                }`}
              >
                Saved ({saved.length})
              </button>
              {/* Close sidebar — desktop */}
              <button
                onClick={() => setSidebarOpen(false)}
                className="hidden lg:inline-flex text-xs text-[var(--text-alt)] hover:text-[var(--text)] font-mono no-underline px-2 items-center"
                title="Close sidebar"
              >
                ✕
              </button>
              {/* Back to feed — mobile */}
              <button
                onClick={() => setShowSaved(false)}
                className="lg:hidden text-xs text-[var(--text-alt)] hover:text-[var(--text)] font-mono no-underline px-2"
              >
                ← feed
              </button>
            </div>

            {/* ─── CATEGORIES TAB ─── */}
            {sidebarTab === "categories" && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono text-[var(--text-alt)] uppercase tracking-wider">Your interests</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={clearAllCategories}
                      className="text-[10px] font-mono text-[var(--text-alt)] hover:text-[var(--text)] no-underline transition-colors"
                    >
                      none
                    </button>
                    <span className="text-[var(--text-alt)] opacity-20">|</span>
                    <button
                      onClick={selectAllCategories}
                      className="text-[10px] font-mono text-[var(--text-alt)] hover:text-[var(--text)] no-underline transition-colors"
                    >
                      all
                    </button>
                  </div>
                </div>
                <div className="space-y-1.5 max-h-[70vh] overflow-y-auto pr-1">
                  {CATEGORIES.map(cat => {
                    const active = selectedCats.includes(cat.id);
                    return (
                      <button
                        key={cat.id}
                        onClick={() => toggleCategory(cat.id)}
                        className={`w-full text-left text-xs font-mono px-3 py-2 border transition-all no-underline flex items-center gap-2 ${
                          active
                            ? "border-[var(--text)] border-opacity-40 text-[var(--text)] font-bold"
                            : "border-[var(--text)] border-opacity-10 text-[var(--text-alt)] opacity-50 hover:opacity-80"
                        }`}
                      >
                        <span>{cat.icon}</span>
                        <span className="flex-1">{cat.label}</span>
                        <span className="text-[10px] opacity-50">{cat.feeds.length} feeds</span>
                        {active && <span className="text-[10px]">✓</span>}
                      </button>
                    );
                  })}
                </div>
                <p className="text-[9px] text-[var(--text-alt)] font-mono mt-3 opacity-50">
                  Preferences saved locally. Changes reload the feed automatically.
                </p>
              </div>
            )}

            {/* ─── SAVED TAB ─── */}
            {sidebarTab === "saved" && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-bold text-[var(--text)] tracking-wide">
                    Saved for later
                  </h2>
                  {saved.length > 0 && (
                    <button
                      onClick={clearAllSaved}
                      className="text-[10px] text-[var(--text-alt)] hover:text-[var(--text)] font-mono no-underline transition-colors"
                    >
                      clear all
                    </button>
                  )}
                </div>

            {/* Tag filter for saved */}
            {allSavedTags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                <button
                  onClick={() => setSidebarTagFilter(null)}
                  className={`text-[9px] font-mono px-1.5 py-0.5 border transition-all no-underline ${
                    !sidebarTagFilter
                      ? "border-[var(--text)] text-[var(--text)] font-bold"
                      : "border-[var(--text)] border-opacity-15 text-[var(--text-alt)] hover:border-opacity-30"
                  }`}
                >
                  all
                </button>
                {allSavedTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSidebarTagFilter(tag === sidebarTagFilter ? null : tag)}
                    className={`text-[9px] font-mono px-1.5 py-0.5 border transition-all no-underline ${
                      sidebarTagFilter === tag
                        ? "border-[var(--text)] text-[var(--text)] font-bold"
                        : "border-[var(--text)] border-opacity-15 text-[var(--text-alt)] hover:border-opacity-30"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}

            {filteredSaved.length === 0 && saved.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-xs text-[var(--text-alt)] font-mono">No saved articles yet.</p>
                <p className="text-[10px] text-[var(--text-alt)] font-mono mt-1 opacity-60">
                  Click "☆ save" on any article to read it later.
                </p>
              </div>
            ) : filteredSaved.length === 0 ? (
              <div className="py-8 text-center">
                <p className="text-xs text-[var(--text-alt)] font-mono">No articles tagged "{sidebarTagFilter}".</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
                {(() => {
                  // Group saved articles by category
                  const grouped: Record<string, SavedArticle[]> = {};
                  filteredSaved.forEach(article => {
                    const cat = SOURCE_TO_CATEGORY[article.source];
                    const key = cat ? `${cat.icon} ${cat.label}` : "📰 Other";
                    if (!grouped[key]) grouped[key] = [];
                    grouped[key].push(article);
                  });
                  return Object.entries(grouped).map(([catLabel, catArticles]) => (
                    <div key={catLabel}>
                      <div className="flex items-center gap-1.5 mb-2">
                        <span className="text-[10px] font-mono text-[var(--text-alt)] uppercase tracking-wider font-bold">
                          {catLabel}
                        </span>
                        <span className="text-[9px] font-mono text-[var(--text-alt)] opacity-50">({catArticles.length})</span>
                      </div>
                      <div className="space-y-2.5 mb-1">
                        {catArticles.map((article, i) => (
                          <div
                            key={`saved-${catLabel}-${i}`}
                            className="border border-[var(--text)] border-opacity-15 hover:border-opacity-30 transition-all p-3 group/saved"
                          >
                            <a
                              href={article.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="no-underline block"
                            >
                              <div className="flex items-center gap-2 mb-1.5">
                                <span
                                  className="text-[8px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5"
                                  style={{ color: sourceColor(article.source), border: `1px solid ${sourceColor(article.source)}40` }}
                                >
                                  {article.source}
                                </span>
                                <span className="text-[10px] text-[var(--text-alt)] font-mono">
                                  {timeAgo(article.pubDate)}
                                </span>
                              </div>
                              <h3 className="text-xs leading-snug text-[var(--text)] font-medium line-clamp-2 group-hover/saved:underline m-0">
                                {article.title}
                              </h3>
                            </a>

                            {/* Note */}
                            {article.note && (
                              <p className="text-[10px] text-[var(--text-alt)] font-mono mt-1.5 leading-snug italic border-l border-[var(--text)] border-opacity-15 pl-2 line-clamp-2">
                                {article.note}
                              </p>
                            )}

                            {/* Tags */}
                            {article.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-1.5">
                                {article.tags.map(tag => (
                                  <span
                                    key={tag}
                                    onClick={(e) => { e.preventDefault(); setSidebarTagFilter(tag); }}
                                    className="text-[8px] font-mono px-1.5 py-0.5 border border-[var(--text)] border-opacity-15 text-[var(--text-alt)] hover:text-[var(--text)] hover:border-opacity-30 transition-colors"
                                    style={{ cursor: "pointer" }}
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}

                            <button
                              onClick={() => handleRemoveSaved(article.link)}
                              className="text-[10px] text-[var(--text-alt)] hover:text-[var(--text)] font-mono mt-2 no-underline transition-colors"
                            >
                              ✕ remove
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ));
                })()}
              </div>
            )}

              </div>
            )}
          </div>
        </div>
      </div>

      {/* Save dialog */}
      {saveDialogArticle && (
        <SaveDialog
          article={saveDialogArticle}
          onSave={handleConfirmSave}
          onCancel={() => setSaveDialogArticle(null)}
        />
      )}

      {/* Toast notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <SiteFooter />
    </main>
  );
}
