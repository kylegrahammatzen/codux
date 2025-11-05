"use client";

import { useSandpack } from "@codesandbox/sandpack-react";
import { useTambo } from "@tambo-ai/react";
import * as React from "react";

type FileSyncHandlerProps = {
  userId?: string;
  projectId?: string;
};

export const FileSyncHandler = (props: FileSyncHandlerProps) => {
  const { sandpack } = useSandpack();
  const { thread } = useTambo();
  const lastProcessedMessageId = React.useRef<string | null>(null);

  // Monitor thread for file update tool calls
  React.useEffect(() => {
    if (!thread?.messages) return;

    const messages = thread.messages;
    if (messages.length === 0) return;

    // Find the last assistant message with update_project_files tool
    const lastMessage = messages[messages.length - 1];
    if (lastMessage.id === lastProcessedMessageId.current) return;

    // Check if this message used the update_project_files tool
    const toolRequest = lastMessage.toolCallRequest ?? lastMessage.component?.toolCallRequest;
    if (!toolRequest || toolRequest.toolName !== "update_project_files") return;

    console.log("[FileSyncHandler] Found update_project_files tool call");

    // Extract files from tool parameters
    const parameters = toolRequest.parameters;
    if (!parameters || parameters.length === 0) return;

    // The first parameter should be the array of files
    const filesParam = parameters[0];
    if (!filesParam?.parameterValue) return;

    try {
      // Parse the parameter value (should be JSON array of {path, content})
      const files = JSON.parse(filesParam.parameterValue);

      if (!Array.isArray(files)) {
        console.error("[FileSyncHandler] Files parameter is not an array");
        return;
      }

      console.log("[FileSyncHandler] Updating Sandpack with files:", files.map(f => f.path));
      lastProcessedMessageId.current = lastMessage.id;

      // Update each file in Sandpack immediately
      files.forEach(({ path, content }: { path: string; content: string }) => {
        if (path && content !== undefined) {
          console.log(`[FileSyncHandler] Updating ${path} (${content.length} chars)`);
          sandpack.updateFile(path, content);
        }
      });

      console.log("[FileSyncHandler] Sandpack files updated successfully");
    } catch (error) {
      console.error("[FileSyncHandler] Failed to parse tool parameters:", error);
    }
  }, [thread?.messages, sandpack]);

  return null;
};
