import type { Metadata } from "next";
import { projects } from "@/data/projects";
import Index from "@/views/Index";

export const metadata: Metadata = {
  title: "Om Narkhede | AI Engineer & Developer Portfolio",
  description: "Portfolio of Om Narkhede, a 20 y/o Computer Engineering undergraduate. Interested in AI, computer vision, cloud, and DevOps. View projects, experience, and blogs.",
  openGraph: {
    title: "Om Narkhede | AI Engineer & Developer Portfolio",
    description: "Portfolio of Om Narkhede, a 20 y/o Computer Engineering undergraduate. Interested in AI, computer vision, cloud, and DevOps.",
    url: "https://omnarkhede.tech/",
    siteName: "Om Narkhede",
    images: [{ url: "https://omnarkhede.tech/ogImage.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Om Narkhede | AI Engineer & Developer Portfolio",
    description: "Portfolio of Om Narkhede, a 20 y/o Computer Engineering undergraduate.",
    site: "@omnarkhede",
    images: ["https://omnarkhede.tech/ogImage.png"],
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Om Narkhede",
    url: "https://omnarkhede.tech",
    email: "dev.om@outlook.com",
    jobTitle: "AI Engineer & Full-Stack Developer",
    description: "20 y/o undergraduate studying Computer Engineering. Interested in computer vision, machine learning, cloud and devops.",
    image: "https://omnarkhede.tech/logo.jpg",
    sameAs: [
      "https://github.com/omn7",
      "https://linkedin.com/in/omnarkhede",
      "https://twitter.com/mr_codex",
    ],
    knowsAbout: [
      "React", "Next.js", "TypeScript", "Node.js", "Python", "Machine Learning",
      "Computer Vision", "AWS", "Docker", "PostgreSQL", "Supabase"
    ],
    hasOccupation: {
      "@type": "Occupation",
      name: "Full-Stack Developer",
      educationRequirements: "Bachelor of Engineering in Computer Engineering",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Bharati Vidyapeeth College of Engineering, Pune",
    },
    workExample: projects.map((p) => ({
      "@type": "SoftwareApplication",
      name: p.name,
      description: p.description,
      url: p.live,
      codeRepository: p.github,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Index />
    </>
  );
}
