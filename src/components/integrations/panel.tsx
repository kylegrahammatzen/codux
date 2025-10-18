"use client";

import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const IntegrationsPanel = () => {
  return (
    <div className="flex flex-col h-full min-w-max">
      <div className="flex items-center justify-between px-2 border-b h-12 bg-white rounded-t-md">
        <span className="text-sm font-medium">Integrations</span>
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </Button>
      </div>

      <CardContent className="flex-1 flex items-center justify-center">
        <p className="text-gray-400 text-sm">Integrations panel</p>
      </CardContent>
    </div>
  );
};
