"use client";

import { useState } from "react";
import { useProjectContext } from "@/components/project-context";
import { Button } from "@/components/ui/button";
import { Copy, Download, CircleCheck } from "lucide-react";

export const CodeHeader = () => {
  const { files, activeFile } = useProjectContext();
  const [copied, setCopied] = useState(false);

  const getFileName = (path: string) => {
    return path.split("/").pop() || path;
  };

  const handleCopy = async () => {
    if (activeFile && files[activeFile]) {
      await navigator.clipboard.writeText(files[activeFile].code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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

  if (!activeFile) return null;

  return (
    <div className="h-10 border-b bg-white flex items-center justify-between px-2">
      <div className="flex items-center gap-1 text-sm">
        <span className="text-gray-600">{activeFile.split("/").slice(0, -1).join("/")}</span>
        {activeFile.split("/").length > 2 && <span className="text-gray-400">/</span>}
        <span className="text-gray-900 font-medium">{getFileName(activeFile)}</span>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon-sm" onClick={handleCopy}>
          <div
            className="transition-all duration-200"
            style={{
              transform: copied ? "scale(1.1)" : "scale(1)",
              transitionTimingFunction: "cubic-bezier(.215, .61, .355, 1)"
            }}
          >
            {copied ? (
              <CircleCheck className="size-4" />
            ) : (
              <Copy className="size-4" />
            )}
          </div>
        </Button>
        <Button variant="ghost" size="icon-sm" onClick={handleDownload}>
          <Download className="size-4" />
        </Button>
      </div>
    </div>
  );
};
