"use client";

import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SnapshotActions } from "@/components/chat/history/snapshot-actions";
import { useHistory } from "@/components/history-context";
import { useSandpack } from "@codesandbox/sandpack-react";
import { Clock, FileText, ChevronRight } from "lucide-react";

export const HistoryPanel = () => {
  const { snapshots, restoreSnapshot, clearHistory } = useHistory();
  const { sandpack } = useSandpack();

  const handleRestore = (id: string) => {
    const files = restoreSnapshot(id);
    if (files) {
      Object.keys(files).forEach((filePath) => {
        const fileContent = files[filePath];
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
    <div className="flex-1 flex flex-col overflow-hidden">
      {snapshots.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-gray-400">
          <Clock className="size-12 mb-2" />
          <p className="text-sm">No version history yet</p>
          <p className="text-xs">Changes will be saved automatically</p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between p-3 pb-2">
            <span className="text-xs text-gray-500">{snapshots.length} snapshots</span>
            {snapshots.length > 0 && (
              <Button variant="ghost" size="sm" onClick={clearHistory}>
                Clear All
              </Button>
            )}
          </div>
          <ScrollArea className="flex-1">
            <div className="p-3 pt-0 space-y-2">
              {snapshots.map((snapshot) => (
              <Collapsible key={snapshot.id}>
                <div className="border rounded-lg overflow-hidden">
                  <div className="flex items-center justify-between p-3 hover:bg-gray-50">
                    <CollapsibleTrigger className="flex items-center gap-2 flex-1 text-left">
                      <ChevronRight className="size-4 transition-transform duration-200 data-[state=open]:rotate-90" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {snapshot.message || "Untitled Change"}
                        </p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                          <Clock className="size-3" />
                          <span>{formatTimestamp(snapshot.timestamp)}</span>
                        </div>
                      </div>
                    </CollapsibleTrigger>
                    <SnapshotActions onRestore={() => handleRestore(snapshot.id)} />
                  </div>

                  <CollapsibleContent>
                    <div className="border-t p-3 bg-gray-50 space-y-1">
                      <p className="text-xs font-medium text-gray-600 mb-2">
                        {snapshot.message === "Initial version"
                          ? `Initial Files (${snapshot.changedFiles.length})`
                          : `Changed Files (${snapshot.changedFiles.length})`}
                      </p>
                      {snapshot.changedFiles.map((file) => (
                        <div
                          key={file}
                          className="flex items-center gap-2 text-xs p-2 bg-white rounded"
                        >
                          <FileText className="size-3 text-muted-foreground" />
                          <span className="truncate">{file}</span>
                        </div>
                      ))}
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>
              ))}
            </div>
          </ScrollArea>
        </>
      )}
    </div>
  );
};
