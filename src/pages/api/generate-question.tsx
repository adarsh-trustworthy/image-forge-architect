
import React from "react";
import ReactDOM from "react-dom/client";
import { LongQuestionAssetPayload } from "../../api/asset-generator/types";
import { AssetRenderer } from "../../api/asset-generator/AssetRenderer";
import { renderToImage, downloadImage } from "../../api/asset-generator/html-to-image";
import { toast } from "@/components/ui/use-toast";

export interface QuestionApiRequest {
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
  answer?: string;
  media?: {
    type: 'image' | 'video';
    url: string;
    thumbnailUrl?: string;
  };
  dimensions?: {
    width: number;
    height: number;
  };
  outputFormat?: 'png' | 'jpeg';
  outputQuality?: number;
  fileName?: string;
}

export const generateQuestionHandler = async (req: QuestionApiRequest): Promise<string> => {
  try {
    const {
      brand,
      user,
      question,
      answer,
      media,
      dimensions,
      outputFormat = 'png',
      outputQuality = 0.92,
      fileName = 'question'
    } = req;
    
    // Create the question data
    const questionData: LongQuestionAssetPayload = {
      brand,
      user,
      question,
      answer,
      media
    };
    
    // Render the component to a DOM node
    const container = document.createElement('div');
    container.style.width = `${dimensions?.width || 600}px`;
    container.style.height = `${dimensions?.height || 400}px`;
    document.body.appendChild(container);
    
    // Use React to render the component into the container
    const root = ReactDOM.createRoot(container);
    root.render(<AssetRenderer assetType="question" data={questionData} />);
    
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
      title: "Question Asset Generated",
      description: "Your question asset has been successfully generated and downloaded."
    });
    
    return dataUrl;
  } catch (error) {
    console.error('Error generating question asset:', error);
    toast({
      title: "Generation Failed",
      description: "There was an error generating the question asset image.",
      variant: "destructive"
    });
    throw error;
  }
};
