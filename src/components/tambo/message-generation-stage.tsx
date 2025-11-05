"use client";

import { cn } from "@/lib/utils";
import { type GenerationStage, useTambo } from "@tambo-ai/react";
import { Loader2 } from "lucide-react";
import * as React from "react";

type GenerationStageProps = React.HTMLAttributes<HTMLDivElement> & {
  showLabel?: boolean;
};

export const MessageGenerationStage = (props: GenerationStageProps) => {
  const { className, showLabel = true, ...rest } = props;
  const { thread, isIdle } = useTambo();
  const stage = thread?.generationStage;

  // Only render if we have a generation stage
  if (!stage) {
    return null;
  }

  // Map stage names to more user-friendly labels
  const stageLabels: Record<GenerationStage, string> = {
    IDLE: "Idle",
    CHOOSING_COMPONENT: "Choosing component",
    FETCHING_CONTEXT: "Fetching context",
    HYDRATING_COMPONENT: "Preparing component",
    STREAMING_RESPONSE: "Generating response",
    COMPLETE: "Complete",
    ERROR: "Error",
    CANCELLED: "Cancelled",
  };

  const label =
    stageLabels[stage] || `${stage.charAt(0).toUpperCase() + stage.slice(1)}`;

  if (isIdle) {
    return null;
  }

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-2 py-1 text-xs rounded-md bg-transparent text-muted-foreground",
        className,
      )}
      {...rest}
    >
      <Loader2 className="size-3 animate-spin" />
      {showLabel && <span>{label}</span>}
    </div>
  );
};
