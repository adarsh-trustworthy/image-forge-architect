
import React from "react";
import { 
  BaseAssetPayload,
  TestimonialAssetPayload,
  RatingScaleAssetPayload,
  SurveyResultAssetPayload,
  MultipleChoiceAssetPayload,
  LongQuestionAssetPayload
} from "./types";
import { StandardTestimonial } from "../../components/asset-templates/testimonial/StandardTestimonial";
import { RatingSurvey } from "../../components/asset-templates/survey/RatingSurvey";
import { BarChartSurvey } from "../../components/asset-templates/survey/BarChartSurvey";
import { PercentageSurvey } from "../../components/asset-templates/survey/PercentageSurvey";
import { ChecklistAsset } from "../../components/asset-templates/multiplechoice/ChecklistAsset";
import { QuestionAsset } from "../../components/asset-templates/question/QuestionAsset";

interface AssetRendererProps {
  assetType: string;
  data: BaseAssetPayload;
}

// Component to render the appropriate asset based on the type
export const AssetRenderer: React.FC<AssetRendererProps> = ({ assetType, data }) => {
  switch (assetType) {
    case 'testimonial':
      return <StandardTestimonial data={data as TestimonialAssetPayload} />;
      
    case 'rating-scale':
      return <RatingSurvey data={data as RatingScaleAssetPayload} />;
      
    case 'bar-chart':
      return <BarChartSurvey data={data as SurveyResultAssetPayload} />;
      
    case 'percentage':
      return <PercentageSurvey data={data as SurveyResultAssetPayload} />;
      
    case 'checklist':
      return <ChecklistAsset data={data as MultipleChoiceAssetPayload} />;
      
    case 'question':
      return <QuestionAsset data={data as LongQuestionAssetPayload} />;
      
    default:
      return (
        <div className="p-4 border border-red-500 rounded">
          Unknown asset type: {assetType}
        </div>
      );
  }
};
