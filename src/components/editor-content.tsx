"use client";

import type { ProjectFiles, ProjectDependencies, ProjectOptions } from "@/components/project-context";
import { useProjectContext } from "@/components/project-context";
import { ChatPanel } from "@/components/chat/panel";
import { PreviewPanel } from "@/components/preview/panel";
import { PanelWrapper } from "@/components/panel-wrapper";
import { SandpackProvider } from "@codesandbox/sandpack-react";

type EditorContentProps = {
  files: ProjectFiles;
  dependencies: ProjectDependencies;
  options?: ProjectOptions;
};

export const EditorContent = (props: EditorContentProps) => {
  const { panelOpen, isMobile } = useProjectContext();

  return (
    <SandpackProvider
      style={{ display: 'contents' }}
      files={props.files}
      options={props.options}
      customSetup={{
        dependencies: props.dependencies,
      }}
    >
      <div className="flex flex-1 overflow-hidden min-h-0">
        <PanelWrapper isOpen={panelOpen && !isMobile}>
          <ChatPanel />
        </PanelWrapper>

        <PreviewPanel />
      </div>
    </SandpackProvider>
  );
};
