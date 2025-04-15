import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { generateTestimonialHandler } from "./api/generate-testimonial";
import { generateRatingScaleHandler } from "./api/generate-rating-scale";
import { generateSurveyResultsHandler } from "./api/generate-survey-results";
import { generateChecklistHandler } from "./api/generate-checklist";
import { generateQuestionHandler } from "./api/generate-question";

const Index = () => {
  const [images, setImages] = useState({
    testimonial: "",
    ratingScale: "",
    surveyResults: "",
    checklist: "",
    question: ""
  });

  const [isGenerating, setIsGenerating] = useState({
    testimonial: false,
    ratingScale: false,
    surveyResults: false,
    checklist: false,
    question: false
  });

  useEffect(() => {
    // Generate example images on component mount
    generateExampleImages();
  }, []);

  const generateExampleImages = async () => {
    try {
      // Generate a testimonial example
      generateExample('testimonial');
      
      // Generate other examples with slight delays to prevent rendering issues
      setTimeout(() => generateExample('ratingScale'), 500);
      setTimeout(() => generateExample('surveyResults'), 1000);
      setTimeout(() => generateExample('checklist'), 1500);
      setTimeout(() => generateExample('question'), 2000);
    } catch (error) {
      console.error("Error generating example images:", error);
    }
  };

  const generateExample = async (type) => {
    try {
      setIsGenerating(prev => ({ ...prev, [type]: true }));
      
      let imageUrl;
      
      switch (type) {
        case 'testimonial':
          imageUrl = await generateTestimonialHandler({
            brand: {
              name: "Trustworthy",
              logoUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=40&fit=crop",
              primaryColor: "#8B5CF6",
              backgroundColor: "#ffffff",
              ribbon: {
                position: 'top-right',
                color: "#8B5CF6"
              },
              poweredBy: {
                name: "Brand Forge",
              }
            },
            user: {
              name: "Emma Wilson",
              title: "Product Manager",
              company: "Global Tech",
              imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
            },
            question: "What's the biggest impact our platform has had on your workflow?",
            answer: "The analytics dashboard has completely transformed how we track performance. We can now make data-driven decisions instantly rather than waiting for weekly reports. This has boosted our team's productivity by at least 30%.",
            dimensions: {
              width: 600,
              height: 400
            },
            fileName: "example-testimonial"
          });
          break;
          
        case 'ratingScale':
          imageUrl = await generateRatingScaleHandler({
            brand: {
              name: "Trustworthy",
              logoUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=40&fit=crop",
              primaryColor: "#F97316",
              backgroundColor: "#ffffff",
              poweredBy: {
                name: "Brand Forge",
              }
            },
            user: {
              name: "Alex Johnson",
              title: "UX Designer",
              company: "Design Studios",
              imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop"
            },
            question: "How would you rate our user interface?",
            rating: {
              value: 8,
              maxValue: 10,
              format: "numeric",
              label: "Great"
            },
            displayFormat: "large",
            dimensions: {
              width: 600,
              height: 400
            },
            fileName: "example-rating"
          });
          break;
          
        case 'surveyResults':
          imageUrl = await generateSurveyResultsHandler({
            brand: {
              name: "Trustworthy",
              logoUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=40&fit=crop",
              primaryColor: "#0EA5E9",
              poweredBy: {
                name: "Brand Forge",
              }
            },
            user: {
              name: "Michael Chen",
              title: "Data Analyst",
              company: "Insight Analytics",
              imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
            },
            question: "What features are most important to our users?",
            results: [
              {
                label: "Easy navigation",
                value: 78,
                color: "#0EA5E9"
              },
              {
                label: "Performance speed",
                value: 65,
                color: "#0EA5E9"
              },
              {
                label: "Visual design",
                value: 45,
                color: "#0EA5E9"
              },
              {
                label: "Special features",
                value: 30,
                color: "#0EA5E9"
              }
            ],
            displayFormat: "percentage",
            survey: {
              count: 250,
              customText: "active users"
            },
            dimensions: {
              width: 600,
              height: 400
            },
            fileName: "example-survey"
          });
          break;
          
        case 'checklist':
          imageUrl = await generateChecklistHandler({
            brand: {
              name: "Trustworthy",
              logoUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=40&fit=crop",
              primaryColor: "#8B5CF6",
              backgroundColor: "#ffffff",
              poweredBy: {
                name: "Brand Forge",
              }
            },
            user: {
              name: "Sarah Thompson",
              title: "Project Manager",
              company: "Task Force",
              imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
            },
            question: "Which features have you implemented in your project?",
            options: [
              {
                label: "User authentication & role-based access control",
                selected: true
              },
              {
                label: "Interactive data visualization dashboards",
                selected: true
              },
              {
                label: "Third-party API integrations",
                selected: true
              },
              {
                label: "Responsive design for mobile and tablet",
                selected: false
              },
              {
                label: "Automated testing and CI/CD pipeline",
                selected: false
              }
            ],
            dimensions: {
              width: 600,
              height: 400
            },
            fileName: "example-checklist"
          });
          break;
          
        case 'question':
          imageUrl = await generateQuestionHandler({
            brand: {
              name: "Trustworthy",
              logoUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=40&fit=crop",
              primaryColor: "#0EA5E9",
              backgroundColor: "#ffffff",
              poweredBy: {
                name: "Brand Forge",
              }
            },
            user: {
              name: "David Miller",
              title: "Content Strategist",
              company: "Media Insights",
              imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
            },
            question: "How do you approach content organization for maximum engagement?",
            answer: "I focus on creating clear hierarchies with the most important information at the top. Using engaging visuals and breaking up text improves readability and keeps users scrolling.",
            media: {
              type: "image",
              url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&fit=crop"
            },
            dimensions: {
              width: 600,
              height: 400
            },
            fileName: "example-question"
          });
          break;
      }
      
      setImages(prev => ({ ...prev, [type]: imageUrl }));
      setIsGenerating(prev => ({ ...prev, [type]: false }));
      
    } catch (error) {
      console.error(`Error generating ${type} example:`, error);
      setIsGenerating(prev => ({ ...prev, [type]: false }));
      toast({
        title: "Generation Failed",
        description: `There was an error generating the ${type} example.`,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
        <h1 className="text-4xl font-bold">Image Forge Architect</h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Generate brand-ready shareable assets from your data. Perfect for testimonials, 
          survey results, ratings and more.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Testimonial Card */}
        <Card>
          <CardHeader>
            <CardTitle>Testimonial Assets</CardTitle>
            <CardDescription>
              Generate shareable testimonial images from text content
            </CardDescription>
          </CardHeader>
          <CardContent className="h-64 flex items-center justify-center">
            {isGenerating.testimonial ? (
              <div className="animate-pulse bg-secondary h-full w-full rounded-md flex items-center justify-center">
                <p>Generating example...</p>
              </div>
            ) : images.testimonial ? (
              <img 
                src={images.testimonial}
                alt="Testimonial Example"
                className="w-full h-auto rounded-md"
              />
            ) : (
              <div className="bg-secondary h-full w-full rounded-md flex items-center justify-center">
                <p>No example available</p>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full" 
              onClick={() => generateExample('testimonial')}
              disabled={isGenerating.testimonial}
            >
              {isGenerating.testimonial ? "Generating..." : "Generate Testimonial"}
            </Button>
          </CardFooter>
        </Card>

        {/* Rating Scale Card */}
        <Card>
          <CardHeader>
            <CardTitle>Rating Scale Assets</CardTitle>
            <CardDescription>
              Create visual assets showing user ratings and scores
            </CardDescription>
          </CardHeader>
          <CardContent className="h-64 flex items-center justify-center">
            {isGenerating.ratingScale ? (
              <div className="animate-pulse bg-secondary h-full w-full rounded-md flex items-center justify-center">
                <p>Generating example...</p>
              </div>
            ) : images.ratingScale ? (
              <img 
                src={images.ratingScale}
                alt="Rating Example"
                className="w-full h-auto rounded-md"
              />
            ) : (
              <div className="bg-secondary h-full w-full rounded-md flex items-center justify-center">
                <p>No example available</p>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full"
              onClick={() => generateExample('ratingScale')}
              disabled={isGenerating.ratingScale}
            >
              {isGenerating.ratingScale ? "Generating..." : "Generate Rating Asset"}
            </Button>
          </CardFooter>
        </Card>

        {/* Survey Results Card */}
        <Card>
          <CardHeader>
            <CardTitle>Survey Result Assets</CardTitle>
            <CardDescription>
              Visualize survey data with charts and percentage bars
            </CardDescription>
          </CardHeader>
          <CardContent className="h-64 flex items-center justify-center">
            {isGenerating.surveyResults ? (
              <div className="animate-pulse bg-secondary h-full w-full rounded-md flex items-center justify-center">
                <p>Generating example...</p>
              </div>
            ) : images.surveyResults ? (
              <img 
                src={images.surveyResults}
                alt="Survey Results Example"
                className="w-full h-auto rounded-md"
              />
            ) : (
              <div className="bg-secondary h-full w-full rounded-md flex items-center justify-center">
                <p>No example available</p>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full"
              onClick={() => generateExample('surveyResults')}
              disabled={isGenerating.surveyResults}
            >
              {isGenerating.surveyResults ? "Generating..." : "Generate Survey Asset"}
            </Button>
          </CardFooter>
        </Card>

        {/* Multiple Choice Card */}
        <Card>
          <CardHeader>
            <CardTitle>Multiple Choice Assets</CardTitle>
            <CardDescription>
              Create visual assets for checklist and multiple choice selections
            </CardDescription>
          </CardHeader>
          <CardContent className="h-64 flex items-center justify-center">
            {isGenerating.checklist ? (
              <div className="animate-pulse bg-secondary h-full w-full rounded-md flex items-center justify-center">
                <p>Generating example...</p>
              </div>
            ) : images.checklist ? (
              <img 
                src={images.checklist}
                alt="Multiple Choice Example"
                className="w-full h-auto rounded-md"
              />
            ) : (
              <div className="bg-secondary h-full w-full rounded-md flex items-center justify-center">
                <p>No example available</p>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full"
              onClick={() => generateExample('checklist')}
              disabled={isGenerating.checklist}
            >
              {isGenerating.checklist ? "Generating..." : "Generate Checklist Asset"}
            </Button>
          </CardFooter>
        </Card>

        {/* Question Card */}
        <Card>
          <CardHeader>
            <CardTitle>Question Assets</CardTitle>
            <CardDescription>
              Create visual assets for long questions and detailed content
            </CardDescription>
          </CardHeader>
          <CardContent className="h-64 flex items-center justify-center">
            {isGenerating.question ? (
              <div className="animate-pulse bg-secondary h-full w-full rounded-md flex items-center justify-center">
                <p>Generating example...</p>
              </div>
            ) : images.question ? (
              <img 
                src={images.question}
                alt="Question Example"
                className="w-full h-auto rounded-md"
              />
            ) : (
              <div className="bg-secondary h-full w-full rounded-md flex items-center justify-center">
                <p>No example available</p>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full"
              onClick={() => generateExample('question')}
              disabled={isGenerating.question}
            >
              {isGenerating.question ? "Generating..." : "Generate Question Asset"}
            </Button>
          </CardFooter>
        </Card>

        {/* API Documentation Card */}
        <Card>
          <CardHeader>
            <CardTitle>API Documentation</CardTitle>
            <CardDescription>
              Learn how to use our API endpoints to generate assets
            </CardDescription>
          </CardHeader>
          <CardContent className="text-left h-64 overflow-y-auto">
            <p className="mb-4">Available API endpoints:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>/api/generate-testimonial</li>
              <li>/api/generate-rating-scale</li>
              <li>/api/generate-survey-results</li>
              <li>/api/generate-checklist</li>
              <li>/api/generate-question</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full"
              onClick={() => {
                toast({
                  title: "API Documentation",
                  description: "Each API endpoint accepts specific parameters for asset generation. See the documentation for details."
                });
              }}
            >
              View Documentation
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* API Documentation Section - simplified version */}
      <div className="mt-16 mb-10">
        <h2 className="text-3xl font-bold mb-6">API Documentation</h2>
        <p className="text-lg mb-6">
          Use our API endpoints to generate customized visual assets for your content.
          Each endpoint accepts JSON payloads with brand configuration, user data, and content specifics.
        </p>
        <div className="bg-secondary/20 p-6 rounded-lg">
          <h3 className="text-2xl font-bold mb-4">Available Endpoints</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-xl font-semibold">Testimonial Assets</h4>
              <p className="text-muted-foreground">
                <code className="bg-background p-1 rounded">/api/generate-testimonial</code>
              </p>
              <p className="mt-2">Create shareable testimonial quotes with user attribution.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold">Rating Scale Assets</h4>
              <p className="text-muted-foreground">
                <code className="bg-background p-1 rounded">/api/generate-rating-scale</code>
              </p>
              <p className="mt-2">Visualize user ratings with customizable scales and formats.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold">Survey Result Assets</h4>
              <p className="text-muted-foreground">
                <code className="bg-background p-1 rounded">/api/generate-survey-results</code>
              </p>
              <p className="mt-2">Present survey data with bar charts or percentage visualizations.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold">Checklist Assets</h4>
              <p className="text-muted-foreground">
                <code className="bg-background p-1 rounded">/api/generate-checklist</code>
              </p>
              <p className="mt-2">Create visual checklists with selected and unselected options.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold">Question Assets</h4>
              <p className="text-muted-foreground">
                <code className="bg-background p-1 rounded">/api/generate-question</code>
              </p>
              <p className="mt-2">Display questions with optional answers and media elements.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
