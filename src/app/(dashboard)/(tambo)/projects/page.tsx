import { PanelHeader } from "@/components/panel-header";
import { BreadcrumbItem, BreadcrumbPage } from "@/components/ui/breadcrumbs";
import { ProjectsProvider, type Project } from "@/providers/projects-provider";
import { ProjectSearchBar } from "@/components/project/search-bar";
import { ProjectList } from "@/components/project/project-list";
import { ProjectCount } from "@/components/project/project-count";
import { getUserProjects } from "@/actions/project";
import { hasSession } from "@/lib/auth";

export default async function ProjectsPage() {
  const session = await hasSession();

  const result = await getUserProjects(session.user.id);
  const projects: Project[] = result.projects.map((project) => ({
    id: project.id,
    name: project.name,
    updatedAt: new Date(project.updatedAt),
  }));

  return (
    <ProjectsProvider initialProjects={projects}>
      <PanelHeader>
        <BreadcrumbItem>
          <BreadcrumbPage>
            Projects <ProjectCount />
          </BreadcrumbPage>
        </BreadcrumbItem>
      </PanelHeader>
      <div className="flex-1 flex flex-col min-h-0 overflow-y-auto p-4">
        <div className="flex flex-col gap-4">
          <ProjectSearchBar />
          <ProjectList />
        </div>
      </div>
    </ProjectsProvider>
  );
}
