"use client";

import { useSandpack } from "@codesandbox/sandpack-react";
import { useTambo } from "@tambo-ai/react";
import { getProjectFiles } from "@/actions/storage";
import * as React from "react";

type FileSyncHandlerProps = {
  userId?: string;
  projectId?: string;
};

export const FileSyncHandler = (props: FileSyncHandlerProps) => {
  const { sandpack } = useSandpack();
  const { thread } = useTambo();
  const lastProcessedMessageId = React.useRef<string | null>(null);

  // Monitor thread for file update tool completions
  React.useEffect(() => {
    if (!thread?.messages || !props.userId || !props.projectId) return;

    const messages = thread.messages;
    if (messages.length === 0) return;

    // Find the last assistant message with update_project_files tool
    const lastMessage = messages[messages.length - 1];
    if (lastMessage.id === lastProcessedMessageId.current) return;

    // Check if this message used the update_project_files tool
    const toolRequest = lastMessage.toolCallRequest ?? lastMessage.component?.toolCallRequest;
    if (!toolRequest || toolRequest.toolName !== "update_project_files") return;

    // Look for tool response after the assistant message
    let toolResponse = null;
    for (let i = messages.length - 1; i >= 0; i--) {
      const msg = messages[i];
      if (msg.id === lastMessage.id) break;
      if (msg.role === "tool") {
        toolResponse = msg;
        break;
      }
    }

    // If we have a tool response, check if it was successful
    if (toolResponse?.content) {
      try {
        const content = typeof toolResponse.content === 'string'
          ? toolResponse.content
          : Array.isArray(toolResponse.content)
            ? toolResponse.content.map(item => item.type === 'text' ? item.text : '').join('')
            : '';

        const parsed = JSON.parse(content);
        if (parsed.success) {
          console.log("[FileSyncHandler] File update tool succeeded, waiting before refetch");
          lastProcessedMessageId.current = lastMessage.id;

          // Wait a bit for storage to fully commit
          setTimeout(() => {
            console.log("[FileSyncHandler] Refetching files from storage");
            getProjectFiles(props.userId, props.projectId).then((result) => {
              if (result.success && Object.keys(result.files).length > 0) {
                console.log("[FileSyncHandler] Files refetched:", Object.keys(result.files));

                // Update each file in Sandpack
                Object.entries(result.files).forEach(([path, content]) => {
                  console.log(`[FileSyncHandler] Updating ${path} (${content.length} chars)`);
                  sandpack.updateFile(path, content);
                });

                console.log("[FileSyncHandler] Sandpack files updated successfully");
              } else {
                console.warn("[FileSyncHandler] No files returned from storage");
              }
            }).catch((error) => {
              console.error("[FileSyncHandler] Failed to refetch files:", error);
            });
          }, 500);
        }
      } catch (error) {
        // Not JSON or parse failed, ignore
      }
    }
  }, [thread?.messages, props.userId, props.projectId, sandpack]);

  return null;
};
