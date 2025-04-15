
import React from "react";
import { TestimonialAssetPayload } from "../../../api/asset-generator/types";
import { UserProfile } from "../common/UserProfile";
import { PoweredByBadge } from "../brand/PoweredByBadge";
import { BrandRibbon } from "../brand/BrandRibbon";
import { generateCssVariables } from "../../../api/asset-generator/utils";

interface StandardTestimonialProps {
  data: TestimonialAssetPayload;
}

export const StandardTestimonial: React.FC<StandardTestimonialProps> = ({ data }) => {
  const cssVars = generateCssVariables(data.brand);
  
  // Determine font sizes based on content length
  const questionLength = data.question.length;
  const answerLength = data.answer.length;
  
  const questionFontSize = questionLength > 70 ? "text-xl" : "text-2xl";
  const answerFontSize = answerLength > 150 ? "text-sm" : "text-base";
  
  return (
    <div 
      className="relative overflow-hidden rounded-lg border shadow-sm flex flex-col w-full h-full"
      style={{ 
        ...cssVars,
        backgroundColor: cssVars["--brand-background"],
        color: cssVars["--brand-text"]
      }}
    >
      {data.brand.ribbon && (
        <BrandRibbon 
          position={data.brand.ribbon.position} 
          color={data.brand.ribbon.color} 
        />
      )}
      
      {data.brand.logoUrl && (
        <div className="p-5 pb-0">
          <img 
            src={data.brand.logoUrl} 
            alt={data.brand.name} 
            className="h-7 w-auto" 
          />
        </div>
      )}
      
      <div className="p-5 pt-4 pb-2 flex-grow flex flex-col">
        <h2 className={`${questionFontSize} font-semibold mb-4`}>{data.question}</h2>
        <p className={`${answerFontSize} mb-6 flex-grow`}>{data.answer}</p>
      </div>
      
      <div className="p-5 pt-0 bg-slate-50/50 dark:bg-slate-900/30">
        <UserProfile user={data.user} />
      </div>
      
      {data.brand.poweredBy && (
        <PoweredByBadge 
          name={data.brand.poweredBy.name} 
          logoUrl={data.brand.poweredBy.logoUrl} 
        />
      )}
    </div>
  );
};
