"use client";

import { useProjectContext } from "@/components/project-context";
import { ChatPanel } from "@/components/chat/panel";
import { PreviewPanel } from "@/components/preview/panel";
import { PanelWrapper } from "@/components/panel-wrapper";
import { SandpackProvider } from "@codesandbox/sandpack-react";

export const EditorContent = () => {
  const { files, dependencies } = useProjectContext();

  return (
    <SandpackProvider
      style={{ display: 'contents' }}
      files={files}
      customSetup={{
        dependencies,
      }}
    >
      <div className="flex flex-1 overflow-hidden min-h-0">
        <PanelWrapper>
          <ChatPanel />
        </PanelWrapper>

        <PreviewPanel />
      </div>
    </SandpackProvider>
  );
};
