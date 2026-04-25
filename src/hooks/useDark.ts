"use client";
import { useEffect, useState } from "react";

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
    if (typeof window !== "undefined") {
      document.documentElement.classList.toggle("dark", dark);
      try { localStorage.setItem("theme", dark ? "dark" : "light"); } catch { }
    }
  }, [dark]);

  return [dark, setDark] as const;
};
