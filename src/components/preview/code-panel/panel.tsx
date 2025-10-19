"use client";

import { useProjectContext } from "@/components/project-context";
import { useSandpackContext } from "@/components/sandpack-context";
import { Button } from "@/components/ui/button";
import { ArrowLeftToLine, Copy, Download } from "lucide-react";
import { FileTree } from "./file-tree";
import Editor from "@monaco-editor/react";

export const CodePanel = () => {
  const { showFileTree, setShowFileTree } = useProjectContext();
  const { files, activeFile, updateFile } = useSandpackContext();

  const toggleFileTree = () => {
    setShowFileTree(!showFileTree);
  };

  const getFileName = (path: string) => {
    return path.split("/").pop() || path;
  };

  const getFileLanguage = (path: string) => {
    const ext = path.split(".").pop()?.toLowerCase();
    switch (ext) {
      case "ts":
      case "tsx":
        return "typescript";
      case "js":
      case "jsx":
        return "javascript";
      case "css":
        return "css";
      case "json":
        return "json";
      case "html":
        return "html";
      default:
        return "plaintext";
    }
  };

  const handleEditorChange = (value: string | undefined) => {
    if (activeFile && value !== undefined) {
      updateFile(activeFile, value);
    }
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
        {activeFile && (
          <div className="h-10 border-b bg-white flex items-center justify-between px-2">
            <div className="flex items-center gap-1 text-sm">
              <span className="text-gray-600">{activeFile.split("/").slice(0, -1).join("/")}</span>
              {activeFile.split("/").length > 2 && <span className="text-gray-400">/</span>}
              <span className="text-gray-900 font-medium">{getFileName(activeFile)}</span>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon-sm" onClick={handleCopy}>
                <Copy className="size-4" />
              </Button>
              <Button variant="ghost" size="icon-sm" onClick={handleDownload}>
                <Download className="size-4" />
              </Button>
            </div>
          </div>
        )}

        <div className="flex-1 min-h-0">
          {activeFile ? (
            <Editor
              height="100%"
              language={getFileLanguage(activeFile)}
              value={files[activeFile]?.code || ""}
              onChange={handleEditorChange}
              theme="light"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: "on",
                scrollBeyondLastLine: false,
                automaticLayout: true,
              }}
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
