// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Calendar, Clock, ArrowRight, Heart, MessageCircle } from "lucide-react";
// import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Blog } from "@/components/ui/blog-section";

const BlogsSection = () => {
  return (
    <div className="min-h-screen bg-background text-foreground font-roboto flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Blog />
      </main>
      <Footer />
    </div>
  );
};

export default BlogsSection;