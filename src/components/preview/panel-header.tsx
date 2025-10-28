"use client";

import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbSeparator } from "@/components/ui/breadcrumbs";
import { useProjectContext } from "@/providers/project-provider";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { cn } from "@/lib/utils";

type PreviewPanelHeaderProps = {
  children?: React.ReactNode;
  actions?: React.ReactNode;
};

export const PreviewPanelHeader = (props: PreviewPanelHeaderProps) => {
  const { panelOpen, setPanelOpen, fullscreen, isMobile } = useProjectContext();
  const isPanelVisible = panelOpen && !isMobile;

  const togglePanel = () => {
    setPanelOpen(!panelOpen);
  };

  return (
    <div className={cn(
      "flex items-center px-2 border-b h-12 bg-card rounded-t-md",
      fullscreen ? "justify-end" : "justify-between"
    )}>
      {!fullscreen && (
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Button variant="ghost" size="sm" onClick={togglePanel}>
                {isPanelVisible ? <ChevronsLeft className="size-4" /> : <ChevronsRight className="size-4" />}
              </Button>
            </BreadcrumbItem>
            {props.children && (
              <>
                <BreadcrumbSeparator variant="slash" />
                {props.children}
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      )}
      {props.actions && (
        <div className="flex items-center gap-2">
          {props.actions}
        </div>
      )}
    </div>
  );
};
