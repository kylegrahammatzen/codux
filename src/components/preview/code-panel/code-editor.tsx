"use client";

import { SandpackCodeEditor } from "@codesandbox/sandpack-react";
import { useProjectContext } from "@/components/project-context";

export const CodeEditor = () => {
  const { editorReadOnly } = useProjectContext();

  return (
    <SandpackCodeEditor
      showLineNumbers
      showInlineErrors
      showTabs={false}
      showRunButton={false}
      readOnly={editorReadOnly}
    />
  );
};
