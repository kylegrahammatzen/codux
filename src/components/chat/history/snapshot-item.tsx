"use client";

import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { SnapshotActions } from "@/components/chat/history/snapshot-actions";
import { Clock, FileText, ChevronRight } from "lucide-react";
import type { Snapshot } from "@/components/history-context";

type SnapshotItemProps = {
  snapshot: Snapshot;
  isLatest: boolean;
  isPreviewing: boolean;
  isInPreviewMode: boolean;
  onPreview: () => void;
  onRestore: () => void;
  formatTimestamp: (date: Date) => string;
};

export const SnapshotItem = (props: SnapshotItemProps) => {
  return (
    <Collapsible>
      <div
        className={`border rounded-lg overflow-hidden transition-colors ${props.isPreviewing
          ? "bg-blue-50 border-blue-300"
          : props.isInPreviewMode
            ? "bg-gray-100 opacity-60"
            : "bg-gray-50"
          }`}
      >
        <div className="flex items-center justify-between p-2">
          <CollapsibleTrigger className="flex items-center gap-2 flex-1 text-left [&[data-state=open]>svg]:rotate-90">
            <ChevronRight className="size-4 transition-transform duration-200" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {props.snapshot.message || "Untitled Change"}
              </p>
              <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                <Clock className="size-3" />
                <span>{props.formatTimestamp(props.snapshot.timestamp)}</span>
              </div>
            </div>
          </CollapsibleTrigger>
          {!props.isLatest && !props.isInPreviewMode && (
            <SnapshotActions
              onPreview={props.onPreview}
              onRestore={props.onRestore}
            />
          )}
        </div>

        <CollapsibleContent>
          <div className="border-t p-2 bg-white">
            <p className="text-xs font-medium text-gray-600 mb-2">
              Files ({props.snapshot.changedFiles.length})
            </p>
            {props.snapshot.changedFiles.map((file) => (
              <div
                key={file}
                className="flex items-center gap-2 text-xs p-2 hover:bg-gray-100 rounded transition-colors"
              >
                <FileText className="size-3 text-muted-foreground" />
                <span className="truncate">{file}</span>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
};
