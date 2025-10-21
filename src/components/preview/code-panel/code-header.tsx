"use client";

import { useProjectContext } from "@/components/project-context";
import { useSandpack } from "@codesandbox/sandpack-react";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Copy, Download, CircleCheck } from "lucide-react";

export const CodeHeader = () => {
  const { sandpack } = useSandpack();
  const activeFile = sandpack.activeFile;

  const getFileName = (path: string) => {
    return path.split("/").pop() || path;
  };

  const handleCopy = async () => {
    if (activeFile && sandpack.files[activeFile]) {
      await navigator.clipboard.writeText(sandpack.files[activeFile].code);
    }
  };

  const handleDownload = () => {
    if (activeFile && sandpack.files[activeFile]) {
      const blob = new Blob([sandpack.files[activeFile].code], { type: "text/plain" });
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
        <AnimatedButton
          variant="ghost"
          size="icon-sm"
          defaultIcon={<Copy className="size-4" />}
          activeIcon={<CircleCheck className="size-4" />}
          onAction={handleCopy}
        />
        <AnimatedButton
          variant="ghost"
          size="icon-sm"
          defaultIcon={<Download className="size-4" />}
          activeIcon={<CircleCheck className="size-4" />}
          onAction={handleDownload}
        />
      </div>
    </div>
  );
};
