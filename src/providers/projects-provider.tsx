"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { useDebounce } from "@/hooks/use-debounce";

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
  updateProjectName: (projectId: string, newName: string) => void;
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

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
  );

  const updateProjectName = (projectId: string, newName: string) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === projectId ? { ...project, name: newName } : project
      )
    );
  };

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
        updateProjectName,
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
