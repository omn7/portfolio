import { Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  useEffect(() => {
    document.title = "404 — Page Not Found | Om Narkhede";
    return () => { document.title = "Om Narkhede | AI Engineer & Developer Portfolio"; };
  }, []);

  return (
    <main className="min-h-[100dvh] flex items-center justify-center px-4 font-mono" style={{ background: "var(--bg)", color: "var(--text)" }}>
      <div className="text-center max-w-lg">
        {/* Big 404 */}
        <h1 className="text-[7rem] sm:text-[9rem] font-black leading-none tracking-tighter mb-2 select-none" style={{ color: "var(--text)" }}>
          404
        </h1>

        {/* Divider */}
        <div className="w-16 h-px mx-auto mb-6 opacity-20" style={{ background: "var(--text)" }} />

        {/* Message */}
        <p className="text-sm sm:text-base mb-2" style={{ color: "var(--text-alt)" }}>
          This page doesn't exist — or maybe it never did.
        </p>
        <p className="text-sm sm:text-base mb-6" style={{ color: "var(--text-alt)" }}>
          Either way, there's nothing here.
        </p>

        {/* Terminal hint */}
        <p className="text-[11px] mb-8 opacity-40" style={{ color: "var(--text-alt)" }}>
          $ curl -I /this-page → HTTP/1.1 404 Not Found
        </p>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="text-xs font-mono font-bold px-5 py-2.5 border transition-all no-underline"
            style={{
              border: "1px solid var(--text)",
              background: "var(--text)",
              color: "var(--bg)",
            }}
          >
            ← Home
          </Link>
          <Link
            to="/projects"
            className="text-xs font-mono font-bold px-5 py-2.5 border transition-all no-underline hover:opacity-70"
            style={{
              border: "1px solid var(--text)",
              borderOpacity: 0.3,
              color: "var(--text)",
            }}
          >
            Projects
          </Link>
          <Link
            to="/news"
            className="text-xs font-mono font-bold px-5 py-2.5 border transition-all no-underline hover:opacity-70"
            style={{
              border: "1px solid var(--text)",
              borderOpacity: 0.3,
              color: "var(--text)",
            }}
          >
            World Radar
          </Link>
        </div>

        {/* Footer */}
        <p className="mt-12 text-[10px] opacity-30" style={{ color: "var(--text-alt)" }}>
          omnarkhede.tech
        </p>
      </div>
    </main>
  );
};

export default NotFound;
