"use client";

import { useTamboThreadInput, useTamboThread } from "@tambo-ai/react";
import { useFileUpload } from "@/contexts/file-upload-context";
import { useParams } from "next/navigation";
import * as React from "react";
import { createProject, getProject } from "@/actions/project";

/**
 * Handles submitting a pending message from the home page.
 * Reads from sessionStorage and auto-submits when the project page loads.
 */
export const PendingMessageHandler = (props: { userId: string }) => {
  const params = useParams();
  const { submit, setValue } = useTamboThreadInput();
  const { thread, generateThreadName } = useTamboThread();
  const { images, clearImages } = useFileUpload();
  const hasSubmitted = React.useRef(false);
  const hasCreatedProject = React.useRef(false);
  const hasGeneratedName = React.useRef(false);

  // Create project in database after first message submission (only if it doesn't exist)
  React.useEffect(() => {
    if (hasCreatedProject.current || !thread?.id) return;

    const projectId = params?.projectId as string;
    if (!projectId) return;

    // Wait for thread to have at least one message
    if (!thread.messages || thread.messages.length === 0) return;

    hasCreatedProject.current = true;

    // Check if project exists first, then create if needed
    getProject(projectId)
      .then((existingResult) => {
        if (existingResult.success) {
          // Project already exists
          return;
        }

        // Project doesn't exist, create it
        return createProject(props.userId, projectId)
          .then((result) => {
            if (!result.success) {
              console.error("[PendingMessageHandler] Failed to create project:", result.message);
            }
          });
      })
      .catch((error) => {
        console.error("[PendingMessageHandler] Error handling project creation:", error);
      });
  }, [thread?.id, thread?.messages, thread?.name, params, props.userId]);

  // Auto-generate thread name after first message
  React.useEffect(() => {
    if (hasGeneratedName.current || !thread?.id) return;

    // Wait for at least one message and no existing name
    if (!thread.messages || thread.messages.length === 0 || thread.name) return;

    hasGeneratedName.current = true;

    // Generate AI thread name
    generateThreadName(thread.id)
      .catch((error) => {
        console.error("[PendingMessageHandler] Failed to generate thread name:", error);
      });
  }, [thread?.id, thread?.messages, thread?.name, generateThreadName]);

  React.useEffect(() => {
    // Only run once when component mounts
    if (hasSubmitted.current) return;

    const projectId = params?.projectId as string;
    if (!projectId) return;

    // Check for pending message
    try {
      const pendingData = sessionStorage.getItem("pending-message");
      if (!pendingData) return;

      const pending = JSON.parse(pendingData);

      // Verify this message is for this project
      if (pending.projectId !== projectId) return;

      // Clear from storage immediately to prevent resubmission
      sessionStorage.removeItem("pending-message");
      hasSubmitted.current = true;

      // Set the value and submit
      setValue(pending.message);

      // Submit after a brief delay to ensure TamboProvider is ready
      setTimeout(async () => {
        await submit({ streamResponse: true });

        // Clear the input and images after submission
        setValue("");
        if (images.length > 0) {
          clearImages();
        }
      }, 100);
    } catch (error) {
      console.error("[PendingMessageHandler] Error handling pending message:", error);
      sessionStorage.removeItem("pending-message");
    }
  }, [params, submit, setValue, images, clearImages]);

  return null;
};
