"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProjectContext } from "@/components/project-context";

export const PreviewModeToggle = () => {
  const { setPreviewMode } = useProjectContext();

  return (
    <Tabs defaultValue="preview" onValueChange={(value) => setPreviewMode(value as "preview" | "code")}>
      <TabsList>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
