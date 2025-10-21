"use client";

import { Button } from "@/components/ui/button";
import { useProjectContext } from "@/components/project-context";
import { CodeEditor } from "@/components/preview/code-panel/code-editor";
import { Preview } from "@/components/preview/preview-panel/preview";
import { PreviewFooter } from "@/components/preview/footer";
import { PreviewHeader } from "@/components/preview/preview-header";
import { FileTree } from "@/components/preview/code-panel/file-tree";
import { CodeHeader } from "@/components/preview/code-panel/code-header";
import { cn } from "@/lib/utils";
import { ArrowLeftToLine } from "lucide-react";

export const PreviewPanel = () => {
  const { fullscreen, previewMode, showFileTree, setShowFileTree } = useProjectContext();

  const toggleFileTree = () => {
    setShowFileTree(!showFileTree);
  };

  const content = (
    <div className="flex flex-col flex-1 min-h-0">
      <PreviewHeader />

      <div className="flex-1 flex min-h-0 relative">
        <div className={cn(
          "flex w-full h-full absolute inset-0",
          previewMode === "code" ? "block" : "hidden"
        )}>
          <div className="flex w-full h-full relative">
            <FileTree />

            <div className="flex flex-col flex-1 h-full min-w-0 overflow-hidden">
              <CodeHeader />

              <div className="flex-1 min-h-0 w-full bg-white">
                <CodeEditor />
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
        </div>

        <div className={cn(
          "flex-1 min-h-0 w-full bg-white absolute inset-0",
          previewMode === "preview" ? "block" : "hidden"
        )}>
          <Preview />
        </div>
      </div>

      {!fullscreen && (
        <div className="bg-white rounded-b-md">
          <PreviewFooter />
        </div>
      )}
    </div>
  );

  return (
    <div className={cn(
      "flex-1 h-full gap-0 min-h-0 overflow-hidden flex flex-col",
      !fullscreen && "rounded-lg border bg-card text-card-foreground shadow-sm"
    )}>
      {content}
    </div>
  );
};
