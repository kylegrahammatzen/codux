"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type ProjectContextType = {
  showChat: boolean;
  showIntegrations: boolean;
  toggleChat: () => void;
  toggleIntegrations: () => void;
};

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

type ProjectProviderProps = {
  children: ReactNode;
};

export const ProjectProvider = (props: ProjectProviderProps) => {
  const [showChat, setShowChat] = useState(true);
  const [showIntegrations, setShowIntegrations] = useState(false);

  const toggleChat = () => {
    setShowChat((prev) => !prev);
    setShowIntegrations(false);
  };

  const toggleIntegrations = () => {
    setShowIntegrations((prev) => !prev);
    setShowChat(false);
  };

  return (
    <ProjectContext.Provider
      value={{ showChat, showIntegrations, toggleChat, toggleIntegrations }}
    >
      {props.children}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error("useProjectContext must be used within a ProjectProvider");
  }
  return context;
};
