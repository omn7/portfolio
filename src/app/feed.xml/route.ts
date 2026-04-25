import { projects } from "@/data/projects";
import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = "https://omnarkhede.tech";
  const now = new Date().toUTCString();

  const items = projects
    .map(
      (p) => `
    <item>
      <title>${escapeXml(p.name)}</title>
      <link>${baseUrl}/project/${p.id}</link>
      <description>${escapeXml(p.description)}</description>
      <guid>${baseUrl}/project/${p.id}</guid>
      <pubDate>${now}</pubDate>
    </item>`
    )
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Om Narkhede — Projects &amp; Portfolio</title>
    <link>${baseUrl}</link>
    <description>Latest projects, work, and updates by Om Narkhede, AI Engineer &amp; Full-Stack Developer.</description>
    <language>en-US</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <managingEditor>dev.om@outlook.com (Om Narkhede)</managingEditor>
    <webMaster>dev.om@outlook.com (Om Narkhede)</webMaster>
${items}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
