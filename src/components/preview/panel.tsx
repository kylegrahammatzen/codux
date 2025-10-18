"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useProjectContext } from "@/components/project-context";
import { PreviewModeToggle } from "@/components/preview/mode-toggle";
import { cn } from "@/lib/utils";

export const PreviewPanel = () => {
  const { leftPanel, setLeftPanel, rightPanel, setRightPanel, fullscreen, setFullscreen, previewMode } = useProjectContext();

  const toggleChat = () => {
    setLeftPanel(leftPanel === "chat" ? null : "chat");
  };

  const handleFullscreen = () => {
    if (!fullscreen) {
      // Entering fullscreen - close any open panels
      if (leftPanel) setLeftPanel(null);
      if (rightPanel) setRightPanel(null);
    }
    setFullscreen(!fullscreen);
  };

  const content = (
    <>
      <div className="flex items-center justify-between px-2 border-b h-12 bg-white rounded-t-md overflow-hidden">
        <div className="flex items-center gap-2">
          {!fullscreen && (
            <>
              <Button variant="ghost" size="sm" onClick={toggleChat}>
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
                    d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                  />
                </svg>
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <PreviewModeToggle />
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 transition-all duration-500 ease-in-out" style={{
            transform: previewMode === "code" ? 'translateX(20rem)' : 'translateX(0)',
            opacity: previewMode === "code" ? 0 : 1
          }}>
            <Button variant="ghost" size="sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span>Reload</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleFullscreen}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      </div>

      <div className="flex-1 flex items-center justify-center bg-gray-200 min-h-0">
        <p className="text-gray-400 text-sm">Preview panel</p>
      </div>

      {!fullscreen && (
        <div className="flex items-center justify-center px-4 border-t h-8 bg-white rounded-b-md">
          <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span>Console</span>
          </Button>
        </div>
      )}
    </>
  );

  if (fullscreen) {
    return (
      <div className="flex-1 h-full flex flex-col min-h-0">
        {content}
      </div>
    );
  }

  return (
    <Card className="flex-1 h-full gap-0 py-0 min-h-0 overflow-hidden">
      {content}
    </Card>
  );
};

