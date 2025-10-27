"use client";

import { useProjectContext } from "@/components/project-context";
import { Button } from "@/components/ui/button";
import { ArrowLeftToLine } from "lucide-react";
import { FileTree } from "./file-tree";
import { CodeEditor } from "./code-editor";
import { Header } from "./header";

export const CodePanel = () => {
  const { showFileTree, setShowFileTree } = useProjectContext();

  const toggleFileTree = () => {
    setShowFileTree(!showFileTree);
  };

  return (
    <div className="flex w-full h-full relative">
      <FileTree />

      <div className="flex flex-col flex-1 h-full min-w-0 overflow-hidden">
        <Header />

        <div className="flex-1 min-h-0 w-full">
          <CodeEditor />
        </div>
      </div>

      <div className="absolute bottom-2 left-2">
        <Button variant="outline" size="icon-sm" className="!bg-card cursor-pointer" onClick={toggleFileTree}>
          <div className="transition-transform duration-200" style={{ transform: showFileTree ? "scaleX(1)" : "scaleX(-1)" }}>
            <ArrowLeftToLine className="size-4" />
          </div>
        </Button>
      </div>
    </div>
  );
};
