"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import type { SandpackError } from "@codesandbox/sandpack-react";

export type SandpackFile = {
  code: string;
};

export type SandpackFiles = Record<string, SandpackFile>;

type SandpackContextType = {
  files: SandpackFiles;
  activeFile: string | null;
  errors: SandpackError[];
  updateFile: (path: string, code: string) => void;
  addFile: (path: string, code: string) => void;
  deleteFile: (path: string) => void;
  setActiveFile: (path: string | null) => void;
  setErrors: (errors: SandpackError[]) => void;
};

const SandpackContext = createContext<SandpackContextType | undefined>(undefined);

type SandpackProviderProps = {
  children: ReactNode;
};

const DEFAULT_FILES: SandpackFiles = {
  "/App.tsx": {
    code: `export default function App() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Hello World</h1>
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

export const SandpackProvider = (props: SandpackProviderProps) => {
  const [files, setFiles] = useState<SandpackFiles>(DEFAULT_FILES);
  const [activeFile, setActiveFile] = useState<string | null>(null);
  const [errors, setErrors] = useState<SandpackError[]>([]);

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
    <SandpackContext.Provider
      value={{
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
    </SandpackContext.Provider>
  );
};

export const useSandpackContext = () => {
  const context = useContext(SandpackContext);
  if (context === undefined) {
    throw new Error("useSandpackContext must be used within a SandpackProvider");
  }
  return context;
};
