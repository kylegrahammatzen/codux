"use client";

import { SandpackCodeEditor } from "@codesandbox/sandpack-react";

export const CodeEditor = () => {
  return (
    <div className="h-full">
      <SandpackCodeEditor
        showLineNumbers
        showInlineErrors
        showTabs={false}
        showRunButton={false}
        style={{
          height: "100%",
        }}
      />
    </div>
  );
};
