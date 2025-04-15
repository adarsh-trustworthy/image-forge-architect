
import React from "react";

interface PoweredByBadgeProps {
  name: string;
  logoUrl?: string;
}

export const PoweredByBadge: React.FC<PoweredByBadgeProps> = ({ name, logoUrl }) => {
  return (
    <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground py-2">
      <span>Powered By</span>
      {logoUrl ? (
        <img 
          src={logoUrl} 
          alt={name} 
          className="h-4 w-auto" 
        />
      ) : (
        <span className="font-semibold">{name}</span>
      )}
    </div>
  );
};
