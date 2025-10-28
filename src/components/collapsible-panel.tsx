"use client";

import { cn } from "@/lib/utils";

type CollapsiblePanelProps = {
  width: string;
  isOpen: boolean;
  children: React.ReactNode;
  className?: string;
};

export const CollapsiblePanel = (props: CollapsiblePanelProps) => {
  return (
    <div
      className={cn(
        "transition-all duration-300",
        props.isOpen ? "mr-2" : "",
        props.className
      )}
      style={{
        width: props.isOpen ? props.width : 0,
        overflow: props.isOpen ? "visible" : "hidden",
        transitionTimingFunction: "cubic-bezier(.165, .84, .44, 1)"
      }}
    >
      <div
        className={cn(
          "h-full transition-opacity duration-300",
          props.isOpen ? "opacity-100" : "opacity-0"
        )}
        style={{
          transitionTimingFunction: "cubic-bezier(.165, .84, .44, 1)"
        }}
      >
        {props.children}
      </div>
    </div>
  );
};