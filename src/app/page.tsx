import { EditorLayout } from "@/components/editor-layout";
import { ProjectProvider } from "@/components/project-context";

export default function Home() {
  return (
    <ProjectProvider>
      <EditorLayout />
    </ProjectProvider>
  );
}
