"use client";

import { usePreviewContext } from "@/components/preview/preview-context";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const ViewportControls = () => {
  const { device, setDevice, setCustomWidth, customWidth } = usePreviewContext();

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

  return (
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
  );
};
