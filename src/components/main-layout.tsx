"use client";

import { useMainContext } from "@/providers/main-provider";
import { HomeSidebar } from "@/components/home/sidebar";
import { CollapsiblePanel } from "@/components/collapsible-panel";
import type { User } from "@/lib/auth";

type MainLayoutProps = {
  children: React.ReactNode;
  header: React.ReactNode;
  pathname: string;
  user: User | null;
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
        <CollapsiblePanel width="12rem" isOpen={isSidebarVisible} className={isSidebarVisible ? "mr-6" : ""}>
          <HomeSidebar pathname={props.pathname} user={props.user} />
        </CollapsiblePanel>

        {props.children}
      </div>
    </div>
  );
};
