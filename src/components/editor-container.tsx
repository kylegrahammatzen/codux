"use client";

import { useProjectContext } from "@/components/project-context";
import { cn } from "@/lib/utils";

type EditorContainerProps = {
  children: React.ReactNode;
};

export const EditorContainer = (props: EditorContainerProps) => {
  const { fullscreen } = useProjectContext();

  return (
    <div
      className={cn(
        "flex flex-col h-full transition-all ease-[cubic-bezier(.165,.84,.44,1)] duration-300",
        fullscreen ? "gap-0 p-0" : "gap-2 p-2"
      )}
    >
      {props.children}
    </div>
  );
};