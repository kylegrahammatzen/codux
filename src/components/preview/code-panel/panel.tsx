"use client";

import { useProjectContext } from "@/components/project-context";
import { Button } from "@/components/ui/button";
import { ArrowLeftToLine } from "lucide-react";

export const CodePanel = () => {
  const { showFileTree } = useProjectContext();

  return (
    <div className="flex flex-1 min-h-0">
      {/* File tree - conditionally shown */}
      {showFileTree && (
        <div className="w-64 bg-accent flex-shrink-0 border-r flex flex-col">
          <div className="flex-1 p-4">
            <p>File Tree</p>
          </div>
          <div className="p-2">
            <Button variant="outline" size="icon-sm" className="bg-white">
              <ArrowLeftToLine className="size-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Code editor */}
      <div className="flex-1 bg-green-500">
        <p className="text-white p-4">Code Editor</p>
      </div>
    </div>
  );
};
