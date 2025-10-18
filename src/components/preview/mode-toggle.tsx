"use client";

import { Switch } from "@/components/ui/switch";
import { useProjectContext } from "@/components/project-context";
import { cn } from "@/lib/utils";

export const PreviewModeToggle = () => {
  const { previewMode, setPreviewMode } = useProjectContext();

  const togglePreviewMode = () => {
    setPreviewMode(previewMode === "preview" ? "code" : "preview");
  };

  return (
    <div
      className={cn(
        "flex items-center gap-2 bg-accent rounded-full px-3 py-1 transition-[width] ease-[cubic-bezier(.77,0,.175,1)] duration-300 overflow-hidden",
        previewMode === "preview" ? "w-[8rem]" : "w-[7rem]"
      )}
    >
      <Switch
        size="lg"
        checked={previewMode === "code"}
        onCheckedChange={togglePreviewMode}
        icon={
          <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        }
      />
      <span className="text-sm font-medium whitespace-nowrap">
        {previewMode === "preview" ? "Preview" : "Code"}
      </span>
    </div>
  );
};
