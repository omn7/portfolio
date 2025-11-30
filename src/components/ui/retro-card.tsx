import { cn } from "@/lib/utils";
import React from "react";

interface RetroCardProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
}

const RetroCard = React.forwardRef<HTMLDivElement, RetroCardProps>(
  ({ className, as: Component = "div", ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          "relative border-2 border-black rounded-md bg-[#13132b] text-white",
          "shadow-retro transition-all duration-200 ease-in-out",
          "hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000]",
          "active:translate-x-[4px] active:translate-y-[4px] active:shadow-none",
          className
        )}
        {...props}
      />
    );
  }
);
RetroCard.displayName = "RetroCard";

export { RetroCard };
