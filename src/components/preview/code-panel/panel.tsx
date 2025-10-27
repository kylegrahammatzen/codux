"use client";

import { useProjectContext } from "@/components/project-context";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumbs";
import { ArrowLeftToLine, Copy, Download } from "lucide-react";
import { FolderItem } from "./folder-item";
import { FileItem } from "./file-item";

export const CodePanel = () => {
  const { showFileTree, setShowFileTree } = useProjectContext();

  const toggleFileTree = () => {
    setShowFileTree(!showFileTree);
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
        <div className="w-64 bg-accent/20 border-r h-full p-2">
          <FolderItem name="app" defaultOpen={true}>
            <FileItem name="globals.css" />
            <FileItem name="page.tsx" />
          </FolderItem>

          <FileItem name="package.json" />
        </div>
      </div>

      <div className="flex-1 bg-green-500 flex flex-col">
        <div className="h-10 border-b bg-card flex items-center justify-between px-2 select-none">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink>app</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>page.tsx</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon-sm">
              <Copy className="size-4" />
            </Button>
            <Button variant="ghost" size="icon-sm">
              <Download className="size-4" />
            </Button>
          </div>
        </div>

        <div className="flex-1">
          <p className="text-white p-2">Code Editor</p>
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
