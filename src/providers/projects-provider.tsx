"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { useDebounce } from "@/hooks/use-debounce";

export type Project = {
  id: string;
  updatedAt: Date;
  previewImage?: string;
};

type ProjectsContextType = {
  projects: Project[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredProjects: Project[];
  removeProject: (projectId: string) => void;
  isSearching: boolean;
};

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

type ProjectsProviderProps = {
  children: ReactNode;
  initialProjects?: Project[];
};

export const ProjectsProvider = (props: ProjectsProviderProps) => {
  const [projects, setProjects] = useState<Project[]>(props.initialProjects || []);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const isSearching = searchQuery !== debouncedSearchQuery;

  // Search disabled - names are managed by Tambo, not in database
  const filteredProjects = projects;

  const removeProject = (projectId: string) => {
    setProjects((prev) => prev.filter((project) => project.id !== projectId));
  };

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        searchQuery,
        setSearchQuery,
        filteredProjects,
        removeProject,
        isSearching,
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
