"use client";

import { useAppContext } from "@/components/app-context";
import { usePreviewContext } from "@/components/preview/preview-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const PreviewHeader = () => {
  const { isMobile } = useAppContext();
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
    <div className="h-12 border-b flex items-center justify-between px-2 gap-2 min-w-0 overflow-hidden">
      {/* Left side - Project preview */}
      <div className="text-sm font-medium shrink-0">Project preview</div>

      {!isMobile && (
        <div className="hidden lg:flex items-center gap-2">
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
          <div className="flex items-center gap-0.5 text-xs text-gray-600 bg-accent rounded px-2 py-1">
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
      )}

      {/* Right side - Reload and Fullscreen buttons */}
      <div className="flex items-center gap-2 shrink-0">
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
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          <span>Reload</span>
        </Button>
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
              d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5M4 16v4m0 0h4m-4 0l5-5"
            />
          </svg>
          <span>Fullscreen</span>
        </Button>
      </div>
    </div>
  );
};
