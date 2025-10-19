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
      setSize({ width, height });
    });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, dependencies);

  // Force re-measure when dependencies change
  useEffect(() => {
    if (ref.current) {
      const { width, height } = ref.current.getBoundingClientRect();
      setSize({ width, height });
    }
  }, dependencies);

  return size;
};
