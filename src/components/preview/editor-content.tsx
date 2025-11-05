"use client";

import type { ProjectFiles, ProjectDependencies, ProjectOptions } from "@/providers/project-provider";
import { PreviewPanel } from "@/components/preview/panel";
import { ChatSidebar } from "@/components/chat-sidebar";
import { SandpackProvider } from "@codesandbox/sandpack-react";
import { useTheme } from "next-themes";
import { FileSyncHandler } from "@/components/preview/file-sync-handler";

type EditorContentProps = {
  files: ProjectFiles;
  dependencies: ProjectDependencies;
  options?: ProjectOptions;
  userId?: string;
  projectId?: string;
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
      <FileSyncHandler userId={props.userId} projectId={props.projectId} />
      <div className="flex flex-1 overflow-hidden min-h-0">
        <ChatSidebar />

        <PreviewPanel />
      </div>
    </SandpackProvider>
  );
};
