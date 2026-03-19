import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { blogs } from "@/data/blogs";
import { useDark } from "@/components/Layout";
import { Moon, Sun } from "lucide-react";
import SiteFooter from "@/components/SiteFooter";

export default function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  const [dark, setDark] = useDark();
  const [zoomedImg, setZoomedImg] = useState<string | null>(null);

  const blog = blogs.find(b => b.id === id);

  if (!blog) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-6 flex flex-col items-center justify-center min-h-screen font-mono">
        <h1 className="text-2xl font-bold mb-4">Blog not found</h1>
        <Link to="/blogs" className="text-[var(--text-alt)] hover:text-[var(--text)] hover:underline">
          ← back to blogs
        </Link>
      </main>
    );
  }

  // Parse the fullDescription markdown-like text into structured sections
  const content = (blog.fullDescription || blog.description).trim();
  const lines = content.split("\n");

  const renderContent = () => {
    const elements: JSX.Element[] = [];
    let listItems: string[] = [];
    let tableLines: string[] = [];
    let key = 0;

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={key++} className="space-y-1.5 text-[var(--text-alt)] text-[0.95rem] leading-relaxed pl-5 mb-6">
            {listItems.map((item, i) => (
              <li key={i} className="list-disc" dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </ul>
        );
        listItems = [];
      }
    };

    const flushTable = () => {
      if (tableLines.length > 0) {
        // Must have at least a header row
        const thead = tableLines[0];
        // Ensure there is a body, skip separator row (usually index 1)
        const tbody = tableLines.length > 2 ? tableLines.slice(2) : [];
        
        const parseRow = (row: string, isHeader: boolean) => {
          // split by pipe. the filter removes the empty strings before the first | and after the last |
          const cells = row.split('|').map(c => c.trim()).filter((c, i, arr) => {
            if (i === 0 && c === '') return false;
            if (i === arr.length - 1 && c === '') return false;
            return true;
          });
          const Tag = isHeader ? 'th' : 'td';
          return (
            <tr key={`tr-${key++}`} className="border-b border-[var(--text)] border-opacity-10 last:border-0 hover:bg-[var(--text)] hover:bg-opacity-[0.02]">
              {cells.map((cell, i) => (
                <Tag key={`td-${i}`} className={`px-4 py-3 align-top ${isHeader ? 'font-bold text-left' : ''}`} dangerouslySetInnerHTML={{ __html: cell }} />
              ))}
            </tr>
          );
        };

        elements.push(
          <div key={key++} className="w-full overflow-x-auto mb-8 mt-4 border border-[var(--text)] border-opacity-20 rounded-sm">
            <table className="w-full text-sm text-[var(--text-alt)] border-collapse">
              <thead className="text-[var(--text)] font-semibold border-b-2 border-[var(--text)] border-opacity-30 bg-black/5 dark:bg-white/5">
                {parseRow(thead, true)}
              </thead>
              <tbody>
                {tbody.map(row => parseRow(row, false))}
              </tbody>
            </table>
          </div>
        );
        tableLines = [];
      }
    };

    const flushAll = () => {
      flushList();
      flushTable();
    };

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) {
        flushAll();
        continue;
      }

      if (trimmed === "---") {
        flushAll();
        elements.push(<hr key={key++} className="border-[var(--text)] border-opacity-20 my-10" />);
        continue;
      }

      if (trimmed.startsWith("|")) {
        flushList();
        tableLines.push(trimmed);
        continue;
      }

      if (trimmed.startsWith("# ")) {
        flushAll();
        // Skip the main title — we render it separately
        continue;
      }

      if (trimmed.startsWith("## ")) {
        flushAll();
        elements.push(
          <h2 key={key++} className="text-xl font-bold text-[var(--text)] mt-10 mb-4">
            {trimmed.replace("## ", "")}
          </h2>
        );
        continue;
      }

      if (trimmed.startsWith("### ")) {
        flushAll();
        elements.push(
          <h3 key={key++} className="text-lg font-bold text-[var(--text)] mt-8 mb-3">
            {trimmed.replace("### ", "")}
          </h3>
        );
        continue;
      }

      if (trimmed.startsWith("*   **") || trimmed.startsWith("- **")) {
        flushTable();
        // Bold list item: extract bold part and rest
        const match = trimmed.match(/\*\*(.+?)\*\*:?\s*(.*)/);
        if (match) {
          listItems.push(`<strong>${match[1]}</strong>${match[2] ? ": " + match[2] : ""}`);
        } else {
          listItems.push(trimmed.replace(/^[\*\-]\s+/, ""));
        }
        continue;
      }

      if (trimmed.startsWith("*") || trimmed.startsWith("-")) {
        flushTable();
        listItems.push(trimmed.replace(/^[\*\-]\s+/, ""));
        continue;
      }

      if (/^\d+\.\s+/.test(trimmed)) {
        flushTable();
        // Numbered list item
        const match = trimmed.match(/^\d+\.\s+\*\*(.+?)\*\*:?\s*(.*)/);
        if (match) {
          listItems.push(`<strong>${match[1]}</strong>${match[2] ? ": " + match[2] : ""}`);
        } else {
          listItems.push(trimmed.replace(/^\d+\.\s+/, ""));
        }
        continue;
      }

      flushAll();
      
      // Handle links and images in paragraphs
      let pContent = trimmed;
      // Handle images: ![alt](url) -> replace with <img> tag
      pContent = pContent.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" class="w-full max-w-lg mx-auto h-auto object-cover rounded border border-[var(--text)] border-opacity-20 my-8 shadow-sm cursor-zoom-in select-none" draggable="false" />');
      
      // Handle bold text: **text** -> <strong>text</strong> (excluding images processed above by matching outside img tags, but for safety just do typical replace)
      // Since it could be conflicting, just run basic strong tag replace
      pContent = pContent.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

      // Very basic link replacement for markdown (only links that are not images, use negative lookbehind if supported natively or just simple matching)
      // Replace [text](url) avoiding ![text](url)
      pContent = pContent.replace(/(^|[^!])\[(.*?)\]\((.*?)\)/g, '$1<a href="$3" target="_blank" rel="noopener noreferrer" class="text-[var(--text)] font-medium hover:underline underline-offset-4 pointer-events-auto z-10">$2</a>');

      elements.push(
        <p key={key++} className="text-[var(--text-alt)] text-[0.95rem] leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: pContent }} />
      );
    }
    flushAll();
    return elements;
  };

  // Extract a clean title from fullDescription (the # heading) or fallback
  const titleMatch = content.match(/^#\s+(.+)$/m);
  const pageTitle = titleMatch ? titleMatch[1] : blog.title;

  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'IMG') {
      setZoomedImg((target as HTMLImageElement).src);
    }
  };

  const handleProtectImg = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'IMG') {
      e.preventDefault();
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-6 flex flex-col min-h-screen font-mono relative z-0">
      {/* Header */}
      <div className="mb-4 mt-2 sm:mt-6 relative z-10">
        <div className="flex items-center justify-between mb-8">
          <Link to="/blogs" className="text-[var(--text-alt)] hover:text-[var(--text)] hover:underline inline-block">
            ← back to blogs
          </Link>
          <button
            onClick={() => setDark((d) => !d)}
            aria-label="Toggle theme"
            className="p-2 -mr-2 text-[var(--text-alt)] hover:text-[var(--text)] transition-colors shrink-0"
          >
            {dark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>

      {/* Blog Hero */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-4">{pageTitle}</h1>
        <div className="flex items-center gap-4 text-sm text-[var(--text-alt)] mb-6">
          <span>{blog.date}</span>
        </div>

        {/* Hero Image */}
        <div className="border border-[var(--text)] border-opacity-20 overflow-hidden mb-8 max-w-2xl mx-auto rounded shadow-sm bg-[var(--text)] bg-opacity-5">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-auto object-contain max-h-[350px] cursor-zoom-in select-none"
            draggable={false}
            onClick={() => setZoomedImg(blog.image)}
            onContextMenu={handleProtectImg}
            onDragStart={handleProtectImg}
          />
        </div>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            {blog.tags.map(t => (
              <span key={t} className="text-xs font-medium text-[var(--text-alt)] px-2.5 py-1 border border-[var(--text)] border-opacity-20">
                {t}
              </span>
            ))}
          </div>
        )}

        <div className="h-px bg-[var(--text)] opacity-20 w-full mb-10" />

        {/* Content */}
        <div 
          className="relative z-10"
          onClick={handleContentClick}
          onContextMenu={handleProtectImg}
          onDragStart={handleProtectImg}
        >
          {renderContent()}
        </div>
        
        {/* Original URL link, if it exists */}
        {blog.url && (
            <div className="mt-12 pt-6 border-t border-[var(--text)] border-opacity-20 relative z-10">
                <a href={blog.url} target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--text-alt)] hover:text-[var(--text)] hover:underline">
                    Read original post on Notion ↗
                </a>
            </div>
        )}
      </div>

      <SiteFooter />

      {/* Zoom Overlay */}
      {zoomedImg && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm cursor-zoom-out p-4 md:p-8"
          onClick={() => setZoomedImg(null)}
          onContextMenu={(e) => e.preventDefault()}
        >
          <img 
            src={zoomedImg} 
            alt="Zoomed full screen"
            className="max-w-full max-h-full object-contain select-none shadow-2xl rounded"
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
          />
        </div>
      )}
    </main>
  );
}
