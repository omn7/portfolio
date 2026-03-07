import { Link } from "react-router-dom";
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

const RSS_FEEDS = [
  { url: "https://techcrunch.com/feed/", source: "TechCrunch" },
  { url: "https://www.theverge.com/rss/index.xml", source: "The Verge" },
  { url: "https://hnrss.org/frontpage", source: "Hacker News" },
];

const RSS2JSON = "https://api.rss2json.com/v1/api.json?rss_url=";
const SAVED_KEY = "savedNewsArticles";

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
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}

function extractFirstImage(html: string): string {
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match ? match[1] : "";
}

async function fetchAllArticles(): Promise<NewsArticle[]> {
  const results = await Promise.allSettled(
    RSS_FEEDS.map(async (feed) => {
      const res = await fetch(`${RSS2JSON}${encodeURIComponent(feed.url)}`);
      const data = await res.json();
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
          source: feed.source,
        };
      });
    })
  );

  const all: NewsArticle[] = [];
  for (const r of results) {
    if (r.status === "fulfilled") all.push(...r.value);
  }

  all.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
  return all;
}

// ════════════════════════════════════════════════════════
//  SOURCE COLORS
// ════════════════════════════════════════════════════════

function sourceColor(source: string): string {
  switch (source) {
    case "TechCrunch": return "#0a9b00";
    case "The Verge": return "#e8503a";
    case "Hacker News": return "#ff6600";
    default: return "var(--text-alt)";
  }
}

// ════════════════════════════════════════════════════════
//  LOCALSTORAGE HELPERS
// ════════════════════════════════════════════════════════

