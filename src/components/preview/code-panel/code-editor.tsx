"use client";

import { SandpackCodeEditor } from "@codesandbox/sandpack-react";
import { useProjectContext } from "@/components/project-context";

type CodeEditorProps = {
  width: number;
  height: number;
};

export const CodeEditor = (props: CodeEditorProps) => {
  const { activeFile } = useProjectContext();

  const containerStyle = {
    width: props.width,
    height: props.height,
  };

  return (
    <>
      {activeFile ? (
        <SandpackCodeEditor
          key={activeFile}
          showLineNumbers
          showInlineErrors
          showTabs={false}
          showRunButton={false}
          style={containerStyle}
        />
      ) : (
        <div className="flex items-center justify-center" style={containerStyle}>
          <p className="text-gray-400 text-sm">Select a file to edit</p>
        </div>
      )}
    </>
  );
};
