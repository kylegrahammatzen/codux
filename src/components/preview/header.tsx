"use client";

import { useProjectContext } from "@/components/project-context";
import { ViewportControls } from "@/components/preview/viewport-controls";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export const PreviewHeader = () => {
  const { previewMode, setPreviewMode, fullscreen, setFullscreen, panelOpen, setPanelOpen } = useProjectContext();

  const showCode = previewMode === "code";
  const setShowCode = (value: boolean) => setPreviewMode(value ? "code" : "preview");

  const handleFullscreenToggle = () => {
    setFullscreen(!fullscreen);
  };

  return (
    <div className="h-12 border-b flex items-center justify-between px-2 gap-2 min-w-0 overflow-hidden">
      {/* Left side - Code switch and label (hide in fullscreen) */}
      {!fullscreen && (
        <div className="flex items-center gap-2 shrink-0">
          <Switch
            checked={showCode}
            onCheckedChange={setShowCode}
            size="lg"
            icon={
              <svg
                className="size-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
            }
          />
          <Separator orientation="vertical" className="h-4" />
          <div className="text-sm font-medium">{showCode ? "Code viewer" : "Project preview"}</div>
        </div>
      )}

      {/* Show just label in fullscreen */}
      {fullscreen && (
        <div className="text-sm font-medium shrink-0">Project preview</div>
      )}

      {/* Center - Viewport controls - only show on xl+ and not in code mode or fullscreen */}
      {!showCode && !fullscreen && (
        <div className="hidden xl:flex items-center gap-2">
          <ViewportControls />
        </div>
      )}

      {/* Right side - Reload and Fullscreen buttons */}
      <div className="flex items-center gap-2 shrink-0">
        <Button variant="ghost" size="sm">
          <svg
            className="size-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          <span>Reload</span>
        </Button>
        <Button variant="ghost" size="sm" onClick={handleFullscreenToggle}>
          <svg
            className="size-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5M4 16v4m0 0h4m-4 0l5-5"
            />
          </svg>
          <span>{fullscreen ? "Exit fullscreen" : "Fullscreen"}</span>
        </Button>
      </div>
    </div>
  );
};
