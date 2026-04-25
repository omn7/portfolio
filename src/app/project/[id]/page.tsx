import type { Metadata } from "next";
import { projects } from "@/data/projects";
import ProjectDetail from "@/views/ProjectDetail";

type Props = { params: { id: string } };

export async function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = projects.find((p) => p.id === params.id);
  if (!project) return { title: "Project Not Found | Om Narkhede" };
  return {
    title: `${project.name} | Om Narkhede`,
    description: project.description,
    openGraph: {
      title: `${project.name} | Om Narkhede`,
      description: project.description,
      url: `https://omnarkhede.tech/project/${project.id}`,
      images: [{ url: `https://omnarkhede.tech${project.image}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} | Om Narkhede`,
      description: project.description,
    },
  };
}

export default function Page({ params }: Props) {
  return <ProjectDetail params={params} />;
}
