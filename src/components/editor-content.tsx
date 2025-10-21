"use client";

import type { ProjectFiles, ProjectDependencies, ProjectOptions } from "@/components/project-context";
import { ChatPanel } from "@/components/chat/panel";
import { PreviewPanel } from "@/components/preview/panel";
import { PanelWrapper } from "@/components/panel-wrapper";
import { HistoryTracker } from "@/components/preview/history-tracker";
import { SandpackProvider } from "@codesandbox/sandpack-react";

type EditorContentProps = {
  files: ProjectFiles;
  dependencies: ProjectDependencies;
  options?: ProjectOptions;
};

export const EditorContent = (props: EditorContentProps) => {
  return (
    <SandpackProvider
      style={{ display: 'contents' }}
      files={props.files}
      options={props.options}
      customSetup={{
        dependencies: props.dependencies,
      }}
    >
      <HistoryTracker />
      <div className="flex flex-1 overflow-hidden min-h-0">
        <PanelWrapper>
          <ChatPanel />
        </PanelWrapper>

        <PreviewPanel />
      </div>
    </SandpackProvider>
  );
};
