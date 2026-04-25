import type { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import PublicNote from "@/views/PublicNote";

type Props = { params: { userId: string; noteId: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { userId, noteId } = params;
  
  if (!supabase) return { title: "Shared Note | Workspace" };

  const { data: note } = await supabase
    .from("notes")
    .select("title, content, public")
    .eq("id", noteId)
    .eq("user_id", userId)
    .eq("public", true)
    .single();

  if (!note) return { title: "Note Not Found | Workspace" };

  const title = `${note.title || "Untitled Note"} | Workspace`;
  const description = note.content
    ? note.content.replace(/<[^>]+>/g, "").trim().slice(0, 150) + "..."
    : "Read this article on Workspace.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default function Page({ params }: Props) {
  return <PublicNote params={params} />;
}
