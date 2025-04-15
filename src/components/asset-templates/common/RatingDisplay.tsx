
import React from "react";
import { Star, StarHalf } from "lucide-react";

interface RatingDisplayProps {
  value: number;
  maxValue?: number;
  showValue?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export const RatingDisplay: React.FC<RatingDisplayProps> = ({
  value,
  maxValue = 10,
  showValue = false,
  size = 'md',
  color
}) => {
  const normalizedValue = Math.min(Math.max(0, value), maxValue);
  
  // For star ratings (converts to 5-star scale)
  const starRating = (normalizedValue / maxValue) * 5;
  const fullStars = Math.floor(starRating);
  const hasHalfStar = starRating - fullStars >= 0.25 && starRating - fullStars < 0.75;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8"
  };
  
  const starSize = sizeClasses[size];
  const starColor = color || "var(--brand-primary, #9b87f5)";
  
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star 
            key={`full-${i}`} 
            className={`${starSize} fill-current`} 
            style={{ color: starColor }} 
          />
        ))}
        
        {hasHalfStar && (
          <StarHalf 
            className={`${starSize} fill-current`} 
            style={{ color: starColor }} 
          />
        )}
        
        {[...Array(emptyStars)].map((_, i) => (
          <Star 
            key={`empty-${i}`} 
            className={`${starSize} text-muted-foreground`} 
          />
        ))}
      </div>
      
      {showValue && (
        <span className="font-bold text-lg" style={{ color: starColor }}>
          {normalizedValue}/{maxValue}
        </span>
      )}
    </div>
  );
};
