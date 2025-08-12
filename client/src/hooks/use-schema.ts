import { useState, useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { UISchema, Component } from "@shared/schema";

const defaultSchema: UISchema = {
  components: [
    {
      type: "text",
      id: "welcome-title",
      props: {
        variant: "h1",
        content: "Welcome to Dynamic Interface Builder",
        className: "text-4xl font-bold text-gray-900 mb-4"
      }
    },
    {
      type: "text",
      id: "welcome-subtitle",
      props: {
        variant: "p",
        content: "Build beautiful interfaces with JSON schemas and live preview.",
        className: "text-lg text-gray-600 mb-8"
      }
    }
  ]
};

export function useSchema() {
  const [currentSchema, setCurrentSchema] = useState<UISchema>(defaultSchema);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const saveMutation = useMutation({
    mutationFn: async (schema: { name: string; description?: string; content: UISchema }) => {
      const response = await apiRequest("POST", "/api/schemas", schema);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Schema saved successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/schemas"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save schema",
        variant: "destructive",
      });
    },
  });

  const addComponent = useCallback((type: 'form' | 'text' | 'image') => {
    const id = `${type}-${Date.now()}`;
    let newComponent: Component;

    switch (type) {
      case 'form':
        newComponent = {
          type: 'form',
          id,
          props: {
            title: 'New Form',
            fields: [
              {
                label: 'Name',
                name: 'name',
                type: 'text',
                required: true,
                placeholder: 'Enter your name'
              }
            ],
            submitText: 'Submit'
          }
        };
        break;
      case 'text':
        newComponent = {
          type: 'text',
          id,
          props: {
            variant: 'p',
            content: 'New text content',
            className: 'text-gray-600'
          }
        };
        break;
      case 'image':
        newComponent = {
          type: 'image',
          id,
          props: {
            src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
            alt: 'Sample image',
            className: 'rounded-lg w-full h-auto'
          }
        };
        break;
    }

    setCurrentSchema(prev => ({
      ...prev,
      components: [...prev.components, newComponent]
    }));
  }, []);

  const loadTemplate = useCallback((templateId: string, isSchema = false) => {
    if (isSchema) {
      // Load from saved schemas
      fetch(`/api/schemas/${templateId}`)
        .then(res => res.json())
        .then(schema => {
          setCurrentSchema(schema.content);
          toast({
            title: "Template Loaded",
            description: `Loaded schema: ${schema.name}`,
          });
        })
        .catch(() => {
          toast({
            title: "Error",
            description: "Failed to load schema",
            variant: "destructive",
          });
        });
    } else {
      // Load predefined templates
      const templates: Record<string, UISchema> = {
        'contact-form': {
          components: [
            {
              type: 'text',
              id: 'form-title',
              props: {
                variant: 'h2',
                content: 'Contact Us',
                className: 'text-2xl font-semibold text-gray-900 mb-6'
              }
            },
            {
              type: 'form',
              id: 'contact-form',
              props: {
                fields: [
                  {
                    label: 'Full Name',
                    name: 'fullName',
                    type: 'text',
                    required: true,
                    placeholder: 'Enter your full name'
                  },
                  {
                    label: 'Email Address',
                    name: 'email',
                    type: 'email',
                    required: true,
                    placeholder: 'your@email.com'
                  },
                  {
                    label: 'Message',
                    name: 'message',
                    type: 'textarea',
                    required: true,
                    placeholder: 'Tell us about your project...'
                  }
                ],
                submitText: 'Send Message',
                onSubmit: "console.log('Form submitted:', values); return { success: 'Message sent successfully!' };"
              }
            }
          ]
        },
        'landing-page': {
          components: [
            {
              type: 'text',
              id: 'hero-title',
              props: {
                variant: 'h1',
                content: 'Build Amazing Interfaces',
                className: 'text-5xl font-bold text-center mb-6'
              }
            },
            {
              type: 'text',
              id: 'hero-subtitle',
              props: {
                variant: 'p',
                content: 'Create dynamic UIs with JSON schemas and live preview.',
                className: 'text-xl text-gray-600 text-center mb-8'
              }
            },
            {
              type: 'image',
              id: 'hero-image',
              props: {
                src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
                alt: 'Modern office space',
                className: 'rounded-xl shadow-lg mb-8'
              }
            }
          ]
        }
      };

      if (templates[templateId]) {
        setCurrentSchema(templates[templateId]);
        toast({
          title: "Template Loaded",
          description: `Loaded ${templateId.replace('-', ' ')} template`,
        });
      }
    }
  }, [toast]);

  const saveSchema = useCallback(() => {
    const name = prompt("Enter schema name:");
    if (name) {
      saveMutation.mutate({
        name,
        description: prompt("Enter description (optional):") || undefined,
        content: currentSchema
      });
    }
  }, [currentSchema, saveMutation]);

  const loadSchema = useCallback(() => {
    // This would open a modal to select from saved schemas
    toast({
      title: "Load Schema",
      description: "Check the recent schemas in the sidebar",
    });
  }, [toast]);

  const exportSchema = useCallback(() => {
    const dataStr = JSON.stringify(currentSchema, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'schema.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Schema Exported",
      description: "Schema has been downloaded as JSON file",
    });
  }, [currentSchema, toast]);

  const refreshPreview = useCallback(() => {
    // Force re-render by updating the schema reference
    setCurrentSchema(prev => ({ ...prev }));
    toast({
      title: "Preview Refreshed",
      description: "Components have been re-rendered",
    });
  }, [toast]);

  return {
    currentSchema,
    setCurrentSchema,
    addComponent,
    loadTemplate,
    saveSchema,
    loadSchema,
    exportSchema,
    refreshPreview,
  };
}
