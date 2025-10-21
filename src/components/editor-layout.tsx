"use client";

import { useProjectContext, DEFAULT_FILES } from "@/components/project-context";
import { AppHeader } from "@/components/app-header";
import { ChatPanel } from "@/components/chat/panel";
import { PreviewPanel } from "@/components/preview/panel";
import { PanelWrapper } from "@/components/panel-wrapper";
import { SandpackProvider } from "@codesandbox/sandpack-react";
import { cn } from "@/lib/utils";

type LayoutWrapperProps = {
  children: React.ReactNode;
};

const LayoutWrapper = (props: LayoutWrapperProps) => {
  const { fullscreen } = useProjectContext();

  return (
    <div
      className={cn(
        "flex flex-col h-full transition-all ease-[cubic-bezier(.165,.84,.44,1)] duration-300",
        fullscreen ? "gap-0 p-0" : "gap-2 p-2"
      )}
    >
      {props.children}
    </div>
  );
};

export const EditorLayout = () => {
  return (
    <LayoutWrapper>
      <AppHeader />

      <SandpackProvider
        style={{ display: 'contents' }}
        files={DEFAULT_FILES}
        customSetup={{
          dependencies: {
            react: "^18.3.1",
            "react-dom": "^18.3.1",
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
    </LayoutWrapper>
  );
};