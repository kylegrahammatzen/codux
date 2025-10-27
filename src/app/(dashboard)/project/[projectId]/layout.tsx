import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { ProjectClientLayout } from "./client-layout";

type ProjectLayoutProps = {
  children: React.ReactNode;
};

export default async function ProjectLayout(props: ProjectLayoutProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <ProjectClientLayout userToken={session?.session.token}>
      {props.children}
    </ProjectClientLayout>
  );
}
