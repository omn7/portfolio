import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const blog = {
  title: "Improving LangChain Knowledge Graph Extraction with BAML Fuzzy Parsing",
  url: "https://omn.notion.site/Improving-LangChain-Knowledge-Graph-Extraction-with-BAML-Fuzzy-Parsing-24ab1c3aa29480fbbc72cde3baf6d494",
  date: "August 9, 2025",
  description: "A deep dive into enhancing LangChain's knowledge graph extraction using BAML and fuzzy parsing techniques.",
  image: "https://omn.notion.site/image/attachment%3A8c320dbf-c738-434d-b5a0-ddfd01a28af9%3A1000010678.webp?table=block&id=24ab1c3a-a294-80b7-82f2-cfaaab928e56&spaceId=74c72ac2-df7b-4267-b93c-8e96d28c4e18&width=2000&userId=&cache=v2",
};

const Blog = () => (
  <div className="w-full pt-6 pb-16 lg:pt-8 lg:pb-24">
    <div className="container mx-auto flex flex-col gap-14">
  <div className="flex w-full flex-col items-center gap-2 mb-6 mt-0">
        <h4 className="text-4xl md:text-5xl tracking-tighter font-bold text-center mb-1">Blog</h4>
        <p className="text-base text-muted-foreground text-center max-w-xl">Explore my latest articles on AI, coding, and technology trends. Stay updated with insights and practical guides!</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <a
          href={blog.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col gap-2 hover:opacity-75 cursor-pointer bg-card rounded-xl p-4 border border-border transition-shadow shadow-md"
        >
          <img
            src={blog.image}
            alt={blog.title}
            className="bg-muted rounded-md aspect-video mb-4 object-cover w-full h-40"
            style={{ background: '#f3f3f3' }}
          />
          <h3 className="text-xl tracking-tight font-semibold text-white">{blog.title}</h3>
          <div className="text-sm text-red-600 mb-1">{blog.date}</div>
          <p className="text-muted-foreground text-base mb-2">{blog.description}</p>
        </a>
      </div>
    </div>
  </div>
);

export { Blog };
