"use client";

import { DEFAULT_FILES } from "@/components/project-context";
import { ChatPanel } from "@/components/chat/panel";
import { PreviewPanel } from "@/components/preview/panel";
import { PanelWrapper } from "@/components/panel-wrapper";
import { SandpackProvider } from "@codesandbox/sandpack-react";

export const EditorContent = () => {
  return (
    <SandpackProvider
      style={{ display: 'contents' }}
      files={DEFAULT_FILES}
      options={{
        externalResources: ["https://cdn.tailwindcss.com"],
      }}
      customSetup={{
        dependencies: {
          react: "^19.2.0",
          "react-dom": "^19.2.0",
        },
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
