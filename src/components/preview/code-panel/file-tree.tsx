"use client";

import { useSandpackContext } from "@/components/sandpack-context";
import { FileItem } from "./file-item";
import { FolderItem } from "./folder-item";

type FileTreeNode = {
  name: string;
  path: string;
  type: "file" | "folder";
  children?: FileTreeNode[];
};

export const FileTree = () => {
  const { files, activeFile, setActiveFile } = useSandpackContext();

  // Build tree structure from flat file list
  const buildTree = (filePaths: string[]): FileTreeNode[] => {
    const root: Record<string, FileTreeNode> = {};

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

        if (!isFile) {
          currentLevel = currentLevel[part].children as Record<string, FileTreeNode>;
        }
      });
    });

    // Convert to array and sort: folders first, then files
    const toArray = (obj: Record<string, FileTreeNode>): FileTreeNode[] => {
      return Object.values(obj)
        .map((node) => ({
          ...node,
          children: node.children ? toArray(node.children as Record<string, FileTreeNode>) : undefined,
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

      return (
        <FileItem
          key={node.path}
          name={node.name}
          path={node.path}
          isActive={activeFile === node.path}
          onClick={setActiveFile}
        />
      );
    });
  };

  const tree = buildTree(Object.keys(files));

  return (
    <div className="w-64 bg-gray-50 border-r h-full p-2 overflow-y-auto">
      {renderTree(tree)}
    </div>
  );
};
