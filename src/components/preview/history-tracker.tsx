"use client";

import { useEffect, useRef } from "react";
import { useSandpack } from "@codesandbox/sandpack-react";
import { useHistory } from "@/components/history-context";

export const HistoryTracker = () => {
  const { sandpack } = useSandpack();
  const { addSnapshot } = useHistory();
  const previousFilesRef = useRef(sandpack.files);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const initializedRef = useRef(false);

  // Save initial version on mount
  useEffect(() => {
    if (!initializedRef.current) {
      const allFiles = Object.keys(sandpack.files);
      addSnapshot(sandpack.files, allFiles, "Initial version");
      initializedRef.current = true;
    }
  }, [sandpack.files, addSnapshot]);

  useEffect(() => {
    // Clear any existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Debounce snapshot creation by 2 seconds
    debounceTimerRef.current = setTimeout(() => {
      const currentFiles = sandpack.files;
      const previousFiles = previousFilesRef.current;

      // Check if files actually changed
      const changedFiles: string[] = [];

      Object.keys(currentFiles).forEach((filePath) => {
        const currentContent = currentFiles[filePath]?.code;
        const previousContent = previousFiles[filePath]?.code;

        if (currentContent !== previousContent) {
          changedFiles.push(filePath);
        }
      });

      // Only create snapshot if there are actual changes
      if (changedFiles.length > 0) {
        // Generate a simple message
        const fileNames = changedFiles.map((path) => path.split('/').pop()).join(', ');
        const message = `Updated ${fileNames}`;

        addSnapshot(currentFiles, changedFiles, message);
        previousFilesRef.current = currentFiles;
      }
    }, 2000);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [sandpack.files, addSnapshot]);

  return null;
};
