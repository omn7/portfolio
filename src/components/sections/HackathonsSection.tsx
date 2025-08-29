import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Trophy, Users, ExternalLink } from "lucide-react";
import Footer from "@/components/Footer";

const HackathonsSection = () => {
  const hackathons = [
    {
      id: 1,
      name: "INOVATION FOUNDATION HACKATHON 2025",
      date: "FEB 2025",
      position: "First Hackathon",
      location: "AISSMS College of Engineering, Pune, India",
      description: "Built an Unified digital education platform covering all levels of from kindergarten to postgraduate",
      technologies: ["React", "Typescript", "OpenAI API", "Tailwindcss"],
      teamSize: 4,
  link: "https://github.com/omn7/hackathon/",
  image: "/h1.png"
    },
    {
      id: 2,
  name: "INNOHACK 2025",
  date: "30 July to 31 July 2025",
  position: "Finalist",
  location: "VIT Pune, India",
  description: "AI-powered debugging assistant that helps developers understand and fix code issues using AI. Get clear explanations of complex errors in simple English and receive practical solutions instantly.",
  technologies: ["Reactjs", "Typescript", "ExpressJS", "Node.js","PostgreSQL", "OpenAI API", "TailwindCSS","Gemini APIs"],
  teamSize: 4,
  link: "https://deburger.omnarkhede.tech/",
  image: "/debugger.png"
    },
    // {
    //   id: 3,
    //   name: "DevPost Climate Hackathon",
    //   date: "June 2023",
    //   position: "Top 10 Finalist",
    //   description: "Created a mobile app that gamifies sustainable living by tracking carbon footprint and suggesting eco-friendly alternatives.",
    //   technologies: ["React Native", "Firebase", "GraphQL", "TypeScript"],
    //   teamSize: 2,
    //   link: "https://example.com"
    // },
    // {
    //   id: 4,
    //   name: "MLH Local Hack Day",
    //   date: "December 2022",
    //   position: "Best Beginner Hack",
    //   description: "Built my first full-stack web application - a study buddy matching platform for university students.",
    //   technologies: ["HTML/CSS", "JavaScript", "MongoDB", "Express.js"],
    //   teamSize: 1,
    //   link: "https://example.com"
    // }
  ];

  return (
    <>
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Hackathons</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Competitive programming events where I've collaborated with teams to build innovative solutions under tight deadlines.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {hackathons.map((hackathon) => (
              <Card key={hackathon.id} className="bg-card border-border hover:shadow-card-custom transition-all duration-300 group">
                <img
                  src={hackathon.image}
                  alt={hackathon.name + ' image'}
                  className="w-full max-h-48 min-h-32 object-contain bg-white rounded-t-2xl border-b border-white/10 mb-2 p-2"
                  style={{ background: '#fff', objectFit: 'contain' }}
                />
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-xl text-card-foreground group-hover:text-primary transition-colors">
                        {hackathon.name}
                      </CardTitle>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {hackathon.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      Team of {hackathon.teamSize}
                    </div>
                    <div className="flex items-center gap-1">
                      <span role="img" aria-label="location" className="inline-block">📍</span>
                      {hackathon.location}
                    </div>
                  </div>
                    </div>
                    <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors cursor-pointer" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-primary" />
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                      {hackathon.position}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-card-foreground/80 leading-relaxed">
                    {hackathon.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2">
                    {hackathon.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs border-border">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default HackathonsSection;