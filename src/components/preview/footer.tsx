"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PreviewConsole } from "@/components/preview/console";
import { cn } from "@/lib/utils";

export const PreviewFooter = () => {
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);

  return (
    <div className="border-t flex flex-col">
      <div className="h-14 flex items-center justify-between px-2 flex-shrink-0">
        {/* Left side - Console label */}
        <div className="flex items-center gap-2 text-sm">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
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
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            <span>Filters</span>
          </Button>

          <Separator orientation="vertical" className="h-4" />

          <Button variant="ghost" size="icon-sm" onClick={() => setIsConsoleOpen(!isConsoleOpen)}>
            <svg
              className={cn(
                "w-4 h-4 transition-transform duration-200",
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

      <PreviewConsole isOpen={isConsoleOpen} />
    </div>
  );
};
