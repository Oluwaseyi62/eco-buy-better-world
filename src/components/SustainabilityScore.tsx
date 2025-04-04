
import React from "react";
import { Leaf } from "lucide-react";
import { SustainabilityScore as ScoreType } from "@/types";
import { cn } from "@/lib/utils";

interface SustainabilityScoreProps {
  score: ScoreType;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const SustainabilityScore: React.FC<SustainabilityScoreProps> = ({
  score,
  size = "md",
  className,
}) => {
  const maxScore = 5;
  
  const sizeClasses = {
    sm: "gap-0.5",
    md: "gap-1",
    lg: "gap-1.5",
  };
  
  const iconSizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };
  
  return (
    <div className={cn("flex items-center", sizeClasses[size], className)}>
      {[...Array(maxScore)].map((_, i) => (
        <Leaf
          key={i}
          className={cn(
            iconSizeClasses[size],
            i < score 
              ? "text-eco-500 fill-eco-500" 
              : "text-muted-foreground/30"
          )}
        />
      ))}
    </div>
  );
};

export default SustainabilityScore;
