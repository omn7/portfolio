import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Link, useLocation } from 'react-router-dom';
import { Home, Trophy, ScrollText, Map, Menu, X, Volume2, VolumeX } from 'lucide-react';

interface NavItem {
  name: string;
  url: string;
  icon: any;
}

interface RetroNavbarProps {
  items: NavItem[];
  className?: string;
}

export function RetroNavbar({ items, className }: RetroNavbarProps) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [muted, setMuted] = useState<boolean>(() => {
    try { return localStorage.getItem('guideMuted') === '1'; } catch { return false; }
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    try { localStorage.setItem('guideMuted', next ? '1' : '0'); } catch {}
    window.dispatchEvent(new CustomEvent('guide:mute', { detail: next }));
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#0a0a16]/95 backdrop-blur-sm border-b-4 border-black shadow-retro",
        className
      )}
    >
      <div className={cn(
        "container mx-auto px-4"
      )}>
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-[#ff00ff] border-2 border-white flex items-center justify-center group-hover:animate-bounce shadow-[0_0_10px_#ff00ff]">
              <span className="font-heading text-white text-[10px]">OM</span>
            </div>
            <span className="font-heading text-white text-xs sm:text-sm tracking-widest group-hover:text-[#00ffff] transition-colors drop-shadow-[0_0_5px_rgba(0,255,255,0.5)]">
              PLAYER 1
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {items.map((item) => {
              const isActive = location.pathname === item.url;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.url}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 font-heading text-xs transition-all duration-200 border-2 border-transparent",
                    isActive 
                      ? "text-[#00ffff] bg-[#00ffff]/10 border-[#00ffff] shadow-[0_0_10px_rgba(0,255,255,0.3)]" 
                      : "text-gray-300 hover:text-white hover:bg-white/5 hover:border-[#ff00ff]"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            {/* Mute toggle */}
            <button
              onClick={toggleMute}
              title={muted ? 'Unmute sounds' : 'Mute sounds'}
              className={cn(
                'ml-2 flex items-center gap-2 px-3 py-2 font-heading text-xs border-2 transition-all',
                muted ? 'text-gray-400 border-gray-700 hover:text-white hover:border-white' : 'text-white border-white hover:bg-white hover:text-black'
              )}
            >
              {muted ? <VolumeX className="w-4 h-4"/> : <Volume2 className="w-4 h-4"/>}
              <span className="hidden lg:inline">{muted ? 'MUTED' : 'SOUND'}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-white hover:text-[#00ffff] border-2 border-transparent hover:border-[#00ffff] transition-all"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#0a0a16] border-b-4 border-b-black shadow-retro p-4 flex flex-col gap-2 border-t-2 border-t-[#00ffff]">
          {items.map((item) => {
            const isActive = location.pathname === item.url;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.url}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 p-3 font-heading text-xs border-2 transition-all",
                  isActive 
                    ? "bg-[#00ffff]/20 text-[#00ffff] border-[#00ffff]" 
                    : "bg-black/50 text-gray-400 border-gray-800 hover:border-[#ff00ff] hover:text-white"
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
          <button
            onClick={() => { toggleMute(); setIsOpen(false); }}
            className={cn(
              'flex items-center gap-3 p-3 font-heading text-xs border-2 transition-all',
              muted ? 'bg-black/50 text-gray-400 border-gray-800' : 'bg-black/50 text-white border-white'
            )}
          >
            {muted ? <VolumeX className="w-4 h-4"/> : <Volume2 className="w-4 h-4"/>}
            <span>{muted ? 'UNMUTE' : 'MUTE'}</span>
          </button>
        </div>
      )}
    </nav>
  );
}
