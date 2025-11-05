"use server";

import { db } from "@/lib/db";
import { project } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { generateId } from "better-auth";

export async function createProject(userId: string, customProjectId?: string) {
  try {
    const projectId = customProjectId || generateId();

    await db.insert(project).values({
      id: projectId,
      userId,
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

export async function getUserProjects(userId: string) {
  try {
    const projects = await db
      .select()
      .from(project)
      .where(eq(project.userId, userId))
      .orderBy(desc(project.updatedAt));

    return {
      success: true,
      projects,
    };
  } catch (error) {
    console.error("Failed to get user projects:", error);
    return {
      success: false,
      message: "Failed to get user projects",
      projects: [],
    };
  }
}


export async function deleteProject(projectId: string) {
  try {
    await db
      .delete(project)
      .where(eq(project.id, projectId));

    return {
      success: true,
    };
  } catch (error) {
    console.error("Failed to delete project:", error);
    return {
      success: false,
      message: "Failed to delete project",
    };
  }
}
