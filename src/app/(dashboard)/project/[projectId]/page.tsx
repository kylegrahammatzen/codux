import { EditorLayout } from "@/components/editor-layout";
import { ProjectProvider } from "@/components/project-context";
import { AppHeader } from "@/components/app-header";
import { UserDropdown } from "@/components/user-dropdown";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { hasSession } from "@/lib/auth";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

type ProjectPageProps = {
  params: Promise<{
    projectId: string;
  }>;
};

export default async function ProjectPage(props: ProjectPageProps) {
  const session = await hasSession();

  const params = await props.params;
  const projectId = params.projectId;

  // TODO: Check if project exists in database
  // For now, just validate projectId format
  if (!projectId || projectId.length === 0) {
    notFound();
  }

  return (
    <ProjectProvider>
      <EditorLayout>
        <AppHeader>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Logo</span>

            <Separator orientation="vertical" className="h-4 rotate-12" />

            <span className="text-sm">Untitled Project</span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="bg-card"
              render={<Link href="https://github.com/kylegrahammatzen/codux" target="_blank" rel="noopener noreferrer" />}
            >
              GH
              {/* <Image src="/github-mark.png" alt="GitHub" width={20} height={20} className="size-5" /> */}
            </Button>
            <Button size="sm">Deploy</Button>
            <UserDropdown user={session.user} />
          </div>
        </AppHeader>
      </EditorLayout>
    </ProjectProvider>
  );
}
