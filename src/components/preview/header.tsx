"use client";

import { useAppContext } from "@/components/app-context";
import { ViewportControls } from "@/components/preview/viewport-controls";
import { Button } from "@/components/ui/button";

export const PreviewHeader = () => {
  const { isMobile } = useAppContext();

  return (
    <div className="h-12 border-b flex items-center justify-between px-2 gap-2 min-w-0 overflow-hidden">
      {/* Left side - Project preview */}
      <div className="text-sm font-medium shrink-0">Project preview</div>

      {/* Center - Viewport controls - only show on xl+ */}
      <div className="hidden xl:flex items-center gap-2">
        <ViewportControls />
      </div>

      {/* Right side - Reload and Fullscreen buttons */}
      <div className="flex items-center gap-2 shrink-0">
        <Button variant="ghost" size="sm">
          <svg
            className="w-4 h-4"
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
        <Button variant="ghost" size="sm">
          <svg
            className="w-4 h-4"
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
          <span>Fullscreen</span>
        </Button>
      </div>
    </div>
  );
};
