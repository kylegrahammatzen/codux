"use client";

import type { ProjectFiles, ProjectDependencies, ProjectOptions } from "@/providers/project-provider";
import { PreviewPanel } from "@/components/preview/panel";
import { ChatSidebar } from "@/components/chat-sidebar";
import { SandpackProvider } from "@codesandbox/sandpack-react";
import { useTheme } from "next-themes";

type EditorContentProps = {
  files: ProjectFiles;
  dependencies: ProjectDependencies;
  options?: ProjectOptions;
};

export const EditorContent = (props: EditorContentProps) => {
  const { resolvedTheme } = useTheme();

  return (
    <SandpackProvider
      style={{ display: 'contents' }}
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      files={props.files}
      options={props.options}
      customSetup={{
        dependencies: props.dependencies,
      }}
    >
      <div className="flex flex-1 overflow-hidden min-h-0">
        <ChatSidebar />

        <PreviewPanel />
      </div>
    </SandpackProvider>
  );
};
