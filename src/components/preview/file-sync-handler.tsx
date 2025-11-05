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

    const lastMessage = messages[messages.length - 1];
    if (lastMessage.id === lastProcessedMessageId.current) return;

    const toolRequest = lastMessage.toolCallRequest ?? lastMessage.component?.toolCallRequest;
    if (!toolRequest || toolRequest.toolName !== "update_project_files") return;

    const parameters = toolRequest.parameters;
    if (!parameters || parameters.length === 0) return;

    const filesParam = parameters[0];
    if (!filesParam?.parameterValue) return;

    try {
      let files = filesParam.parameterValue;

      if (typeof files === 'string') {
        files = JSON.parse(files);
      }

      if (!Array.isArray(files)) return;

      lastProcessedMessageId.current = lastMessage.id;

      files.forEach(({ path, content }: { path: string; content: string }) => {
        if (path && content !== undefined) {
          sandpack.updateFile(path, content);
        }
      });
    } catch {
      // Ignore parsing errors
    }
  }, [thread?.messages, sandpack]);

  return null;
};
