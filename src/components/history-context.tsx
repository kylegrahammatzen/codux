"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import type { ProjectFiles } from "@/components/project-context";

export type Snapshot = {
  id: string;
  timestamp: Date;
  files: ProjectFiles;
  changedFiles: string[];
  message?: string;
};

type HistoryContextType = {
  snapshots: Snapshot[];
  addSnapshot: (files: ProjectFiles, changedFiles: string[], message?: string) => void;
  restoreSnapshot: (id: string) => ProjectFiles | null;
  clearHistory: () => void;
  disableTracking: boolean;
  setDisableTracking: (disabled: boolean) => void;
};

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

type HistoryProviderProps = {
  children: ReactNode;
  maxSnapshots?: number;
};

export const HistoryProvider = (props: HistoryProviderProps) => {
  const maxSnapshots = props.maxSnapshots || 50;
  const [snapshots, setSnapshots] = useState<Snapshot[]>([]);
  const [disableTracking, setDisableTracking] = useState(false);

  const addSnapshot = useCallback((files: ProjectFiles, changedFiles: string[], message?: string) => {
    const snapshot: Snapshot = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`,
      timestamp: new Date(),
      files: { ...files },
      changedFiles,
      message,
    };

    setSnapshots((prev) => {
      const newSnapshots = [snapshot, ...prev];
      return newSnapshots.slice(0, maxSnapshots);
    });
  }, [maxSnapshots]);

  const restoreSnapshot = useCallback((id: string): ProjectFiles | null => {
    const snapshot = snapshots.find((s) => s.id === id);
    return snapshot ? snapshot.files : null;
  }, [snapshots]);

  const clearHistory = useCallback(() => {
    setSnapshots([]);
  }, []);

  return (
    <HistoryContext.Provider
      value={{
        snapshots,
        addSnapshot,
        restoreSnapshot,
        clearHistory,
        disableTracking,
        setDisableTracking,
      }}
    >
      {props.children}
    </HistoryContext.Provider>
  );
};

export const useHistory = () => {
  const context = useContext(HistoryContext);
  if (context === undefined) {
    throw new Error("useHistory must be used within a HistoryProvider");
  }
  return context;
};
