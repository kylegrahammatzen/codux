"use client";

import { SandpackCodeEditor } from "@codesandbox/sandpack-react";

export const CodeEditor = () => {
  return (
    <SandpackCodeEditor
      showLineNumbers
      showInlineErrors
      showTabs={false}
      showRunButton={false}
      readOnly={false}
    />
  );
};
