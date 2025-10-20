"use client";

import { SandpackCodeEditor } from "@codesandbox/sandpack-react";
import { useProjectContext } from "@/components/project-context";

export const CodeEditor = () => {
  const { activeFile } = useProjectContext();

  return (
    <div className="w-full h-full">
      {activeFile ? (
        <SandpackCodeEditor
          key={activeFile}
          showLineNumbers
          showInlineErrors
          showTabs={false}
          showRunButton={false}
        />
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          <p className="text-gray-400 text-sm">Select a file to edit</p>
        </div>
      )}
    </div>
  );
};
