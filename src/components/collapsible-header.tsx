"use client";

import { useProjectContext } from "@/providers/project-provider";
import { cn } from "@/lib/utils";

type CollapsibleHeaderProps = {
  children: React.ReactNode;
};

export const CollapsibleHeader = (props: CollapsibleHeaderProps) => {
  const { fullscreen } = useProjectContext();

  return (
    <div
      className={cn(
        "transition-all ease-[cubic-bezier(.165,.84,.44,1)] duration-300",
        fullscreen ? "h-0 opacity-0 overflow-hidden" : "h-auto opacity-100"
      )}
    >
      {props.children}
    </div>
  );
};