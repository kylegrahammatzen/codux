"use client";

import { useState } from "react";
import { useProjectContext } from "@/components/project-context";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { ArrowLeftToLine, ArrowRightToLine, Copy, Download, ChevronDown, File } from "lucide-react";
import { cn } from "@/lib/utils";

export const CodePanel = () => {
  const { showFileTree, setShowFileTree } = useProjectContext();
  const [appFolderOpen, setAppFolderOpen] = useState(true);

  const toggleFileTree = () => {
    setShowFileTree(!showFileTree);
  };

  return (
    <div className="flex flex-1 min-h-0 relative">
      {/* File tree - conditionally shown with width animation */}
      <div
        className="flex-shrink-0 transition-all duration-300"
        style={{
          width: showFileTree ? "16rem" : 0,
          overflow: "hidden",
          transitionTimingFunction: "cubic-bezier(.165, .84, .44, 1)"
        }}
      >
        <div className="w-64 bg-gray-50 border-r h-full p-2">
          {/* Folder: app */}
          <Collapsible open={appFolderOpen} onOpenChange={setAppFolderOpen}>
            <CollapsibleTrigger className="flex items-center gap-1 w-full hover:bg-gray-100 rounded px-1 py-1 text-sm">
              <ChevronDown className={cn("size-4 transition-transform duration-200", !appFolderOpen && "-rotate-90")} />
              <span>app</span>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="ml-5 space-y-0.5">
                {/* File: globals.css */}
                <div className="flex items-center gap-1 hover:bg-gray-100 rounded px-1 py-1 text-sm">
                  <File className="size-4 text-gray-500" />
                  <span>globals.css</span>
                </div>
                {/* File: page.tsx */}
                <div className="flex items-center gap-1 hover:bg-gray-100 rounded px-1 py-1 text-sm">
                  <File className="size-4 text-gray-500" />
                  <span>page.tsx</span>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* File: package.json */}
          <div className="flex items-center gap-1 hover:bg-gray-100 rounded px-1 py-1 text-sm">
            <File className="size-4 text-gray-500" />
            <span>package.json</span>
          </div>
        </div>
      </div>

      {/* Code editor */}
      <div className="flex-1 bg-green-500 flex flex-col">
        {/* Code editor header */}
        <div className="h-10 border-b bg-white flex items-center justify-between px-2">
          {/* Left side - Breadcrumb */}
          <div className="flex items-center gap-1 text-sm">
            <span className="text-gray-600">app</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">page.tsx</span>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon-sm">
              <Copy className="size-4" />
            </Button>
            <Button variant="ghost" size="icon-sm">
              <Download className="size-4" />
            </Button>
          </div>
        </div>

        {/* Code content */}
        <div className="flex-1">
          <p className="text-white p-4">Code Editor</p>
        </div>
      </div>

      {/* Toggle button - absolutely positioned bottom left */}
      <div className="absolute bottom-2 left-2">
        <Button variant="outline" size="icon-sm" className="bg-white" onClick={toggleFileTree}>
          <div className="transition-transform duration-200" style={{ transform: showFileTree ? "scaleX(1)" : "scaleX(-1)" }}>
            <ArrowLeftToLine className="size-4" />
          </div>
        </Button>
      </div>
    </div>
  );
};
