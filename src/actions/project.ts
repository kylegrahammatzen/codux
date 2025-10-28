"use server";

import { db } from "@/lib/db";
import { project } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { generateId } from "better-auth";

export async function createProject(userId: string, name?: string) {
  try {
    const projectId = generateId();

    await db.insert(project).values({
      id: projectId,
      userId,
      name: name || "Untitled Project",
    });

    return {
      success: true,
      projectId,
    };
  } catch (error) {
    console.error("Failed to create project:", error);
    return {
      success: false,
      message: "Failed to create project",
    };
  }
}

export async function getProject(projectId: string) {
  try {
    const result = await db
      .select()
      .from(project)
      .where(eq(project.id, projectId))
      .limit(1);

    if (result.length === 0) {
      return {
        success: false,
        message: "Project not found",
      };
    }

    return {
      success: true,
      project: result[0],
    };
  } catch (error) {
    console.error("Failed to get project:", error);
    return {
      success: false,
      message: "Failed to get project",
    };
  }
}

export async function updateProjectThreadId(projectId: string, threadId: string) {
  try {
    await db
      .update(project)
      .set({ tamboThreadId: threadId })
      .where(eq(project.id, projectId));

    return {
      success: true,
    };
  } catch (error) {
    console.error("Failed to update project thread ID:", error);
    return {
      success: false,
      message: "Failed to update project thread ID",
    };
  }
}
