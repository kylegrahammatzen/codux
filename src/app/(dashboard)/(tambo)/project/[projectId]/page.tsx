import { EditorLayout } from "@/components/preview/editor-layout";
import { ProjectProvider } from "@/providers/project-provider";
import { AppHeader } from "@/components/app-header";
import { UserDropdown } from "@/components/user-dropdown";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumbs";
import { hasSession } from "@/lib/auth";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { ProjectTitle } from "@/components/project/project-title";
import { getProjectFiles, uploadProjectFiles } from "@/actions/storage";

type ProjectPageProps = {
  params: Promise<{
    projectId: string;
  }>;
};

export default async function ProjectPage(props: ProjectPageProps) {
  const session = await hasSession();

  const params = await props.params;
  const projectId = params.projectId;

  if (!projectId || projectId.length === 0) {
    redirect("/");
  }

  // Project will be created in DB on first message submission if it doesn't exist

  // Default files for new projects
  const defaultFiles = {
    "/App.tsx": `export default function App() {
  return (
    <div className="p-2">
      <h1 className="text-2xl font-bold mb-2">Hello World</h1>
      <p className="text-gray-600">Edit App.tsx to get started!</p>
    </div>
  );
}`,
    "/index.tsx": `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const root = createRoot(document.getElementById("root")!);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);`,
    "/package.json": JSON.stringify(
      {
        dependencies: {
          react: "^19.2.0",
          "react-dom": "^19.2.0",
        },
        main: "/index.tsx",
      },
      null,
      2
    ),
  };

  // Load files from Supabase Storage
  const filesResult = await getProjectFiles(session.user.id, projectId);
  let files: Record<string, string> = filesResult.files;

  // If no files exist in storage, upload default files
  if (Object.keys(files).length === 0) {
    await uploadProjectFiles(session.user.id, projectId, defaultFiles);
    files = defaultFiles;
  }

  // Parse dependencies from package.json
  let dependencies: Record<string, string> = {
    react: "^19.2.0",
    "react-dom": "^19.2.0",
  };

  const packageJson = files["/package.json"];
  if (packageJson) {
    try {
      const parsed = JSON.parse(packageJson);
      if (parsed.dependencies) {
        dependencies = parsed.dependencies;
      }
    } catch (error) {
      console.error("Failed to parse package.json:", error);
    }
  }

  const options = {
    externalResources: ["https://cdn.tailwindcss.com"],
  };

  return (
    <ProjectProvider>
      <EditorLayout files={files} dependencies={dependencies} options={options} userId={session.user.id} projectId={projectId}>
        <AppHeader>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Codux</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator variant="slash" />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  <ProjectTitle />
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

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
