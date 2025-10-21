"use client";

import { Button } from "@/components/ui/button";
import { Image, Mic, SquareDashedMousePointer } from "lucide-react";

export const ChatInputActions = () => {
  return (
    <div className="flex gap-2 overflow-hidden">
      <Button variant="outline" size="icon-sm" className="bg-white">
        <Image className="size-4" />
      </Button>
      <Button variant="outline" size="icon-sm" className="bg-white relative z-10">
        <Mic className="size-4" />
      </Button>
      {/* Edit button - disabled for now */}
      <div className="overflow-hidden -ml-2 pl-2">
        <Button variant="outline" size="sm" className="bg-white transition-all duration-300 -translate-x-[10rem] opacity-0 pointer-events-none xl:translate-x-0 xl:opacity-100 xl:pointer-events-auto" style={{
          transitionTimingFunction: "cubic-bezier(.165, .84, .44, 1)"
        }} disabled>
          <SquareDashedMousePointer className="size-4" />
          Edit
        </Button>
      </div>
    </div>
  );
};
