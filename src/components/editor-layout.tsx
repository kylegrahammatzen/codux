"use client";

import { useProjectContext } from "@/components/project-context";
import type { ProjectFiles, ProjectDependencies, ProjectOptions } from "@/components/project-context";
import { AppHeader } from "@/components/app-header";
import { EditorContent } from "@/components/editor-content";
import { cn } from "@/lib/utils";

type LayoutWrapperProps = {
  children: React.ReactNode;
};

const LayoutWrapper = (props: LayoutWrapperProps) => {
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

type EditorLayoutProps = {
  files: ProjectFiles;
  dependencies: ProjectDependencies;
  options?: ProjectOptions;
};

export const EditorLayout = (props: EditorLayoutProps) => {
  return (
    <LayoutWrapper>
      <AppHeader />
      <EditorContent
        files={props.files}
        dependencies={props.dependencies}
        options={props.options}
      />
    </LayoutWrapper>
  );
};