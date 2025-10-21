import { EditorLayout } from "@/components/editor-layout";
import { ProjectProvider } from "@/components/project-context";
import { HistoryProvider } from "@/components/history-context";
import type { ProjectFiles, ProjectDependencies, ProjectOptions } from "@/components/project-context";

export default function Home() {
  // TODO: Later fetch from DB or load dynamically
  const files: ProjectFiles = {
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

  const dependencies: ProjectDependencies = {
    react: "^19.2.0",
    "react-dom": "^19.2.0",
  };

  const options: ProjectOptions = {
    externalResources: ["https://cdn.tailwindcss.com"],
  };

  return (
    <HistoryProvider>
      <ProjectProvider>
        <EditorLayout
          files={files}
          dependencies={dependencies}
          options={options}
        />
      </ProjectProvider>
    </HistoryProvider>
  );
}
