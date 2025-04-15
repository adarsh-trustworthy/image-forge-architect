
import React from "react";
import { LongQuestionAssetPayload } from "../../../api/asset-generator/types";
import { UserProfile } from "../common/UserProfile";
import { PoweredByBadge } from "../brand/PoweredByBadge";
import { BrandRibbon } from "../brand/BrandRibbon";
import { generateCssVariables } from "../../../api/asset-generator/utils";

interface QuestionAssetProps {
  data: LongQuestionAssetPayload;
}

export const QuestionAsset: React.FC<QuestionAssetProps> = ({ data }) => {
  const cssVars = generateCssVariables(data.brand);
  
  return (
    <div 
      className="relative overflow-hidden rounded-lg border flex flex-col w-full h-full"
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
        <div className="p-6 pb-0">
          <img 
            src={data.brand.logoUrl} 
            alt={data.brand.name} 
            className="h-8 w-auto" 
          />
        </div>
      )}
      
      <div className="p-6 flex-grow flex flex-col">
        <h2 className="text-2xl font-semibold mb-6">{data.question}</h2>
        
        {data.media && (
          <div className="mb-6">
            {data.media.type === 'image' && (
              <img 
                src={data.media.url} 
                alt="Question media" 
                className="w-full h-auto rounded-md object-cover" 
              />
            )}
            {data.media.type === 'video' && (
              <div className="w-full aspect-video rounded-md bg-black relative">
                {data.media.thumbnailUrl && (
                  <img 
                    src={data.media.thumbnailUrl} 
                    alt="Video thumbnail" 
                    className="w-full h-full object-cover rounded-md" 
                  />
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-16 w-16 bg-primary/80 rounded-full flex items-center justify-center">
                    <div className="h-0 w-0 border-t-8 border-t-transparent border-l-16 border-l-white border-b-8 border-b-transparent ml-1" />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        
        {data.answer && (
          <p className="text-base">{data.answer}</p>
        )}
      </div>
      
      <div className="p-6 pt-0 bg-slate-50 dark:bg-slate-900/50">
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
