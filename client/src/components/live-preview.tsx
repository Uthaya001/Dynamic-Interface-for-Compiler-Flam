import { useState } from "react";
import { Monitor, Tablet, Smartphone, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSchema } from "@/hooks/use-schema";
import ComponentFactory from "@/components/dynamic-components/component-factory";

export default function LivePreview() {
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const { currentSchema, refreshPreview } = useSchema();

  const getPreviewWidth = () => {
    switch (previewMode) {
      case 'mobile': return 'max-w-sm';
      case 'tablet': return 'max-w-2xl';
      default: return 'max-w-4xl';
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50">
      <div className="px-4 py-3 bg-white border-b border-slate-200 flex items-center justify-between">
        <h3 className="font-semibold text-slate-700">Live Preview</h3>
        <div className="flex items-center space-x-2">
          <div className="flex bg-slate-100 rounded-lg p-1">
            <Button
              variant={previewMode === 'desktop' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setPreviewMode('desktop')}
              className="px-3 py-1 text-xs"
              data-testid="button-preview-desktop"
            >
              <Monitor className="w-3 h-3 mr-1" />
              Desktop
            </Button>
            <Button
              variant={previewMode === 'tablet' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setPreviewMode('tablet')}
              className="px-3 py-1 text-xs"
              data-testid="button-preview-tablet"
            >
              <Tablet className="w-3 h-3 mr-1" />
              Tablet
            </Button>
            <Button
              variant={previewMode === 'mobile' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setPreviewMode('mobile')}
              className="px-3 py-1 text-xs"
              data-testid="button-preview-mobile"
            >
              <Smartphone className="w-3 h-3 mr-1" />
              Mobile
            </Button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={refreshPreview}
            className="p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded transition-colors"
            data-testid="button-refresh-preview"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Preview Container */}
      <div className="flex-1 overflow-auto p-6">
        <div className={`mx-auto ${getPreviewWidth()}`}>
          {currentSchema?.components ? (
            <ComponentFactory components={currentSchema.components} />
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-slate-500">
              <div className="text-center">
                <div className="w-16 h-16 bg-slate-200 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Monitor className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">No Components</h3>
                <p className="text-slate-600 mb-4">Add components from the library or load a template to get started.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
