import Hero from "@/components/Hero";
import ProjectsSection from "@/components/sections/ProjectsSection";
import { FeaturedProjectsSection } from "@/components/ui/FeaturedProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import Footer from "@/components/Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, ArrowRight } from "lucide-react";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { motion } from "framer-motion";

const aboutText = `I'm Om, a second-year Computer Engineering student with a strong passion for technology and innovation. Currently diving deep into areas like Generative AI, neural networks, transformers, and software development, I enjoy building practical projects that solve real-world problems. From experimenting with tools like Hugging Face and LangChain to creating web applications, I'm always eager to learn and apply new concepts in AI and coding.`;

const Index = () => {
  const [showFullAbout, setShowFullAbout] = useState(false);
  const navigate = useNavigate();

  const handleExploreHackathons = () => {
    navigate('/hackathons');
  };

  return (
    <>
      <Hero />
      <section id="about" className="py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 max-w-2xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">About Me</h2>
          <p className={`text-base sm:text-lg text-muted-foreground mx-auto ${showFullAbout ? '' : 'line-clamp-3'}`} style={{ WebkitLineClamp: showFullAbout ? 'unset' : 3 }}>
            {aboutText}
          </p>
          {!showFullAbout ? (
            <span
              className="mt-2 inline-block underline underline-offset-4 text-primary cursor-pointer font-medium px-2 py-1"
              onClick={() => setShowFullAbout(true)}
            >
              Read More
            </span>
          ) : (
            <span
              className="mt-2 inline-block underline underline-offset-4 text-primary cursor-pointer font-medium px-2 py-1"
              onClick={() => setShowFullAbout(false)}
            >
              Read Less
            </span>
          )}
        </div>
      </section>
      



      {/* Explore Hackathons Section */}
      <section className="py-8 sm:py-12" style={{ background: '#0C0C0C' }}>
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="text-center text-lg sm:text-xl font-semibold text-white mb-6"
          >
            Explore My Hackathon Portfolio.
          </motion.h2>
          <div className="flex justify-center">
            <InteractiveHoverButton
              text="Hackathon Portfolio"
              onClick={handleExploreHackathons}
              className="w-auto px-5 py-2 sm:px-7 sm:py-3 text-sm sm:text-base font-semibold rounded-full"
            />
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <FeaturedProjectsSection />

      <SkillsSection />
      <Footer />
    </>
  );
};

export default Index;
