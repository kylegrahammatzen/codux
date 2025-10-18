"use client";

import { useProjectContext } from "@/components/project-context";
import { AppHeader } from "@/components/app-header";
import { ChatPanel } from "@/components/chat/panel";
import { PreviewPanel } from "@/components/preview/panel";
import { IntegrationsPanel } from "@/components/integrations/panel";
import { PanelWrapper } from "@/components/panel-wrapper";
import { cn } from "@/lib/utils";

export const EditorLayout = () => {
  const { leftPanel, rightPanel, fullscreen } = useProjectContext();

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
          "transition-all ease-[cubic-bezier(.165,.84,.44,1)] duration-300 overflow-hidden",
          fullscreen ? "h-0 opacity-0" : "h-auto opacity-100"
        )}
      >
        <AppHeader />
      </div>

      {/* Panel layout */}
      <div className="flex flex-1 overflow-hidden min-h-0">
        <PanelWrapper side="left" isOpen={leftPanel === "chat"} width="30%">
          <ChatPanel />
        </PanelWrapper>

        <PreviewPanel />

        <PanelWrapper side="right" isOpen={rightPanel === "integrations"} width="30%">
          <IntegrationsPanel />
        </PanelWrapper>
      </div>
    </div>
  );
};