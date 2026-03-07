import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Loader2, ArrowLeft, StickyNote, Clock, FileText, ExternalLink } from "lucide-react";
import { format } from "date-fns";

interface PublicNoteData {
  id: string;
  title: string;
  content: string;
  tag: string;
  author_name?: string;
  created_at: string;
  updated_at: string;
}

const TAG_COLORS: Record<string, { color: string; bg: string; glow: string }> = {
  none:   { color: "#6b7280", bg: "transparent",            glow: "transparent" },
  red:    { color: "#ef4444", bg: "rgba(239,68,68,0.06)",   glow: "rgba(239,68,68,0.15)" },
  orange: { color: "#f97316", bg: "rgba(249,115,22,0.06)",  glow: "rgba(249,115,22,0.15)" },
  yellow: { color: "#eab308", bg: "rgba(234,179,8,0.06)",   glow: "rgba(234,179,8,0.15)" },
  green:  { color: "#22c55e", bg: "rgba(34,197,94,0.06)",   glow: "rgba(34,197,94,0.15)" },
  blue:   { color: "#3b82f6", bg: "rgba(59,130,246,0.06)",  glow: "rgba(59,130,246,0.15)" },
  purple: { color: "#a855f7", bg: "rgba(168,85,247,0.06)",  glow: "rgba(168,85,247,0.15)" },
  pink:   { color: "#ec4899", bg: "rgba(236,72,153,0.06)",  glow: "rgba(236,72,153,0.15)" },
};

