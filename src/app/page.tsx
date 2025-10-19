import { EditorLayout } from "@/components/editor-layout";
import { ProjectProvider } from "@/components/project-context";
import { SandpackProvider } from "@/components/sandpack-context";
import { PreviewProvider } from "@/components/preview/preview-context";

export default function Home() {
  return (
    <ProjectProvider>
      <PreviewProvider>
        <SandpackProvider>
          <EditorLayout />
        </SandpackProvider>
      </PreviewProvider>
    </ProjectProvider>
  );
}
