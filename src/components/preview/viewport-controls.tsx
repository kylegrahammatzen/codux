"use client";

import { usePreviewContext } from "@/components/preview/preview-context";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export const ViewportControls = () => {
  const { device, setDevice, setCustomWidth, dimensions, customWidth } = usePreviewContext();

  const deviceLabels = {
    desktop: "Desktop",
    tablet: "Tablet",
    mobile: "Mobile",
    custom: "Custom",
  };

  // If customWidth is set, always show "custom"
  const activeDevice = customWidth ? "custom" : device;

  const handleDeviceChange = (newDevice: string) => {
    setDevice(newDevice as typeof device);
    setCustomWidth(null); // Reset custom width when changing device
  };

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 320) {
      setCustomWidth(value);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="ghost" size="sm" />} className="bg-accent gap-2 font-normal relative">
          <span className="transition-opacity duration-200">{deviceLabels[activeDevice]}</span>
          <svg
            className="size-3"
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
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuRadioGroup value={activeDevice} onValueChange={handleDeviceChange}>
            <DropdownMenuRadioItem value="desktop">
              Desktop
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="tablet">
              Tablet
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="mobile">
              Mobile
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="custom" disabled>
              Custom
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "gap-0.5 text-xs text-gray-600 bg-accent font-normal")}>
        <span className="text-gray-400 pointer-events-none">W</span>
        <Input
          type="number"
          value={dimensions.width || ""}
          onChange={handleWidthChange}
          className="h-auto w-12 border-0 shadow-none bg-transparent p-0 text-center text-xs text-gray-600 focus-visible:ring-0 focus-visible:border-0"
          inputContainerClassName="w-auto"
        />
      </div>
    </div>
  );
};
