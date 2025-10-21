"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { useMobile } from "@/hooks/use-mobile";

export type PreviewMode = "preview" | "code";

export type ProjectFiles = Record<string, string>;

export type ProjectDependencies = Record<string, string>;

export type ProjectOptions = {
  externalResources?: string[];
};

type ProjectContextType = {
  // Layout state
  panelOpen: boolean;
  setPanelOpen: (isOpen: boolean) => void;

  // Responsive state
  isMobile: boolean;

  // UI mode state
  previewMode: PreviewMode;
  setPreviewMode: (mode: PreviewMode) => void;
  fullscreen: boolean;
  setFullscreen: (fullscreen: boolean) => void;
  showFileTree: boolean;
  setShowFileTree: (show: boolean) => void;

};

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

type ProjectProviderProps = {
  children: ReactNode;
};

export const ProjectProvider = (props: ProjectProviderProps) => {
  // Layout state
  const [panelOpen, setPanelOpen] = useState(true);
  const [previousPanelState, setPreviousPanelState] = useState(false);

  // Responsive state
  const isMobile = useMobile(1280); // Below xl breakpoint

  // UI mode state
  const [previewMode, setPreviewMode] = useState<PreviewMode>("preview");
  const [fullscreen, setFullscreenState] = useState(false);
  const [showFileTree, setShowFileTree] = useState(true);

  const setFullscreen = (value: boolean) => {
    if (value) {
      // Entering fullscreen - save current panel state and close panel
      setPreviousPanelState(panelOpen);
      setPanelOpen(false);
    } else {
      // Exiting fullscreen - restore previous panel state
      setPanelOpen(previousPanelState);
    }
    setFullscreenState(value);
  };

  return (
    <ProjectContext.Provider
      value={{
        panelOpen,
        setPanelOpen,
        isMobile,
        previewMode,
        setPreviewMode,
        fullscreen,
        setFullscreen,
        showFileTree,
        setShowFileTree,
      }}
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
