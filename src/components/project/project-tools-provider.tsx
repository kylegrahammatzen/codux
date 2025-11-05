"use client";

import { TamboProvider } from "@tambo-ai/react";
import { env } from "@/env";
import { FileUploadProvider } from "@/contexts/file-upload-context";
import { createProjectTools } from "@/lib/tambo-tools";

type ProjectTamboProviderProps = {
  children: React.ReactNode;
  userId: string;
  projectId: string;
  userToken?: string;
};

/**
 * TamboProvider for project pages with file read/write tools
 * Automatically provides tools scoped to the current project
 */
export const ProjectTamboProvider = (props: ProjectTamboProviderProps) => {
  const contextKey = `project-${props.projectId}`;
  const tools = createProjectTools(props.userId, props.projectId);

  return (
    <FileUploadProvider>
      <TamboProvider
        apiKey={env.NEXT_PUBLIC_TAMBO_API_KEY}
        userToken={props.userToken}
        contextKey={contextKey}
        tools={tools}
      >
        {props.children}
      </TamboProvider>
    </FileUploadProvider>
  );
};
