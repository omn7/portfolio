import { createClient } from "@supabase/supabase-js";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const parts = url.pathname.split("/").filter(Boolean); // e.g. ['api', 'note', 'userId', 'noteId']
    const noteId = parts.pop();
    const userId = parts.pop();

    // We load standard env vars (Vercel exposes these automatically if set up in dashboard)
    const supabaseUrl = process.env.VITE_SUPABASE_URL || "";
    const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || "";

    let noteTitle = "Om's Workspace Note";
    let noteDesc = "Shared note from Om Narkhede's Workspace.";
    let authorName = "Om Narkhede";
    let tag = "none";

    if (noteId && supabaseUrl && supabaseKey) {
        const supabase = createClient(supabaseUrl, supabaseKey);
        const { data } = await supabase
            .from("notes")
            .select("title, content, author_name, tag")
            .eq("id", noteId)
            .single();

        if (data) {
            if (data.title) noteTitle = data.title;
            if (data.author_name) authorName = data.author_name;
            if (data.tag) tag = data.tag;
            if (data.content) {
                // Strip HTML and take first 150 chars for description
                noteDesc = data.content.replace(/<[^>]+>/g, "").substring(0, 150).trim() + "...";
            }
        }
    }

    // Generate dynamic OG Image URL
    const protocol = request.headers.get("x-forwarded-proto") || "https";
    let host = request.headers.get("x-forwarded-host") || request.headers.get("host");
    // fallback for localhost dev environment
    if (!host || host.includes("undefined")) {
        host = "omnarkhede.tech";
    }
    const domain = `${protocol}://${host}`;
    const ogImageUrl = `${domain}/api/og?title=${encodeURIComponent(noteTitle)}&author=${encodeURIComponent(authorName)}&tag=${encodeURIComponent(tag)}`;

    // Fetch the actual compiled index.html
    let html = "";
    try {
        const indexRes = await fetch(`${domain}/index.html`);
        html = await indexRes.text();

        // Inject custom title
        if (html.includes("<title>")) {
            html = html.replace(/<title>.*?<\/title>/, `<title>${noteTitle}</title>`);
        } else {
            html = html.replace("</head>", `<title>${noteTitle}</title></head>`);
        }

        // Inject OG tags
        const ogTags = `
        <meta property="og:title" content="${noteTitle}" />
        <meta property="og:description" content="${noteDesc}" />
        <meta property="og:image" content="${ogImageUrl}" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="${authorName}'s Workspace" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="${noteTitle}" />
        <meta name="twitter:description" content="${noteDesc}" />
        <meta name="twitter:image" content="${ogImageUrl}" />
        <meta name="author" content="${authorName}" />
        `;
        html = html.replace("</head>", `${ogTags}</head>`);
    } catch (e) {
        // Fallback in case of fetch error
        html = `<!DOCTYPE html><html><head><title>${noteTitle}</title><meta http-equiv="refresh" content="0; url=/#/notes/${userId}/${noteId}" /></head><body>Redirecting to app...</body></html>`;
    }

    return new Response(html, {
        status: 200,
        headers: {
            "Content-Type": "text/html; charset=utf-8",
            "Cache-Control": "public, max-age=60, s-maxage=3600",
        },
    });
}
