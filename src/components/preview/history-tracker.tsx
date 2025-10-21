"use client";

import { useEffect, useRef } from "react";
import { useSandpack } from "@codesandbox/sandpack-react";
import { useHistory } from "@/components/history-context";

export const HistoryTracker = () => {
  const { sandpack } = useSandpack();
  const { addSnapshot, disableTracking } = useHistory();
  const previousFilesRef = useRef(sandpack.files);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!initializedRef.current) {
      const allFiles = Object.keys(sandpack.files);
      addSnapshot(sandpack.files, allFiles, "Initial version");
      initializedRef.current = true;
    }
  }, [sandpack.files, addSnapshot]);

  useEffect(() => {
    if (disableTracking) {
      return;
    }

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      const currentFiles = sandpack.files;
      const previousFiles = previousFilesRef.current;

      const changedFiles: string[] = [];

      Object.keys(currentFiles).forEach((filePath) => {
        const currentContent = currentFiles[filePath]?.code;
        const previousContent = previousFiles[filePath]?.code;

        if (currentContent !== previousContent) {
          changedFiles.push(filePath);
        }
      });

      if (changedFiles.length > 0) {
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
  }, [sandpack.files, addSnapshot, disableTracking]);

  return null;
};
