"use client";

import { useSandpack } from "@codesandbox/sandpack-react";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumbs";
import { Copy, Download } from "lucide-react";

export const Header = () => {
  const { sandpack } = useSandpack();

  const activeFile = sandpack.activeFile;

  const getFileName = (path: string) => {
    return path.split("/").pop() || path;
  };

  const getFilePath = (path: string) => {
    const parts = path.split("/").filter(Boolean);
    return parts.slice(0, -1);
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

  const pathParts = activeFile ? getFilePath(activeFile) : [];
  const fileName = activeFile ? getFileName(activeFile) : "";

  return (
    <div className="h-10 border-b bg-card flex items-center justify-between px-2 select-none">
      <Breadcrumb>
        <BreadcrumbList>
          {pathParts.map((part, index) => (
            <div key={`${part}-${index}`} className="contents">
              <BreadcrumbItem>
                <BreadcrumbLink>{part}</BreadcrumbLink>
              </BreadcrumbItem>
              {(index < pathParts.length - 1 || fileName) && <BreadcrumbSeparator variant="slash" />}
            </div>
          ))}
          {fileName && (
            <BreadcrumbItem>
              <BreadcrumbPage>{fileName}</BreadcrumbPage>
            </BreadcrumbItem>
          )}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon-sm" onClick={handleCopy}>
          <Copy className="size-4" />
        </Button>
        <Button variant="ghost" size="icon-sm" onClick={handleDownload}>
          <Download className="size-4" />
        </Button>
      </div>
    </div>
  );
};
