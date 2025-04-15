
import React from "react";
import { RatingScaleAssetPayload } from "../../../api/asset-generator/types";
import { UserProfile } from "../common/UserProfile";
import { PoweredByBadge } from "../brand/PoweredByBadge";
import { BrandRibbon } from "../brand/BrandRibbon";
import { generateCssVariables } from "../../../api/asset-generator/utils";

interface RatingSurveyProps {
  data: RatingScaleAssetPayload;
}

export const RatingSurvey: React.FC<RatingSurveyProps> = ({ data }) => {
  const cssVars = generateCssVariables(data.brand);
  const isLargeFormat = data.displayFormat === 'large';
  const ratingValue = data.rating.value;
  const maxValue = data.rating.maxValue;
  
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
        <h2 className="text-xl font-semibold mb-6">{data.question}</h2>
        
        {isLargeFormat ? (
          <div className="flex justify-center items-center flex-grow">
            <div className="text-center">
              <div 
                className="text-6xl font-bold mb-2"
                style={{ color: cssVars["--brand-primary"] }}
              >
                {ratingValue}/{maxValue}
              </div>
              {data.rating.label && (
                <div className="text-xl text-muted-foreground">{data.rating.label}</div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between mt-auto">
            <div className="text-sm">Disagree</div>
            <div className="flex-grow mx-2">
              <div className="flex justify-between mb-1">
                {Array.from({ length: maxValue }, (_, i) => (
                  <div 
                    key={i} 
                    className={`relative w-8 text-center ${i + 1 <= maxValue ? 'font-medium' : ''}`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
              <div className="flex justify-between">
                {Array.from({ length: maxValue }, (_, i) => (
                  <div 
                    key={i} 
                    className={`w-8 h-12 relative`}
                  >
                    <div 
                      className={`absolute bottom-0 w-full rounded-sm transition-all ${i + 1 <= ratingValue ? 'bg-orange-500' : 'bg-orange-200'}`}
                      style={{ 
                        height: `${i + 1 <= ratingValue ? '100%' : '40%'}`,
                        opacity: i + 1 <= ratingValue ? 1 : 0.3,
                        backgroundColor: i + 1 === ratingValue ? cssVars["--brand-primary"] : 
                                        (i + 1 < ratingValue ? cssVars["--brand-primary"] : 'var(--muted)')
                      }}
                    >
                      {i + 1 === ratingValue && (
                        <div 
                          className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-sm font-bold"
                          style={{ color: cssVars["--brand-primary"] }}
                        >
                          {ratingValue}%
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-sm">Agree</div>
          </div>
        )}
      </div>
      
      <div className="p-6 pt-0 bg-slate-50 dark:bg-slate-900/50 mt-auto">
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
