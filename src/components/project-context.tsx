"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { useMobile } from "@/hooks/use-mobile";
import type { SandpackError } from "@codesandbox/sandpack-client";

type PreviewMode = "preview" | "code";

export type SandpackFile = {
  code: string;
};

export type SandpackFiles = Record<string, SandpackFile>;

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

  // File state
  files: SandpackFiles;
  activeFile: string | null;
  errors: SandpackError[];
  updateFile: (path: string, code: string) => void;
  addFile: (path: string, code: string) => void;
  deleteFile: (path: string) => void;
  setActiveFile: (path: string | null) => void;
  setErrors: (errors: SandpackError[]) => void;
};

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

type ProjectProviderProps = {
  children: ReactNode;
};

const DEFAULT_FILES: SandpackFiles = {
  "/App.tsx": {
    code: `export default function App() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-2">Hello World</h1>
      <p className="text-gray-600">Edit App.tsx to get started!</p>
    </div>
  );
}`,
  },
  "/index.tsx": {
    code: `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

const root = createRoot(document.getElementById("root")!);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);`,
  },
  "/styles.css": {
    code: `body {
  margin: 0;
  font-family: system-ui, -apple-system, sans-serif;
}

#root {
  min-height: 100vh;
}`,
  },
  "/package.json": {
    code: JSON.stringify(
      {
        dependencies: {
          react: "^18.3.1",
          "react-dom": "^18.3.1",
        },
        main: "/index.tsx",
      },
      null,
      2
    ),
  },
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

  // File state
  const [files, setFiles] = useState<SandpackFiles>(DEFAULT_FILES);
  const [activeFile, setActiveFile] = useState<string | null>("/App.tsx");
  const [errors, setErrors] = useState<SandpackError[]>([]);

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

  const updateFile = (path: string, code: string) => {
    setFiles((prev) => ({
      ...prev,
      [path]: { code },
    }));
  };

  const addFile = (path: string, code: string) => {
    setFiles((prev) => ({
      ...prev,
      [path]: { code },
    }));
  };

  const deleteFile = (path: string) => {
    setFiles((prev) => {
      const newFiles = { ...prev };
      delete newFiles[path];
      return newFiles;
    });

    // Clear active file if it was deleted
    if (activeFile === path) {
      setActiveFile(null);
    }
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
        files,
        activeFile,
        errors,
        updateFile,
        addFile,
        deleteFile,
        setActiveFile,
        setErrors,
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
