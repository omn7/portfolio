export interface Hackathon {
  id: number;
  name: string;
  date: string;
  position: string;
  location: string;
  description: string;
  fullDescription: string;
  technologies: string[];
  link: string;
  github?: string;
  images: string[];
}

export const hackathons: Hackathon[] = [
  {
    id: 3,
    name: "DEV CLASH 2026",
    date: "APR 2026",
    position: "2nd Runner-up",
    location: "Zeal College of Engineering, Pune, India",
    description: "BrainSync — an AI-powered personal planner built on Telegram. Just send a message like 'Finish assignment by 6 PM tomorrow' and BrainSync extracts time, priority, and deadlines using NLP, then automatically schedules and reminds you.",
    fullDescription: `
# BrainSync — AI-Powered Personal Planner

BrainSync is an intelligent personal planner integrated directly into Telegram. It eliminates the friction of manual task scheduling by using Natural Language Processing (NLP) to understand casual messages.

### What We Built
We built a Telegram bot that acts as your personal assistant. Instead of manually filling out forms with dates, times, and priorities, you just send a message like, *"Finish the database migration by 6 PM tomorrow and remind me."*

BrainSync processes this text, extracts the actionable intent, identifies the deadline, assesses the priority level, and automatically schedules the task. It will then follow up with timely reminders to ensure nothing falls through the cracks.

### Features
*   **Conversational Interface:** Add tasks simply by sending a message on Telegram.
*   **NLP Extraction:** Automatically extracts deadlines, times, and priorities from natural language.
*   **Smart Scheduling:** Integrates the extracted data into a structured database for tracking.
*   **Automated Reminders:** Sends proactive reminders before deadlines to keep you on track.
*   **Cross-Platform Access:** Accessible anywhere Telegram is available.

### Technologies Used
*   **Next.js:** For building the dashboard and API routes.
*   **Tailwind CSS:** For styling the dashboard interface.
*   **Python:** For the NLP processing layer.
*   **Prisma & Neon:** For scalable, serverless PostgreSQL database management.
*   **OpenClaw:** Used for processing intents and text parsing.
*   **Telegram Bot API:** The core interface for user interactions.
    `,
    technologies: ["Next.js", "Tailwind CSS", "Python", "Prisma", "Neon", "OpenClaw", "Telegram Bot API"],
    link: "#",
    github: "https://github.com/omn7/codecrew",
    images: ["/hackathonp1.png", "/devclash2.png"]
  },
  {
    id: 2,
    name: "INNOHACK 2025",
    date: "July 2025",
    position: "Finalist",
    location: "VIT Pune, India",
    description: "AI-powered debugging assistant that helps developers understand and fix code issues using AI. Get clear explanations of complex errors in simple English and receive practical solutions instantly.",
    fullDescription: `
# AI-Powered Debugging Assistant

A smart, AI-driven assistant that helps developers understand and fix complex code issues by translating cryptic error messages into simple English.

### What We Built
During INNOHACK 2025, we focused on solving the frustration of unreadable stack traces and cryptic compiler errors. We built a platform that allows developers to paste their broken code or error messages and receive an instant, plain-English explanation of the root cause, along with practical, actionable code fixes.

By leveraging multiple AI models, the assistant cross-references possible solutions to provide the most accurate fix for various programming languages and frameworks.

### Features
*   **Plain English Explanations:** Turns confusing stack traces into readable text.
*   **Instant Code Fixes:** Provides practical solutions that can be directly applied to the codebase.
*   **Dual AI Model Support:** Uses both OpenAI API and Gemini APIs to ensure diverse and accurate debugging.
*   **Community Discussions:** A platform where developers can share persistent issues.

### Technologies Used
*   **Reactjs:** For building the interactive front-end.
*   **ExpressJS:** For the back-end API layer.
*   **PostgreSQL:** To store user queries and community discussions.
*   **OpenAI API:** For advanced, general-purpose error analysis.
*   **Gemini APIs:** For specialized framework-specific insights.
    `,
    technologies: ["Reactjs", "ExpressJS", "PostgreSQL", "OpenAI API", "Gemini APIs"],
    link: "https://deburger.omnarkhede.tech/",
    github: "https://github.com/omn7/docDeBurger",
    images: ["/debugger.png"]
  }
];
