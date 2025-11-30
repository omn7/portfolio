import { Button } from "@/components/ui/button";
import { RetroCard } from "@/components/ui/retro-card";
import { Download, Eye, Mail, MapPin, Linkedin, Github, TwitterIcon, ScrollText } from "lucide-react";

const RESUME_URL = "https://drive.google.com/file/d/1kdkcr4ii43_6OZDs39wJLYM2whZZ49td/view?usp=drivesdk";

const ResumeSection = () => {
  const handleDownload = () => {
    window.open(RESUME_URL, '_blank');
  };

  const handlePreview = () => {
    window.open(RESUME_URL, '_blank');
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: "dev.om@outlook.com", link: "mailto:dev.om@outlook.com" },
    { icon: MapPin, label: "Base", value: "Pune, India", link: "" },
    { icon: TwitterIcon, label: "Twitter", value: "@mr_codex", link: "https://x.com/mr_codex" },
    { icon: Linkedin, label: "LinkedIn", value: "in/omnarkhede", link: "https://linkedin.com/in/omnarkhede" },
    { icon: Github, label: "GitHub", value: "github.com/omn7", link: "https://github.com/omn7" }
  ];

  const education = [
    {
      degree: "B.E. Computer Science",
      institution: "Bharati Vidyapeeth College of Engineering",
      period: "2024 - 2028",
      gpa: "GPA: 8.4/10.0",
      type: "Main Quest"
    },
    {
      degree: "Higher Secondary (12th)",
      institution: "Kothari High School & Jr College",
      period: "2022 - 2024",
      gpa: "Score: 7.75/10.0",
      type: "Side Quest"
    }
  ];

  return (
    <section id="resume" className="py-20 bg-[#0a0a16]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading text-[#00ff00] mb-4 animate-pulse drop-shadow-[0_0_5px_#00ff00]">GUILD HISTORY</h2>
          <p className="text-lg font-sans text-gray-400 max-w-2xl mx-auto">
            Records of training arcs, guild memberships, and contact crystals.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button 
              onClick={handleDownload}
              className="bg-[#00ffff] hover:bg-[#00cccc] text-black font-heading text-xs px-8 py-6 border-b-4 border-[#008b8b] active:border-b-0 active:translate-y-1 rounded-none shadow-[0_0_10px_rgba(0,255,255,0.5)]"
            >
              <Download className="mr-2 h-4 w-4" />
              DOWNLOAD SCROLL
            </Button>
            <Button 
              onClick={handlePreview}
              variant="outline"
              className="bg-transparent text-[#00ffff] border-2 border-[#00ffff] hover:bg-[#00ffff] hover:text-black font-heading text-xs px-8 py-6 rounded-none shadow-[0_0_5px_rgba(0,255,255,0.3)]"
            >
              <Eye className="mr-2 h-4 w-4" />
              PREVIEW SCROLL
            </Button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <RetroCard className="p-6 bg-[#13132b] h-full border-[#00ffff]/30">
              <h3 className="text-xl font-heading text-[#00ffff] mb-6 flex items-center gap-2">
                <ScrollText className="h-5 w-5" />
                CONTACT CARD
              </h3>
              <div className="space-y-6">
                {contactInfo.map((contact, index) => (
                  <div key={index} className="flex items-center gap-4 group">
                    <div className="p-2 bg-black border border-gray-700 rounded-sm group-hover:border-[#00ffff] transition-colors">
                      <contact.icon className="h-4 w-4 text-[#00ffff]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-heading text-gray-500 mb-1">{contact.label}</p>
                      {contact.link ? (
                        <a 
                          href={contact.link} 
                          className="text-sm font-sans text-white hover:text-[#00ffff] transition-colors break-all"
                          target={contact.link.startsWith('http') ? '_blank' : '_self'}
                          rel={contact.link.startsWith('http') ? 'noopener noreferrer' : ''}
                        >
                          {contact.value}
                        </a>
                      ) : (
                        <p className="text-sm font-sans text-white">{contact.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </RetroCard>
          </div>

          {/* Education / Guild History */}
          <div className="lg:col-span-2">
            <RetroCard className="p-6 bg-[#13132b] h-full border-[#ff00ff]/30">
              <h3 className="text-xl font-heading text-[#ff00ff] mb-6">TRAINING LOGS</h3>
              <div className="space-y-8">
                {education.map((edu, index) => (
                  <div key={index} className="relative pl-8 border-l-4 border-dashed border-gray-700 hover:border-[#ff00ff] transition-colors group">
                    <div className="absolute -left-[10px] top-0 w-4 h-4 bg-black border-2 border-[#ff00ff] rounded-full group-hover:bg-[#ff00ff] transition-colors" />
                    
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                      <h4 className="text-lg font-heading text-white">{edu.degree}</h4>
                      <span className="px-2 py-1 bg-black border border-gray-700 text-xs font-heading text-gray-400 rounded-sm">
                        {edu.type}
                      </span>
                    </div>
                    
                    <p className="text-[#00ffff] font-sans text-xl mb-1">{edu.institution}</p>
                    <div className="flex gap-4 text-sm font-sans text-gray-400">
                      <span>{edu.period}</span>
                      <span className="text-[#00ff00]">{edu.gpa}</span>
                    </div>
                  </div>
                ))}
              </div>
            </RetroCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;
