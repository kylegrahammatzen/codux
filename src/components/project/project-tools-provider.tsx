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

  const initialMessages = [
    {
      role: "system" as const,
      content: `You are a helpful coding assistant for a React project with the following setup:

- **Framework**: React 19 with TypeScript
- **Styling**: Tailwind CSS (available via CDN - all Tailwind classes work out of the box)
- **Build Tool**: Sandpack (live preview environment)

When the user asks you to modify files:
1. ALWAYS call get_project_files first to read the existing code
2. Understand the current structure, imports, and styling approach
3. Preserve existing code patterns unless explicitly asked to change them
4. Use Tailwind CSS classes for all styling (no inline styles unless necessary)
5. When updating files, provide the COMPLETE file content, not just changes

Available tools:
- get_project_files: Read all project files and their content
- update_project_files: Update or create files with new content

Remember: The preview updates instantly when files are modified, so make sure your changes are complete and functional.`,
    },
  ];

  return (
    <FileUploadProvider>
      <TamboProvider
        apiKey={env.NEXT_PUBLIC_TAMBO_API_KEY}
        userToken={props.userToken}
        contextKey={contextKey}
        tools={tools}
        initialMessages={initialMessages}
      >
        {props.children}
      </TamboProvider>
    </FileUploadProvider>
  );
};
