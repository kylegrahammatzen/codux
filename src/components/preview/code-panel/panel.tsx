"use client";

import { useProjectContext } from "@/components/project-context";
import { useSandpackContext } from "@/components/sandpack-context";
import { Button } from "@/components/ui/button";
import { ArrowLeftToLine, Copy, Download } from "lucide-react";
import { FileTree } from "./file-tree";
import { SandpackCodeEditor } from "@codesandbox/sandpack-react";

export const CodePanel = () => {
  const { showFileTree, setShowFileTree } = useProjectContext();
  const { files, activeFile } = useSandpackContext();

  const toggleFileTree = () => {
    setShowFileTree(!showFileTree);
  };

  const getFileName = (path: string) => {
    return path.split("/").pop() || path;
  };

  const handleCopy = () => {
    if (activeFile && files[activeFile]) {
      navigator.clipboard.writeText(files[activeFile].code);
    }
  };

  const handleDownload = () => {
    if (activeFile && files[activeFile]) {
      const blob = new Blob([files[activeFile].code], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = getFileName(activeFile);
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="flex flex-1 min-h-0 relative">
      <div
        className="flex-shrink-0 transition-all duration-300"
        style={{
          width: showFileTree ? "16rem" : 0,
          overflow: "hidden",
          transitionTimingFunction: "cubic-bezier(.165, .84, .44, 1)"
        }}
      >
        <FileTree />
      </div>

      <div className="flex-1 bg-white flex flex-col">
        <div className="h-10 border-b bg-white flex items-center justify-between px-2">
          <div className="flex items-center gap-1 text-sm">
            {activeFile ? (
              <>
                <span className="text-gray-600">{activeFile.split("/").slice(0, -1).join("/")}</span>
                {activeFile.split("/").length > 2 && <span className="text-gray-400">/</span>}
                <span className="text-gray-900 font-medium">{getFileName(activeFile)}</span>
              </>
            ) : (
              <span className="text-gray-400">No file selected</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon-sm" onClick={handleCopy} disabled={!activeFile}>
              <Copy className="size-4" />
            </Button>
            <Button variant="ghost" size="icon-sm" onClick={handleDownload} disabled={!activeFile}>
              <Download className="size-4" />
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          {activeFile ? (
            <SandpackCodeEditor
              showLineNumbers
              showInlineErrors
              style={{ height: "100%" }}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-400 text-sm">Select a file to edit</p>
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-2 left-2">
        <Button variant="outline" size="icon-sm" className="bg-white cursor-pointer" onClick={toggleFileTree}>
          <div className="transition-transform duration-200" style={{ transform: showFileTree ? "scaleX(1)" : "scaleX(-1)" }}>
            <ArrowLeftToLine className="size-4" />
          </div>
        </Button>
      </div>
    </div>
  );
};
