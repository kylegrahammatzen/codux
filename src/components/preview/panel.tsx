"use client";

import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useProjectContext } from "@/components/project-context";
import { PreviewModeToggle } from "@/components/preview/mode-toggle";
import { CodeEditor } from "@/components/preview/code-panel/code-editor";
import { PreviewFooter } from "@/components/preview/footer";
import { FileTree } from "@/components/preview/code-panel/file-tree";
import { CodeHeader } from "@/components/preview/code-panel/code-header";
import { cn } from "@/lib/utils";
import { ChevronsLeft, ChevronsRight, RefreshCcw, Expand, Shrink, ArrowLeftToLine } from "lucide-react";
import { SandpackProvider } from "@codesandbox/sandpack-react";

export const PreviewPanel = () => {
  const { panelOpen, setPanelOpen, fullscreen, setFullscreen, previewMode, isMobile, files, activeFile, showFileTree, setShowFileTree } = useProjectContext();
  const fullscreenButtonRef = useRef<HTMLButtonElement>(null);

  const toggleFileTree = () => {
    setShowFileTree(!showFileTree);
  };

  // Convert files to Sandpack format
  const sandpackFiles = Object.entries(files).reduce((acc, [path, file]) => {
    acc[path] = file.code;
    return acc;
  }, {} as Record<string, string>);

  // Panel is only visible if panelOpen is true AND not on mobile
  const isPanelVisible = panelOpen && !isMobile;

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
    <div className="flex flex-col flex-1 min-h-0">
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
          <div className="flex w-full h-full relative">
            <FileTree />

            <div className="flex flex-col flex-1 h-full min-w-0 overflow-hidden">
              <CodeHeader />

              <div className="flex-1 min-h-0 w-full bg-white">
                <SandpackProvider
                  files={sandpackFiles}
                  options={{
                    activeFile: activeFile || undefined,
                  }}
                  customSetup={{
                    dependencies: {
                      react: "^18.3.1",
                      "react-dom": "^18.3.1",
                    },
                  }}
                >
                  <CodeEditor />
                </SandpackProvider>
              </div>
            </div>

            <div className="absolute bottom-2 left-2">
              <Button variant="outline" size="icon-sm" className="bg-white cursor-pointer" onClick={toggleFileTree}>
                <div className="transition-transform duration-200" style={{ transform: showFileTree ? "scaleX(1)" : "scaleX(-1)" }}>
                  <ArrowLeftToLine className="size-4" />
                </div>
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-black p-4">Preview placeholder</p>
        )}
      </div>

      {!fullscreen && (
        <div className="bg-white rounded-b-md">
          <PreviewFooter />
        </div>
      )}
    </div>
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
