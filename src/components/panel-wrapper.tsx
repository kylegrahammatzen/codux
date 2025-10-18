"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useProjectContext } from "@/components/project-context";

type PanelWrapperProps = {
  side: "left" | "right";
  isOpen: boolean;
  width?: string;
  children: React.ReactNode;
};

export const PanelWrapper = (props: PanelWrapperProps) => {
  const { fullscreen } = useProjectContext();
  const width = props.width || "30%";
  const margin = props.side === "left" ? "mr-2" : "ml-2";

  // Handle fullscreen logic internally
  const isOpen = props.isOpen && !fullscreen;

  return (
    <div
      className={cn(
        "flex-shrink-0 transition-all ease-in-out duration-500",
        isOpen ? margin : ""
      )}
      style={{
        width: isOpen ? width : 0,
        overflow: isOpen ? "visible" : "hidden"
      }}
    >
      <Card className={cn(
        "h-full gap-0 py-0 transition-all duration-500",
        isOpen ? "opacity-100" : "opacity-0"
      )}>
        {props.children}
      </Card>
    </div>
  );
};
