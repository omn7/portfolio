import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trophy } from "lucide-react";
import ProjectDeck, { Project } from "@/components/ProjectDeck";
import ProjectTerminal from "@/components/ProjectTerminal";

const ProjectsSection = () => {
  const [currentProject, setCurrentProject] = useState<Project | null>(null);

  return (
    <section id="projects" data-guide-key="projects" className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 data-guide-key="projects" className="text-2xl md:text-4xl font-heading text-[#00ffff] mb-4 animate-pulse drop-shadow-[0_0_5px_rgba(0,255,255,0.5)]">
            COMPLETED QUESTS
          </h2>
          <p className="text-lg font-sans text-gray-400 max-w-xl mx-auto">
            Mission logs and loot obtained from past adventures.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="flex justify-center lg:justify-end w-full">
            <ProjectDeck onProjectChange={setCurrentProject} />
          </div>
          
          <div className="w-full h-full flex items-center">
            <ProjectTerminal project={currentProject} />
          </div>
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            className="font-heading text-xs border-2 border-white bg-transparent text-white hover:bg-white hover:text-black rounded-none px-6 py-4"
            asChild
          >
            <a href="https://github.com/omn7/" target="_blank" rel="noopener noreferrer">
              <Trophy className="mr-2 h-4 w-4" />
              VIEW ALL QUESTS
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;