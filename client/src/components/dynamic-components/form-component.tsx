import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertCircle } from "lucide-react";
import { executeSandboxedFunction } from "@/lib/sandboxed-execution";
import type { FormComponent as FormComponentType, ComponentField } from "@shared/schema";

interface FormComponentProps {
  component: FormComponentType;
}

export default function FormComponent({ component }: FormComponentProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitResult, setSubmitResult] = useState<{ success?: string; error?: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFieldChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    setSubmitResult(null);
  };

  const validateField = (field: ComponentField, value: any): string | null => {
    if (field.required && (!value || value === '')) {
      return `${field.label} is required`;
    }

    if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return 'Please enter a valid email address';
      }
    }

    if (field.type === 'number' && value !== undefined && value !== '') {
      const numValue = Number(value);
      if (isNaN(numValue)) {
        return 'Please enter a valid number';
      }
      if (field.min !== undefined && numValue < field.min) {
        return `Value must be at least ${field.min}`;
      }
      if (field.max !== undefined && numValue > field.max) {
        return `Value must be at most ${field.max}`;
      }
    }

    if (field.validation?.pattern && value) {
      const regex = new RegExp(field.validation.pattern);
      if (!regex.test(value)) {
        return field.validation.message || 'Invalid format';
      }
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResult(null);

    // Validate all fields
    const newErrors: Record<string, string> = {};
    component.props.fields.forEach(field => {
      const error = validateField(field, formData[field.name]);
      if (error) {
        newErrors[field.name] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      // Execute custom submit logic if provided
      if (component.props.onSubmit) {
        const result = await executeSandboxedFunction(component.props.onSubmit, { values: formData });
        console.log('Form submitted:', formData);
        
        if (result && typeof result === 'object') {
          setSubmitResult(result);
        } else {
          setSubmitResult({ success: 'Form submitted successfully!' });
        }
      } else {
        console.log('Form submitted:', formData);
        setSubmitResult({ success: 'Form submitted successfully!' });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitResult({ error: error instanceof Error ? error.message : 'Submission failed' });
    }

    setIsSubmitting(false);
  };

  const renderField = (field: ComponentField) => {
    const fieldProps = {
      id: field.name,
      name: field.name,
      placeholder: field.placeholder,
      required: field.required,
      value: formData[field.name] || '',
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
        handleFieldChange(field.name, e.target.value),
      className: errors[field.name] ? 'border-red-500' : '',
      'data-testid': `input-${field.name}`
    };

    switch (field.type) {
      case 'textarea':
        return <Textarea {...fieldProps} rows={4} />;
      
      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              id={field.name}
              checked={formData[field.name] || false}
              onCheckedChange={(checked) => handleFieldChange(field.name, checked)}
              data-testid={`checkbox-${field.name}`}
            />
            <Label htmlFor={field.name}>{field.label}</Label>
          </div>
        );
      
      case 'select':
        return (
          <Select 
            value={formData[field.name] || ''} 
            onValueChange={(value) => handleFieldChange(field.name, value)}
          >
            <SelectTrigger data-testid={`select-${field.name}`}>
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      
      default:
        return <Input {...fieldProps} type={field.type} min={field.min} max={field.max} />;
    }
  };

  return (
    <Card className={`${component.props.className || ''}`} data-testid={`form-${component.id}`}>
      {component.props.title && (
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-gray-900">
            {component.props.title}
          </CardTitle>
        </CardHeader>
      )}
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {component.props.fields.map((field) => (
            <div key={field.name} className="space-y-2">
              {field.type !== 'checkbox' && (
                <Label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </Label>
              )}
              
              {renderField(field)}
              
              {errors[field.name] && (
                <p className="text-sm text-red-600 mt-1" data-testid={`error-${field.name}`}>
                  {errors[field.name]}
                </p>
              )}
            </div>
          ))}

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            data-testid="button-form-submit"
          >
            {isSubmitting ? 'Submitting...' : (component.props.submitText || 'Submit')}
          </Button>
        </form>

        {/* Success/Error Messages */}
        {submitResult?.success && (
          <Alert className="mt-4 border-green-500 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <AlertDescription className="text-green-800">
              {submitResult.success}
            </AlertDescription>
          </Alert>
        )}

        {submitResult?.error && (
          <Alert className="mt-4 border-red-500 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-500" />
            <AlertDescription className="text-red-800">
              {submitResult.error}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
