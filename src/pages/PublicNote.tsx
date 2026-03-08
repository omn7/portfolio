import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Moon, Sun, Link as LinkIcon, Check, Loader2, StickyNote } from "lucide-react";
import { format } from "date-fns";
import { useDark } from "@/components/Layout";
import SiteFooter from "@/components/SiteFooter";

interface PublicNoteData {
  id: string;
  title: string;
  content: string;
  tag: string;
  author_name?: string;
  created_at: string;
  updated_at: string;
}

export default function PublicNote() {
  const [dark, setDark] = useDark();
  const { userId, noteId } = useParams<{ userId: string; noteId: string }>();
  const [note, setNote] = useState<PublicNoteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      if (!userId || !noteId) {
        setError("Invalid link. Please check your URL.");
        setLoading(false);
        return;
      }

      if (!supabase) {
        setError("Service unavailable at the moment.");
        setLoading(false);
        return;
      }

      const { data, error: dbError } = await supabase
        .from("notes")
        .select("id, title, content, tag, author_name, created_at, updated_at, public")
        .eq("id", noteId)
        .eq("user_id", userId)
        .eq("public", true)
        .single();

      if (dbError || !data) {
        setError("Note not found or is no longer public.");
      } else {
        setNote(data as PublicNoteData);
      }
      setLoading(false);
    };

    fetchNote();
  }, [userId, noteId]);

  useEffect(() => {
    if (note) {
      const originalTitle = document.title;
      const newTitle = `${note.title || "Untitled Note"} | Workspace`;
      document.title = newTitle;

      const updateMeta = (selector: string, content: string) => {
        const meta = document.querySelector(selector);
        if (meta) {
          meta.setAttribute("content", content);
        }
      };

      // Strip HTML tags for the description
      const plainTextContent = note.content
        ? note.content.replace(/<[^>]+>/g, "").trim().slice(0, 150) + "..."
        : "Read this article on Workspace.";

      // Get original meta tags to restore later
      const ogTitle = document.querySelector('meta[property="og:title"]')?.getAttribute("content");
      const ogDesc = document.querySelector('meta[property="og:description"]')?.getAttribute("content");
      const twTitle = document.querySelector('meta[name="twitter:title"]')?.getAttribute("content");
      const twDesc = document.querySelector('meta[name="twitter:description"]')?.getAttribute("content");

      // Set new meta tags
      updateMeta('meta[property="og:title"]', newTitle);
      updateMeta('meta[property="og:description"]', plainTextContent);
      updateMeta('meta[name="twitter:title"]', newTitle);
      updateMeta('meta[name="twitter:description"]', plainTextContent);

      return () => {
        // Restore meta tags when unmounting the component
        document.title = originalTitle;
        if (ogTitle) updateMeta('meta[property="og:title"]', ogTitle);
        if (ogDesc) updateMeta('meta[property="og:description"]', ogDesc);
        if (twTitle) updateMeta('meta[name="twitter:title"]', twTitle);
        if (twDesc) updateMeta('meta[name="twitter:description"]', twDesc);
      };
    }
  }, [note]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const wordCount = note?.content ? note.content.trim().split(/\s+/).filter(Boolean).length : 0;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center font-sans" style={{ background: "var(--bg)", color: "var(--text)" }}>
        <div className="flex flex-col items-center gap-4 text-[var(--text-alt)]">
          <Loader2 className="animate-spin" size={32} />
          <span className="text-sm font-medium tracking-wide">Loading article...</span>
        </div>
      </main>
    );
  }

  if (error || !note) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center text-center px-6 font-sans" style={{ background: "var(--bg)", color: "var(--text)" }}>
        <div className="w-16 h-16 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center mb-6">
          <StickyNote size={32} className="text-[var(--text-alt)] opacity-80" />
        </div>
        <h2 className="text-2xl font-bold mb-3">Article not found</h2>
        <p className="text-[var(--text-alt)] max-w-sm mx-auto mb-8 leading-relaxed">
          {error || "The requested article could not be found. It may have been unpublished or deleted by the author."}
        </p>
        <Link to="/" className="inline-flex items-center justify-center bg-[var(--text)] text-[var(--bg)] rounded-full px-6 py-3 font-medium text-sm no-underline hover:opacity-90 transition-opacity">
          Return to home
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col transition-colors duration-300" style={{ background: "var(--bg)", color: "var(--text)" }}>
      {/* Header - Keeps website minimal theme */}
      <header className="w-full max-w-[1000px] mx-auto px-6 py-6 sm:py-8 font-mono flex items-center justify-between">
        <Link to="/" className="text-[var(--text-alt)] hover:text-[var(--text)] hover:underline inline-block no-underline">
          ← back to index
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-alt)] hidden sm:block">
            Shared Article
          </span>
          <button
            onClick={() => setDark(d => !d)}
            aria-label="Toggle theme"
            className="p-2 -mr-2 text-[var(--text-alt)] hover:text-[var(--text)] transition-colors shrink-0 outline-none border-none bg-transparent cursor-pointer"
          >
            {dark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      {/* Article Body - Medium Style */}
      <article className="w-full max-w-[680px] mx-auto px-6 pb-20 flex-1 mt-8 sm:mt-12">
        <h1 className="font-sans text-4xl sm:text-5xl font-extrabold tracking-tight mb-8 leading-[1.15] text-[var(--text)]" style={{ wordBreak: 'break-word' }}>
          {note.title || "Untitled Note"}
        </h1>

        {/* Author Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 py-6 border-y border-black/10 dark:border-white/10 mb-12 font-sans">
          <div className="flex items-center gap-4">
            {note.author_name ? (
              <div className="w-12 h-12 rounded-full bg-black/[0.08] dark:bg-white/[0.08] flex items-center justify-center text-xl font-bold text-[var(--text)] shrink-0">
                {note.author_name.charAt(0).toUpperCase()}
              </div>
            ) : (
              <div className="w-12 h-12 rounded-full bg-black/[0.08] dark:bg-white/[0.08] flex items-center justify-center text-[var(--text-alt)] shrink-0">
                <StickyNote size={20} />
              </div>
            )}
            <div className="flex flex-col">
              {note.author_name && <span className="font-semibold text-[var(--text)] text-[16px]">{note.author_name}</span>}
              <div className="flex items-center gap-2 text-[15px] text-[var(--text-alt)] mt-0.5">
                <span>{readTime} min read</span>
                <span>&middot;</span>
                <span>{format(new Date(note.updated_at), "MMM d, yyyy")}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center shrink-0">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 text-[14px] font-medium text-[var(--text)] hover:text-[var(--bg)] hover:bg-[var(--text)] transition-colors bg-transparent border border-black/30 dark:border-white/30 rounded-full px-5 py-2 focus:outline-none cursor-pointer"
            >
              {copied ? <Check size={16} /> : <LinkIcon size={16} />}
              {copied ? "Link Copied" : "Share Article"}
            </button>
          </div>
        </div>

        {/* Content */}
        <div
          className="prose prose-lg sm:prose-xl max-w-none font-serif text-[var(--text)] prose-p:leading-[1.8] prose-p:text-[var(--text)] prose-p:tracking-[0.01em] prose-headings:font-sans prose-headings:font-bold prose-headings:text-[var(--text)] prose-headings:tracking-tight prose-a:text-[var(--link)] prose-strong:text-[var(--text)] prose-blockquote:border-l-[4px] prose-blockquote:border-black/80 dark:prose-blockquote:border-white/80 prose-blockquote:text-[var(--text)] prose-blockquote:bg-black/5 dark:prose-blockquote:bg-white/5 prose-blockquote:px-5 prose-blockquote:py-2 prose-blockquote:rounded-r-lg prose-blockquote:font-style-italic prose-li:text-[var(--text)]"
          style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
          dangerouslySetInnerHTML={{ __html: note.content || "<p class='italic text-[var(--text-alt)] font-sans'>This note is empty.</p>" }}
        />
      </article>

      {/* Minimal Footer / Engagement Banner */}
      <div className="mt-8 border-t border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
        <div className="max-w-[680px] mx-auto w-full px-6 py-16 font-sans flex flex-col items-center text-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-black/10 dark:bg-white/10 flex items-center justify-center mb-2">
            <StickyNote size={28} className="text-[var(--text)]" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)] m-0">Create your own workspace</h2>
          <p className="text-[var(--text-alt)] text-[16px] sm:text-[18px] max-w-[480px] mx-auto m-0 leading-relaxed">
            This article was published using Workspace. Create rich-text notes, manage your tasks, and track your habits in one simple place.
          </p>
          <a
            href="https://omnarkhede.tech/workspace"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 px-8 py-3.5 bg-[var(--text)] text-[var(--bg)] rounded-full font-bold text-[15px] hover:opacity-90 transition-opacity no-underline shadow-sm hover:shadow"
          >
            Start Writing
          </a>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto w-full px-6 font-mono">
        <SiteFooter />
      </div>
    </main>
  );
}
