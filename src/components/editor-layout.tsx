"use client";

import { useProjectContext } from "@/components/project-context";
import type { ProjectFiles, ProjectDependencies, ProjectOptions } from "@/components/project-context";
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
  children: React.ReactNode;
  files: ProjectFiles;
  dependencies: ProjectDependencies;
  options?: ProjectOptions;
};

export const EditorLayout = (props: EditorLayoutProps) => {
  const { fullscreen } = useProjectContext();

  return (
    <LayoutWrapper>
      {/* AppHeader with transition */}
      <div
        className={cn(
          "transition-all ease-[cubic-bezier(.165,.84,.44,1)] duration-300",
          fullscreen ? "h-0 opacity-0 overflow-hidden" : "h-auto opacity-100"
        )}
      >
        {props.children}
      </div>

      <EditorContent
        files={props.files}
        dependencies={props.dependencies}
        options={props.options}
      />
    </LayoutWrapper>
  );
};