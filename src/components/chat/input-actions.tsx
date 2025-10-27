"use client";

import { Button } from "@/components/ui/button";
import { File, Mic, SquareDashedMousePointer } from "lucide-react";
import { useTamboThreadInput } from "@tambo-ai/react";
import * as React from "react";

export const ChatInputActions = () => {
  const { addImages } = useTamboThreadInput();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    try {
      await addImages(files);
    } catch (error) {
      console.error("Failed to add selected files:", error);
    }
    e.target.value = "";
  };

  return (
    <div className="flex gap-2 overflow-hidden">
      <Button variant="outline" size="icon-sm" className="bg-card">
        <Mic className="size-4" />
      </Button>
      <Button variant="outline" size="sm" className="bg-card" onClick={handleFileClick}>
        <File className="size-4" />
        Add file
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
          aria-hidden="true"
        />
      </Button>
      {/* Edit button - disabled for now */}
      <div className="overflow-hidden -ml-2 pl-2">
        <Button variant="outline" size="sm" className="bg-card transition-all duration-300 -translate-x-[10rem] opacity-0 pointer-events-none xl:translate-x-0 xl:opacity-100 xl:pointer-events-auto" style={{
          transitionTimingFunction: "cubic-bezier(.165, .84, .44, 1)"
        }} disabled>
          <SquareDashedMousePointer className="size-4" />
          Edit
        </Button>
      </div>
    </div>
  );
};
