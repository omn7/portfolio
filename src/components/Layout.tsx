"use client";
import { ReactNode, useEffect, useState } from "react";

interface LayoutProps { children: ReactNode; }

export const useDark = () => {
  const [dark, setDark] = useState(true);
  
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("theme");
        if (saved !== null) setDark(saved === "dark");
      }
    } catch { }
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    try { localStorage.setItem("theme", dark ? "dark" : "light"); } catch { }
  }, [dark]);
  return [dark, setDark] as const;
};

const Layout = ({ children }: LayoutProps) => {
  useDark(); // Ensure theme is initialized

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", color: "var(--text)" }}>
      {children}
    </div>
  );
};

export default Layout;
