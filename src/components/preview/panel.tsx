"use client";

import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useProjectContext } from "@/components/project-context";
import { PreviewModeToggle } from "@/components/preview/mode-toggle";
import { FileTreePanel } from "@/components/preview/file-tree-panel";
import { CodeViewerPanel } from "@/components/preview/code-viewer-panel";
import { PreviewFooter } from "@/components/preview/footer";
import { cn } from "@/lib/utils";
import { ChevronsLeft, ChevronsRight, RefreshCcw, Expand, Shrink } from "lucide-react";

export const PreviewPanel = () => {
  const { panelOpen, setPanelOpen, fullscreen, setFullscreen, previewMode } = useProjectContext();
  const fullscreenButtonRef = useRef<HTMLButtonElement>(null);

  const togglePanel = () => {
    setPanelOpen(!panelOpen);
  };

  const handleFullscreen = () => {
    setFullscreen(!fullscreen);
    // Refocus button after state change
    setTimeout(() => {
      fullscreenButtonRef.current?.focus();
    }, 0);
  };

  const content = (
    <>
      <div className="flex items-center justify-between px-2 border-b h-12 bg-white rounded-t-md overflow-hidden">
        <div className="flex items-center gap-2">
          {!fullscreen && (
            <>
              <Button variant="ghost" size="sm" onClick={togglePanel}>
                {panelOpen ? <ChevronsLeft className="size-4" /> : <ChevronsRight className="size-4" />}
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <PreviewModeToggle />
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className={cn(
            "flex items-center gap-2 transition-all ease-[cubic-bezier(.77,0,.175,1)] duration-300",
            previewMode === "code" ? "translate-x-[20rem] opacity-0" : "translate-x-0 opacity-100"
          )}>
            <Button variant="ghost" size="sm">
              <RefreshCcw className="size-4" />
              <span>Reload</span>
            </Button>
            <Button ref={fullscreenButtonRef} variant="ghost" size="sm" onClick={handleFullscreen}>
              {fullscreen ? <Shrink className="size-4" /> : <Expand className="size-4" />}
              <span>{fullscreen ? "Exit fullscreen" : "Fullscreen"}</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex min-h-0">
        {previewMode === "code" ? (
          <>
            <FileTreePanel />
            <CodeViewerPanel />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-200">
            <p className="text-gray-400 text-sm">Preview panel</p>
          </div>
        )}
      </div>

      {!fullscreen && (
        <div className="bg-white rounded-b-md">
          <PreviewFooter />
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

