"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Redirect old /experience route to the merged page
export default function Experience() {
  const router = useRouter();
  useEffect(() => { router.replace("/experience-education"); }, [router]);
  return null;
}
