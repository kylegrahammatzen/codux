"use client";

import { useState, type ReactNode } from "react";
import { Button, type ButtonProps } from "@/components/ui/button";

type AnimatedButtonProps = Omit<ButtonProps, "children" | "onClick"> & {
  defaultIcon: ReactNode;
  activeIcon: ReactNode;
  onAction: () => void | Promise<void>;
  duration?: number;
};

export const AnimatedButton = (props: AnimatedButtonProps) => {
  const { defaultIcon, activeIcon, onAction, duration = 1000, className, ...buttonProps } = props;
  const [isActive, setIsActive] = useState(false);

  const handleClick = async () => {
    await onAction();
    setIsActive(true);
    setTimeout(() => setIsActive(false), duration);
  };

  return (
    <Button
      {...buttonProps}
      onClick={handleClick}
      className={`transition-transform ${className || ""}`}
      style={{
        transform: isActive ? "scale(0.95)" : "scale(1)",
        transitionDuration: "100ms",
        transitionTimingFunction: "cubic-bezier(.215, .61, .355, 1)"
      }}
    >
      {isActive ? activeIcon : defaultIcon}
    </Button>
  );
};
