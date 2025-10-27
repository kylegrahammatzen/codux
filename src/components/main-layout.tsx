"use client";

import { useMainContext } from "@/components/main-context";
import { HomeSidebar } from "@/components/home/sidebar";
import { CollapsiblePanel } from "@/components/collapsible-panel";

type MainLayoutProps = {
  children: React.ReactNode;
  header: React.ReactNode;
  pathname: string;
};

export const MainLayout = (props: MainLayoutProps) => {
  const { sidebarOpen, isMobile } = useMainContext();
  const isSidebarVisible = sidebarOpen && !isMobile;

  return (
    <div className="flex flex-col h-full gap-2 p-2">
      {/* Header */}
      <div>{props.header}</div>

      {/* Panel layout */}
      <div className="flex flex-1 overflow-hidden min-h-0">
        <CollapsiblePanel width="12rem" isOpen={isSidebarVisible}>
          <HomeSidebar pathname={props.pathname} />
        </CollapsiblePanel>

        {props.children}
      </div>
    </div>
  );
};
