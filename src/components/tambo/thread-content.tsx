"use client";

import {
  Message,
  MessageContent,
  MessageImages,
  MessageRenderedComponentArea,
  ReasoningInfo,
  ToolcallInfo,
} from "@/components/tambo/message";
import { cn } from "@/lib/utils";
import { type TamboThreadMessage, useTambo } from "@tambo-ai/react";
import { Loader2 } from "lucide-react";
import { checkHasContent } from "@/lib/thread-hooks";
import * as React from "react";

/**
 * @typedef ThreadContentContextValue
 * @property {Array} messages - Array of message objects in the thread
 * @property {boolean} isGenerating - Whether a response is being generated
 * @property {string|undefined} generationStage - Current generation stage
 */
interface ThreadContentContextValue {
  messages: TamboThreadMessage[];
  isGenerating: boolean;
  generationStage?: string;
}

/**
 * React Context for sharing thread data among sub-components.
 * @internal
 */
const ThreadContentContext =
  React.createContext<ThreadContentContextValue | null>(null);

/**
 * Hook to access the thread content context.
 * @returns {ThreadContentContextValue} The thread content context value.
 * @throws {Error} If used outside of ThreadContent.
 * @internal
 */
const useThreadContentContext = () => {
  const context = React.useContext(ThreadContentContext);
  if (!context) {
    throw new Error(
      "ThreadContent sub-components must be used within a ThreadContent",
    );
  }
  return context;
};

/**
 * Props for the ThreadContent component.
 * Extends standard HTMLDivElement attributes.
 */
export interface ThreadContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** The child elements to render within the container. */
  children?: React.ReactNode;
}

/**
 * The root container for thread content.
 * It establishes the context for its children using data from the Tambo hook.
 * @component ThreadContent
 * @example
 * ```tsx
 * <ThreadContent variant="solid">
 *   <ThreadContent.Messages />
 * </ThreadContent>
 * ```
 */
const ThreadContent = React.forwardRef<HTMLDivElement, ThreadContentProps>(
  ({ children, className, ...props }, ref) => {
    const { thread, generationStage, isIdle } = useTambo();
    const isGenerating = !isIdle;

    const contextValue = React.useMemo(
      () => ({
        messages: thread?.messages ?? [],
        isGenerating,
        generationStage,
      }),
      [thread?.messages, isGenerating, generationStage],
    );

    return (
      <ThreadContentContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn("w-full", className)}
          data-slot="thread-content-container"
          {...props}
        >
          {children}
        </div>
      </ThreadContentContext.Provider>
    );
  },
);
ThreadContent.displayName = "ThreadContent";

/**
 * Props for the ThreadContentMessages component.
 * Extends standard HTMLDivElement attributes.
 */
export type ThreadContentMessagesProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * Renders the list of messages in the thread.
 * Automatically connects to the context to display messages.
 * @component ThreadContent.Messages
 * @example
 * ```tsx
 * <ThreadContent>
 *   <ThreadContent.Messages />
 * </ThreadContent>
 * ```
 */
const ThreadContentMessages = React.forwardRef<
  HTMLDivElement,
  ThreadContentMessagesProps
>(({ className, ...props }, ref) => {
  const { messages, isGenerating } = useThreadContentContext();

  const filteredMessages = messages.filter(
    (message) =>
      message.role !== "system" &&
      !message.parentMessageId &&
      (message.role !== "assistant" || checkHasContent(message.content)),
  );

  return (
    <div
      ref={ref}
      className={cn("flex flex-col gap-4", className)}
      data-slot="thread-content-messages"
      {...props}
    >
      {filteredMessages.map((message, index) => {
        return (
          <div
            key={
              message.id ??
              `${message.role}-${message.createdAt ?? Date.now()
              }-${message.content?.toString().substring(0, 10)}`
            }
            data-slot="thread-content-item"
            className={cn(
              "flex",
              message.role === "assistant" ? "justify-start" : "justify-end",
            )}
          >
            <Message
              role={message.role === "assistant" ? "assistant" : "user"}
              message={message}
              isLoading={isGenerating && index === filteredMessages.length - 1}
              className="flex flex-col"
            >
              <ReasoningInfo />
              <MessageImages />
              <MessageContent
                className={
                  message.role === "assistant"
                    ? "text-foreground font-sans bg-accent"
                    : "text-foreground font-sans bg-muted"
                }
              />
              <ToolcallInfo />
              <MessageRenderedComponentArea className="w-full" />
            </Message>
          </div>
        );
      })}
      {isGenerating && (
        filteredMessages.length === 0 ||
        filteredMessages[filteredMessages.length - 1]?.role !== "assistant" ||
        !checkHasContent(filteredMessages[filteredMessages.length - 1]?.content)
      ) && (
          <div className="flex justify-start">
            <div className="relative flex items-center gap-2 rounded-md px-4 py-1.5 text-[15px] leading-normal transition-all duration-200 font-normal text-foreground font-sans bg-accent break-words">
              <Loader2 className="w-4 h-4 animate-spin" />
              Thinking...
            </div>
          </div>
        )}
    </div>
  );
});
ThreadContentMessages.displayName = "ThreadContent.Messages";

export { ThreadContent, ThreadContentMessages };
