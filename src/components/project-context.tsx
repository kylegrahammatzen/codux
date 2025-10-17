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
  const [previousPanel, setPreviousPanel] = useState<"chat" | "integrations" | null>(null);

  const toggleChat = () => {
    setShowChat((prev) => {
      if (!prev) {
        // Opening chat
        if (showIntegrations) {
          setPreviousPanel("integrations");
          setShowIntegrations(false);
        }
        return true;
      } else {
        // Closing chat
        if (previousPanel === "integrations") {
          setShowIntegrations(true);
          setPreviousPanel(null);
        }
        return false;
      }
    });
  };

  const toggleIntegrations = () => {
    setShowIntegrations((prev) => {
      if (!prev) {
        // Opening integrations
        if (showChat) {
          setPreviousPanel("chat");
          setShowChat(false);
        }
        return true;
      } else {
        // Closing integrations
        if (previousPanel === "chat") {
          setShowChat(true);
          setPreviousPanel(null);
        }
        return false;
      }
    });
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
