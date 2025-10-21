"use client";

import { useProjectContext } from "@/components/project-context";
import { AppHeader } from "@/components/app-header";
import { SandpackLayout } from "@/components/sandpack/layout";
import { cn } from "@/lib/utils";

export const EditorLayout = () => {
  const { fullscreen } = useProjectContext();

  return (
    <div
      className={cn(
        "flex flex-col h-full transition-all ease-[cubic-bezier(.165,.84,.44,1)] duration-300",
        fullscreen ? "gap-0 p-0" : "gap-2 p-2"
      )}
    >
      <AppHeader />
      <SandpackLayout />
    </div>
  );
};