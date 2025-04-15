
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const Index = () => {
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
          <CardContent>
            <img 
              src="public/lovable-uploads/64f54f49-0407-4bc2-9973-9d038afb9f00.png"
              alt="Testimonial Example"
              className="w-full h-auto rounded-md mb-4"
            />
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full" 
              onClick={() => {
                toast({
                  title: "API Example",
                  description: "Check the documentation for the API endpoint: /api/generate-testimonial"
                });
              }}
            >
              Generate Testimonial
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
          <CardContent>
            <img 
              src="public/lovable-uploads/5b3b92f2-cae7-498e-a48c-e26edfeb1509.png"
              alt="Rating Example"
              className="w-full h-auto rounded-md mb-4"
            />
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full"
              onClick={() => {
                toast({
                  title: "API Example",
                  description: "Check the documentation for the API endpoint: /api/generate-rating-scale"
                });
              }}
            >
              Generate Rating Asset
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
          <CardContent>
            <img 
              src="public/lovable-uploads/4a406ff4-9623-461e-80f4-d536c3673f03.png"
              alt="Survey Results Example"
              className="w-full h-auto rounded-md mb-4"
            />
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full"
              onClick={() => {
                toast({
                  title: "API Example",
                  description: "Check the documentation for the API endpoint: /api/generate-survey-results"
                });
              }}
            >
              Generate Survey Asset
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
          <CardContent>
            <img 
              src="public/lovable-uploads/0ae8419c-b2b7-483f-9718-99df2115ce72.png"
              alt="Multiple Choice Example"
              className="w-full h-auto rounded-md mb-4"
            />
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full"
              onClick={() => {
                toast({
                  title: "API Example",
                  description: "Check the documentation for the API endpoint: /api/generate-checklist"
                });
              }}
            >
              Generate Checklist Asset
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
          <CardContent>
            <img 
              src="public/lovable-uploads/793478c9-84a4-43e3-8d5d-e08625ac4b4f.png"
              alt="Question Example"
              className="w-full h-auto rounded-md mb-4"
            />
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full"
              onClick={() => {
                toast({
                  title: "API Example",
                  description: "Check the documentation for the API endpoint: /api/generate-question"
                });
              }}
            >
              Generate Question Asset
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
          <CardContent className="text-left">
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

      {/* API Documentation Section */}
      <div className="mt-16 mb-10">
        <h2 className="text-3xl font-bold mb-6">API Documentation</h2>
        <div className="space-y-10">
          {/* Testimonial API */}
          <div className="bg-secondary/20 p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Generate Testimonial API</h3>
            <p className="mb-4">Endpoint: <code className="bg-background p-1 rounded">/api/generate-testimonial</code></p>
            
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-2">Request Body Example:</h4>
              <pre className="bg-secondary/20 p-4 rounded overflow-x-auto">
                {`{
  "brand": {
    "name": "Trustworthy",
    "logoUrl": "https://example.com/logo.png",
    "primaryColor": "#9b87f5",
    "ribbon": {
      "position": "top-right",
      "color": "#9b87f5"
    },
    "poweredBy": {
      "name": "Trustworthy",
      "logoUrl": "https://example.com/logo-small.png"
    }
  },
  "user": {
    "name": "Noah Wilson",
    "title": "CMO",
    "company": "Global Ventures Pvt Ltd",
    "imageUrl": "https://example.com/profile.jpg"
  },
  "question": "What features has helped you the most?",
  "answer": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
  "dimensions": {
    "width": 800,
    "height": 600
  },
  "outputFormat": "png",
  "fileName": "my-testimonial"
}`}
              </pre>
            </div>
          </div>

          {/* Rating Scale API */}
          <div className="bg-secondary/20 p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Generate Rating Scale API</h3>
            <p className="mb-4">Endpoint: <code className="bg-background p-1 rounded">/api/generate-rating-scale</code></p>
            
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-2">Request Body Example:</h4>
              <pre className="bg-secondary/20 p-4 rounded overflow-x-auto">
                {`{
  "brand": {
    "name": "Trustworthy",
    "logoUrl": "https://example.com/logo.png",
    "primaryColor": "#ff6915",
    "backgroundColor": "#ffffff"
  },
  "user": {
    "name": "Noah Wilson",
    "title": "CMO",
    "company": "Global Ventures Pvt Ltd"
  },
  "question": "How would you rate Feature A (0-10)?",
  "rating": {
    "value": 6,
    "maxValue": 10,
    "format": "numeric",
    "label": "Average Rating"
  },
  "displayFormat": "large",
  "dimensions": {
    "width": 800,
    "height": 600
  }
}`}
              </pre>
            </div>
          </div>

          {/* Survey Results API */}
          <div className="bg-secondary/20 p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Generate Survey Results API</h3>
            <p className="mb-4">Endpoint: <code className="bg-background p-1 rounded">/api/generate-survey-results</code></p>
            
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-2">Request Body Example:</h4>
              <pre className="bg-secondary/20 p-4 rounded overflow-x-auto">
                {`{
  "brand": {
    "name": "Trustworthy",
    "logoUrl": "https://example.com/logo.png",
    "primaryColor": "#ff6915"
  },
  "user": {
    "name": "Noah Wilson",
    "title": "CMO",
    "company": "Global Ventures Pvt Ltd"
  },
  "question": "What features has helped you the most?",
  "results": [
    {
      "label": "Success of strategic initiatives",
      "value": 60,
      "color": "#ff6915"
    },
    {
      "label": "Increased business alignment",
      "value": 50,
      "color": "#ff6915"
    },
    {
      "label": "Deeper insights & innovation",
      "value": 10,
      "color": "#ff6915"
    }
  ],
  "displayFormat": "percentage",
  "survey": {
    "count": 33,
    "customText": "Gong users"
  }
}`}
              </pre>
            </div>
          </div>

          {/* Additional APIs... */}
          {/* You can add documentation for the other APIs in a similar format */}
        </div>
      </div>
    </div>
  );
};

export default Index;
