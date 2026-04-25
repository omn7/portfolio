"use client"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  url: string
  icon?: any
}

interface NavBarProps {
  items: NavItem[]
  className?: string
}

export function NavBar({ items, className }: NavBarProps) {
  const router = useRouter()
  const pathname = usePathname()
  
  const getCurrentTab = () => {
    const matchByPath = items.find(item => item.url === pathname);
    if (matchByPath) return matchByPath.name;
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
    return () => window.removeEventListener("resize", handleResize)
  }, [])
  
  useEffect(() => {
    setActiveTab(getCurrentTab());
  }, [pathname, items])

  return (
    <div
      className={cn(
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
                if (item.url.startsWith('#')) {
                  const targetId = item.url.substring(1);
                  const targetElement = document.getElementById(targetId);
                  if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                  }
                } else {
                  router.push(item.url);
                }
              }}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-2 py-2 sm:px-4 rounded-full transition-colors min-w-[40px] flex justify-center items-center",
                "text-white sm:text-foreground/80 hover:text-primary",
                isActive && "bg-primary/20 text-primary",
              )}
            >
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
                  <div className="hidden sm:block absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                    <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                  <div className="sm:hidden absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-primary rounded-b-full">
                    <div className="absolute w-6 h-3 bg-primary/30 rounded-full blur-md -bottom-1 -left-1" />
                  </div>
                </motion.div>
              )}
            </a>
          )
        })}
  {/* social icons removed per user request */}
      </div>
    </div>
  )
}