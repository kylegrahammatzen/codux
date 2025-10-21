"use client";

import { useState } from "react";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { SnapshotActions } from "@/components/chat/history/snapshot-actions";
import { FileItem } from "@/components/preview/code-panel/file-item";
import { FolderItem } from "@/components/preview/code-panel/folder-item";
import { Clock, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
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

type FileTreeNode = {
  name: string;
  path: string;
  type: "file" | "folder";
  children?: FileTreeNode[];
};

type BuildNode = {
  name: string;
  path: string;
  type: "file" | "folder";
  children?: Record<string, BuildNode>;
};

export const SnapshotItem = (props: SnapshotItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const buildTree = (filePaths: string[]): FileTreeNode[] => {
    const root: Record<string, BuildNode> = {};

    filePaths.forEach((path) => {
      const parts = path.split("/").filter(Boolean);
      let currentLevel = root;

      parts.forEach((part, index) => {
        const isFile = index === parts.length - 1;
        const currentPath = "/" + parts.slice(0, index + 1).join("/");

        if (!currentLevel[part]) {
          currentLevel[part] = {
            name: part,
            path: currentPath,
            type: isFile ? "file" : "folder",
            children: isFile ? undefined : {},
          };
        }

        if (!isFile && currentLevel[part].children) {
          currentLevel = currentLevel[part].children!;
        }
      });
    });

    const toArray = (obj: Record<string, BuildNode>): FileTreeNode[] => {
      return Object.values(obj)
        .map((node) => ({
          name: node.name,
          path: node.path,
          type: node.type,
          children: node.children ? toArray(node.children) : undefined,
        }))
        .sort((a, b) => {
          if (a.type === b.type) return a.name.localeCompare(b.name);
          return a.type === "folder" ? -1 : 1;
        });
    };

    return toArray(root);
  };

  const renderTree = (nodes: FileTreeNode[]): React.ReactNode => {
    return nodes.map((node) => {
      if (node.type === "folder") {
        return (
          <FolderItem key={node.path} name={node.name} defaultOpen={true}>
            {node.children && renderTree(node.children)}
          </FolderItem>
        );
      }

      return <FileItem key={node.path} name={node.name} path={node.path} />;
    });
  };

  const tree = buildTree(props.snapshot.changedFiles);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div
        className={`border rounded-lg overflow-hidden transition-colors ${
          props.isPreviewing
            ? "bg-blue-50 border-blue-300"
            : props.isInPreviewMode
            ? "bg-gray-100 opacity-60"
            : "bg-gray-50"
        }`}
      >
        <div className="flex items-center justify-between p-2">
          <CollapsibleTrigger className="flex items-center gap-2 flex-1 text-left">
            <ChevronDown
              className={cn(
                "size-4 transition-transform duration-200",
                !isOpen && "-rotate-90"
              )}
            />
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
          {!props.isLatest && (props.isPreviewing || !props.isInPreviewMode) && (
            <SnapshotActions
              onPreview={props.onPreview}
              onRestore={props.onRestore}
            />
          )}
        </div>

        <CollapsibleContent>
          <div className="border-t p-2 bg-white space-y-0.5">{renderTree(tree)}</div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
};
