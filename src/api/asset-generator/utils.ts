
import { BrandConfig } from "./types";

/**
 * Gets a contrasting text color (black or white) based on background color
 * @param backgroundColor - Hex color code
 * @returns Black or white hex color code
 */
export const getContrastColor = (backgroundColor: string): string => {
  // Remove the hash if it exists
  const hex = backgroundColor.replace('#', '');
  
  // Convert hex to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Calculate luminance - human perception of brightness
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
};

/**
 * Creates CSS color variables from brand config
 * @param brand - Brand configuration object
 * @returns Object with CSS variables
 */
export const generateCssVariables = (brand: BrandConfig): Record<string, string> => {
  const primary = brand.primaryColor || '#9b87f5';
  const secondary = brand.secondaryColor || '#7E69AB';
  const background = brand.backgroundColor || '#FFFFFF';
  const text = brand.textColor || getContrastColor(background);
  const accent = brand.accentColor || secondary;
  
  return {
    '--brand-primary': primary,
    '--brand-secondary': secondary,
    '--brand-background': background,
    '--brand-text': text,
    '--brand-accent': accent,
  };
};

/**
 * Truncates text to a specified length with ellipsis
 * @param text - The text to truncate
 * @param maxLength - Maximum allowed length
 * @returns Truncated text with ellipsis if needed
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
};

/**
 * Calculates appropriate font size based on text length and container dimensions
 * @param text - The text to size
 * @param maxWidth - Maximum width available
 * @param baseSize - Base font size in pixels
 * @returns Adjusted font size in pixels
 */
export const calculateFontSize = (
  text: string, 
  maxWidth: number, 
  baseSize = 16
): number => {
  // Simple algorithm to adjust size based on text length
  const lengthFactor = 1 - Math.min(0.5, text.length / 1000);
  const widthFactor = maxWidth / 500;
  
  return Math.max(12, Math.round(baseSize * lengthFactor * widthFactor));
};

/**
 * Formats a numeric rating as a percentage, fraction, or raw value
 * @param value - Rating value
 * @param maxValue - Maximum possible rating value
 * @param format - Format type
 * @returns Formatted rating string
 */
export const formatRating = (
  value: number,
  maxValue: number,
  format: 'numeric' | 'percentage' | 'fraction' = 'numeric'
): string => {
  switch (format) {
    case 'percentage':
      return `${Math.round((value / maxValue) * 100)}%`;
    case 'fraction':
      return `${value}/${maxValue}`;
    case 'numeric':
    default:
      return `${value}`;
  }
};
