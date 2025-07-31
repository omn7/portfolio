
import { Badge } from "./badge";
import { Button } from "./button";
import { Github } from "lucide-react";
import { motion } from "framer-motion";

const projects = [
  {
    title: "DeBurger",
    description: "AI-powered debugging assistant that helps developers understand and fix code issues using AI. Get clear explanations of complex errors in simple English and receive practical solutions instantly.",
    image: "/debugger.png",
    badge: "AI Tool",
    tech: ["React", "TypeScript", "Node.js", "PostgreSQL", "OpenAI API", "TailwindCSS", "Gemini APIs"],
    link: "https://deburger.omnarkhede.tech/",
  },
  {
    title: "UpLiftx",
    description: "Find your purpose, build your network, and contribute to something truly special, Volunteer can search work here.",
    image: "/image.png",
    badge: "freelance",
    tech: ["Next.js", "Tailwind", "Node.js","Supabase","clerk API","Express.js"],
    link: "https://upliftx.vercel.app/",
  },
  {
    title: "Crypto Price Tracker",
    description: "A dynamic crypto marketplace.",
    image: "/p4.png",
    badge: "Finance",
    tech: ["React", "JavaScript", "CoinGecko API",],
    link: "https://findmycrypto.netlify.app/",
  },
 
];

export function FeaturedProjectsSection() {
  return (
    <section className="relative min-h-[40vh] overflow-hidden py-16 md:py-20 bg-background">
      <div className="mx-auto w-full max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, idx) => (
              <motion.div
                key={project.title}
                className="group relative flex flex-col rounded-2xl bg-gradient-to-br from-background/90 to-muted/30 border border-border shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="relative w-full aspect-[16/9] overflow-hidden bg-black/10">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover object-center w-full h-full group-hover:scale-105 transition-transform duration-500 rounded-t-2xl"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none" />
                  <div className="absolute top-4 left-4">
                    <Badge variant={idx % 2 === 0 ? "secondary" : "default"} className="backdrop-blur px-3 py-1 text-xs font-semibold shadow">
                      {project.badge}
                    </Badge>
                  </div>
                </div>
                <div className="flex-1 flex flex-col px-6 pt-6 pb-7">
                  <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs border-border bg-background/70">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-auto">
                    <Button className="w-full rounded-full font-semibold tracking-wide group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300" variant="outline" asChild>
                      <a href={project.link} target="_blank" rel="noopener noreferrer">View Project</a>
                    </Button>
                    {project.link && (
                      <Button
                        size="icon"
                        variant="ghost"
                        className="ml-1"
                        asChild
                        title="View on GitHub"
                      >
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                          <Github className="w-5 h-5" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
                <div className="absolute right-4 top-4 bg-background/80 rounded-full px-3 py-1 text-xs font-mono text-muted-foreground shadow hidden md:block">
                  #{idx + 1}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}




