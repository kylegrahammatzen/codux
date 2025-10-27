"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChatInput } from "@/components/chat/input";
import { useHomeContext } from "@/components/home-context";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

type HomePanelProps = {
  children?: React.ReactNode;
  showChatInput?: boolean;
  header?: React.ReactNode;
};

export const HomePanel = (props: HomePanelProps) => {
  const { sidebarOpen, setSidebarOpen, isMobile } = useHomeContext();
  const isSidebarVisible = sidebarOpen && !isMobile;

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Card className="flex-1 h-full gap-0 py-0 min-h-0 min-w-max">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between px-2 border-b h-12 bg-card rounded-t-md">
          {props.header ? (
            props.header
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={toggleSidebar}>
                {isSidebarVisible ? <ChevronsLeft className="size-4" /> : <ChevronsRight className="size-4" />}
              </Button>
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col min-h-0 overflow-y-auto items-center justify-center">
          {props.children}
        </div>

        {props.showChatInput !== false && (
          <div className="w-full max-w-2xl mx-auto px-4 sm:px-0 pb-4">
            <ChatInput />
          </div>
        )}
      </div>
    </Card>
  );
};
