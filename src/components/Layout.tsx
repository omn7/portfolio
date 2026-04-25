"use client";
import { ReactNode } from "react";
import { useDark } from "@/hooks/useDark";

interface LayoutProps { children: ReactNode; }

const Layout = ({ children }: LayoutProps) => {
  useDark(); // Ensure theme is initialized

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", color: "var(--text)" }}>
      {children}
    </div>
  );
};

export default Layout;
