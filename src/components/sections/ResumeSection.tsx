import { Download, Eye, FileText, Briefcase, GraduationCap, MapPin, Mail, Linkedin, Github } from "lucide-react";

const RESUME_URL = "https://drive.google.com/file/d/1kdkcr4ii43_6OZDs39wJLYM2whZZ49td/view?usp=drivesdk";

const education = [
  {
    degree: "B.E. Computer Science",
    institution: "Bharati Vidyapeeth College of Engineering",
    period: "2024 – 2028",
    score: "GPA: 8.4 / 10.0",
  },
  {
    degree: "Higher Secondary (12th)",
    institution: "Kothari High School & Jr College",
    period: "2022 – 2024",
    score: "Score: 77.5%",
  },
];

const contact = [
  { icon: Mail, label: "Email", value: "dev.om@outlook.com", href: "mailto:dev.om@outlook.com" },
  { icon: MapPin, label: "Location", value: "Pune, India", href: "" },
  { icon: Linkedin, label: "LinkedIn", value: "in/omnarkhede", href: "https://linkedin.com/in/omnarkhede" },
  { icon: Github, label: "GitHub", value: "github.com/omn7", href: "https://github.com/omn7" },
];

const ResumeSection = () => (
  <section id="resume" className="scroll-mt-24 border-t border-[var(--border)] pt-12 pb-24">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-12">
      <div className="flex items-center gap-2">
        <FileText className="text-[var(--text-muted)]" size={24} />
        <h2 className="notion-h2">Resume & Info</h2>
      </div>

      <div className="flex items-center gap-3">
        <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="notion-btn-primary">
          <Download size={16} /> Download
        </a>
        <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="notion-btn-ghost">
          <Eye size={16} /> Preview
        </a>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-12">

      {/* Education List */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-[var(--text-secondary)] mb-6 border-b border-[var(--border)] pb-2">
          <GraduationCap size={18} />
          <h3 className="text-[16px] font-semibold">Education</h3>
        </div>

        <div className="space-y-8 pl-6 border-l-2 border-[var(--border)] relative">
          {education.map((edu, i) => (
            <div key={i} className="relative">
              {/* Timeline dot */}
              <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-[var(--accent)] border-2 border-[var(--bg)]" />

              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
                <h4 className="font-semibold text-[var(--text)] text-[16px]">{edu.degree}</h4>
                <span className="notion-label">{edu.period}</span>
              </div>
              <p className="notion-body text-[14px] mb-2">{edu.institution}</p>
              <div className="notion-tag">{edu.score}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Panel */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-[var(--text-secondary)] mb-6 border-b border-[var(--border)] pb-2">
          <Briefcase size={18} />
          <h3 className="text-[16px] font-semibold">Contact</h3>
        </div>

        <div className="notion-card p-5">
          <div className="space-y-5">
            {contact.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-[var(--text-muted)]">
                  <Icon size={14} />
                  <span className="notion-label !text-[10px]">{label}</span>
                </div>
                {href ? (
                  <a href={href} target={href.startsWith("http") ? "_blank" : "_self"} rel="noopener noreferrer" className="text-[14px] font-medium text-[var(--text)] hover:text-[var(--accent)] transition-colors break-words">
                    {value}
                  </a>
                ) : (
                  <span className="text-[14px] font-medium text-[var(--text)] break-words">{value}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  </section>
);

export default ResumeSection;
