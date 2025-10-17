import { ProjectProvider } from "@/components/project-context";
import { AppHeader } from "@/components/app-header";
import { AppLayout } from "@/components/app-layout";

export default function Home() {
  return (
    <ProjectProvider>
      <div className="flex flex-col gap-2 h-full">
        <AppHeader />
        <AppLayout />
      </div>
    </ProjectProvider>
  );
}
