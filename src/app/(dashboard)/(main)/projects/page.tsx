import { PanelHeader } from "@/components/panel-header";

export default function ProjectsPage() {
  return (
    <>
      <PanelHeader title="Projects" />
      <div className="w-full h-full p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {/* Project cards will go here */}
        </div>
      </div>
    </>
  );
}
