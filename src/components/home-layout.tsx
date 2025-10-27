"use client";

import { useHomeContext } from "@/components/home-context";
import { HomeSidebar } from "@/components/home/sidebar";
import { HomePanel } from "@/components/home/panel";
import { cn } from "@/lib/utils";

type HomeLayoutProps = {
  children: React.ReactNode;
  pathname: string;
  userFirstName?: string;
};

export const HomeLayout = (props: HomeLayoutProps) => {
  const { sidebarOpen, isMobile } = useHomeContext();
  const isSidebarVisible = sidebarOpen && !isMobile;

  return (
    <div className="flex flex-col h-full gap-2 p-2">
      {/* Header */}
      <div>{props.children}</div>

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
            <HomeSidebar pathname={props.pathname} userFirstName={props.userFirstName} />
          </div>
        </div>

        <HomePanel userFirstName={props.userFirstName} />
      </div>
    </div>
  );
};
