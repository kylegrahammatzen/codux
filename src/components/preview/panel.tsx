"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { useProjectContext } from "@/providers/project-provider";
import { PreviewModeToggle } from "@/components/preview/mode-toggle";
import { PreviewPanelHeader } from "@/components/preview/panel-header";
import { CodePanel } from "@/components/preview/code-panel/panel";
import { Preview } from "@/components/preview/preview";
import { PreviewFooter } from "@/components/preview/footer";
import { useSandpackNavigation, useSandpack } from "@codesandbox/sandpack-react";
import { cn } from "@/lib/utils";
import { RefreshCcw, Expand, Shrink } from "lucide-react";

export const PreviewPanel = () => {
  const { fullscreen, setFullscreen, previewMode } = useProjectContext();
  const { refresh } = useSandpackNavigation();
  const { sandpack } = useSandpack();
  const fullscreenButtonRef = useRef<HTMLButtonElement>(null);
  const hasError = sandpack.error !== null && sandpack.error !== undefined;

  const handleFullscreen = () => {
    setFullscreen(!fullscreen);
    // Refocus button after state change
    setTimeout(() => {
      fullscreenButtonRef.current?.focus();
    }, 0);
  };

  const handleReload = () => {
    refresh();
  };

  return (
    <div className={cn(
      "flex-1 h-full gap-0 min-h-0 overflow-hidden flex flex-col",
      !fullscreen && "rounded-lg border bg-card text-card-foreground shadow-sm"
    )}>
      <PreviewPanelHeader
        actions={
          <div className={cn(
            "flex items-center gap-2 transition-all ease-[cubic-bezier(.77,0,.175,1)] duration-300",
            previewMode === "code" ? "translate-x-[20rem] opacity-0" : "translate-x-0 opacity-100"
          )}>
            <Button variant="ghost" size="sm" onClick={handleReload} disabled={hasError}>
              <RefreshCcw className="size-4" />
              <span>Reload</span>
            </Button>
            <Button ref={fullscreenButtonRef} variant="ghost" size="sm" onClick={handleFullscreen}>
              {fullscreen ? <Shrink className="size-4" /> : <Expand className="size-4" />}
              <span>{fullscreen ? "Exit fullscreen" : "Fullscreen"}</span>
            </Button>
          </div>
        }
      >
        <BreadcrumbItem>
          <PreviewModeToggle />
        </BreadcrumbItem>
      </PreviewPanelHeader>

      <div className="flex-1 flex min-h-0 relative">
        <div className={cn(
          "flex w-full h-full absolute inset-0",
          previewMode === "code" ? "block" : "hidden"
        )}>
          <CodePanel />
        </div>

        <div className={cn(
          "flex-1 min-h-0 w-full absolute inset-0",
          previewMode === "preview" ? "block" : "hidden"
        )}>
          <Preview />
        </div>
      </div>

      {!fullscreen && (
        <div className="bg-card rounded-b-md">
          <PreviewFooter />
        </div>
      )}
    </div>
  );
};

