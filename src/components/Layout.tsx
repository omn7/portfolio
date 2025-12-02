import { Home, Trophy, BookOpen, ScrollText } from "lucide-react";
import { RetroNavbar } from "@/components/ui/retro-navbar";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const navItems = [
    { name: 'BASE', url: '/', icon: Home },
    { name: 'QUESTS', url: '/hackathons', icon: Trophy },
    { name: 'LOGS', url: '/blogs', icon: BookOpen },
    { name: 'DSA Practice', url: 'https://omn7.github.io/DSA/', icon: ScrollText }
  ];

  return (
    <div className="min-h-screen bg-retro-bg text-white font-sans selection:bg-retro-green selection:text-black">
      <RetroNavbar items={navItems} />
      {children}
    </div>
  );
};

export default Layout;
