"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Redirect old /education route to the merged page
export default function Education() {
  const router = useRouter();
  useEffect(() => { router.replace("/experience-education"); }, [router]);
  return null;
}
