import { z } from "zod";
import type { TamboTool } from "@tambo-ai/react";
import { updateProjectFile, getProjectFiles } from "@/actions/storage";

/**
 * Create project-specific tools with userId and projectId baked in
 * This way Tambo doesn't need to pass these on every call
 */
export function createProjectTools(userId: string, projectId: string): TamboTool[] {
  /**
   * Tambo tool for reading project files
   * Automatically uses the current userId and projectId
   */
  const readFiles = async () => {
    try {
      const result = await getProjectFiles(userId, projectId);

      if (!result.success) {
        return {
          success: false,
          message: result.message || "Failed to read files",
          files: {},
        };
      }

      return {
        success: true,
        message: `Found ${Object.keys(result.files).length} file(s)`,
        files: result.files,
      };
    } catch (error) {
      console.error("Tool error reading files:", error);
      return {
        success: false,
        message: "Failed to read files",
        files: {},
      };
    }
  };

  /**
   * Tambo tool for updating project files
   * Automatically uses the current userId and projectId
   */
  const updateFiles = async (files: Array<{ path: string; content: string }>) => {
    try {
      if (!files || files.length === 0) {
        return {
          success: false,
          message: "No files provided to update",
        };
      }

      const invalidFiles = files.filter(f => !f?.path || f?.content === undefined);
      if (invalidFiles.length > 0) {
        return {
          success: false,
          message: `${invalidFiles.length} file(s) missing path or content`,
        };
      }

      const updatePromises = files.map(async ({ path, content }) => {
        return updateProjectFile(userId, projectId, path, content);
      });

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
        message: `Successfully updated ${files.length} file(s)`,
        files: files.map(f => f.path),
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to update files: ${error instanceof Error ? error.message : String(error)}`,
      };
    }
  };

  return [
    {
      name: "get_project_files",
      description:
        "Get all files and their content from the current project. ALWAYS call this first before making any file updates to understand the existing code structure and avoid breaking changes.",
      tool: readFiles,
      toolSchema: z
        .function()
        .args()
        .returns(
          z.object({
            success: z.boolean(),
            message: z.string(),
            files: z.record(z.string(), z.string()),
          })
        ),
    },
    {
      name: "update_project_files",
      description:
        "Update or create files in the current project with new content. IMPORTANT: Always call get_project_files first to read existing files before updating them. Preserve existing imports, dependencies, and code structure unless explicitly asked to change them.",
      tool: updateFiles,
      toolSchema: z
        .function()
        .args(
          z.array(
            z.object({
              path: z.string().describe("File path including leading slash (e.g., '/App.tsx')"),
              content: z.string().describe("Complete file content"),
            })
          ).describe("Array of files to update")
        )
        .returns(
          z.object({
            success: z.boolean(),
            message: z.string(),
            files: z.array(z.string()).optional(),
          })
        ),
    },
  ];
}
