"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type Project = {
  id: string;
  name: string;
  updatedAt: Date;
  previewImage?: string;
};

type ProjectsContextType = {
  projects: Project[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredProjects: Project[];
};

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

type ProjectsProviderProps = {
  children: ReactNode;
  initialProjects?: Project[];
};

export const ProjectsProvider = (props: ProjectsProviderProps) => {
  const [projects] = useState<Project[]>(props.initialProjects || []);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        searchQuery,
        setSearchQuery,
        filteredProjects,
      }}
    >
      {props.children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectsContext);
  if (context === undefined) {
    throw new Error("useProjects must be used within a ProjectsProvider");
  }
  return context;
};
