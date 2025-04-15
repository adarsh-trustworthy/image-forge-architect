
import React from "react";
import { SurveyResultAssetPayload } from "../../../api/asset-generator/types";
import { UserProfile } from "../common/UserProfile";
import { PoweredByBadge } from "../brand/PoweredByBadge";
import { BrandRibbon } from "../brand/BrandRibbon";
import { generateCssVariables } from "../../../api/asset-generator/utils";
import { ChartContainer } from "@/components/ui/chart";
import { Bar, BarChart, Cell, XAxis, YAxis } from "recharts";

interface BarChartSurveyProps {
  data: SurveyResultAssetPayload;
}

export const BarChartSurvey: React.FC<BarChartSurveyProps> = ({ data }) => {
  const cssVars = generateCssVariables(data.brand);
  
  // Format data for the chart
  const chartData = data.results.map(item => ({
    name: item.label,
    value: item.value,
    fill: item.color || cssVars["--brand-primary"]
  }));
  
  const config = data.results.reduce((acc, item, index) => {
    acc[`data-${index}`] = { 
      color: item.color || cssVars["--brand-primary"]
    };
    return acc;
  }, {} as Record<string, {color: string}>);
  
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
        <h2 className="text-xl font-semibold mb-4">{data.question}</h2>
        
        <div className="flex-grow">
          <ChartContainer config={config} className="h-full">
            <BarChart data={chartData}>
              <XAxis 
                dataKey="name"
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                hide
                domain={[0, 100]}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
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
