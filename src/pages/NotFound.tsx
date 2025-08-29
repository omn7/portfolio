import { Link } from "react-router-dom";
import ReloadButton from "@/components/ui/reload-button";

const NotFound = () => {
  // Update document title for better UX
  if (typeof document !== 'undefined') {
    document.title = '404 — Page Not Found';
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-4">
      <div className="text-center max-w-xl">
        <h1 className="text-7xl font-extrabold text-primary mb-4 drop-shadow-glow">404</h1>
        <p className="text-2xl sm:text-3xl font-semibold mb-4">Oops! We couldn't find that page.</p>
        <p className="text-lg text-muted-foreground mb-8">The page may have been moved or deleted. Try returning to the homepage or check the URL for errors.</p>
        <div className="flex items-center justify-center gap-4 mt-4">
          <Link
            to="/"
            className="inline-block px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium shadow-lg hover:bg-primary/90 transition-all duration-200"
          >
            Return to Home
          </Link>
          <ReloadButton />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
