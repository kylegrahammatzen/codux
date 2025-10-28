"use client";

import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbSeparator } from "@/components/ui/breadcrumbs";
import { useMainContext } from "@/providers/main-provider";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

type PanelHeaderProps = {
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
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Button variant="ghost" size="sm" onClick={toggleSidebar}>
              {isSidebarVisible ? <ChevronsLeft className="size-4" /> : <ChevronsRight className="size-4" />}
            </Button>
          </BreadcrumbItem>
          {props.children && (
            <>
              <BreadcrumbSeparator />
              {props.children}
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
