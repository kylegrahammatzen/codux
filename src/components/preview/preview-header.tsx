"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PreviewModeToggle } from "@/components/preview/mode-toggle";
import { PreviewHeader as PreviewControls } from "@/components/preview/preview-panel/preview-header";
import { useProjectContext } from "@/components/project-context";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const PreviewHeader = () => {
  const { panelOpen, setPanelOpen, fullscreen, isMobile, previewMode } = useProjectContext();
  const isPanelVisible = panelOpen && !isMobile;

  const togglePanel = () => {
    setPanelOpen(!panelOpen);
  };

  return (
    <div className="flex items-center justify-between px-2 border-b h-12 bg-white rounded-t-md overflow-hidden">
      <div className="flex items-center gap-2">
        {!fullscreen && (
          <>
            <Button variant="ghost" size="sm" onClick={togglePanel}>
              {isPanelVisible ? <ChevronsLeft className="size-4" /> : <ChevronsRight className="size-4" />}
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
          <PreviewControls />
        </div>
      </div>
    </div>
  );
};
