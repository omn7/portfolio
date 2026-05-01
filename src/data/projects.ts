

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
  label?: string;
}

export const projects: Project[] = [
  {
    id: "vura",
    name: "Vura",
    description: "Certificate management SaaS — issue, verify, and revoke digital credentials.",
    fullDescription: `
# Automate Certificate Generation with Vura

Vura is a production-ready platform that enables event organizers, educators, and trainers to generate and verify bulk certificates instantly with built-in authenticity and digital traceability. Designed to stay out of your way — powerful under the hood, effortless on the surface.

### Key Features

*   **Bulk Generation:** Process thousands of rows from Excel (.xlsx) into pristine PDFs in seconds.
*   **Unique Verification IDs:** Unforgeable CERT-XXXX identifiers embedded in each document and QR code.
*   **Instant Verification:** Anyone can scan the QR code to view a public authenticity page in real-time.
*   **Secure Cloud Storage:** All generated assets automatically stored in AWS S3, metadata in Neon Postgres.
*   **API Access:** Generate certificates from any system using your secret API key. Works with OpenClaw, Zapier, Telegram bots, and more.
*   **Usage Analytics:** Track every API call — endpoint, status, certificate ID, timestamp — in your personal usage dashboard.
*   **Google & Email Authentication:** Secure login with multiple auth providers.
*   **Custom Branding:** Pro plan supports custom certificate branding for organizations.

### How It Works

1.  **Upload Template:** Drop your blank PDF certificate design. Markers are placed automatically for name, course, and date fields.
2.  **Map Your Data:** Upload an Excel file with columns (Name, Course, IssueDate) or call the API to send individual recipient data programmatically.
3.  **Generate, Share & Verify:** Click generate (or call POST /api/certificates/create). Vura builds, uploads to S3, and returns direct PDF + public verify links instantly.

### Architecture

*   **Frontend:** Next.js App Router with TypeScript (98.7% TypeScript codebase)
*   **Database:** Prisma ORM with Neon Postgres for metadata storage
*   **Storage:** AWS S3 for generated certificate PDFs and assets
*   **Auth:** Google & Email login with session management
*   **API Layer:** RESTful API with secret key authentication for programmatic access
*   **Deployment:** Vercel with GitHub Actions CI/CD pipeline
*   **Dashboard:** Real-time certificate management, search, and usage analytics

### How to Use Vura

1.  **Create an Account:** Head to vurakit.vercel.app and sign up with Google or Email — no credit card required on the free tier.
2.  **Design Your Certificate:** Upload a blank PDF certificate template. Vura automatically detects placement markers for the recipient name, course title, and issue date.
3.  **Prepare Your Data:** Create an Excel (.xlsx) file with columns: Name, Course, and IssueDate. Each row represents one certificate recipient.
4.  **Upload & Generate:** Drop your Excel file in the dashboard. Click "Generate" and Vura processes every row into individual PDFs with unique CERT-XXXX IDs and embedded QR codes.
5.  **Share & Verify:** Each certificate gets a direct PDF download link and a public verification URL. Recipients (or anyone) can scan the QR code to verify authenticity in real-time.
6.  **API Integration (Advanced):** Go to your dashboard, generate a secret API key, and call POST /api/certificates/create to generate certificates programmatically from any system — Zapier, Telegram bots, custom apps, etc.
7.  **Track Usage:** Monitor every API call, certificate status, and generation history in the built-in analytics dashboard.

### How I Built It

I started Vura because I saw how painful manual certificate generation was for event organizers — they'd spend hours in Canva or Word editing names one by one. I wanted to automate the entire pipeline.

I chose Next.js App Router for the frontend because it offers server-side rendering, API routes, and file-based routing all in one framework. The entire codebase is TypeScript (98.7%) for type safety across the stack.

For the database, I used Prisma ORM connected to Neon Postgres. Prisma made schema migrations painless and gave me type-safe database queries. Every certificate's metadata (recipient name, cert ID, S3 URL, issue date, verification status) is stored here.

The core challenge was PDF generation at scale. I built a pipeline that takes the uploaded PDF template, overlays dynamic text (name, course, date) and a unique QR code using server-side PDF manipulation, then uploads the finished PDF to AWS S3. The QR code encodes a public verification URL that links to a verify/[id] page.

Authentication was implemented with Google and Email sign-in, with session management handling user dashboards. I added an API key system so power users could integrate certificate generation into their own workflows — each API call is logged with endpoint, status, cert ID, and timestamp.

Deployment runs on Vercel with a GitHub Actions CI/CD pipeline for automated builds and deployments on every push to main.

### Stats

*   500+ certificates generated
*   20+ organizations using the platform
*   99.9% uptime SLA
*   <2s average generation time
    `,
    github: "https://github.com/omn7/Vura",
    live: "https://vurakit.vercel.app",
    image: "/vurakitupdated.png",
    tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "AWS S3", "Vercel", "GitHub Actions"],
    label: "Personal Project"
  },
  {
    id: "deburger",
    name: "DeBurger",
    description: "AI-powered debugging assistant that helps developers understand and fix code issues using AI.",
    fullDescription: `
# De-Burger: AI-Powered Debugging

AI-powered debugging assistant that helps developers understand and fix code issues using AI. Get clear explanations of complex errors in simple English and receive practical solutions instantly.

### Features

*   **AI Code Debugger:** Get instant code analysis and debugging help powered by AI — explained in simple English.
*   **Smart Error Explanation:** Paste your error messages and get clear explanations of what went wrong and how to fix it.
*   **Community Support:** Connect with experienced developers and share your debugging challenges with the community.
*   **Instant Solutions:** Receive practical solutions instantly to fix your code issues.
*   **Multi-AI Support:** Powered by both OpenAI and Google Gemini APIs for diverse and accurate responses.

### How It Works

1.  **Paste Your Code:** Drop your buggy code or error message into the input area.
2.  **AI Analysis:** The AI analyzes your code, identifies issues, and generates a clear explanation.
3.  **Get Solutions:** Receive practical fixes with explanations in plain English — no jargon.

### Tech Stack

*   **Frontend:** React with TypeScript and TailwindCSS for a responsive, modern UI.
*   **Backend:** Node.js server handling API requests and AI model orchestration.
*   **Database:** PostgreSQL for storing community discussions and user data.
*   **AI Models:** OpenAI API and Google Gemini APIs for intelligent code analysis.
*   **Documentation:** Separate doc site built with HTML/CSS/JS, hosted on GitHub Pages.

### How to Use DeBurger

1.  **Visit the App:** Go to deburger.omnarkhede.tech and click "Get Started."
2.  **Paste Your Code or Error:** Copy the buggy code snippet or the error message you're struggling with and paste it into the input area.
3.  **Select AI Model:** Choose between OpenAI or Google Gemini for the analysis — each model has different strengths for different types of errors.
4.  **Get Explanation:** The AI breaks down what went wrong in plain English. No cryptic jargon — just clear, human-readable explanations of the root cause.
5.  **Apply the Fix:** Each response includes practical code solutions you can copy and apply directly to your codebase.
6.  **Community Help:** For complex issues, post your debugging challenge to the community section where experienced developers can weigh in.

### How I Built It

The idea for DeBurger came from my own frustration with cryptic error messages. Stack traces and compiler errors can be intimidating, especially for beginners. I wanted to build something that translates those into plain English.

The frontend is React with TypeScript, styled with TailwindCSS. I focused on making the UI as simple as possible — a single input area, a submit button, and a clean output panel. No unnecessary complexity.

On the backend, I built a Node.js server that acts as an orchestration layer between the frontend and multiple AI providers. When a user submits code, the server formats a carefully engineered prompt that instructs the AI to: identify the bug, explain why it happens, and provide a working fix with explanation.

I integrated both OpenAI and Google Gemini APIs to give users options. OpenAI tends to be better for general-purpose debugging, while Gemini sometimes catches nuances in specific frameworks. The backend handles API key management, rate limiting, and response formatting.

PostgreSQL stores user data and community discussions. I also built a separate documentation site (hosted on GitHub Pages via the docDeBurger repo) using plain HTML/CSS/JS to keep the docs lightweight and fast.

DeBurger simplifies the debugging process, making it easier for developers of all levels to maintain high-quality code.
    `,
    github: "https://github.com/omn7/docDeBurger",
    live: "https://deburger.omnarkhede.tech/",
    image: "/debugger.png",
    tech: ["React", "TypeScript", "Node.js", "PostgreSQL", "OpenAI API", "TailwindCSS", "Gemini API"],
    label: "Hackathon Project"
  },
  {
    id: "upliftx",
    name: "UpliftX",
    description: "Volunteer management platform for event-based brands — register, assign roles, and coordinate.",
    fullDescription: `
# UpliftX — Empowering Communities, One Volunteer at a Time

UpliftX is a volunteer management platform built for event-based brands, enabling organizers to register volunteers, assign roles, and streamline event coordination. Find your purpose, build your network, and contribute to something truly special.

### Features

*   **Opportunity Search:** Volunteers can browse and search for work opportunities matching their skills and interests.
*   **Application System:** Apply to volunteer positions with a streamlined application flow and status tracking.
*   **Admin Dashboard:** Specialized dashboard for organizers to manage applications, opportunities, and volunteer data.
*   **Role Assignment:** Assign specific roles to volunteers for efficient event coordination.
*   **Rating System:** Rate and review volunteer performance after events.
*   **Community Building:** Connect with other volunteers and organizations in the community.
*   **WhatsApp Integration:** Quick group coordination via WhatsApp group links.
*   **Authentication:** Secure sign-in with Clerk API for user authentication and management.

### Tech Stack

*   **Frontend:** Next.js with TypeScript (92.2% TypeScript codebase) and TailwindCSS.
*   **Backend:** Node.js with Express.js for API routing and server-side logic.
*   **Database:** Supabase (PostgreSQL) with custom SQL migrations for permissions, ratings, and opportunity management.
*   **Auth:** Clerk API for secure authentication and user management.
*   **Deployment:** Vercel with custom vercel.json configuration.

### How to Use UpliftX

**As a Volunteer:**
1.  **Sign Up:** Create an account using Clerk authentication (Google / Email).
2.  **Browse Opportunities:** Explore available volunteer positions on the Opportunities page. Filter by event type, role, or location.
3.  **Apply:** Click on an opportunity that interests you and submit your application with a single click.
4.  **Track Status:** Check your Dashboard to see application statuses — pending, accepted, or completed.
5.  **Get Rated:** After completing a volunteer assignment, organizers rate your performance, building your reputation.

**As an Organizer:**
1.  **Create Opportunities:** Log in to the Admin Dashboard and create new volunteer opportunities with role descriptions, requirements, and event details.
2.  **Manage Applications:** Review incoming volunteer applications, accept or reject candidates, and assign specific roles.
3.  **Coordinate via WhatsApp:** Share WhatsApp group links with accepted volunteers for quick event-day coordination.
4.  **Rate Volunteers:** After the event, rate volunteer performance to help build community trust.

### How I Built It

UpliftX was a freelance project — I built it for a client who needed a platform to manage volunteers across multiple events. The challenge was building something scalable enough to handle multiple organizations while keeping it simple for non-technical organizers.

I chose Next.js with TypeScript for the frontend (92.2% of the codebase is TypeScript) because I needed both server-rendered pages for SEO and dynamic client-side interactions for the dashboard. TailwindCSS handled all the styling.

The backend runs on Express.js with Node.js, handling API routes for volunteer applications, opportunity CRUD, and user management. For the database, I went with Supabase (hosted PostgreSQL) because it gave me real-time subscriptions, built-in auth helpers, and a generous free tier.

The trickiest part was the permissions system. I wrote custom SQL scripts (fix-admin-permissions.sql, fix_apply_now.sql, fix_delete_opportunities.sql, fix_rating_complete.sql) to handle row-level security in Supabase — making sure organizers can only manage their own events, volunteers can only see their own applications, and admins have full access.

Clerk API handles authentication, giving users Google and email sign-in out of the box with session management.

The project is deployed on Vercel with a custom vercel.json configuration for routing.

### Architecture

The project follows a clean separation with Supabase handling the database layer including custom SQL scripts for admin permissions, application workflows, rating systems, and opportunity deletion logic.
    `,
    github: "https://github.com/omn7/Upliftx",
    live: "https://www.upliftxevents.com/",
    image: "/uplfitxupdated.png",
    tech: ["Next.js", "TypeScript", "TailwindCSS", "Supabase", "PostgreSQL", "Clerk API", "Express.js", "Vercel"],
    label: "Volunteering Project"
  },
  {
    id: "dsa",
    name: "DSA Practice Hub",
    description: "A curated open-source hub of 48+ DSA solutions in Java — with progress tracking and GitHub Pages.",
    fullDescription: `
# Mastering Algorithms: One Problem at a Time

A curated collection of 48+ Data Structures and Algorithms solutions in Java. Focusing on clean code, optimization, and deep understanding. Hosted as a static site on GitHub Pages as an interactive study guide.

### Progress Overview (98% Complete)

*   **Searching Algorithms (2/2):** Binary Search, Linear Search.
*   **Number Systems (2/2):** Binary to Decimal conversion, Index operations.
*   **Array Problems (6/7):** Second Largest, Subarray, Prefix Sum, Kadane's Algorithm, Trapping Rain Water, Buy & Sell Stock.
*   **Sorting Algorithms (5/5):** Bubble Sort, Bubble Sort (Kth Smallest), Insertion Sort, Merge Sort, Selection Sort.
*   **Matrix Problems (2/3):** Diagonal Sum, Staircase Matrix Search, Spiral Matrix (in progress).
*   **Pattern Problems (6/6):** Diamond, Rhombus, String Compression, and more.
*   **String Problems (4/4):** Palindrome, Uppercase Conversion, Lexicographic Comparison, Shortest Path.
*   **Recursion & Backtracking (9/9):** Fibonacci, Reverse Array, Palindrome, N-to-1 Backtracking, and more.
*   **Hashing (3/3):** Number Hashing, Character Hashing, All Character Hashing.
*   **OOP Concepts:** Getter/Setter, OOP principles.
*   **Loop & Control Flow:** Complete coverage of loop patterns and control structures.

### Goals

*   **Clean Code:** Solutions written with readability and maintainability in mind.
*   **Optimization:** Focus on time and space complexity analysis for each problem.
*   **Deep Understanding:** Each problem approached to build foundational knowledge, not just solve it.

### Tech & Setup

*   **Language:** Java (50.8% of codebase)
*   **Hosting:** GitHub Pages with static HTML (49.2%)
*   **IDE Workflow:** Compile with javac, run with java, test with edge cases.
*   **Organization:** All solutions in /dsa directory, progress tracked in README.

### How to Use This Hub

1.  **Browse Solutions Online:** Visit omn7.github.io/DSA/ to see the full progress tracker with links to every solution file.
2.  **Clone the Repo:** Run git clone https://github.com/omn7/DSA.git to get all Java source files locally.
3.  **Navigate to Solutions:** All solutions live in the /dsa directory. Each file is named after the problem (e.g., spiralmatrix2d.java, kadanesalgo.java).
4.  **Compile & Run:** Open a terminal, navigate to the dsa folder, compile with javac filename.java, and run with java filename.
5.  **Study the Approach:** Each solution is written with readability in mind — clear variable names, comments explaining the logic, and optimized for time/space complexity.
6.  **Use as Reference:** The progress tracker in the README categorizes problems by topic, making it easy to find solutions for specific algorithm types during interview prep.

### How I Built It

This project started as my personal DSA study journal. When I began learning Data Structures and Algorithms with Java, I wanted a structured way to track progress and revisit solutions.

I organized everything in a single /dsa directory with one Java file per problem. The naming convention is straightforward — the filename describes the problem (bubblesort.java, palindrome.java, trappingrainwater.java). No complex folder hierarchies, just flat and searchable.

For each problem, my workflow was: understand the problem thoroughly, plan the approach on paper, code the solution, test it with edge cases, optimize for time/space complexity, and commit with a descriptive message.

I built a progress tracker in the README using Markdown tables. Each row shows the problem name, completion status (checkmark or in-progress), and a link to the source file. I also added learning statistics showing completion percentages per category — this helped me identify weak areas to focus on.

To make it accessible to others, I created a static HTML site deployed on GitHub Pages with a GitHub Actions workflow. The site (omn7.github.io/DSA/) serves as a visual frontend for the repository, making it easier to browse than raw GitHub.

The codebase is 50.8% Java (solutions) and 49.2% HTML (the static site). The repo is set up as a public template so other students can fork it and track their own DSA journey with the same structure.

Currently at 48/49 problems solved (98% complete), with Spiral Matrix 2D being the last remaining problem.
    `,
    github: "https://github.com/omn7/DSA",
    live: "https://omn7.github.io/DSA/",
    image: "/DSAproject.png",
    tech: ["Java", "Algorithms", "Data Structures", "GitHub Pages"],
    label: "Personal Docs"
  }
];
