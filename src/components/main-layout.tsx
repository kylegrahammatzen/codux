"use client";

import { useMainContext } from "@/components/main-context";
import { HomeSidebar } from "@/components/home/sidebar";
import { HomePanel } from "@/components/home/panel";
import { cn } from "@/lib/utils";

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
        {/* Sidebar wrapper without Card */}
        <div
          className={cn(
            "flex-shrink-0 transition-all duration-300",
            isSidebarVisible ? "mr-2" : ""
          )}
          style={{
            width: isSidebarVisible ? "12rem" : 0,
            overflow: isSidebarVisible ? "visible" : "hidden",
            transitionTimingFunction: "cubic-bezier(.165, .84, .44, 1)"
          }}
        >
          <div className={cn(
            "h-full transition-opacity duration-300",
            isSidebarVisible ? "opacity-100" : "opacity-0"
          )} style={{
            transitionTimingFunction: "cubic-bezier(.165, .84, .44, 1)"
          }}>
            <HomeSidebar pathname={props.pathname} />
          </div>
        </div>

        {props.children}
      </div>
    </div>
  );
};
