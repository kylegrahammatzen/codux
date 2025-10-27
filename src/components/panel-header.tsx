"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useHomeContext } from "@/components/home-context";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

type PanelHeaderProps = {
  title?: string;
  children?: React.ReactNode;
};

export const PanelHeader = (props: PanelHeaderProps) => {
  const { sidebarOpen, setSidebarOpen, isMobile } = useHomeContext();
  const isSidebarVisible = sidebarOpen && !isMobile;

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
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
  );
};
