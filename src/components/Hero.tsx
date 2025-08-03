import { Star, Download } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
// import Navigation from "@/components/Navigation";

const Hero = () => {
  const handleResumeDownload = () => {
    window.open('https://drive.google.com/file/d/1kVusiSECN6M4Yb9Xsrp_NCxIe6Dr2LlL/view', '_blank');
  };

  const portfolioData = {
    heading: "Om Narkhede",
    description: "Computer Engineering student passionate about AI and software development. I love building innovative solutions that make technology simple and useful.",
    reviews: {
      count: 100,
      avatars: [
        {
          src: "https://www.shadcnblocks.com/images/block/avatar-1.webp",
          alt: "Client 1",
        },
        {
          src: "https://www.shadcnblocks.com/images/block/avatar-2.webp", 
          alt: "Client 2",
        },
        {
          src: "https://www.shadcnblocks.com/images/block/avatar-3.webp",
          alt: "Client 3",
        },
        {
          src: "https://www.shadcnblocks.com/images/block/avatar-4.webp",
          alt: "Client 4",
        },
        {
          src: "https://www.shadcnblocks.com/images/block/avatar-5.webp",
          alt: "Client 5",
        },
      ],
    },
  };

  return (
    <section className="pt-8 pb-32 bg-black relative overflow-hidden">
      {/* <Navigation /> */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5"></div> */}
      <div className="container text-center relative z-10">
        <div className="mx-auto flex max-w-screen-lg flex-col gap-6">
          <h1 className="text-3xl font-extrabold lg:text-6xl text-foreground">
            {portfolioData.heading}
          </h1>
          <p className="text-balance text-muted-foreground lg:text-lg">
            {portfolioData.description}
          </p>
        </div>
        <Button 
          onClick={handleResumeDownload}
          size="lg" 
          className="mt-10 bg-primary hover:bg-primary/90 text-primary-foreground w-full max-w-xs mx-auto sm:w-auto sm:max-w-none"
        >
          <Download className="mr-2 h-5 w-5" />
          Download Resume
        </Button>
        <div className="mx-auto mt-10 flex w-full max-w-xs sm:max-w-lg flex-col items-center gap-4 sm:flex-row sm:gap-8 flex-wrap">
          <span className="mx-4 inline-flex items-center -space-x-4 flex-wrap max-w-full overflow-x-auto">
            {portfolioData.reviews.avatars.map((avatar, index) => (
              <Avatar key={index} className="border flex-shrink-0 size-10 sm:size-14">
                <AvatarImage src={avatar.src} alt={avatar.alt} className="w-8 h-8 sm:w-14 sm:h-14 object-cover rounded-full" />
              </Avatar>
            ))}
          </span>
          <div className="w-full sm:w-auto flex flex-col items-center sm:items-start">
            <div className="flex flex-wrap items-center gap-1 justify-center sm:justify-start w-full">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className="size-5 fill-yellow-400 text-yellow-400 flex-shrink-0"
                />
              ))}
            </div>
            <p className="text-center sm:text-left font-medium text-muted-foreground w-full break-words">
              from {portfolioData.reviews.count}+ satisfied clients
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;