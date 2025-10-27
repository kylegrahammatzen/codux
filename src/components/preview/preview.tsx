"use client";

import { SandpackPreview, useSandpack } from "@codesandbox/sandpack-react";

export const Preview = () => {
  const { sandpack } = useSandpack();
  const hasError = sandpack.error !== null && sandpack.error !== undefined;

  if (hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-card">
        <div className="flex flex-col items-center gap-4 text-center max-w-md px-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">Preview Error</h3>
            <p className="text-sm text-muted-foreground">There's an error in your code, check the console below for details.</p>
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
        style={{
          height: "100%",
        }}
      />
    </div>
  );
};
