"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useNavigate, useLocation } from "react-router-dom"

interface NavItem {
  name: string
  url: string
  // icon kept optional to remain compatible with existing nav item definitions
  icon?: any
}

interface NavBarProps {
  items: NavItem[]
  className?: string
}

export function NavBar({ items, className }: NavBarProps) {
  const navigate = useNavigate()
  const location = useLocation()
  
  // Set active tab based on current URL
  const getCurrentTab = () => {
    const path = location.pathname;
    const hash = location.hash;
    
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
    
    return () => {
      window.removeEventListener("resize", handleResize);
    }
  }, [])
  
  // Update active tab when location changes
  useEffect(() => {
    setActiveTab(getCurrentTab());
  }, [location.pathname, location.hash, items])

  return (
    <div
      className={cn(
        // Default to top on mobile, keep top positioning on larger screens as well
        "fixed top-4 left-1/2 -translate-x-1/2 z-50 w-auto max-w-[90%] sm:max-w-none",
        className,
      )}
    >
  <div className="flex items-center gap-1 sm:gap-3 bg-gradient-to-b from-black/80 to-black/60 sm:bg-background/5 border border-border backdrop-blur-xl py-2 px-3 rounded-full shadow-2xl justify-center">
  {items.map((item) => {
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
                  // For regular URLs, use React Router navigation
                  navigate(item.url);
                }
              }}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-2 py-2 sm:px-4 rounded-full transition-colors min-w-[40px] flex justify-center items-center",
                "text-white sm:text-foreground/80 hover:text-primary",
                isActive && "bg-primary/20 text-primary",
              )}
            >
              {/* Always show the name. Icons removed per request. */}
              <span className="inline-flex items-center gap-2">
                <span>{item.name}</span>
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-primary/20 sm:bg-primary/5 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  {/* Top indicator light for desktop */}
                  <div className="hidden sm:block absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                    <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                  {/* Bottom indicator light for mobile */}
                  <div className="sm:hidden absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-primary rounded-b-full">
                    <div className="absolute w-6 h-3 bg-primary/30 rounded-full blur-md -bottom-1 -left-1" />
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