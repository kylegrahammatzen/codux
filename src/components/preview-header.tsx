"use client";

import { Button } from "@/components/ui/button";
import { useAppContext } from "@/components/app-context";

export const PreviewHeader = () => {
  const { isMobile } = useAppContext();

  return (
    <div className="h-12 border-b flex items-center justify-between px-4">
      {/* Left side - Project preview */}
      <div className="text-sm font-medium">Project preview</div>

      {/* Center - Desktop dropdown and dimensions */}
      {!isMobile && (
        <div className="hidden lg:flex items-center gap-2">
          <div className="flex items-center gap-1">
            <span className="text-sm">Desktop</span>
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
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span>1200</span>
            <span className="text-gray-400">W</span>
            <span>680</span>
            <span className="text-gray-400">H</span>
          </div>
        </div>
      )}

      {/* Right side - Reload and Fullscreen buttons */}
      <div className="flex items-center gap-2">
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