export default function PublicNote() {
  const { userId, noteId } = useParams<{ userId: string; noteId: string }>();
  const [note, setNote] = useState<PublicNoteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNote = async () => {
      if (!userId || !noteId) {
        setError("Invalid link.");
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

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#050505", fontFamily: "'SF Mono', 'Fira Code', 'JetBrains Mono', monospace" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
          <div style={{ width: "40px", height: "40px", border: "2px solid rgba(168,85,247,0.3)", borderTopColor: "#a855f7", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
          <span style={{ fontSize: "12px", color: "#6b7280", letterSpacing: "0.1em", textTransform: "uppercase" }}>Loading note...</span>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (error || !note) {
    return (
      <div style={{
        minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        background: "#050505", color: "#fff", fontFamily: "'SF Mono', 'Fira Code', monospace", gap: "20px",
      }}>
        <div style={{ width: "64px", height: "64px", borderRadius: "16px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <FileText size={28} style={{ color: "#ef4444", opacity: 0.6 }} />
        </div>
        <p style={{ fontSize: "14px", color: "#9ca3af", margin: 0 }}>{error || "Note not found."}</p>
        <Link to="/" style={{ fontSize: "12px", color: "#a855f7", textDecoration: "none", display: "flex", alignItems: "center", gap: "6px", padding: "8px 16px", borderRadius: "8px", border: "1px solid rgba(168,85,247,0.2)", background: "rgba(168,85,247,0.05)", transition: "all 0.2s" }}>
          <ArrowLeft size={13} /> Go Home
        </Link>
      </div>
    );
  }

  const tagInfo = TAG_COLORS[note.tag] || TAG_COLORS.none;
  const hasTag = note.tag !== "none";
  const wordCount = note.content.trim().split(/\s+/).filter(Boolean).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div style={{
      minHeight: "100vh",
      background: "#050505",
      color: "#f5f5f5",
      fontFamily: "'SF Mono', 'Fira Code', 'JetBrains Mono', 'Cascadia Code', monospace",
    }}>
      {/* Ambient glow behind tag */}
      {hasTag && (
        <div style={{
          position: "fixed", top: 0, left: "50%", transform: "translateX(-50%)",
          width: "600px", height: "300px", pointerEvents: "none", zIndex: 0,
          background: `radial-gradient(ellipse at center top, ${tagInfo.glow}, transparent 70%)`,
          opacity: 0.6,
        }} />
      )}

      {/* Header */}
      <header style={{
        position: "sticky", top: 0, zIndex: 10,
        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        background: "rgba(5,5,5,0.8)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{ maxWidth: "720px", margin: "0 auto", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link to="/" style={{ fontSize: "12px", color: "#6b7280", textDecoration: "none", display: "flex", alignItems: "center", gap: "6px", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#d1d5db")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7280")}
          >
            <ArrowLeft size={13} /> Home
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {hasTag && <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: tagInfo.color }} />}
            <span style={{ fontSize: "11px", color: "#4b5563", letterSpacing: "0.05em" }}>SHARED NOTE</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <main style={{ position: "relative", zIndex: 1 }}>
        <article style={{ maxWidth: "720px", margin: "0 auto", padding: "48px 24px 80px" }}>
          {/* Tag accent line */}
          {hasTag && (
            <div style={{
              height: "2px", borderRadius: "1px", marginBottom: "40px",
              background: `linear-gradient(90deg, ${tagInfo.color}, transparent)`,
              opacity: 0.6,
            }} />
          )}

          {/* Title */}
          <h1 style={{
            fontSize: "clamp(28px, 5vw, 40px)",
            fontWeight: 800,
            lineHeight: 1.2,
            margin: "0 0 20px",
            letterSpacing: "-0.02em",
            color: "#fff",
          }}>
            {note.title || "Untitled"}
          </h1>

          {/* Meta */}
          <div style={{
            display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap",
            marginBottom: "40px", paddingBottom: "24px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Clock size={12} style={{ color: "#6b7280" }} />
              <span style={{ fontSize: "11px", color: "#6b7280" }}>
                {format(new Date(note.updated_at), "MMM d, yyyy 'at' h:mm a")}
              </span>
            </div>
            <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "#374151" }} />
            <span style={{ fontSize: "11px", color: "#6b7280" }}>
              {wordCount} words &middot; {readTime} min read
            </span>
            {note.author_name && (
              <>
                <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "#374151" }} />
                <span style={{ fontSize: "11px", color: "#6b7280" }}>
                  Created by <span style={{ color: "#a855f7", fontWeight: 600 }}>{note.author_name}</span>
                </span>
              </>
            )}
          </div>

          {/* Body */}
          {note.content ? (
            <div
              style={{
                fontSize: "15px",
                lineHeight: 2,
                color: "rgba(255,255,255,0.82)",
                letterSpacing: "0.01em",
                wordBreak: "break-word",
              }}
              dangerouslySetInnerHTML={{ __html: note.content }}
            />
          ) : (
            <div style={{
              fontSize: "15px",
              lineHeight: 2,
              color: "rgba(255,255,255,0.82)",
              letterSpacing: "0.01em",
              wordBreak: "break-word",
            }}>
              <span style={{ color: "#4b5563", fontStyle: "italic" }}>This note is empty.</span>
            </div>
          )}
        </article>
      </main>

      {/* Footer */}
      <footer style={{
        borderTop: "1px solid rgba(255,255,255,0.05)",
        padding: "28px 24px",
      }}>
        <div style={{
          maxWidth: "720px", margin: "0 auto",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "12px",
        }}>
          <a
            href="https://omnarkhede.tech/todoist"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "12px", color: "#6b7280", textDecoration: "none",
              display: "flex", alignItems: "center", gap: "6px",
              padding: "8px 16px", borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(255,255,255,0.02)",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(168,85,247,0.3)";
              e.currentTarget.style.color = "#a855f7";
              e.currentTarget.style.background = "rgba(168,85,247,0.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
              e.currentTarget.style.color = "#6b7280";
              e.currentTarget.style.background = "rgba(255,255,255,0.02)";
            }}
          >
            <StickyNote size={12} />
            Shared via Om's Workspace Notes
            <ExternalLink size={10} />
          </a>
          <span style={{ fontSize: "10px", color: "#374151" }}>
            omnarkhede.tech/todoist
          </span>
        </div>
      </footer>
    </div>
  );
}
