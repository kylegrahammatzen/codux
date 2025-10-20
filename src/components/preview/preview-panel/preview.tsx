"use client";

import { SandpackPreview } from "@codesandbox/sandpack-react";

export const Preview = () => {
  return (
    <div className="w-full h-full">
      <SandpackPreview
        showOpenInCodeSandbox={false}
        showRefreshButton={false}
      />
    </div>
  );
};
