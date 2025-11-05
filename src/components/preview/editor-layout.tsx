"use client";

import type { ProjectFiles, ProjectDependencies, ProjectOptions } from "@/providers/project-provider";
import { EditorContent } from "@/components/preview/editor-content";
import { EditorContainer } from "@/components/preview/editor-container";
import { CollapsibleHeader } from "@/components/collapsible-header";
import { PendingMessageHandler } from "@/components/project/pending-message-handler";

type EditorLayoutProps = {
  children: React.ReactNode;
  files: ProjectFiles;
  dependencies: ProjectDependencies;
  options?: ProjectOptions;
  userId: string;
  projectId?: string;
};

export const EditorLayout = (props: EditorLayoutProps) => {
  return (
    <EditorContainer>
      <PendingMessageHandler userId={props.userId} />
      <CollapsibleHeader>
        {props.children}
      </CollapsibleHeader>
      <EditorContent
        files={props.files}
        dependencies={props.dependencies}
        options={props.options}
        userId={props.userId}
        projectId={props.projectId}
      />
    </EditorContainer>
  );
};