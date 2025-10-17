"use client";

import { useRef, useState, useEffect } from "react";
import { usePreviewContext } from "@/components/preview/preview-context";
import { cn } from "@/lib/utils";

const DEVICE_WIDTHS = {
  desktop: null, // null means 100%
  tablet: 768,
  mobile: 375,
};

const MIN_WIDTH = 320;

export const PreviewViewport = () => {
  const { device, customWidth, setCustomWidth, setDimensions } = usePreviewContext();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const maxWidth = customWidth || DEVICE_WIDTHS[device];

  // Track dimensions
  useEffect(() => {
    if (!containerRef.current) return;

    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateDimensions();
    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, [maxWidth, setDimensions]);

  // Handle dragging
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current?.parentElement) return;

      const parentRect = containerRef.current.parentElement.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      // Calculate width based on mouse position relative to container's left edge
      let newWidth = e.clientX - containerRect.left;

      // Clamp to bounds [MIN_WIDTH, parent width]
      newWidth = Math.max(MIN_WIDTH, Math.min(newWidth, parentRect.width));

      setCustomWidth(Math.round(newWidth));
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, setCustomWidth]);

  return (
    <div className="flex-1 flex items-center justify-center bg-gray-200 overflow-hidden">
      <div
        ref={containerRef}
        className={cn(
          "relative h-full bg-white",
          device === "desktop" && "w-full",
          device !== "desktop" && "border-x shadow-lg",
          !isDragging && "transition-[width] duration-300 ease-in-out"
        )}
        style={{
          width: maxWidth ? `${maxWidth}px` : undefined,
        }}
      >
        {/* Loading spinner in center */}
        <div className="flex h-full items-center justify-center">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-black rounded-full animate-spin"></div>
          </div>
        </div>

        {/* Resize handle - only show for desktop */}
        {device === "desktop" && (
          <div
            className={cn(
              "absolute top-1/2 -translate-y-1/2 right-2 w-1.5 h-16 bg-gray-400 hover:bg-gray-600 cursor-ew-resize transition-colors rounded-full z-10",
              isDragging && "bg-gray-600"
            )}
            onMouseDown={() => setIsDragging(true)}
          />
        )}
      </div>
    </div>
  );
};
