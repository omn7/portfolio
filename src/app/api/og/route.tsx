import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const title = searchParams.get("title") || "Public Note";
        const author = searchParams.get("author") || "Om Narkhede";
        const tag = searchParams.get("tag") || "none";

        let tagColor = "rgba(128,128,128,0.2)";
        let tagText = "#a3a3a3";
        if (tag === "red") { tagColor = "rgba(239,68,68,0.2)"; tagText = "#ef4444"; }
        else if (tag === "orange") { tagColor = "rgba(249,115,22,0.2)"; tagText = "#f97316"; }
        else if (tag === "yellow") { tagColor = "rgba(234,179,8,0.2)"; tagText = "#eab308"; }
        else if (tag === "green") { tagColor = "rgba(34,197,94,0.2)"; tagText = "#22c55e"; }
        else if (tag === "blue") { tagColor = "rgba(59,130,246,0.2)"; tagText = "#3b82f6"; }
        else if (tag === "purple") { tagColor = "rgba(168,85,247,0.2)"; tagText = "#a855f7"; }
        else if (tag === "pink") { tagColor = "rgba(236,72,153,0.2)"; tagText = "#ec4899"; }

        return new ImageResponse(
            (
                <div
                    style={{
                        height: "100%",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        backgroundColor: "#050505",
                        fontFamily: "sans-serif",
                        color: "#ffffff",
                        padding: "80px",
                        border: `10px solid ${tagColor}`,
                    }}
                >
                    {/* Top section */}
                    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                        <div style={{ display: "flex", alignItems: "center", marginBottom: "30px", fontSize: 40, color: "#a3a3a3", fontWeight: "bold" }}>
                            <div style={{ display: "flex", width: "40px", height: "40px", borderRadius: "8px", backgroundColor: tagText, marginRight: "20px", opacity: 0.8 }}></div>
                            om's workspace
                        </div>

                        <div
                            style={{
                                display: "flex",
                                fontSize: 85,
                                fontWeight: "900",
                                letterSpacing: "-0.04em",
                                lineHeight: 1.1,
                                color: "#ffffff",
                                marginBottom: "20px",
                                maxWidth: "95%",
                                // Fallback for line clamping if vercel og doesn't fully support webkit
                                flexWrap: "wrap",
                            }}
                        >
                            {title.length > 60 ? title.substring(0, 60) + "..." : title}
                        </div>
                    </div>

                    {/* Bottom section */}
                    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", width: "100%" }}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <div style={{ fontSize: 28, color: "#a3a3a3", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "8px" }}>Shared By</div>
                            <div style={{ fontSize: 48, fontWeight: "bold", color: "#ffffff" }}>{author}</div>
                        </div>

                        <div style={{ display: "flex", fontSize: 32, fontWeight: "bold", color: tagText, letterSpacing: "-0.02em" }}>
                            omnarkhede.tech
                        </div>
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            }
        );
    } catch (e: any) {
        return new Response(`Failed to generate image: ${e.message}`, {
            status: 500,
        });
    }
}
