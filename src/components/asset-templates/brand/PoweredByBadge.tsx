
import React from "react";

interface PoweredByBadgeProps {
  name: string;
  logoUrl?: string;
}

export const PoweredByBadge: React.FC<PoweredByBadgeProps> = ({ name, logoUrl }) => {
  return (
    <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground py-1.5 px-2 opacity-70">
      <span className="whitespace-nowrap">Powered By</span>
      {logoUrl ? (
        <img 
          src={logoUrl} 
          alt={name} 
          className="h-3.5 max-w-[70px] object-contain" 
        />
      ) : (
        <span className="font-medium truncate max-w-[80px]" title={name}>{name}</span>
      )}
    </div>
  );
};
