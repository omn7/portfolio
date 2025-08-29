// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Calendar, Clock, ArrowRight, Heart, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import { Blog } from "@/components/ui/blog-section";

const BlogsSection = () => {
  return (
    <>
      <main className="flex-1">
        <Blog />
      </main>
      <Footer />
    </>
  );
};

export default BlogsSection;