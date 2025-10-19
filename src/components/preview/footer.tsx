"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PreviewConsole } from "@/components/preview/console";
import { cn } from "@/lib/utils";
import { SquareTerminal, Funnel } from "lucide-react";

export const PreviewFooter = () => {
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);

  return (
    <div className="border-t flex flex-col">
      <div className="h-14 flex items-center justify-between px-2 flex-shrink-0">
        {/* Left side - Console label */}
        <div className="flex items-center gap-2 text-sm">
          <SquareTerminal className="size-4" />
          <span>Console</span>
        </div>

        {/* Right side - Last change info, divider, and filter buttons */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-sm">
            <span className="text-gray-400">Last change:</span>
            <span className="text-gray-700">3 hours ago</span>
          </div>

          <Separator orientation="vertical" className="h-4" />

          <Button variant="ghost" size="sm">
            <Funnel className="size-4" />
            <span>Filters</span>
          </Button>

          <Separator orientation="vertical" className="h-4" />

          <Button variant="ghost" size="icon-sm" onClick={() => setIsConsoleOpen(!isConsoleOpen)}>
            <svg
              className={cn(
                "size-4 transition-transform duration-200",
                isConsoleOpen && "rotate-180"
              )}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </Button>
        </div>
      </div>

      <div className={cn("px-2", isConsoleOpen && "pb-2")}>
        <PreviewConsole isOpen={isConsoleOpen} />
      </div>
    </div>
  );
};
