"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { useProjectContext } from "@/components/project-context";
import { useSandpackNavigation, useSandpack } from "@codesandbox/sandpack-react";
import { RefreshCcw, Expand, Shrink } from "lucide-react";

export const PreviewHeader = () => {
  const { fullscreen, setFullscreen } = useProjectContext();
  const { refresh } = useSandpackNavigation();
  const { sandpack } = useSandpack();
  const fullscreenButtonRef = useRef<HTMLButtonElement>(null);
  const hasError = (sandpack.error !== null && sandpack.error !== undefined) && sandpack.status === "error";

  const handleFullscreen = () => {
    setFullscreen(!fullscreen);
    setTimeout(() => {
      fullscreenButtonRef.current?.focus();
    }, 0);
  };

  const handleReload = () => {
    refresh();
  };

  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="sm" onClick={handleReload} disabled={hasError}>
        <RefreshCcw className="size-4" />
        <span>Reload</span>
      </Button>
      <Button ref={fullscreenButtonRef} variant="ghost" size="sm" onClick={handleFullscreen}>
        {fullscreen ? <Shrink className="size-4" /> : <Expand className="size-4" />}
        <span>{fullscreen ? "Exit fullscreen" : "Fullscreen"}</span>
      </Button>
    </div>
  );
};
