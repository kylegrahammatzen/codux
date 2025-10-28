"use client";

import { useTambo } from "@tambo-ai/react";
import * as React from "react";
import { updateProjectThreadId } from "@/actions/project";

type ProjectThreadManagerProps = {
  projectId: string;
  hasExistingThreadId: boolean;
};

export const ProjectThreadManager = (props: ProjectThreadManagerProps) => {
  const { thread } = useTambo();
  const [hasSavedThreadId, setHasSavedThreadId] = React.useState(false);

  // Save the thread ID to the database when it's first generated
  React.useEffect(() => {
    const saveThreadId = async () => {
      if (thread?.id && !props.hasExistingThreadId && !hasSavedThreadId) {
        setHasSavedThreadId(true);
        await updateProjectThreadId(props.projectId, thread.id);
      }
    };

    saveThreadId();
  }, [thread?.id, props.projectId, props.hasExistingThreadId, hasSavedThreadId]);

  return null;
};
