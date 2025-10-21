"use client";

import { useEffect, useRef } from "react";
import { useSandpackConsole } from "@codesandbox/sandpack-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { AlertCircle, AlertTriangle, Info, XCircle } from "lucide-react";

type PreviewConsoleProps = {
  isOpen: boolean;
};

export const PreviewConsole = (props: PreviewConsoleProps) => {
  const { logs, reset } = useSandpackConsole({ resetOnPreviewRestart: true });
  const consoleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (consoleRef.current && props.isOpen) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [logs, props.isOpen]);

  const getLogIcon = (method: string) => {
    switch (method) {
      case "error":
        return <XCircle className="size-4 text-red-500" />;
      case "warn":
        return <AlertTriangle className="size-4 text-yellow-500" />;
      case "info":
        return <Info className="size-4 text-blue-500" />;
      default:
        return <AlertCircle className="size-4 text-gray-400" />;
    }
  };

  const getLogColor = (method: string) => {
    switch (method) {
      case "error":
        return "text-red-600";
      case "warn":
        return "text-yellow-600";
      case "info":
        return "text-blue-600";
      default:
        return "text-gray-700";
    }
  };

  const errorCount = logs.filter((log) => log.method === "error").length;
  const warnCount = logs.filter((log) => log.method === "warn").length;

  return (
    <Collapsible open={props.isOpen}>
      <CollapsibleContent>
        <Separator />

        {logs.length > 0 && (
          <div className="flex items-center justify-between py-1">
            <div className="flex items-center gap-3 text-xs">
              {errorCount > 0 && (
                <span className="text-red-600">{errorCount} error{errorCount > 1 ? 's' : ''}</span>
              )}
              {warnCount > 0 && (
                <span className="text-yellow-600">{warnCount} warning{warnCount > 1 ? 's' : ''}</span>
              )}
              <span className="text-gray-500">{logs.length} total</span>
            </div>
            <Button variant="ghost" size="sm" onClick={reset} className="h-6 text-xs">
              Clear
            </Button>
          </div>
        )}

        <div
          ref={consoleRef}
          className="max-h-48 overflow-y-auto text-xs font-mono py-2 space-y-1"
        >
          {logs.length === 0 ? (
            <p className="text-gray-400">Console is empty</p>
          ) : (
            logs.map((log, index) => (
              <div key={index} className="flex items-start gap-2 py-0.5">
                {getLogIcon(log.method)}
                <div className={cn("flex-1", getLogColor(log.method))}>
                  {log.data.map((data, i) => (
                    <span key={i} className="mr-2">
                      {typeof data === "object" ? JSON.stringify(data, null, 2) : String(data)}
                    </span>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};