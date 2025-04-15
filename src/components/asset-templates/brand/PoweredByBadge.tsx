
import React from "react";

interface PoweredByBadgeProps {
  name: string;
  logoUrl?: string;
}

export const PoweredByBadge: React.FC<PoweredByBadgeProps> = ({ name, logoUrl }) => {
  return (
    <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground py-2 px-2">
      <span className="whitespace-nowrap">Powered By</span>
      {logoUrl ? (
        <img 
          src={logoUrl} 
          alt={name} 
          className="h-4 max-w-[80px] object-contain" 
        />
      ) : (
        <span className="font-semibold truncate max-w-[100px]" title={name}>{name}</span>
      )}
    </div>
  );
};
