import { useEffect, useState, RefObject } from "react";

type ContainerSize = {
  width: number;
  height: number;
};

export const useContainerSize = (
  ref: RefObject<HTMLElement | null>,
  dependencies: unknown[] = []
) => {
  const [size, setSize] = useState<ContainerSize>({ width: 0, height: 0 });

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setSize((prev) => {
        // Only update if dimensions actually changed
        if (prev.width !== width || prev.height !== height) {
          return { width, height };
        }
        return prev;
      });
    });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);

  // Measure during transitions when dependencies change
  useEffect(() => {
    if (!ref.current) return;

    let rafId: number;
    let frameCount = 0;
    const maxFrames = 20; // ~300ms at 60fps

    const measure = () => {
      if (ref.current) {
        const { width, height } = ref.current.getBoundingClientRect();
        setSize((prev) => {
          // Only update if dimensions actually changed
          if (prev.width !== width || prev.height !== height) {
            return { width, height };
          }
          return prev;
        });

        // Continue measuring for the transition duration
        frameCount++;
        if (frameCount < maxFrames) {
          rafId = requestAnimationFrame(measure);
        }
      }
    };

    measure();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, dependencies);

  return size;
};
