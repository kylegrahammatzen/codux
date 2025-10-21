"use client";

import { SandpackPreview, useSandpack } from "@codesandbox/sandpack-react";
import { AlertCircle } from "lucide-react";

export const Preview = () => {
  const { sandpack } = useSandpack();
  const hasError = (sandpack.error !== null && sandpack.error !== undefined) && sandpack.status === "error";

  if (hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4 text-center max-w-md px-4">
          <div className="size-16 rounded-full bg-red-50 flex items-center justify-center">
            <AlertCircle className="size-8 text-red-500" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">Preview Error</h3>
            <p className="text-sm text-gray-600">There's an error in your code, check the console below for details.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <SandpackPreview
        showOpenInCodeSandbox={false}
        showRefreshButton={false}
        showSandpackErrorOverlay={false}
      />
    </div>
  );
};
