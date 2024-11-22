import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { ComponentData } from "@/types/types";

interface MainContentProps {
  slug: string;
  isPreviewMode: boolean;
  setIsPreviewMode: (value: boolean) => void;
  selectedComponents: ComponentData[];
  renderComponent: (component: ComponentData) => React.ReactNode;
  removeComponent: (index: number) => void;
}

export function MainContent({
  slug,
  isPreviewMode,
  setIsPreviewMode,
  selectedComponents,
  renderComponent,
  removeComponent,
}: MainContentProps) {
  return (
    <main className="flex-1 p-6 overflow-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Blog Builder for /{slug}</h1>
        <Button
          variant="outline"
          onClick={() => setIsPreviewMode(!isPreviewMode)}
        >
          {isPreviewMode ? (
            <EyeOff className="mr-2 h-4 w-4" />
          ) : (
            <Eye className="mr-2 h-4 w-4" />
          )}
          {isPreviewMode ? "Exit Preview" : "Preview"}
        </Button>
      </div>
      <div
        className={`border-2 ${
          isPreviewMode ? "border-transparent" : "border-dashed border-gray-300"
        } rounded-lg min-h-[calc(100vh-8rem)] p-4`}
      >
        {selectedComponents.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            Add components to your blog
          </div>
        ) : (
          <div className="space-y-8">
            {selectedComponents.map((component, index) => (
              <div key={component.id} className="relative">
                {renderComponent(component)}
                {!isPreviewMode && (
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2 z-30"
                    onClick={() => removeComponent(index)}
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
