"use client";

import { usePreviewContext } from "@/components/preview/preview-context";

export const CodePanel = () => {
  const { showFileTree } = usePreviewContext();

  return (
    <div className="flex flex-1 min-h-0">
      {/* File tree - conditionally shown */}
      {showFileTree && (
        <div className="w-64 bg-accent flex-shrink-0 border-r">
          <p className="p-4">File Tree</p>
        </div>
      )}

      {/* Code editor */}
      <div className="flex-1 bg-green-500">
        <p className="text-white p-4">Code Editor</p>
      </div>
    </div>
  );
};
