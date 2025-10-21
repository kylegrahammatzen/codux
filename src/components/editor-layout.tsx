"use client";

import { useProjectContext } from "@/components/project-context";
import { AppHeader } from "@/components/app-header";
import { ChatPanel } from "@/components/chat/panel";
import { PreviewPanel } from "@/components/preview/panel";
import { PanelWrapper } from "@/components/panel-wrapper";
import { SandpackProvider } from "@codesandbox/sandpack-react";
import { cn } from "@/lib/utils";

export const EditorLayout = () => {
  const { panelOpen, fullscreen, isMobile, files, activeFile } = useProjectContext();

  // Convert files to Sandpack format
  const sandpackFiles = Object.entries(files).reduce((acc, [path, file]) => {
    acc[path] = file.code;
    return acc;
  }, {} as Record<string, string>);

  return (
    <div
      className={cn(
        "flex flex-col h-full transition-all ease-[cubic-bezier(.165,.84,.44,1)] duration-300",
        fullscreen ? "gap-0 p-0" : "gap-2 p-2"
      )}
    >
      {/* AppHeader with transition */}
      <div
        className={cn(
          "transition-all ease-[cubic-bezier(.165,.84,.44,1)] duration-300",
          fullscreen ? "h-0 opacity-0 overflow-hidden" : "h-auto opacity-100"
        )}
      >
        <AppHeader />
      </div>

      {/* Panel layout */}
      <SandpackProvider
        style={{ display: 'contents' }}
        files={sandpackFiles}
        options={{
          activeFile: activeFile || undefined,
        }}
        customSetup={{
          dependencies: {
            react: "^18.3.1",
            "react-dom": "^18.3.1",
          },
        }}
      >
        <div className="flex flex-1 overflow-hidden min-h-0">
          <PanelWrapper isOpen={panelOpen && !isMobile}>
            <ChatPanel />
          </PanelWrapper>

          <PreviewPanel />
        </div>
      </SandpackProvider>
    </div>
  );
};