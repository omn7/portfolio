import { Home, Trophy, BookOpen, FileText } from "lucide-react";
import { NavBar } from "@/components/ui/tubelight-navbar";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const navItems = [
    { name: 'Home', url: '/', icon: Home },
    { name: 'Hackathons', url: '/hackathons', icon: Trophy },
    { name: 'Blogs', url: '/blogs', icon: BookOpen },
    { name: 'Resume', url: '/resume', icon: FileText }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-roboto">
      <NavBar items={navItems} />
      {children}
    </div>
  );
};

export default Layout;
