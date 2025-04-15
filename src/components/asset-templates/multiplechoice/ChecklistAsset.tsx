
import React from "react";
import { MultipleChoiceAssetPayload } from "../../../api/asset-generator/types";
import { UserProfile } from "../common/UserProfile";
import { PoweredByBadge } from "../brand/PoweredByBadge";
import { BrandRibbon } from "../brand/BrandRibbon";
import { generateCssVariables } from "../../../api/asset-generator/utils";
import { Check } from "lucide-react";

interface ChecklistAssetProps {
  data: MultipleChoiceAssetPayload;
}

export const ChecklistAsset: React.FC<ChecklistAssetProps> = ({ data }) => {
  const cssVars = generateCssVariables(data.brand);
  
  // Calculate appropriate font size based on content length
  const getFontSize = (text: string) => {
    if (text.length > 100) return "text-lg";
    if (text.length > 50) return "text-xl";
    return "text-2xl";
  };

  // Calculate appropriate spacing based on number of options
  const getOptionSpacing = (optionsCount: number) => {
    if (optionsCount > 6) return "space-y-2";
    if (optionsCount > 3) return "space-y-3";
    return "space-y-4";
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
      
      <div className="p-6 flex-grow flex flex-col">
        <h2 className={`font-semibold mb-6 ${getFontSize(data.question)} line-clamp-3`} title={data.question}>
          {data.question}
        </h2>
        
        <div className="flex-grow overflow-y-auto">
          <ul className={getOptionSpacing(data.options.length)}>
            {data.options.map((option, index) => (
              <li key={index} className="flex items-start gap-3">
                <div 
                  className={`flex items-center justify-center rounded mt-0.5 h-5 w-5 shrink-0 border ${option.selected ? 'bg-primary border-primary' : 'border-muted-foreground'}`}
                  style={option.selected ? { backgroundColor: cssVars["--brand-primary"], borderColor: cssVars["--brand-primary"] } : {}}
                >
                  {option.selected && <Check className="h-3.5 w-3.5 text-white" />}
                </div>
                <span className={`${option.selected ? 'font-medium' : ''} line-clamp-2`} title={option.label}>
                  {option.label}
                </span>
              </li>
            ))}
          </ul>
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
