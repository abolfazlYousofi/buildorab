import { prisma } from "@/lib/prisma";
import { ProjectsTable } from "@/components/admin/ProjectsTable";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-primary">
          Projects
        </h1>
        <p className="text-muted mt-1">
          Manage your portfolio projects
        </p>
      </div>

      <ProjectsTable initialProjects={projects} />
    </div>
  );
}