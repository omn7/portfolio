
export interface Project {
  id: string;
  name: string;
  description: string;
  fullDescription?: string;
  github: string;
  live: string;
  image: string;
  tech?: string[];
  features?: string[];
}

export const projects: Project[] = [
  {
    id: "vura",
    name: "Vura",
    description: "Certificate management SaaS — issue, verify, and revoke digital credentials.",
    fullDescription: `
# Automate Certificate Generation with Vura

Vura is designed to stay out of your way — powerful under the hood, effortless on the surface. It serves as a modern certificate generation platform for educators, trainers, and event organizers.

### Key Features

*   **Bulk Generation:** Process thousands of rows from Excel (.xlsx) into pristine PDFs in seconds.
*   **Unique Verification IDs:** Unforgeable CERT-XXXX identifiers embedded in each document and QR code.
*   **Instant Verification:** Anyone can scan the QR code to view a public authenticity page in real-time.
*   **Secure Cloud Storage:** All generated assets automatically stored in AWS S3, metadata in Neon Postgres.
*   **API Access:** Generate certificates from any system using your secret API key. Works with OpenClaw, Zapier, Telegram bots, and more.
*   **Usage Analytics:** Track every API call — endpoint, status, certificate ID, timestamp — in your personal usage dashboard.

### How It Works

1.  **Upload Template:** Drop your blank PDF certificate design. Markers are placed automatically for name, course, and date fields.
2.  **Map Your Data:** Upload an Excel file with columns (Name, Course, IssueDate) or call the API to send individual recipient data programmatically.
3.  **Generate, Share & Verify:** Click generate (or call POST /api/certificates/create). Vura builds, uploads to S3, and returns direct PDF + public verify links instantly.

### Tech Stack
Built with Next.js, Prisma, and AWS.
    `,
    github: "https://github.com/omn7/vura",
    live: "https://vurakit.vercel.app",
    image: "/vura.png",
    tech: ["Next.js", "Supabase", "PostgreSQL", "TypeScript", "AWS S3"]
  },
  {
    id: "deburger",
    name: "DeBurger",
    description: "AI-powered debugging assistant that helps developers understand and fix code issues using AI.",
    fullDescription: `
# De-Burger: AI-Powered Debugging

AI-powered debugging assistant that helps developers understand and fix code issues using AI. Get clear explanations of complex errors in simple English and receive practical solutions instantly.

### Features

*   **AI Code Debugger:** Get instant code analysis and debugging help powered by AI - explained in simple English.
*   **Smart Error Explanation:** Paste your error messages and get clear explanations of what went wrong and how to fix it.
*   **Community Support:** Connect with experienced developers and share your debugging challenges with the community.
*   **Instant Solutions:** Receive practical solutions instantly to fix your code issues.

DeBurger simplifies the debugging process, making it easier for developers of all levels to maintain high-quality code.
    `,
    github: "https://github.com/omn7", 
    live: "https://deburger.omnarkhede.tech/",
    image: "/debugger.png",
    tech: ["React", "TypeScript", "Node.js", "PostgreSQL", "OpenAI API", "TailwindCSS", "Gemini APIs"]
  },
  {
    id: "upliftx",
    name: "UpLiftx",
    description: "Event Management Platform. Freelance Mission for managing community events.",
    fullDescription: `
# UpLiftx Events

Find your purpose, build your network, and contribute to something truly special. UpLiftx is a platform empowering communities, one volunteer at a time.

### Mission
To provide a seamless platform for volunteers to find opportunities and for organizations to manage their community events effectively.

### Features

*   **Opportunity Search:** Volunteers can search for work and opportunities that match their skills and interests.
*   **Dashboard:** specialized dashboard to manage applications and opportunities.
*   **Community Building:** Connect with other volunteers and organizations.
*   **Event Management:** Tools for organizations to create and manage events.

### Tech Stack
Built with Next.js, Tailwind, Node.js, Supabase, Clerk API, and Express.js.
    `,
    github: "https://github.com/omn7",
    live: "https://upliftx.vercel.app/",
    image: "/image.png",
    tech: ["Next.js", "Tailwind", "Node.js", "Supabase", "Clerk API", "Express.js"]
  },
  {
    id: "dsa",
    name: "DSA Practice Hub",
    description: "A curated open-source hub for data structures and algorithms practice.",
    fullDescription: `
# Mastering Algorithms: One Problem at a Time

A curated collection of Data Structures and Algorithms solutions in Java. Focusing on clean code, optimization, and deep understanding.

### Overview

This hub provides comprehensive resources for mastering DSA, covering a wide range of topics:

*   **Arrays:** Binary Search, Linear Search, Sliding Window, Prefix Sum, Kadane's Algorithm, etc.
*   **Sorting:** Bubble Sort, Merge Sort, Quick Sort, Selection Sort, Insertion Sort.
*   **Matrix:** Spiral Matrix, Diagonal Sum, Staircase Search.
*   **Strings:** Palindrome, Compression, Pattern Matching.
*   **Recursion & Backtracking:** Fibonacci, Reverse Array, N-Queens (implied), etc.
*   **Data Structures:** Hashing, Linked Lists, Trees, Graphs (implied).

### Goals

*   **Clean Code:** Solutions are written with readability and maintainability in mind.
*   **Optimization:** Focus on time and space complexity analysis.
*   **Deep Understanding:** Each problem is approached to build foundational knowledge.

### Resource
This is an open-source project hosted on GitHub Pages, serving as a study guide and reference for students and developers preparing for technical interviews.
    `,
    github: "https://github.com/omn7/DSA",
    live: "https://omn7.github.io/DSA/",
    image: "/DSAproject.png",
    tech: ["Java", "Algorithms", "Data Structures", "GitHub Pages"]
  }
];
