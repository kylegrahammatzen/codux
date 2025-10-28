"use client";

import { useProjectContext } from "@/providers/project-provider";
import { CollapsiblePanel } from "@/components/collapsible-panel";
import { ChatPanel } from "@/components/chat/panel";
import { Card } from "@/components/ui/card";

export const ChatSidebar = () => {
  const { fullscreen, panelOpen, isMobile } = useProjectContext();
  const isOpen = panelOpen && !isMobile && !fullscreen;

  return (
    <CollapsiblePanel width="30%" isOpen={isOpen}>
      <Card className="h-full gap-0 py-0 overflow-hidden">
        <ChatPanel />
      </Card>
    </CollapsiblePanel>
  );
};