"use client";

import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Collapsible,
  CollapsibleContent,
} from "@/components/ui/collapsible";

type PreviewConsoleProps = {
  isOpen: boolean;
};

export const PreviewConsole = (props: PreviewConsoleProps) => {
  return (
    <Collapsible open={props.isOpen}>
      <CollapsibleContent className="px-2 pb-2">
        <Separator />
        <div className="text-xs text-gray-600 font-mono py-2">
          <p>Console output will appear here...</p>
        </div>
        <Card className="py-1 px-2 flex-row items-center gap-2 shadow-none">
          <div className="size-5 bg-black rounded-sm flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-semibold">/</span>
          </div>
          <Input
            placeholder="Enter a command..."
            className="bg-transparent border-0 shadow-none p-0 text-xs font-mono placeholder:text-gray-500 focus-visible:ring-0"
            inputContainerClassName="w-auto flex-1"
          />
        </Card>
      </CollapsibleContent>
    </Collapsible>
  );
};
