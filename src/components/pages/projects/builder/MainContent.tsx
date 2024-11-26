import { Button } from "@/components/ui/button";
import { ComponentData } from "@/types/types";
import { Eye, EyeOff, Trash2 } from "lucide-react";

interface MainContentProps {
  slug: string;
  isPreviewMode: boolean;
  setIsPreviewMode: (value: boolean) => void;
  selectedComponents: ComponentData[];
  renderComponent: (component: ComponentData) => React.ReactNode;
  removeComponent: (id: string) => void;
  pageState: {
    backgroundColor: string;
    fontFamily: string;
  };
}

export function MainContent({
  slug,
  isPreviewMode,
  setIsPreviewMode,
  selectedComponents,
  renderComponent,
  removeComponent,
  pageState,
}: MainContentProps) {
  return (
    <div className="flex-1 overflow-auto">
      <div className="sticky top-0 z-20 bg-background border-b p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Blog Builder: {slug}</h1>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsPreviewMode(!isPreviewMode)}
        >
          {isPreviewMode ? (
            <>
              <EyeOff className="mr-2 h-4 w-4" /> Exit Preview
            </>
          ) : (
            <>
              <Eye className="mr-2 h-4 w-4" /> Preview
            </>
          )}
        </Button>
      </div>
      <div
        className="min-h-screen"
        style={{
          backgroundColor: pageState.backgroundColor,
          fontFamily: pageState.fontFamily,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {selectedComponents.map((component) => (
            <div
              key={component.id}
              className={`relative mb-8 group ${
                !isPreviewMode
                  ? "border-2 border-dashed border-gray-300 p-4"
                  : ""
              }`}
            >
              {renderComponent(component)}
              {!isPreviewMode && (
                <>
                  <div className="absolute -top-3 left-4 bg-white px-2 text-sm text-gray-500 z-10">
                    {component.type}
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-50"
                    onClick={() => removeComponent(component.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
          ))}
          {!isPreviewMode && selectedComponents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No components added yet. Use the sidebar to add components.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
