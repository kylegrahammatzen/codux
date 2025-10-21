"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SnapshotItem } from "@/components/chat/history/snapshot-item";
import { useHistory } from "@/components/history-context";
import { useSandpack } from "@codesandbox/sandpack-react";
import { Clock, X } from "lucide-react";

export const HistoryPanel = () => {
  const { snapshots, restoreSnapshot } = useHistory();
  const { sandpack } = useSandpack();
  const [previewingId, setPreviewingId] = useState<string | null>(null);

  const handlePreview = (id: string) => {
    const files = restoreSnapshot(id);
    if (files) {
      Object.keys(files).forEach((filePath) => {
        const fileContent = files[filePath];
        if (fileContent !== undefined) {
          sandpack.updateFile(filePath, fileContent);
        }
      });
      setPreviewingId(id);
    }
  };

  const handleRestore = (id: string) => {
    const files = restoreSnapshot(id);
    if (files) {
      Object.keys(files).forEach((filePath) => {
        const fileContent = files[filePath];
        if (fileContent !== undefined) {
          sandpack.updateFile(filePath, fileContent);
        }
      });
      setPreviewingId(null);
    }
  };

  const exitPreview = () => {
    if (snapshots.length > 0) {
      handleRestore(snapshots[0].id);
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHr = Math.floor(diffMin / 60);

    if (diffSec < 60) return "just now";
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
          {previewingId && (
            <div className="flex items-center justify-between p-2 bg-blue-50 border-b border-blue-200">
              <div className="flex items-center gap-2">
                <Clock className="size-4 text-blue-600" />
                <span className="text-sm text-blue-900">Previewing version</span>
              </div>
              <Button variant="ghost" size="sm" onClick={exitPreview}>
                <X className="size-4 mr-1" />
                Exit Preview
              </Button>
            </div>
          )}
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
                  onPreview={() => handlePreview(snapshot.id)}
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
