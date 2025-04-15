
import React from "react";
import { SurveyResultAssetPayload } from "../../api/asset-generator/types";
import { AssetRenderer } from "../../api/asset-generator/AssetRenderer";
import { renderToImage, downloadImage } from "../../api/asset-generator/html-to-image";
import { toast } from "@/components/ui/use-toast";

export interface SurveyResultsApiRequest {
  brand: {
    name: string;
    logoUrl?: string;
    primaryColor: string;
    secondaryColor?: string;
    backgroundColor?: string;
    ribbon?: {
      position: 'top-right' | 'top-left';
      color: string;
    };
    poweredBy?: {
      name: string;
      logoUrl?: string;
    };
  };
  user: {
    name: string;
    title?: string;
    company?: string;
    imageUrl?: string;
  };
  question: string;
  results: {
    label: string;
    value: number;
    color?: string;
  }[];
  displayFormat?: 'bars' | 'percentage' | 'pie';
  survey?: {
    count: number;
    customText?: string;
  };
  dimensions?: {
    width: number;
    height: number;
  };
  outputFormat?: 'png' | 'jpeg';
  outputQuality?: number;
  fileName?: string;
}

export const generateSurveyResultsHandler = async (req: SurveyResultsApiRequest): Promise<string> => {
  try {
    const {
      brand,
      user,
      question,
      results,
      displayFormat = 'bars',
      survey,
      dimensions,
      outputFormat = 'png',
      outputQuality = 0.92,
      fileName = 'survey-results'
    } = req;
    
    // Create the survey results data
    const surveyResultsData: SurveyResultAssetPayload = {
      brand,
      user,
      question,
      results,
      displayFormat,
      survey
    };
    
    // Determine which component to use based on displayFormat
    let assetType = 'bar-chart';
    if (displayFormat === 'percentage') {
      assetType = 'percentage';
    } else if (displayFormat === 'pie') {
      assetType = 'pie-chart'; // Not implemented yet, fallback to bar chart
    }
    
    // Render the component to a DOM node
    const container = document.createElement('div');
    container.style.width = `${dimensions?.width || 600}px`;
    container.style.height = `${dimensions?.height || 400}px`;
    document.body.appendChild(container);
    
    // Use React to render the component into the container
    const root = document.createRoot(container);
    root.render(<AssetRenderer assetType={assetType} data={surveyResultsData} />);
    
    // Wait for any async operations to complete (images loading, etc.)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Render the DOM node to an image
    const dataUrl = await renderToImage(container, {
      width: dimensions?.width,
      height: dimensions?.height,
      format: outputFormat,
      quality: outputQuality
    });
    
    // Clean up
    root.unmount();
    document.body.removeChild(container);
    
    // Download the image
    downloadImage(dataUrl, `${fileName}.${outputFormat}`);
    
    toast({
      title: "Survey Results Generated",
      description: "Your survey results have been successfully generated and downloaded."
    });
    
    return dataUrl;
  } catch (error) {
    console.error('Error generating survey results:', error);
    toast({
      title: "Generation Failed",
      description: "There was an error generating the survey results image.",
      variant: "destructive"
    });
    throw error;
  }
};
