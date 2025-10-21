"use client";

import { useProjectContext } from "@/components/project-context";
import { AppHeader } from "@/components/app-header";
import { EditorContent } from "@/components/editor-content";
import { cn } from "@/lib/utils";

type LayoutContainerProps = {
  children: React.ReactNode;
};

const LayoutContainer = (props: LayoutContainerProps) => {
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

export const EditorLayout = () => {
  return (
    <LayoutContainer>
      <AppHeader />
      <EditorContent />
    </LayoutContainer>
  );
};