"use client";

import * as React from "react";
import { Switch as BaseSwitch } from "@base-ui-components/react/switch";
import { cn } from "@/lib/utils";

type CodeSwitchProps = {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
};

export const CodeSwitch = (props: CodeSwitchProps) => {
  return (
    <BaseSwitch.Root
      data-slot="switch"
      checked={props.checked}
      onCheckedChange={props.onCheckedChange}
      className={cn(
        "peer data-[checked]:bg-primary focus-visible:border-ring focus-visible:ring-ring/50 data-[unchecked]:bg-input data-[unchecked]:hover:border-ring/70 data-[checked]:border-primary inline-flex h-5 w-8 shrink-0 items-center rounded-full border shadow-xs transition-[color,box-shadow,border-color] outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50",
        props.className
      )}
    >
      <BaseSwitch.Thumb
        data-slot="switch-thumb"
        className={cn(
          "bg-background pointer-events-none flex items-center justify-center size-4 rounded-full ring-0 transition-transform duration-200 ease-in-out data-[checked]:translate-x-[calc(100%-3px)] data-[unchecked]:translate-x-px"
        )}
      >
        <svg
          className="w-2.5 h-2.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      </BaseSwitch.Thumb>
    </BaseSwitch.Root>
  );
};
