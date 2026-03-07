import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { useDark } from "@/components/Layout";

const BlogsSection = () => {
  const [dark, setDark] = useDark();

  const blogs = [
    {
      title: "Improving LangChain Knowledge Graph Extraction with BAML Fuzzy Parsing",
      url: "https://omn.notion.site/Improving-LangChain-Knowledge-Graph-Extraction-with-BAML-Fuzzy-Parsing-24ab1c3aa29480fbbc72cde3baf6d494",
      date: "August 9, 2025",
      description: "A deep dive into enhancing LangChain's knowledge graph extraction using BAML and fuzzy parsing techniques.",
      image: "https://omn.notion.site/image/attachment%3A8c320dbf-c738-434d-b5a0-ddfd01a28af9%3A1000010678.webp?table=block&id=24ab1c3a-a294-80b7-82f2-cfaaab928e56&spaceId=74c72ac2-df7b-4267-b93c-8e96d28c4e18&width=2000&userId=&cache=v2"
    }
  ];

  return (
    <main className="max-w-4xl mx-auto px-6 py-6 flex flex-col min-h-[100dvh] font-mono">
      <div className="mb-4 mt-2 sm:mt-6">
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="text-[var(--text-alt)] hover:text-[var(--text)] hover:underline inline-block">
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

      <div className="mb-16">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Blogs</h1>
        <div className="h-px bg-[var(--text)] opacity-20 w-full mb-10" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {blogs.map((b) => (
            <div key={b.title} className="group flex flex-col gap-3">
              <a href={b.url} target="_blank" rel="noopener noreferrer" className="block relative overflow-hidden rounded-md border border-[var(--text)] border-opacity-10 bg-[var(--bg)] aspect-video">
                <img
                  src={b.image}
                  alt={b.title}
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 scale-[1.01] group-hover:scale-105"
                />
              </a>
              <div>
                <a href={b.url} target="_blank" rel="noopener noreferrer" className="text-lg font-bold hover:underline underline-offset-4 block mb-1">
                  {b.title}
                </a>
                <p className="text-[var(--text-alt)] text-sm mb-2">{b.date}</p>
                <p className="text-[var(--text-alt)] text-sm leading-relaxed mb-3">
                  {b.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default BlogsSection;