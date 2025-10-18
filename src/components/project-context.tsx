"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type ViewportMode = "desktop" | "tablet" | "mobile" | "custom";

type Dimensions = {
  width: number;
  height: number;
};

type PreviewMode = "preview" | "code";

type ProjectContextType = {
  // Layout state - which panels are open
  leftPanel: "chat" | null;
  rightPanel: "integrations" | null;
  setLeftPanel: (panel: "chat" | null) => void;
  setRightPanel: (panel: "integrations" | null) => void;

  // Preview viewport state
  viewportMode: ViewportMode;
  setViewportMode: (mode: ViewportMode) => void;
  customDimensions: Dimensions | null;
  setCustomDimensions: (dims: Dimensions | null) => void;

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
  const [leftPanel, setLeftPanel] = useState<"chat" | null>("chat");
  const [rightPanel, setRightPanel] = useState<"integrations" | null>(null);
  const [previousLeftPanel, setPreviousLeftPanel] = useState<"chat" | null>(null);
  const [previousRightPanel, setPreviousRightPanel] = useState<"integrations" | null>(null);

  // Viewport state
  const [viewportMode, setViewportMode] = useState<ViewportMode>("desktop");
  const [customDimensions, setCustomDimensions] = useState<Dimensions | null>(null);

  // UI mode state
  const [previewMode, setPreviewMode] = useState<PreviewMode>("preview");
  const [fullscreen, setFullscreenState] = useState(false);
  const [showFileTree, setShowFileTree] = useState(true);

  const setFullscreen = (value: boolean) => {
    if (value) {
      // Entering fullscreen - save current panel state and close panels
      setPreviousLeftPanel(leftPanel);
      setPreviousRightPanel(rightPanel);
      setLeftPanel(null);
      setRightPanel(null);
    } else {
      // Exiting fullscreen - restore previous panel state
      setLeftPanel(previousLeftPanel);
      setRightPanel(previousRightPanel);
    }
    setFullscreenState(value);
  };

  return (
    <ProjectContext.Provider
      value={{
        leftPanel,
        rightPanel,
        setLeftPanel,
        setRightPanel,
        viewportMode,
        setViewportMode,
        customDimensions,
        setCustomDimensions,
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
