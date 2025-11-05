import { z } from "zod";
import type { TamboTool } from "@tambo-ai/react";
import { updateProjectFile } from "@/actions/storage";

/**
 * Tambo tool for updating project files
 * Allows the AI to edit files in Supabase Storage
 */
const updateFiles = async (params: {
  userId: string;
  projectId: string;
  files: Record<string, string>;
}) => {
  const { userId, projectId, files } = params;

  try {
    // Update each file in storage
    const updatePromises = Object.entries(files).map(([filename, content]) =>
      updateProjectFile(userId, projectId, filename, content)
    );

    const results = await Promise.all(updatePromises);

    const failures = results.filter((r) => !r.success);
    if (failures.length > 0) {
      return {
        success: false,
        message: `Failed to update ${failures.length} file(s)`,
      };
    }

    return {
      success: true,
      message: `Successfully updated ${Object.keys(files).length} file(s)`,
      files: Object.keys(files),
    };
  } catch (error) {
    console.error("Tool error updating files:", error);
    return {
      success: false,
      message: "Failed to update files",
    };
  }
};

export const projectTools: TamboTool[] = [
  {
    name: "update_project_files",
    description:
      "Update one or more files in the current project. Use this when the user asks to edit code, add features, fix bugs, or modify files. Each file should include the complete content, not just changes.",
    tool: updateFiles,
    toolSchema: z.function(
      z.tuple([
        z.object({
          userId: z.string().describe("The ID of the user who owns the project"),
          projectId: z.string().describe("The ID of the project to update"),
          files: z
            .record(z.string(), z.string())
            .describe(
              "Object mapping file paths (e.g., '/App.tsx') to their complete content. Include leading slash in filenames."
            ),
        }),
      ]),
      z.object({
        success: z.boolean(),
        message: z.string(),
        files: z.array(z.string()).optional(),
      })
    ),
  },
];
