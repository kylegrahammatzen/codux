import { useState, useEffect } from "react";

export const formatRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);

  if (diffSec < 60) return `${diffSec}s ago`;
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  return date.toLocaleDateString();
};

export const getUpdateInterval = (date: Date): number => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);

  if (diffSec < 60) return 1000;
  if (diffMin < 60) return 60000;
  return 3600000;
};

export const useRelativeTime = (date: Date) => {
  const [, setTick] = useState(0);

  useEffect(() => {
    const interval = getUpdateInterval(date);
    const id = setInterval(() => {
      setTick((t) => t + 1);
    }, interval);
    return () => clearInterval(id);
  }, [date]);

  return formatRelativeTime(date);
};
