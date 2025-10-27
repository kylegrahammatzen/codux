"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useMainContext } from "@/components/main-context";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

type PanelHeaderProps = {
  title?: string;
  children?: React.ReactNode;
};

export const PanelHeader = (props: PanelHeaderProps) => {
  const { sidebarOpen, setSidebarOpen, isMobile } = useMainContext();
  const isSidebarVisible = sidebarOpen && !isMobile;

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex items-center justify-between px-2 border-b h-12 bg-card rounded-t-md shrink-0">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={toggleSidebar}>
          {isSidebarVisible ? <ChevronsLeft className="size-4" /> : <ChevronsRight className="size-4" />}
        </Button>
        {props.title && (
          <>
            <Separator orientation="vertical" className="h-6" />
            <span className="text-sm font-medium">{props.title}</span>
          </>
        )}
        {props.children}
      </div>
    </div>
  );
};
