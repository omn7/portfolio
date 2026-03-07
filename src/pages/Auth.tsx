import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { Eye, EyeOff, Loader2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function Auth() {
  const { user, loading, signIn, signUp } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg)", color: "var(--text)" }}>
        <Loader2 className="animate-spin" size={32} />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/todoist" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setSubmitting(true);

    if (isLogin) {
      const { error } = await signIn(email, password);
      if (error) setError(error.message);
    } else {
      const { error } = await signUp(email, password);
      if (error) {
        setError(error.message);
      } else {
        setMessage("Check your email for the confirmation link!");
      }
    }
    setSubmitting(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center font-mono px-4" style={{ background: "var(--bg)", color: "var(--text)" }}>
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 text-[var(--text-alt)] hover:text-[var(--text)] transition-colors mb-8 no-underline text-sm">
          <ArrowLeft size={16} />
          back to home
        </Link>

        <div className="border border-[var(--text)] border-opacity-20 p-8">
          <h1 className="text-2xl font-bold mb-1 mt-0">{isLogin ? "Sign In" : "Sign Up"}</h1>
          <p className="text-[var(--text-alt)] text-sm mb-6">
            {isLogin ? "Welcome back. Sign in to access your workspace." : "Create an account to get started."}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-[var(--text-alt)]">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-11 px-3 border border-[var(--text)] border-opacity-20 bg-transparent text-[var(--text)] focus:border-opacity-100 outline-none transition-all text-sm font-mono"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-[var(--text-alt)]">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full h-11 px-3 pr-10 border border-[var(--text)] border-opacity-20 bg-transparent text-[var(--text)] focus:border-opacity-100 outline-none transition-all text-sm font-mono"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-alt)] hover:text-[var(--text)]"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-xs border border-red-500 border-opacity-30 px-3 py-2 bg-red-500 bg-opacity-5">
                {error}
              </div>
            )}
            {message && (
              <div className="text-green-500 text-xs border border-green-500 border-opacity-30 px-3 py-2 bg-green-500 bg-opacity-5">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full h-11 border border-[var(--text)] bg-[var(--text)] text-[var(--bg)] font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {submitting && <Loader2 size={16} className="animate-spin" />}
              {isLogin ? "Sign In" : "Sign Up"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-[var(--text-alt)]">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => { setIsLogin(!isLogin); setError(""); setMessage(""); }}
              className="text-[var(--text)] font-bold hover:underline underline-offset-4 bg-transparent border-none p-0"
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
