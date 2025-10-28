"use client";

import { useTambo, useTamboThread } from "@tambo-ai/react";
import * as React from "react";
import { updateProjectThreadId } from "@/actions/project";

type ProjectThreadManagerProps = {
  projectId: string;
  initialThreadId?: string;
};

export const ProjectThreadManager = (props: ProjectThreadManagerProps) => {
  const { thread } = useTambo();
  const { switchCurrentThread } = useTamboThread();
  const [hasSavedThreadId, setHasSavedThreadId] = React.useState(false);

  // Switch to the initial thread ID if it exists
  React.useEffect(() => {
    if (props.initialThreadId && switchCurrentThread) {
      switchCurrentThread(props.initialThreadId);
    }
  }, [props.initialThreadId, switchCurrentThread]);

  // Save the thread ID to the database when it's first generated
  React.useEffect(() => {
    const saveThreadId = async () => {
      if (thread?.id && !props.initialThreadId && !hasSavedThreadId) {
        setHasSavedThreadId(true);
        await updateProjectThreadId(props.projectId, thread.id);
      }
    };

    saveThreadId();
  }, [thread?.id, props.projectId, props.initialThreadId, hasSavedThreadId]);

  return null;
};
