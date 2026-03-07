import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Projects from "./pages/Projects";
import Experience from "./pages/Experience";
import Education from "./pages/Education";
import ExperienceEducation from "./pages/ExperienceEducation";
// Other imports kept in case they are needed later
import HackathonsSection from "@/components/sections/HackathonsSection";
import BlogsSection from "@/components/sections/BlogsSection";
import Resume from "./pages/Resume";
import ProjectDetail from "./pages/ProjectDetail";
import Professional from "./pages/Professional";
import About from "./pages/About";
import News from "./pages/News";
import { AuthProvider } from "@/hooks/useAuth";
import Auth from "./pages/Auth";
import Todoist from "./pages/Todoist";
import PublicNote from "./pages/PublicNote";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Index /></Layout>} />
          <Route path="/projects" element={<Layout><Projects /></Layout>} />
          <Route path="/project/:id" element={<Layout><ProjectDetail /></Layout>} />
          <Route path="/experience-education" element={<Layout><ExperienceEducation /></Layout>} />
          <Route path="/experience" element={<Layout><Experience /></Layout>} />
          <Route path="/education" element={<Layout><Education /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/news" element={<Layout><News /></Layout>} />

          <Route path="/hackathons" element={<Layout><HackathonsSection /></Layout>} />
          <Route path="/blogs" element={<Layout><BlogsSection /></Layout>} />
          <Route path="/resume" element={<Layout><Resume /></Layout>} />
          <Route path="/prof" element={<Professional />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/todoist" element={<Todoist />} />
          <Route path="/notes/:userId/:noteId" element={<PublicNote />} />
          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
