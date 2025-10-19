"use client";

import { useState, ReactNode } from "react";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type FolderItemProps = {
  name: string;
  children: ReactNode;
  defaultOpen?: boolean;
};

export const FolderItem = (props: FolderItemProps) => {
  const [isOpen, setIsOpen] = useState(props.defaultOpen ?? true);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="flex items-center gap-1 w-full hover:bg-gray-100 rounded px-1 py-1 text-sm cursor-pointer">
        <ChevronDown className={cn("size-4 transition-transform duration-200", !isOpen && "-rotate-90")} />
        <span>{props.name}</span>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="flex">
          <div className="flex items-start pl-[0.6rem] pr-2.5 py-1">
            <Separator orientation="vertical" className="h-full" />
          </div>
          <div className="flex-1 space-y-0.5">
            {props.children}
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
