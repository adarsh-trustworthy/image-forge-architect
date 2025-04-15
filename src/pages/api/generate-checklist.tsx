
import React from "react";
import ReactDOM from "react-dom/client";
import { MultipleChoiceAssetPayload } from "../../api/asset-generator/types";
import { AssetRenderer } from "../../api/asset-generator/AssetRenderer";
import { renderToImage, downloadImage } from "../../api/asset-generator/html-to-image";
import { toast } from "@/components/ui/use-toast";

export interface ChecklistApiRequest {
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
  options: {
    label: string;
    selected: boolean;
  }[];
  dimensions?: {
    width: number;
    height: number;
  };
  outputFormat?: 'png' | 'jpeg';
  outputQuality?: number;
  fileName?: string;
}

export const generateChecklistHandler = async (req: ChecklistApiRequest): Promise<string> => {
  try {
    const {
      brand,
      user,
      question,
      options,
      dimensions,
      outputFormat = 'png',
      outputQuality = 0.92,
      fileName = 'checklist'
    } = req;
    
    // Create the checklist data
    const checklistData: MultipleChoiceAssetPayload = {
      brand,
      user,
      question,
      options
    };
    
    // Render the component to a DOM node
    const container = document.createElement('div');
    container.style.width = `${dimensions?.width || 600}px`;
    container.style.height = `${dimensions?.height || 400}px`;
    document.body.appendChild(container);
    
    // Use React to render the component into the container
    const root = ReactDOM.createRoot(container);
    root.render(<AssetRenderer assetType="checklist" data={checklistData} />);
    
    // Wait for any async operations to complete (images loading, etc.)
    await new Promise(resolve => setTimeout(resolve, 500));
    
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
      title: "Checklist Generated",
      description: "Your checklist has been successfully generated and downloaded."
    });
    
    return dataUrl;
  } catch (error) {
    console.error('Error generating checklist:', error);
    toast({
      title: "Generation Failed",
      description: "There was an error generating the checklist image.",
      variant: "destructive"
    });
    throw error;
  }
};
