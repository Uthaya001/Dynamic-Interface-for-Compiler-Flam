import { useState, useRef, useEffect } from "react";
import { Code, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSchema } from "@/hooks/use-schema";
import { validateSchema } from "@/lib/schema-validation";

export default function SchemaEditor() {
  const { currentSchema, setCurrentSchema } = useSchema();
  const [editorContent, setEditorContent] = useState("");
  const [validationState, setValidationState] = useState({ 
    isValid: true, 
    error: null as string | null 
  });
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (currentSchema) {
      setEditorContent(JSON.stringify(currentSchema, null, 2));
    }
  }, [currentSchema]);

  const handleContentChange = (content: string) => {
    setEditorContent(content);
    try {
      const parsed = JSON.parse(content);
      const validation = validateSchema(parsed);
      setValidationState({ isValid: validation.success, error: validation.error || null });
      
      if (validation.success) {
        setCurrentSchema(parsed);
      }
    } catch (error) {
      setValidationState({ 
        isValid: false, 
        error: error instanceof Error ? error.message : "Invalid JSON" 
      });
    }
  };

  const formatJSON = () => {
    try {
      const parsed = JSON.parse(editorContent);
      const formatted = JSON.stringify(parsed, null, 2);
      setEditorContent(formatted);
      handleContentChange(formatted);
    } catch (error) {
      // Do nothing if JSON is invalid
    }
  };

  const validateJSON = () => {
    try {
      const parsed = JSON.parse(editorContent);
      const validation = validateSchema(parsed);
      setValidationState({ isValid: validation.success, error: validation.error || null });
    } catch (error) {
      setValidationState({ 
        isValid: false, 
        error: error instanceof Error ? error.message : "Invalid JSON" 
      });
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white border-r border-slate-200">
      <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <h3 className="font-semibold text-slate-700">Schema Editor</h3>
          <div className="flex items-center space-x-1 bg-white rounded px-2 py-1 border border-slate-200">
            {validationState.isValid ? (
              <>
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-xs text-slate-600">Valid JSON</span>
              </>
            ) : (
              <>
                <div className="w-2 h-2 bg-red-500 rounded-full" />
                <span className="text-xs text-slate-600">Invalid</span>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={formatJSON}
            className="px-3 py-1 text-xs bg-slate-100 text-slate-600 rounded hover:bg-slate-200 transition-colors"
            data-testid="button-format-json"
          >
            <Code className="w-3 h-3 mr-1" />
            Format
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={validateJSON}
            className="px-3 py-1 text-xs bg-slate-100 text-slate-600 rounded hover:bg-slate-200 transition-colors"
            data-testid="button-validate-schema"
          >
            <CheckCircle className="w-3 h-3 mr-1" />
            Validate
          </Button>
        </div>
      </div>
      
      {/* Editor Container */}
      <div className="flex-1 relative">
        <textarea
          ref={textareaRef}
          value={editorContent}
          onChange={(e) => handleContentChange(e.target.value)}
          className="absolute inset-0 w-full h-full p-4 font-mono text-sm bg-gray-900 text-gray-100 border-none outline-none resize-none"
          placeholder="// Define your UI components using JSON schema&#10;{&#10;  &quot;components&quot;: []&#10;}"
          data-testid="textarea-schema-editor"
        />
      </div>

      {/* Error Panel */}
      {!validationState.isValid && validationState.error && (
        <div className="border-t border-red-200 bg-red-50 p-3">
          <div className="flex items-start space-x-2">
            <AlertCircle className="text-red-500 w-4 h-4 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-red-800">JSON Syntax Error</p>
              <p className="text-xs text-red-600 mt-1">{validationState.error}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
