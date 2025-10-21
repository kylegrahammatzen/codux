"use client";

import { useState } from "react";
import { EditorLayout } from "@/components/editor-layout";
import { ProjectProvider } from "@/components/project-context";
import type { ProjectFiles, ProjectDependencies, ProjectOptions } from "@/components/project-context";

const INITIAL_FILES: ProjectFiles = {
  "/App.tsx": `export default function App() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-2">Hello World</h1>
      <p className="text-gray-600">Edit App.tsx to get started!</p>
    </div>
  );
}`,
  "/index.tsx": `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const root = createRoot(document.getElementById("root")!);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);`,
  "/package.json": JSON.stringify(
    {
      dependencies: {
        react: "^19.2.0",
        "react-dom": "^19.2.0",
      },
      main: "/index.tsx",
    },
    null,
    2
  ),
};

const INITIAL_DEPENDENCIES: ProjectDependencies = {
  react: "^19.2.0",
  "react-dom": "^19.2.0",
};

const INITIAL_OPTIONS: ProjectOptions = {
  externalResources: ["https://cdn.tailwindcss.com"],
};

export default function Home() {
  const [files, setFiles] = useState<ProjectFiles>(INITIAL_FILES);
  const [dependencies, setDependencies] = useState<ProjectDependencies>(INITIAL_DEPENDENCIES);
  const [options, setOptions] = useState<ProjectOptions>(INITIAL_OPTIONS);

  return (
    <ProjectProvider>
      <EditorLayout
        files={files}
        dependencies={dependencies}
        options={options}
      />
    </ProjectProvider>
  );
}
