"use client";

import { useProjectContext } from "@/components/project-context";
import { Button } from "@/components/ui/button";
import { ArrowLeftToLine, ArrowRightToLine, Copy, Download } from "lucide-react";

export const CodePanel = () => {
  const { showFileTree, setShowFileTree } = useProjectContext();

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
        <div className="w-64 bg-gray-50 border-r h-full">
          <p className="p-4">File Tree</p>
        </div>
      </div>

      {/* Code editor */}
      <div className="flex-1 bg-green-500 flex flex-col">
        {/* Code editor header */}
        <div className="h-12 border-b bg-white flex items-center justify-between px-2">
          {/* Left side - Breadcrumb */}
          <div className="flex items-center gap-1 text-sm">
            <span className="text-gray-600">app</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">page.tsx</span>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Copy className="size-4" />
              <span>Copy</span>
            </Button>
            <Button variant="ghost" size="sm">
              <Download className="size-4" />
              <span>Download</span>
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
