"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
}

export function NavBar({ items, className }: NavBarProps) {
  // Set active tab based on current URL
  const getCurrentTab = () => {
    const path = window.location.pathname;
    const hash = window.location.hash;
    
    // Check path first
    const matchByPath = items.find(item => item.url === path);
    if (matchByPath) return matchByPath.name;
    
    // Then check hash
    if (hash) {
      const matchByHash = items.find(item => item.url === hash);
      if (matchByHash) return matchByHash.name;
    }
    
    // Default to first item
    return items[0].name;
  };

  const [activeTab, setActiveTab] = useState(getCurrentTab())
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    
    // Update active tab when URL changes
    const updateActiveTab = () => {
      setActiveTab(getCurrentTab());
    };
    
    // Run once on component mount
    updateActiveTab();
    
    // Listen for URL changes
    window.addEventListener('popstate', updateActiveTab);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener('popstate', updateActiveTab);
    }
  }, [])

  return (
    <div
      className={cn(
        "fixed bottom-0 sm:top-4 left-1/2 -translate-x-1/2 z-50 mb-6 w-auto",
        className,
      )}
    >
      <div className="flex items-center gap-2 sm:gap-3 bg-background/5 border border-border backdrop-blur-lg py-1 px-1 rounded-full shadow-lg justify-center">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          return (
            <a
              key={item.name}
              href={item.url}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab(item.name);
                
                // Handle hash navigation
                if (item.url.startsWith('#')) {
                  const targetId = item.url.substring(1);
                  const targetElement = document.getElementById(targetId);
                  if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                  }
                } else {
                  // For regular URLs, use navigation
                  window.location.href = item.url;
                }
              }}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-4 py-2 sm:px-5 rounded-full transition-colors",
                "text-foreground/80 hover:text-primary",
                isActive && "bg-muted text-primary",
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                    <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </a>
          )
        })}
      </div>
    </div>
  )
} 