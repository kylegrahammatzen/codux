"use client";

import { useProjects } from "@/providers/projects-provider";

export const ProjectCount = () => {
  const { filteredProjects } = useProjects();

  return <span className="text-muted-foreground">({filteredProjects.length})</span>;
};
