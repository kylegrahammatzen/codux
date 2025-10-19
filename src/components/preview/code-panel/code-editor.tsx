"use client";

import { SandpackCodeEditor } from "@codesandbox/sandpack-react";
import { useProjectContext } from "@/components/project-context";

type CodeEditorProps = {
  width: number;
  height: number;
};

export const CodeEditor = (props: CodeEditorProps) => {
  const { activeFile } = useProjectContext();

  return (
    <>
      {activeFile ? (
        <SandpackCodeEditor
          key={activeFile}
          showLineNumbers
          showInlineErrors
          showTabs={false}
          showRunButton={false}
          style={{ width: props.width, height: props.height }}
        />
      ) : (
        <div className="flex items-center justify-center" style={{ width: props.width, height: props.height }}>
          <p className="text-gray-400 text-sm">Select a file to edit</p>
        </div>
      )}
    </>
  );
};
