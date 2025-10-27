"use client";

import { Input } from "@/components/ui/input";
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
      <CollapsibleContent>
        <Separator />
        <div className="text-sm text-muted-foreground font-mono py-2">
          <p>Console output will appear here...</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="size-5 bg-primary rounded-sm flex items-center justify-center flex-shrink-0">
            <span className="text-primary-foreground text-sm font-bold">/</span>
          </div>
          <Input
            placeholder="Enter a command..."
            className="bg-transparent border-0 shadow-none p-0 text-xs font-mono placeholder:text-muted-foreground focus-visible:ring-0"
            inputContainerClassName="w-auto flex-1"
          />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
