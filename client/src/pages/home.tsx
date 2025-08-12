import { useState } from "react";
import { Code, Settings, Save, FolderOpen, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import ComponentLibrary from "@/components/component-library";
import SchemaEditor from "@/components/schema-editor";
import LivePreview from "@/components/live-preview";
import { useSchema } from "@/hooks/use-schema";

export default function Home() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { currentSchema, saveSchema, loadSchema, exportSchema } = useSchema();

  return (
    <div className="h-screen bg-slate-50 font-sans flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Code className="text-white w-4 h-4" />
            </div>
            <h1 className="text-xl font-semibold text-slate-800">Dynamic Interface Compiler</h1>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button 
            onClick={saveSchema}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
            data-testid="button-save-schema"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Schema
          </Button>
          <Button 
            variant="outline"
            onClick={loadSchema}
            className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-medium text-sm"
            data-testid="button-load-schema"
          >
            <FolderOpen className="w-4 h-4 mr-2" />
            Load
          </Button>
          <Button 
            variant="outline"
            onClick={exportSchema}
            className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-medium text-sm"
            data-testid="button-export-schema"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <div className="w-px h-6 bg-slate-200"></div>
          <Button 
            variant="ghost"
            onClick={() => setIsSettingsOpen(true)}
            className="p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
            data-testid="button-settings"
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Component Library */}
        <ComponentLibrary />

        {/* Main Editor Area */}
        <div className="flex-1 flex">
          {/* Schema Editor */}
          <SchemaEditor />

          {/* Live Preview */}
          <LivePreview />
        </div>
      </div>
    </div>
  );
}
