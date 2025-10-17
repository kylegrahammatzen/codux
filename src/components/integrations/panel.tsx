"use client";

import { Button } from "@/components/ui/button";
import { useProjectContext } from "@/components/project-context";

export const IntegrationsPanel = () => {
  const { toggleIntegrations } = useProjectContext();

  return (
    <div className="min-w-max h-full bg-white rounded-md flex flex-col">
      <div className="h-12 border-b flex items-center justify-between px-2">
        <span className="text-sm font-medium">Integrations</span>
        <Button variant="ghost" size="sm" onClick={toggleIntegrations}>
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
          <span className="sr-only">Close</span>
        </Button>
      </div>

      <div className="flex-1 px-2">Integrations content</div>
    </div>
  );
};
