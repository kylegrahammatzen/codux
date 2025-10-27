"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChatInput } from "@/components/chat/input";
import { ExampleCards } from "@/components/home/examples";
import { useHomeContext } from "@/components/home-context";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

type HomePanelProps = {
  children?: React.ReactNode;
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
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={toggleSidebar}>
              {isSidebarVisible ? <ChevronsLeft className="size-4" /> : <ChevronsRight className="size-4" />}
            </Button>
          </div>
        </div>

        <div className="flex-1 flex flex-col min-h-0 md:overflow-y-auto md:items-center md:justify-center">
          <div className="flex flex-col h-full md:h-auto w-full max-w-2xl mx-auto px-4 md:px-0 min-h-0">
            <div className="pt-8 pb-6 shrink-0">
              {props.children}
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto md:overflow-visible mb-8 md:mb-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <CreateTaskCard />
                <ConnectCalendarCard />
                <BrowseAgentsCard />
                <UploadFileCard />
                <ExploreUseCasesCard />
                <CustomizeProjectsCard />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-2xl mx-auto px-4 pb-4">
          <ChatInput />
        </div>
      </div>
    </Card>
  );
};
