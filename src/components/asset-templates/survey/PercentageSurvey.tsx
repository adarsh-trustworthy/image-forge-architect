
import React from "react";
import { SurveyResultAssetPayload } from "../../../api/asset-generator/types";
import { UserProfile } from "../common/UserProfile";
import { PoweredByBadge } from "../brand/PoweredByBadge";
import { BrandRibbon } from "../brand/BrandRibbon";
import { generateCssVariables } from "../../../api/asset-generator/utils";

interface PercentageSurveyProps {
  data: SurveyResultAssetPayload;
}

export const PercentageSurvey: React.FC<PercentageSurveyProps> = ({ data }) => {
  const cssVars = generateCssVariables(data.brand);
  
  // Sort results by value in descending order
  const sortedResults = [...data.results].sort((a, b) => b.value - a.value);
  
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
        
        <div className="flex-grow flex flex-col gap-4">
          {sortedResults.map((result, index) => (
            <div key={index} className="flex flex-col">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm">{result.label}</span>
                <span 
                  className="text-xl font-bold" 
                  style={{ color: result.color || cssVars["--brand-primary"] }}
                >
                  {result.value}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="h-2.5 rounded-full transition-all"
                  style={{ 
                    width: `${result.value}%`,
                    backgroundColor: result.color || cssVars["--brand-primary"]
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 text-sm">
          {data.survey && (
            <div className="text-muted-foreground">
              Survey of {data.survey.count} {data.survey.customText || 'users'}
            </div>
          )}
        </div>
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
