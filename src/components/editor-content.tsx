"use client";

import { DEFAULT_FILES, DEFAULT_DEPENDENCIES, DEFAULT_OPTIONS } from "@/components/project-context";
import { ChatPanel } from "@/components/chat/panel";
import { PreviewPanel } from "@/components/preview/panel";
import { PanelWrapper } from "@/components/panel-wrapper";
import { SandpackProvider } from "@codesandbox/sandpack-react";

export const EditorContent = () => {
  return (
    <SandpackProvider
      style={{ display: 'contents' }}
      files={DEFAULT_FILES}
      options={DEFAULT_OPTIONS}
      customSetup={{
        dependencies: DEFAULT_DEPENDENCIES,
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
