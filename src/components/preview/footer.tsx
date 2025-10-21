"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PreviewConsole } from "@/components/preview/console";
import { useSandpack, useSandpackConsole } from "@codesandbox/sandpack-react";
import { useProjectContext } from "@/components/project-context";
import { cn } from "@/lib/utils";
import { SquareTerminal, ChevronsDown, AlertCircle } from "lucide-react";

export const PreviewFooter = () => {
  const { isPreviewing } = useProjectContext();
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);
  const [lastChange, setLastChange] = useState<Date | null>(null);
  const [timeAgo, setTimeAgo] = useState<string>("never");
  const { sandpack, listen } = useSandpack();
  const { logs } = useSandpackConsole({ resetOnPreviewRestart: true });

  const errorCount = logs?.filter((log) => log.method === "error").length || 0;

  useEffect(() => {
    if (isPreviewing) {
      setIsConsoleOpen(false);
    }
  }, [isPreviewing]);

  useEffect(() => {
    const stopListening = listen((message) => {
      if (message.type === "done" || message.type === "action" || message.type === "start") {
        setLastChange(new Date());
      }
    });

    return () => stopListening();
  }, [listen]);

  useEffect(() => {
    if (!lastChange) return;

    const updateTimeAgo = () => {
      const now = new Date();
      const diffMs = now.getTime() - lastChange.getTime();
      const diffSec = Math.floor(diffMs / 1000);
      const diffMin = Math.floor(diffSec / 60);
      const diffHr = Math.floor(diffMin / 60);

      if (diffSec < 10) {
        setTimeAgo("just now");
      } else if (diffSec < 60) {
        setTimeAgo(`${diffSec}s ago`);
      } else if (diffMin < 60) {
        setTimeAgo(`${diffMin}m ago`);
      } else {
        setTimeAgo(`${diffHr}h ago`);
      }
    };

    updateTimeAgo();
    const interval = setInterval(updateTimeAgo, 1000);

    return () => clearInterval(interval);
  }, [lastChange]);

  return (
    <div className="border-t flex flex-col">
      <div className="h-14 flex items-center justify-between px-2 flex-shrink-0">
        {/* Left side - Console label */}
        <div className="flex items-center gap-2 text-sm">
          <SquareTerminal className="size-4" />
          <span>Console</span>
          {errorCount > 0 && (
            <div className="flex items-center gap-1 bg-danger text-danger-foreground px-2 py-0.5 rounded text-xs font-medium">
              <AlertCircle className="size-3" />
              <span>{errorCount}</span>
            </div>
          )}
        </div>

        {/* Right side - Last change info and toggle */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-sm select-none">
            <span className="text-gray-400">Last change:</span>
            <span className="text-gray-700">{timeAgo}</span>
          </div>

          <Separator orientation="vertical" className="h-4" />

          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setIsConsoleOpen(!isConsoleOpen)}
            disabled={isPreviewing}
          >
            <ChevronsDown
              className={cn(
                "size-4 transition-transform duration-200",
                isConsoleOpen && "rotate-180"
              )}
            />
          </Button>
        </div>
      </div>

      <div className={cn("px-2", isConsoleOpen && "pb-2")}>
        <PreviewConsole isOpen={isConsoleOpen} />
      </div>
    </div>
  );
};
