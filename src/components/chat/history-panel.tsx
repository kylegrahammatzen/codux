"use client";

import { Button } from "@/components/ui/button";
import { useHistory } from "@/components/history-context";
import { useSandpack } from "@codesandbox/sandpack-react";
import { Clock, FileText, X } from "lucide-react";

type HistoryPanelProps = {
  onClose: () => void;
};

export const HistoryPanel = (props: HistoryPanelProps) => {
  const { snapshots, restoreSnapshot, clearHistory } = useHistory();
  const { sandpack } = useSandpack();

  const handleRestore = (id: string) => {
    const files = restoreSnapshot(id);
    if (files) {
      // Restore all files
      Object.keys(files).forEach((filePath) => {
        const fileContent = files[filePath]?.code;
        if (fileContent !== undefined) {
          sandpack.updateFile(filePath, fileContent);
        }
      });
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
    <div className="absolute inset-0 bg-white border-l flex flex-col z-10">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b">
        <div className="flex items-center gap-2">
          <Clock className="size-4" />
          <span className="font-medium text-sm">Version History</span>
        </div>
        <div className="flex items-center gap-1">
          {snapshots.length > 0 && (
            <Button variant="ghost" size="sm" onClick={clearHistory}>
              Clear All
            </Button>
          )}
          <Button variant="ghost" size="icon-sm" onClick={props.onClose}>
            <X className="size-4" />
          </Button>
        </div>
      </div>

      {/* Timeline */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {snapshots.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <Clock className="size-12 mb-2" />
            <p className="text-sm">No version history yet</p>
            <p className="text-xs">Changes will be saved automatically</p>
          </div>
        ) : (
          snapshots.map((snapshot) => (
            <div
              key={snapshot.id}
              className="border rounded-lg p-3 hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => handleRestore(snapshot.id)}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {snapshot.message || "Untitled Change"}
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                    <Clock className="size-3" />
                    <span>{formatTimestamp(snapshot.timestamp)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {snapshot.changedFiles.map((file) => (
                    <div
                      key={file}
                      className="flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded"
                    >
                      <FileText className="size-3" />
                      <span className="truncate max-w-[60px]">
                        {file.split('/').pop()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
