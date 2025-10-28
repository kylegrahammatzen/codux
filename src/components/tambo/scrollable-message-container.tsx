"use client";

import { cn } from "@/lib/utils";
import { useTambo } from "@tambo-ai/react";
import * as React from "react";

/**
 * Props for the ScrollableMessageContainer component
 */
export type ScrollableMessageContainerProps =
  React.HTMLAttributes<HTMLDivElement>;

/**
 * A scrollable container for message content with auto-scroll functionality.
 * Used across message thread components for consistent scrolling behavior.
 *
 * @example
 * ```tsx
 * <ScrollableMessageContainer>
 *   <ThreadContent variant="default">
 *     <ThreadContentMessages />
 *   </ThreadContent>
 * </ScrollableMessageContainer>
 * ```
 */
export const ScrollableMessageContainer = React.forwardRef<
  HTMLDivElement,
  ScrollableMessageContainerProps
>(({ className, children, ...props }, forwardedRef) => {
  const scrollViewportRef = React.useRef<HTMLDivElement>(null);
  const { thread } = useTambo();
  const [shouldAutoscroll, setShouldAutoscroll] = React.useState(true);
  const lastScrollTopRef = React.useRef(0);

  // Merge refs
  React.useImperativeHandle(forwardedRef, () => scrollViewportRef.current!, []);

  // Create a dependency that represents all content that should trigger autoscroll
  const messagesContent = React.useMemo(() => {
    if (!thread?.messages) return null;

    return thread.messages.map((message) => ({
      id: message.id,
      content: message.content,
      tool_calls: message.tool_calls,
      component: message.component,
      reasoning: message.reasoning,
      componentState: message.componentState,
    }));
  }, [thread?.messages]);

  const generationStage = thread?.generationStage ?? "IDLE";

  // Handle scroll events to detect user scrolling
  const handleScroll = React.useCallback(() => {
    if (!scrollViewportRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollViewportRef.current;
    const isAtBottom = Math.abs(scrollHeight - scrollTop - clientHeight) < 8;

    if (scrollTop < lastScrollTopRef.current) {
      setShouldAutoscroll(false);
    } else if (isAtBottom) {
      setShouldAutoscroll(true);
    }

    lastScrollTopRef.current = scrollTop;
  }, []);

  // Auto-scroll to bottom when message content changes
  React.useEffect(() => {
    if (scrollViewportRef.current && messagesContent && shouldAutoscroll) {
      const scroll = () => {
        if (scrollViewportRef.current) {
          scrollViewportRef.current.scrollTo({
            top: scrollViewportRef.current.scrollHeight,
            behavior: "smooth",
          });
        }
      };

      if (generationStage === "STREAMING_RESPONSE") {
        requestAnimationFrame(scroll);
      } else {
        const timeoutId = setTimeout(scroll, 50);
        return () => clearTimeout(timeoutId);
      }
    }
  }, [messagesContent, generationStage, shouldAutoscroll]);

  return (
    <div
      ref={scrollViewportRef}
      onScroll={handleScroll}
      className={cn("flex-1 max-w-md overflow-y-scroll", className)}
      {...props}
    >
      {children}
    </div>
  );
});
ScrollableMessageContainer.displayName = "ScrollableMessageContainer";
