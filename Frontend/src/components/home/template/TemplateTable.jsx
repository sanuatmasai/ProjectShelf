import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLocation, useNavigate } from 'react-router-dom';
import TemplatePreview from './preview/TemplatePreview';

function TemplateTable({caseStudy}) {
  const navigate = useNavigate();
  
  const handlePreview = (templateId) => {
    navigate(`/home/templates/preview/${templateId}`,{state:caseStudy});
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Case Study Templates</h1>
          <p className="text-muted-foreground mt-2">
            Choose from our professionally designed templates to showcase your work
          </p>
        </div>

        <Tabs defaultValue={caseStudy?.themeId??'1'} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
             <TabsTrigger value="1">Minimal</TabsTrigger>
                        <TabsTrigger value="2">Modern</TabsTrigger>
                        <TabsTrigger value="3">Creative</TabsTrigger>
          </TabsList>

          {[1, 2, 3].map((templateNum) => (
            <TabsContent key={templateNum} value={`${templateNum}`}>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div >
                    {/* Template Preview Image */}
                   <TemplatePreview button={true} preivewId={`${templateNum}`} caseStudy={caseStudy} />
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-2xl font-semibold">
                        Portfolio Template {templateNum}
                      </h2>
                      <p className="text-muted-foreground mt-1">
                        A {templateNum === 1 ? 'modern' : templateNum === 2 ? 'minimal' : 'creative'} design 
                        to showcase your professional work and achievements.
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <Button 
                        onClick={() => handlePreview(templateNum)}
                        className="flex-1"
                      >
                        Preview Template
                      </Button>
                     
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}

export default TemplateTable