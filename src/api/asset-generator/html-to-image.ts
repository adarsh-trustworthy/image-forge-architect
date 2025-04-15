
import { toast } from "@/components/ui/use-toast";

/**
 * Renders an HTML element to an image using browser canvas API
 * @param element - The HTML element to render
 * @param options - Configuration options
 * @returns Promise resolving to a data URL of the image
 */
export const renderToImage = async (
  element: HTMLElement,
  options: {
    width?: number;
    height?: number;
    format?: 'png' | 'jpeg';
    quality?: number;
    scale?: number;
  } = {}
): Promise<string> => {
  try {
    const {
      width = element.offsetWidth,
      height = element.offsetHeight,
      format = 'png',
      quality = 0.92,
      scale = 2
    } = options;

    // Create canvas with higher resolution for better quality
    const canvas = document.createElement('canvas');
    canvas.width = width * scale;
    canvas.height = height * scale;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Could not get canvas context');
    }
    
    // Set background to match element background
    const computedStyle = window.getComputedStyle(element);
    ctx.fillStyle = computedStyle.backgroundColor || '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Scale canvas for higher resolution
    ctx.scale(scale, scale);
    
    // Convert element to XML string
    const serializer = new XMLSerializer();
    const xmlString = serializer.serializeToString(element);
    
    // Create an SVG image to draw to canvas
    const XMLS = 'http://www.w3.org/2000/xmlns/';
    const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgElement.setAttribute('width', width.toString());
    svgElement.setAttribute('height', height.toString());
    svgElement.setAttributeNS(XMLS, 'xmlns', 'http://www.w3.org/2000/svg');
    svgElement.setAttributeNS(XMLS, 'xmlns:xlink', 'http://www.w3.org/1999/xlink');
    
    // Create a foreignObject to embed the HTML
    const foreignObject = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
    foreignObject.setAttribute('width', '100%');
    foreignObject.setAttribute('height', '100%');
    foreignObject.setAttribute('x', '0');
    foreignObject.setAttribute('y', '0');
    foreignObject.setAttribute('externalResourcesRequired', 'true');
    
    // Create a div to hold the HTML
    const divElement = document.createElement('div');
    divElement.innerHTML = xmlString;
    
    // Add styles to foreignObject
    const styleElement = document.createElement('style');
    const stylesheets = Array.from(document.styleSheets);
    
    for (const stylesheet of stylesheets) {
      try {
        const rules = Array.from(stylesheet.cssRules);
        for (const rule of rules) {
          styleElement.textContent += rule.cssText + '\n';
        }
      } catch (e) {
        console.warn('Failed to access stylesheet rules', e);
      }
    }
    
    foreignObject.appendChild(styleElement);
    foreignObject.appendChild(divElement);
    svgElement.appendChild(foreignObject);
    
    // Convert SVG to data URL
    const svgString = serializer.serializeToString(svgElement);
    const svgURL = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString);
    
    // Draw SVG to canvas
    const img = new Image();
    img.src = svgURL;
    
    return new Promise<string>((resolve, reject) => {
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL(`image/${format}`, quality);
        resolve(dataURL);
      };
      
      img.onerror = (error) => {
        reject(new Error('Failed to load SVG image: ' + error));
      };
    });
  } catch (error) {
    console.error('Error rendering to image:', error);
    toast({
      title: "Image generation failed",
      description: "There was a problem generating the image. Please try again.",
      variant: "destructive"
    });
    throw error;
  }
};

/**
 * Downloads the rendered image to the user's device
 * @param dataUrl - The data URL of the image
 * @param fileName - The file name for the download
 */
export const downloadImage = (dataUrl: string, fileName: string): void => {
  try {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error downloading image:', error);
    toast({
      title: "Download failed",
      description: "There was a problem downloading the image. Please try again.",
      variant: "destructive"
    });
  }
};
