"use client";

import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SnapshotItem } from "@/components/chat/history/snapshot-item";
import { useHistory } from "@/components/history-context";
import { useProjectContext } from "@/components/project-context";
import { useSandpack } from "@codesandbox/sandpack-react";
import { Clock } from "lucide-react";

export const HistoryPanel = () => {
  const { snapshots, restoreSnapshot, setDisableTracking, clearSnapshotsAfter } = useHistory();
  const { setEditorReadOnly, setIsPreviewing } = useProjectContext();
  const { sandpack } = useSandpack();
  const [previewingId, setPreviewingId] = useState<string | null>(null);
  const [, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((t) => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handlePreview = (id: string) => {
    const files = restoreSnapshot(id);
    if (files) {
      setDisableTracking(true);
      Object.keys(files).forEach((filePath) => {
        const fileContent = files[filePath] as any;
        if (fileContent !== undefined) {
          sandpack.updateFile(filePath, typeof fileContent === 'string' ? fileContent : fileContent.code);
        }
      });
      setEditorReadOnly(true);
      setIsPreviewing(true);
      setPreviewingId(id);
    }
  };

  const handleTogglePreview = (id: string) => {
    if (previewingId === id) {
      if (snapshots.length > 0) {
        const files = restoreSnapshot(snapshots[0].id);
        if (files) {
          Object.keys(files).forEach((filePath) => {
            const fileContent = files[filePath] as any;
            if (fileContent !== undefined) {
              sandpack.updateFile(filePath, typeof fileContent === 'string' ? fileContent : fileContent.code);
            }
          });
        }
        setEditorReadOnly(false);
        setIsPreviewing(false);
        setPreviewingId(null);
        setDisableTracking(false);
      }
    } else {
      handlePreview(id);
    }
  };

  const handleRestore = (id: string) => {
    const files = restoreSnapshot(id);
    if (files) {
      Object.keys(files).forEach((filePath) => {
        const fileContent = files[filePath] as any;
        if (fileContent !== undefined) {
          sandpack.updateFile(filePath, typeof fileContent === 'string' ? fileContent : fileContent.code);
        }
      });
      clearSnapshotsAfter(id);
      setEditorReadOnly(false);
      setIsPreviewing(false);
      setPreviewingId(null);
      setDisableTracking(false);
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHr = Math.floor(diffMin / 60);

    if (diffSec < 60) return `${diffSec}s ago`;
    if (diffMin < 60) return `${diffMin}m ago`;
    if (diffHr < 24) return `${diffHr}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {snapshots.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-gray-400">
          <Clock className="size-12 mb-2" />
          <p className="text-sm">No version history yet</p>
          <p className="text-xs">Changes will be saved automatically</p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between p-2">
            <span className="text-xs text-gray-500">{snapshots.length} snapshots</span>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-2 pt-0 space-y-2">
              {snapshots.map((snapshot, index) => (
                <SnapshotItem
                  key={snapshot.id}
                  snapshot={snapshot}
                  isLatest={index === 0}
                  isPreviewing={previewingId === snapshot.id}
                  isInPreviewMode={previewingId !== null && previewingId !== snapshot.id}
                  onTogglePreview={() => handleTogglePreview(snapshot.id)}
                  onRestore={() => handleRestore(snapshot.id)}
                  formatTimestamp={formatTimestamp}
                />
              ))}
            </div>
          </ScrollArea>
        </>
      )}
    </div>
  );
};
