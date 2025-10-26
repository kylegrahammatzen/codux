import { EditorLayout } from "@/components/editor-layout";
import { ProjectProvider } from "@/components/project-context";
import { AppHeader } from "@/components/app-header";
import { UserDropdown } from "@/components/user-dropdown";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import Image from "next/image";

type ProjectPageProps = {
  params: Promise<{
    projectId: string;
  }>;
};

export default async function ProjectPage(props: ProjectPageProps) {
  const params = await props.params;
  const projectId = params.projectId;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <ProjectProvider>
      <EditorLayout>
        <AppHeader>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon-sm" className="bg-white">
              <svg
                className="size-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </Button>

            <span className="text-sm font-medium">Logo</span>

            <Separator orientation="vertical" className="h-4 rotate-12" />

            <span className="text-sm">Untitled Project</span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="bg-white"
              render={<Link href="https://github.com/kylegrahammatzen/codux" target="_blank" rel="noopener noreferrer" />}
            >
              <Image src="/github-mark.png" alt="GitHub" width={20} height={20} className="size-5" />
            </Button>
            <Button size="sm">Deploy</Button>
            <UserDropdown user={session?.user ?? null} />
          </div>
        </AppHeader>
      </EditorLayout>
    </ProjectProvider>
  );
}
