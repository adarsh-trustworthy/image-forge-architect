
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
  
  // Calculate appropriate font size based on content length
  const getQuestionFontSize = (text: string) => {
    if (text.length > 100) return "text-xl";
    if (text.length > 50) return "text-2xl";
    return "text-3xl";
  };
  
  // Calculate answer text size
  const getAnswerStyles = (text?: string) => {
    if (!text) return "text-base";
    if (text.length > 300) return "text-sm max-h-[200px] overflow-y-auto";
    if (text.length > 150) return "text-base max-h-[200px] overflow-y-auto";
    return "text-base";
  };

  // Determine if we need to adjust the media size based on content
  const getMediaContainerClass = () => {
    // If we have both question and answer text, make the media smaller
    if (data.answer && data.answer.length > 100 && data.question.length > 50) {
      return "mb-4 max-h-[150px]";
    }
    return "mb-6";
  };
  
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
      
      <div className="p-6 flex-grow flex flex-col overflow-hidden">
        <h2 className={`font-semibold mb-4 ${getQuestionFontSize(data.question)} line-clamp-3`} title={data.question}>
          {data.question}
        </h2>
        
        {data.media && (
          <div className={getMediaContainerClass()}>
            {data.media.type === 'image' && (
              <img 
                src={data.media.url} 
                alt="Question media" 
                className="w-full h-auto rounded-md object-cover max-h-full" 
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
          <div className={`${getAnswerStyles(data.answer)} pr-2`}>
            <p>{data.answer}</p>
          </div>
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
