import { PanelHeader } from "@/components/panel-header";
import { BreadcrumbItem, BreadcrumbPage } from "@/components/ui/breadcrumbs";
import { ProjectsProvider, type Project } from "@/providers/projects-provider";
import { ProjectSearchBar } from "@/components/project/search-bar";
import { ProjectList } from "@/components/project/project-list";

export default function ProjectsPage() {
  // TODO: Fetch actual projects from database
  const mockProjects: Project[] = [
    {
      id: "1",
      name: "My Awesome Project",
      updatedAt: new Date(Date.now() - 1000 * 60 * 30),
    },
    {
      id: "2",
      name: "Another Cool Project",
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    },
    {
      id: "3",
      name: "Test Project",
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    },
  ];

  return (
    <>
      <PanelHeader>
        <BreadcrumbItem>
          <BreadcrumbPage>Projects</BreadcrumbPage>
        </BreadcrumbItem>
      </PanelHeader>
      <div className="w-full h-full overflow-y-auto p-6">
        <ProjectsProvider initialProjects={mockProjects}>
          <div className="max-w-7xl mx-auto space-y-6">
            <ProjectSearchBar />
            <ProjectList />
          </div>
        </ProjectsProvider>
      </div>
    </>
  );
}
