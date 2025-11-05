"use client";

import { useTamboThread, useTamboThreadList } from "@tambo-ai/react";
import { useEffect, useRef } from "react";

/**
 * Automatically loads the thread for the current contextKey.
 * For project pages, this loads the existing thread (if any) when the page loads.
 */
export function useProjectThread(contextKey: string | null) {
  const { data: threads } = useTamboThreadList({ contextKey: contextKey || undefined });
  const { switchCurrentThread, thread } = useTamboThread();
  const hasLoaded = useRef(false);

  useEffect(() => {
    // Only load once when threads are fetched
    if (!contextKey || !threads?.items?.length || hasLoaded.current) {
      return;
    }

    // Get the first thread for this contextKey (one thread per project)
    const existingThread = threads.items[0];

    // Only switch if we're not already on this thread
    if (existingThread?.id && thread?.id !== existingThread.id) {
      console.log("[useProjectThread] Loading thread:", existingThread.id);
      switchCurrentThread(existingThread.id);
      hasLoaded.current = true;
    }
  }, [threads, contextKey, switchCurrentThread, thread?.id]);
}
