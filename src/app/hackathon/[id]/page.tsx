import type { Metadata } from "next";
import { hackathons } from "@/data/hackathons";
import HackathonDetail from "@/views/HackathonDetail";

type Props = { params: { id: string } };

export async function generateStaticParams() {
  return hackathons.map((h) => ({ id: h.id.toString() }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const hackathon = hackathons.find((h) => h.id.toString() === params.id);
  if (!hackathon) return { title: "Hackathon Not Found | Om Narkhede" };
  
  return {
    title: `${hackathon.name} | Om Narkhede`,
    description: hackathon.description,
    openGraph: {
      title: `${hackathon.name} | Om Narkhede`,
      description: hackathon.description,
      url: `https://omnarkhede.tech/hackathon/${hackathon.id}`,
      images: [{ url: `https://omnarkhede.tech${hackathon.images[0]}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${hackathon.name} | Om Narkhede`,
      description: hackathon.description,
    },
  };
}

export default function Page({ params }: Props) {
  return <HackathonDetail params={params} />;
}
