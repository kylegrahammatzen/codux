"use client";

import type { ProjectFiles, ProjectDependencies, ProjectOptions } from "@/providers/project-provider";
import { EditorContent } from "@/components/preview/editor-content";
import { EditorContainer } from "@/components/preview/editor-container";
import { CollapsibleHeader } from "@/components/collapsible-header";

type EditorLayoutProps = {
  children: React.ReactNode;
  files: ProjectFiles;
  dependencies: ProjectDependencies;
  options?: ProjectOptions;
};

export const EditorLayout = (props: EditorLayoutProps) => {
  return (
    <EditorContainer>
      <CollapsibleHeader>
        {props.children}
      </CollapsibleHeader>
      <EditorContent
        files={props.files}
        dependencies={props.dependencies}
        options={props.options}
      />
    </EditorContainer>
  );
};