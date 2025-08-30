import { Link } from "react-router-dom";
import ReloadButton from "@/components/ui/reload-button";

const NotFound = () => {
  // Update document title for better UX
  if (typeof document !== 'undefined') {
    document.title = '404 — Lost (but still adorable)';
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-4">
      <div className="text-center max-w-xl">
        <h1 className="text-7xl font-extrabold text-primary mb-2 drop-shadow-glow">404</h1>

        <div className="mb-6 flex items-center justify-center">
          <div className="text-6xl sm:text-7xl animate-float-subtle">🤖</div>
        </div>

        <p className="text-2xl sm:text-3xl font-semibold mb-3">Whoa — this page vanished into the void.</p>

        <p className="text-lg text-muted-foreground mb-6">We dispatched a tiny search robot (it brought snacks). Try one of the options below — or bribe the robot with cookies.</p>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
          <Link
            to="/"
            className="inline-block px-6 py-2 rounded-full bg-primary text-primary-foreground font-medium shadow hover:bg-primary/90 transition-all duration-200"
          >
            Teleport Home
          </Link>

          <Link
            to="/resume"
            className="inline-block px-6 py-2 rounded-full border border-border text-foreground/90 bg-transparent font-medium shadow-sm hover:bg-secondary/60 transition-all duration-200"
          >
            View Resume
          </Link>

          <ReloadButton />
        </div>

        <p className="text-sm text-muted-foreground mt-6">Tip: If your browser is acting possessed, try a hard refresh (Ctrl+F5) or open this page in an incognito window.</p>
      </div>
    </div>
  );
};

export default NotFound;
