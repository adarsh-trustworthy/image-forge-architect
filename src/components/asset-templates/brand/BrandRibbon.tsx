
import React from "react";

interface BrandRibbonProps {
  position: 'top-right' | 'top-left';
  color: string;
}

export const BrandRibbon: React.FC<BrandRibbonProps> = ({ position, color }) => {
  return (
    <div 
      className={`absolute ${position === 'top-right' ? 'top-0 right-0' : 'top-0 left-0'} z-10`}
      style={{ 
        width: '70px', 
        height: '70px', 
        overflow: 'hidden' 
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: position === 'top-right' ? 0 : 'auto',
          left: position === 'top-left' ? 0 : 'auto',
          width: '170px',
          height: '40px',
          transform: position === 'top-right' 
            ? 'rotate(45deg) translate(48px, -15px)' 
            : 'rotate(-45deg) translate(-48px, -15px)',
          backgroundColor: color,
        }}
      />
    </div>
  );
};
