"use server";

import { supabase } from "@/lib/supabase";

const BUCKET_NAME = "projects";

/**
 * Upload multiple files to Supabase Storage
 */
export async function uploadProjectFiles(
  userId: string,
  projectId: string,
  files: Record<string, string>
) {
  try {
    const uploadPromises = Object.entries(files).map(([filename, content]) => {
      // Remove leading slash from filename
      const cleanFilename = filename.startsWith("/") ? filename.slice(1) : filename;
      const path = `${userId}/${projectId}/${cleanFilename}`;

      return supabase.storage
        .from(BUCKET_NAME)
        .upload(path, content, {
          contentType: "text/plain",
          upsert: true,
        });
    });

    const results = await Promise.all(uploadPromises);

    const errors = results.filter((r) => r.error);
    if (errors.length > 0) {
      console.error("Failed to upload some files:", errors);
      return {
        success: false,
        message: "Failed to upload some files",
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error("Failed to upload project files:", error);
    return {
      success: false,
      message: "Failed to upload project files",
    };
  }
}

/**
 * Get all files for a project from Supabase Storage
 */
export async function getProjectFiles(userId: string, projectId: string) {
  try {
    const path = `${userId}/${projectId}`;

    // List all files in the project directory
    const { data: fileList, error: listError } = await supabase.storage
      .from(BUCKET_NAME)
      .list(path);

    if (listError) {
      console.error("Failed to list files:", listError);
      return {
        success: false,
        message: "Failed to list files",
        files: {},
      };
    }

    if (!fileList || fileList.length === 0) {
      return {
        success: true,
        files: {},
      };
    }

    // Download all files
    const downloadPromises = fileList.map(async (file) => {
      const filePath = `${path}/${file.name}`;
      const { data, error } = await supabase.storage
        .from(BUCKET_NAME)
        .download(filePath);

      if (error) {
        console.error(`Failed to download ${file.name}:`, error);
        return null;
      }

      const content = await data.text();
      return { filename: `/${file.name}`, content };
    });

    const results = await Promise.all(downloadPromises);
    const files: Record<string, string> = {};

    results.forEach((result) => {
      if (result) {
        files[result.filename] = result.content;
      }
    });

    return {
      success: true,
      files,
    };
  } catch (error) {
    console.error("Failed to get project files:", error);
    return {
      success: false,
      message: "Failed to get project files",
      files: {},
    };
  }
}

/**
 * Update a single file in Supabase Storage
 */
export async function updateProjectFile(
  userId: string,
  projectId: string,
  filename: string,
  content: string
) {
  try {
    const cleanFilename = filename.startsWith("/") ? filename.slice(1) : filename;
    const path = `${userId}/${projectId}/${cleanFilename}`;

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(path, content, {
        contentType: "text/plain",
        upsert: true,
      });

    if (error) {
      console.error("Failed to update file:", error);
      return {
        success: false,
        message: "Failed to update file",
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error("Failed to update project file:", error);
    return {
      success: false,
      message: "Failed to update project file",
    };
  }
}

/**
 * Delete all files for a project from Supabase Storage
 */
export async function deleteProjectFiles(userId: string, projectId: string) {
  try {
    const path = `${userId}/${projectId}`;

    // List all files in the project directory
    const { data: fileList, error: listError } = await supabase.storage
      .from(BUCKET_NAME)
      .list(path);

    if (listError) {
      console.error("Failed to list files for deletion:", listError);
      return {
        success: false,
        message: "Failed to list files for deletion",
      };
    }

    if (!fileList || fileList.length === 0) {
      return {
        success: true,
      };
    }

    // Delete all files
    const filePaths = fileList.map((file) => `${path}/${file.name}`);
    const { error: deleteError } = await supabase.storage
      .from(BUCKET_NAME)
      .remove(filePaths);

    if (deleteError) {
      console.error("Failed to delete files:", deleteError);
      return {
        success: false,
        message: "Failed to delete files",
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error("Failed to delete project files:", error);
    return {
      success: false,
      message: "Failed to delete project files",
    };
  }
}
