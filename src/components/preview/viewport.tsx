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
const SNAP_THRESHOLD = 40; // Pixels from snap point to apply magnetic effect
const BASE_SNAP_POINTS = [375, 768]; // Mobile and tablet only

// Easing function for smooth magnetic pull
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export const PreviewViewport = () => {
  const { device, customWidth, setCustomWidth, setDimensions } = usePreviewContext();
  const containerRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [maxAvailableWidth, setMaxAvailableWidth] = useState<number | null>(null);

  const maxWidth = customWidth || DEVICE_WIDTHS[device];

  // Track the parent container width (only on mount, not during panel toggles)
  useEffect(() => {
    if (!parentRef.current) return;

    const updateMaxWidth = () => {
      if (parentRef.current) {
        setMaxAvailableWidth(parentRef.current.offsetWidth);
      }
    };

    // Only set on mount
    updateMaxWidth();
  }, []);

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

  useEffect(() => {
    if (!isDragging) return;

    const currentCustomWidth = customWidth;
    const currentMaxWidth = maxAvailableWidth;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !parentRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      let newWidth = e.clientX - containerRect.left;

      // Clamp to bounds [MIN_WIDTH, currentMaxWidth]
      newWidth = Math.max(MIN_WIDTH, Math.min(newWidth, currentMaxWidth || Infinity));

      // Build dynamic snap points (base points + max available width)
      const snapPoints = [...BASE_SNAP_POINTS];
      if (currentMaxWidth && currentMaxWidth > 768) {
        snapPoints.push(currentMaxWidth);
      }

      // Apply smooth magnetic pull to nearest snap point
      let finalWidth = newWidth;
      let closestSnapPoint: number | null = null;
      let closestDistance = Infinity;

      for (const snapPoint of snapPoints) {
        const distance = Math.abs(newWidth - snapPoint);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestSnapPoint = snapPoint;
        }
      }

      // If within threshold of a snap point, apply smooth interpolation
      if (closestSnapPoint !== null && closestDistance < SNAP_THRESHOLD) {
        // Calculate pull strength (0 to 1, where 1 is strongest at snap point)
        const pullStrength = 1 - (closestDistance / SNAP_THRESHOLD);
        // Apply easing for smooth feel
        const easedPull = easeOutCubic(pullStrength);
        // Interpolate between current width and snap point
        finalWidth = newWidth + (closestSnapPoint - newWidth) * easedPull * 0.7;
      }

      setCustomWidth(Math.round(finalWidth));
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
    <div ref={parentRef} data-preview-parent className="flex-1 flex items-center justify-center bg-gray-200 overflow-hidden">
      <div
        ref={containerRef}
        className={cn(
          "relative h-full bg-white",
          device === "desktop" && "w-full",
          device !== "desktop" && "border-x shadow-lg"
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
