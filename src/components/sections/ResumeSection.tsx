import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Eye, FileText, Mail, Phone, MapPin, Globe, Linkedin, Github, X, TwitterIcon } from "lucide-react";

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
   
    { icon: MapPin, label: "Location", value: "Pune", link: "" },
    { icon: TwitterIcon, label: "Twitter", value: "x.com/mr_codex", link: "https://x.com/mr_codex" },
    { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/omnarkhede", link: "https://linkedin.com/in/omnarkhede" },
    { icon: Github, label: "GitHub", value: "github.com/omn7", link: "https://github.com/omn7" }
  ];

  const education = [
    {
      degree: "Bachelor of Engineering in Computer Science",
      institution: "Bharati Vidyapeeth College of Engineering Pune",
      period: "2024 - 2028",
      gpa: "8.4/10.0"
    },
    {
      degree: "class 12th ",
      institution: "Kothari High School & Jr College",
      period: "2022-2024",
      gpa: "7.75/10.0"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Resume</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Download my complete resume or preview it online. Get in touch if you'd like to discuss opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleDownload}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-glow"
            >
              <Download className="mr-2 h-5 w-5" />
              Download Resume (PDF)
            </Button>
            <Button 
              onClick={handlePreview}
              variant="outline"
              className="border-border hover:bg-nav-hover px-8 py-3 rounded-lg font-medium transition-all duration-300"
            >
              <Eye className="mr-2 h-5 w-5" />
              Preview Online
            </Button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <Card className="bg-card border-border shadow-card-custom">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-card-foreground">
                  <FileText className="h-5 w-5 text-primary" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactInfo.map((contact, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <contact.icon className="h-4 w-4 text-primary flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-muted-foreground">{contact.label}</p>
                      {contact.link ? (
                        <a 
                          href={contact.link} 
                          className="text-sm text-card-foreground hover:text-primary transition-colors break-all"
                          target={contact.link.startsWith('http') ? '_blank' : '_self'}
                          rel={contact.link.startsWith('http') ? 'noopener noreferrer' : ''}
                        >
                          {contact.value}
                        </a>
                      ) : (
                        <p className="text-sm text-card-foreground">{contact.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Education Only */}
          <div className="lg:col-span-2 space-y-8">
            {/* Education */}
            <Card className="bg-card border-border shadow-card-custom">
              <CardHeader>
                <CardTitle className="text-card-foreground">Education & Certifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {education.map((edu, index) => (
                  <div key={index} className="border-l-2 border-primary/20 pl-6 relative">
                    <div className="absolute -left-2 top-0 w-3 h-3 bg-primary rounded-full"></div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-card-foreground">{edu.degree}</h4>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                        <p className="text-primary font-medium">{edu.institution}</p>
                        <p className="text-sm text-muted-foreground">{edu.period}</p>
                      </div>
                      {edu.gpa && (
                        <p className="text-sm text-muted-foreground">GPA: {edu.gpa}</p>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;
