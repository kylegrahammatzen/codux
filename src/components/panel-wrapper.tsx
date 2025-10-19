"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useProjectContext } from "@/components/project-context";

type PanelWrapperProps = {
  isOpen: boolean;
  children: React.ReactNode;
};

export const PanelWrapper = (props: PanelWrapperProps) => {
  const { fullscreen } = useProjectContext();
  const width = "30%";
  const margin = "mr-2";

  // Handle fullscreen logic internally
  const isOpen = props.isOpen && !fullscreen;

  return (
    <div
      className={cn(
        "flex-shrink-0 transition-all duration-300",
        isOpen ? margin : ""
      )}
      style={{
        width: isOpen ? width : 0,
        overflow: isOpen ? "visible" : "hidden",
        transitionTimingFunction: "cubic-bezier(.165, .84, .44, 1)"
      }}
    >
      <Card className={cn(
        "h-full gap-0 py-0 transition-opacity duration-300",
        isOpen ? "opacity-100" : "opacity-0"
      )} style={{
        transitionTimingFunction: "cubic-bezier(.165, .84, .44, 1)"
      }}>
        {props.children}
      </Card>
    </div>
  );
};
