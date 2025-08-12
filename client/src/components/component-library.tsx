import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FileCode, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useSchema } from "@/hooks/use-schema";
import type { Schema } from "@shared/schema";

export default function ComponentLibrary() {
  const { addComponent, loadTemplate } = useSchema();
  
  const { data: schemas = [] } = useQuery<Schema[]>({
    queryKey: ["/api/schemas"],
  });

  const templates = [
    {
      id: "contact-form",
      name: "Contact Form",
      description: "Basic contact form with validation"
    },
    {
      id: "landing-page", 
      name: "Landing Page",
      description: "Hero section with CTA form"
    },
    {
      id: "registration",
      name: "User Registration", 
      description: "Multi-field form with custom logic"
    }
  ];

  return (
    <div className="w-80 bg-white border-r border-slate-200 flex flex-col">
      <div className="p-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800 mb-3">Component Library</h2>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => addComponent('form')}
            className="p-3 border-2 border-dashed border-slate-200 rounded-lg hover:border-primary hover:bg-blue-50 cursor-pointer transition-colors text-center"
            data-testid="button-add-form"
          >
            <div className="w-6 h-6 mx-auto mb-1 bg-primary rounded flex items-center justify-center">
              <span className="text-white text-xs">F</span>
            </div>
            <span className="text-xs font-medium text-slate-600">Form</span>
          </button>
          
          <button
            onClick={() => addComponent('text')}
            className="p-3 border-2 border-dashed border-slate-200 rounded-lg hover:border-primary hover:bg-blue-50 cursor-pointer transition-colors text-center"
            data-testid="button-add-text"
          >
            <div className="w-6 h-6 mx-auto mb-1 bg-primary rounded flex items-center justify-center">
              <span className="text-white text-xs">T</span>
            </div>
            <span className="text-xs font-medium text-slate-600">Text</span>
          </button>
          
          <button
            onClick={() => addComponent('image')}
            className="p-3 border-2 border-dashed border-slate-200 rounded-lg hover:border-primary hover:bg-blue-50 cursor-pointer transition-colors text-center"
            data-testid="button-add-image"
          >
            <div className="w-6 h-6 mx-auto mb-1 bg-primary rounded flex items-center justify-center">
              <span className="text-white text-xs">I</span>
            </div>
            <span className="text-xs font-medium text-slate-600">Image</span>
          </button>
        </div>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto">
        <h3 className="font-medium text-slate-700 mb-3">Schema Templates</h3>
        <div className="space-y-2">
          {templates.map((template) => (
            <Card
              key={template.id}
              className="p-3 bg-slate-50 rounded-lg hover:bg-slate-100 cursor-pointer transition-colors border border-slate-200"
              onClick={() => loadTemplate(template.id)}
              data-testid={`template-${template.id}`}
            >
              <div className="flex items-center space-x-2">
                <FileCode className="text-slate-500 w-4 h-4" />
                <span className="text-sm font-medium text-slate-700">{template.name}</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">{template.description}</p>
            </Card>
          ))}
        </div>

        <div className="mt-6">
          <h3 className="font-medium text-slate-700 mb-3">Recent Schemas</h3>
          <div className="space-y-2">
            {schemas.slice(0, 5).map((schema) => (
              <Card
                key={schema.id}
                className="p-3 bg-slate-50 rounded-lg hover:bg-slate-100 cursor-pointer transition-colors border border-slate-200"
                onClick={() => loadTemplate(schema.id, true)}
                data-testid={`recent-schema-${schema.id}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">{schema.name}</span>
                  <div className="flex items-center text-slate-500">
                    <Clock className="w-3 h-3 mr-1" />
                    <span className="text-xs">
                      {schema.updatedAt ? new Date(schema.updatedAt).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>
                </div>
                {schema.description && (
                  <p className="text-xs text-slate-500 mt-1">{schema.description}</p>
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