function loadSaved(): SavedArticle[] {
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
  try {
    localStorage.setItem(SAVED_KEY, JSON.stringify(items));
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
  const [saved, setSaved] = useState<SavedArticle[]>(loadSaved);
  const [toast, setToast] = useState<{ message: string; type: "save" | "remove" } | null>(null);
  const [showSaved, setShowSaved] = useState(false);
  const [saveDialogArticle, setSaveDialogArticle] = useState<NewsArticle | null>(null);
  const [sidebarTagFilter, setSidebarTagFilter] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadArticles();
  }, []);

  async function loadArticles() {
    setLoading(true);
    setError("");
    try {
      const items = await fetchAllArticles();
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

  const sources = ["All", ...RSS_FEEDS.map(f => f.source)];
  const filtered = filter === "All" ? articles : articles.filter(a => a.source === filter);

  // All unique tags across saved articles
  const allSavedTags = [...new Set(saved.flatMap(s => s.tags))];
  const filteredSaved = sidebarTagFilter
    ? saved.filter(s => s.tags.includes(sidebarTagFilter))
    : saved;

  return (
    <main className="max-w-7xl mx-auto px-6 py-6 flex flex-col min-h-[100dvh] font-mono">
      <div className="mb-4 mt-2 sm:mt-6">
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="text-[var(--text-alt)] hover:text-[var(--text)] hover:underline inline-block">
            ← back to index
          </Link>
          <div className="flex items-center gap-3">
            {/* Saved toggle for mobile */}
            <button
              onClick={() => setShowSaved(s => !s)}
              className="lg:hidden text-xs font-mono text-[var(--text-alt)] hover:text-[var(--text)] border border-[var(--text)] border-opacity-20 px-3 py-1.5 no-underline transition-colors"
            >
              Saved ({saved.length})
            </button>
            <button
              onClick={() => setDark(d => !d)}
              aria-label="Toggle theme"
              className="p-2 -mr-2 text-[var(--text-alt)] hover:text-[var(--text)] transition-colors shrink-0"
            >
              {dark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex gap-8">
        {/* ── LEFT: News feed ── */}
        <div className={`flex-1 min-w-0 ${showSaved ? "hidden lg:block" : ""}`}>
          <div className="flex items-start justify-between gap-4 flex-wrap mb-2">
            <h1 className="text-3xl font-bold tracking-tight">News in Tech</h1>
            <button
              onClick={loadArticles}
              disabled={loading}
              className="text-xs text-[var(--text-alt)] hover:text-[var(--text)] font-mono transition-colors mt-2 no-underline disabled:opacity-40"
            >
              ↻ refresh
            </button>
          </div>
          <p className="text-[var(--text-alt)] text-sm mb-6">
            Dispatches from the digital frontier — curated from the noise, delivered raw.
          </p>
          <div className="h-px bg-[var(--text)] opacity-20 w-full mb-6" />

          {/* Source filter tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {sources.map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`text-xs font-mono px-3 py-1.5 border transition-all no-underline ${
                  filter === s
                    ? "border-[var(--text)] text-[var(--text)] font-bold"
                    : "border-[var(--text)] border-opacity-20 text-[var(--text-alt)] hover:border-opacity-50"
                }`}
              >
                {s}
              </button>
            ))}
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

          {/* Articles */}
          {!loading && !error && filtered.length > 0 && (
            <div className="space-y-6 mb-16">
              {filtered.map((article, i) => (
                <div
                  key={`${article.source}-${i}`}
                  className="border border-[var(--text)] border-opacity-15 hover:border-opacity-40 transition-all group relative"
                >
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block no-underline"
                  >
                    {/* Large image */}
                    {article.thumbnail && (
                      <div className="w-full h-48 sm:h-56 md:h-64 overflow-hidden">
                        <img
                          src={article.thumbnail}
                          alt=""
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                          onError={e => { (e.target as HTMLImageElement).parentElement!.style.display = "none"; }}
                        />
                      </div>
                    )}

                    {/* Article content */}
                    <div className="p-5 sm:p-6">
                      {/* Source & time row */}
                      <div className="flex items-center gap-3 mb-3">
                        <span
                          className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5"
                          style={{ color: sourceColor(article.source), border: `1px solid ${sourceColor(article.source)}40` }}
                        >
                          {article.source}
                        </span>
                        <span className="text-[11px] text-[var(--text-alt)] font-mono">
                          {timeAgo(article.pubDate)}
                        </span>
                        {article.author && (
                          <>
                            <span className="text-[var(--text-alt)] opacity-30">·</span>
                            <span className="text-[11px] text-[var(--text-alt)] font-mono">
                              {article.author}
                            </span>
                          </>
                        )}
                      </div>

                      {/* Title */}
                      <h2 className="text-lg sm:text-xl font-bold leading-snug text-[var(--text)] group-hover:underline underline-offset-4 mb-3 mt-0">
                        {article.title}
                      </h2>

                      {/* Description */}
                      {article.description && (
                        <p className="text-sm leading-relaxed text-[var(--text-alt)] mb-3 line-clamp-3">
                          {article.description}
                        </p>
                      )}

                      {/* Footer row */}
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-[11px] text-[var(--text-alt)] font-mono">
                          {formatDate(article.pubDate)}
                        </span>
                        <span className="text-xs text-[var(--text)] font-mono group-hover:underline">
                          Read full article →
                        </span>
                      </div>
                    </div>
                  </a>

                  {/* Save button — overlaid */}
                  <button
                    onClick={(e) => handleSaveClick(article, e)}
                    className={`absolute top-3 right-3 z-10 text-[11px] font-mono px-2.5 py-1 border transition-all no-underline ${
                      isSaved(article.link)
                        ? "border-[var(--text)] bg-[var(--text)] text-[var(--bg)] hover:opacity-80"
                        : "border-[var(--text)] border-opacity-30 text-[var(--text)] bg-[var(--bg)] hover:bg-[var(--text)] hover:text-[var(--bg)]"
                    }`}
                    style={{ backdropFilter: "blur(4px)" }}
                  >
                    {isSaved(article.link) ? "✓ saved" : "☆ save"}
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* No results for filter */}
          {!loading && !error && filtered.length === 0 && articles.length > 0 && (
            <div className="flex items-center justify-center py-16">
              <span className="text-sm text-[var(--text-alt)] font-mono">No articles from {filter}.</span>
            </div>
          )}
        </div>

        {/* ── RIGHT: Saved articles sidebar ── */}
        <div className={`${showSaved ? "block" : "hidden"} lg:block w-full lg:w-[300px] xl:w-[340px] shrink-0`}>
          <div className="lg:sticky lg:top-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-[var(--text)] tracking-wide">
                Saved for later ({saved.length})
              </h2>
              <div className="flex items-center gap-2">
                {saved.length > 0 && (
                  <button
                    onClick={clearAllSaved}
                    className="text-[10px] text-[var(--text-alt)] hover:text-[var(--text)] font-mono no-underline transition-colors"
                  >
                    clear all
                  </button>
                )}
                <button
                  onClick={() => setShowSaved(false)}
                  className="lg:hidden text-xs text-[var(--text-alt)] hover:text-[var(--text)] font-mono no-underline"
                >
                  ← feed
                </button>
              </div>
            </div>
            <div className="h-px bg-[var(--text)] opacity-20 w-full mb-4" />

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
              <div className="space-y-3 max-h-[75vh] overflow-y-auto pr-1">
                {filteredSaved.map((article, i) => (
                  <div
                    key={`saved-${i}`}
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
