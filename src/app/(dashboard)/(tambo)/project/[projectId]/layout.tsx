import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { ProjectTamboProvider } from "@/components/project/project-tools-provider";

type ProjectLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ projectId: string }>;
};

export default async function ProjectLayout(props: ProjectLayoutProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const params = await props.params;

  if (!session) {
    return <>{props.children}</>;
  }

  return (
    <ProjectTamboProvider
      userId={session.user.id}
      projectId={params.projectId}
      userToken={session.session.token}
    >
      {props.children}
    </ProjectTamboProvider>
  );
}
