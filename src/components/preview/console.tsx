"use client";

import { useEffect, useRef } from "react";
import { useSandpackConsole } from "@codesandbox/sandpack-react";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { AlertCircle, AlertTriangle, Info, XCircle } from "lucide-react";

type PreviewConsoleProps = {
  isOpen: boolean;
};

export const PreviewConsole = (props: PreviewConsoleProps) => {
  const { logs } = useSandpackConsole({ resetOnPreviewRestart: true });
  const consoleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (consoleRef.current && props.isOpen) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [logs, props.isOpen]);

  const cleanErrorMessage = (message: string): string => {
    // Split by "at " to separate error message from stack trace
    const parts = message.split(/\s+at\s+/);
    if (parts.length > 0) {
      // Take only the first part (the actual error message)
      return parts[0]
        .split('\n')
        .filter(line => !line.includes('http')) // Remove lines with URLs
        .filter(line => line.trim().length > 0) // Remove empty lines
        .join('\n')
        .trim();
    }
    return message;
  };

  const getLogIcon = (method: string) => {
    switch (method) {
      case "error":
        return <XCircle className="size-4 text-danger fill-danger/10" />;
      case "warn":
        return <AlertTriangle className="size-4 text-warning fill-warning/10" />;
      case "info":
        return <Info className="size-4 text-info fill-info/10" />;
      default:
        return <AlertCircle className="size-4 text-muted-foreground" />;
    }
  };

  const getLogColor = (method: string) => {
    switch (method) {
      case "error":
        return "text-danger-foreground";
      case "warn":
        return "text-warning-foreground";
      case "info":
        return "text-info-foreground";
      default:
        return "text-foreground";
    }
  };

  const errorCount = logs.filter((log) => log.method === "error").length;
  const warnCount = logs.filter((log) => log.method === "warn").length;

  return (
    <Collapsible open={props.isOpen}>
      <CollapsibleContent>
        <Separator />

        <div className={cn(
          "flex items-center gap-3 text-xs overflow-hidden transition-all duration-300 ease-in-out",
          logs.length > 0 ? "py-1 max-h-10 opacity-100" : "py-0 max-h-0 opacity-0"
        )}>
          {errorCount > 0 && (
            <span className="text-danger-foreground">{errorCount} error{errorCount > 1 ? 's' : ''}</span>
          )}
          {warnCount > 0 && (
            <span className="text-warning-foreground">{warnCount} warning{warnCount > 1 ? 's' : ''}</span>
          )}
          <span className="text-muted-foreground">{logs.length} total</span>
        </div>

        <div
          ref={consoleRef}
          className="max-h-48 overflow-y-auto text-xs font-mono py-2 space-y-1 transition-all duration-200"
        >
          {logs.length === 0 ? (
            <p className="text-muted-foreground">Console is empty</p>
          ) : (
            logs.map((log, index) => (
              <div key={index} className="flex items-start gap-2 py-0.5">
                {getLogIcon(log.method)}
                <div className={cn("flex-1", getLogColor(log.method))}>
                  {log.data?.map((data, i) => {
                    let content = typeof data === "object" ? JSON.stringify(data, null, 2) : String(data);
                    // Clean error messages for error and warn logs
                    if (log.method === "error" || log.method === "warn") {
                      content = cleanErrorMessage(content);
                    }
                    return (
                      <span key={i} className="mr-2 whitespace-pre-wrap">
                        {content}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};