"use client";

import { useProjects } from "@/providers/projects-provider";
import { ProjectCard } from "./project-card";

export const ProjectList = () => {
  const { filteredProjects } = useProjects();

  if (filteredProjects.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No projects found
      </div>
    );
  }

  return (
    <>
      <h2 className="text-lg font-semibold">All Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </>
  );
};
