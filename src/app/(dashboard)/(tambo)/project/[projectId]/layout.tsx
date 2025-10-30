import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { ProjectClientLayout } from "./client-layout";
import { getProject } from "@/actions/project";

type ProjectLayoutProps = {
  children: React.ReactNode;
  params: Promise<{
    projectId: string;
  }>;
};

export default async function ProjectLayout(props: ProjectLayoutProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const params = await props.params;
  const projectId = params.projectId;

  let threadId: string | undefined;

  if (projectId) {
    const projectResult = await getProject(projectId);
    if (projectResult.success && projectResult.project) {
      threadId = projectResult.project.tamboThreadId ?? undefined;
    }
  }

  return (
    <ProjectClientLayout userToken={session?.session.token} threadId={threadId}>
      {props.children}
    </ProjectClientLayout>
  );
}
