"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChatInput } from "@/components/chat/input";
import { ExampleCards } from "@/components/home/examples";
import { useHomeContext } from "@/components/home-context";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

type HomePanelProps = {
  userFirstName?: string;
};

export const HomePanel = (props: HomePanelProps) => {
  const { sidebarOpen, setSidebarOpen, isMobile } = useHomeContext();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const greeting = props.userFirstName ? `${getGreeting()}, ${props.userFirstName}!` : `${getGreeting()}!`;

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

        <div className="flex-1 flex flex-col items-center justify-center p-8 overflow-y-auto">
          <div className="w-full max-w-2xl flex flex-col">
            <div className="flex flex-col mb-6">
              <h1 className="text-2xl font-semibold text-foreground">{greeting}</h1>
              <p className="text-xl font-semibold text-muted-foreground/70">Ready to assign your task?</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              <ExampleCards />
            </div>
          </div>
        </div>

        <div className="flex justify-center p-4">
          <div className="w-full max-w-2xl">
            <ChatInput />
          </div>
        </div>
      </div>
    </Card>
  );
};
