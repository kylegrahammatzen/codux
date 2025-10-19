"use client";

import { useProjectContext } from "@/components/project-context";
import { Button } from "@/components/ui/button";
import { ArrowLeftToLine, ArrowRightToLine } from "lucide-react";

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
          overflow: showFileTree ? "visible" : "hidden",
          transitionTimingFunction: "cubic-bezier(.165, .84, .44, 1)"
        }}
      >
        <div
          className="w-64 bg-accent border-r h-full transition-opacity duration-300"
          style={{
            transitionTimingFunction: "cubic-bezier(.165, .84, .44, 1)",
            opacity: showFileTree ? 1 : 0
          }}
        >
          <p className="p-4">File Tree</p>
        </div>
      </div>

      {/* Code editor */}
      <div className="flex-1 bg-green-500">
        <p className="text-white p-4">Code Editor</p>
      </div>

      {/* Toggle button - absolutely positioned bottom left */}
      <div className="absolute bottom-2 left-2">
        <Button variant="outline" size="icon-sm" className="bg-white" onClick={toggleFileTree}>
          {showFileTree ? <ArrowLeftToLine className="size-4" /> : <ArrowRightToLine className="size-4" />}
        </Button>
      </div>
    </div>
  );
};
