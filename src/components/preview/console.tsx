"use client";

import {
  Collapsible,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { useSandpackContext } from "@/components/sandpack-context";

type PreviewConsoleProps = {
  isOpen: boolean;
};

export const PreviewConsole = (props: PreviewConsoleProps) => {
  const { errors } = useSandpackContext();

  return (
    <Collapsible open={props.isOpen}>
      <CollapsibleContent>
        {/* <Separator /> */}
        {errors.length > 0 && (
          <div className="text-sm font-mono py-2 max-h-48 overflow-y-auto space-y-2">
            {errors.map((error, index) => (
              <div key={index} className="text-red-600 bg-red-50 p-2 rounded">
                <div className="font-semibold">{error.title || "Error"}</div>
                {error.message && (
                  <div className="text-xs mt-1 whitespace-pre-wrap">{error.message}</div>
                )}
                {error.line && (
                  <div className="text-xs mt-1 text-gray-600">
                    Line {error.line}
                    {error.column && `:${error.column}`}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
};
