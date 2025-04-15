
// Common types for the asset generation system

export interface UserProfile {
  name: string;
  title?: string;
  company?: string;
  imageUrl?: string;
}

export interface BrandConfig {
  name: string;
  logoUrl?: string;
  primaryColor: string;
  secondaryColor?: string;
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
  ribbon?: {
    position: 'top-right' | 'top-left';
    color: string;
  };
  poweredBy?: {
    name: string;
    logoUrl?: string;
  };
}

export interface AssetDimensions {
  width: number;
  height: number;
}

// Base asset payload with common fields
export interface BaseAssetPayload {
  brand: BrandConfig;
  user: UserProfile;
  dimensions?: AssetDimensions;
}

// Specific asset types
export interface TestimonialAssetPayload extends BaseAssetPayload {
  question: string;
  answer: string;
}

export interface RatingScaleAssetPayload extends BaseAssetPayload {
  question: string;
  rating: {
    value: number;
    maxValue: number;
    format?: 'numeric' | 'percentage' | 'stars';
    label?: string;
  };
  displayFormat?: 'standard' | 'large';
}

export interface SurveyResultAssetPayload extends BaseAssetPayload {
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
}

export interface MultipleChoiceAssetPayload extends BaseAssetPayload {
  question: string;
  options: {
    label: string;
    selected: boolean;
  }[];
}

export interface LongQuestionAssetPayload extends BaseAssetPayload {
  question: string;
  answer?: string;
  media?: {
    type: 'image' | 'video';
    url: string;
    thumbnailUrl?: string;
  };
}
