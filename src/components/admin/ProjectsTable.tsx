"use client";

import { useState } from "react";
import { ProjectForm } from "./ProjectForm";

interface Project {
  id: string;
  slug: string;
  titleEn: string;
  titleFa: string;
  published: boolean;
  featured: boolean;
  createdAt: Date | string;
}

export function ProjectsTable({ initialProjects }: { initialProjects: Project[] }) {
  const [projects, setProjects] = useState(initialProjects);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const refreshProjects = async () => {
    const res = await fetch("/api/admin/projects");
    if (res.ok) {
      const data = await res.json();
      setProjects(data);
    }
    setShowForm(false);
    setEditingProject(null);
  };

  const deleteProject = async (id: string) => {
    if (!confirm("Delete this project? This action cannot be undone.")) return;

    const res = await fetch(`/api/admin/projects/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <p className="text-muted">{projects.length} total projects</p>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingProject(null);
          }}
          className="bg-accent text-primary px-6 py-3 rounded-lg font-semibold hover:bg-accent-hover transition"
        >
          + Add Project
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-soft overflow-hidden">
        <table className="w-full">
          <thead className="bg-background border-b border-border">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-semibold text-primary">
                Title
              </th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-primary">
                Slug
              </th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-primary">
                Status
              </th>
              <th className="text-right px-6 py-4 text-sm font-semibold text-primary">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-12 text-muted">
                  No projects yet. Click "Add Project" to create one.
                </td>
              </tr>
            )}
            {projects.map((project) => (
              <tr
                key={project.id}
                className="border-b border-border hover:bg-background transition"
              >
                <td className="px-6 py-4 font-medium text-primary">
                  {project.titleEn}
                  <p className="text-xs text-muted">{project.titleFa}</p>
                </td>
                <td className="px-6 py-4 text-muted text-sm">
                  {project.slug}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      project.published
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {project.published ? "Published" : "Draft"}
                  </span>
                  {project.featured && (
                    <span className="ml-2 px-2 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800">
                      ⭐ Featured
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => {
                      setEditingProject(project);
                      setShowForm(true);
                    }}
                    className="text-accent hover:underline text-sm font-semibold mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProject(project.id)}
                    className="text-red-600 hover:underline text-sm font-semibold"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showForm && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto"
          onClick={() => {
            setShowForm(false);
            setEditingProject(null);
          }}
        >
          <div
            className="bg-white rounded-xl max-w-4xl w-full my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="text-2xl font-heading font-bold text-primary">
                {editingProject ? "Edit Project" : "Add New Project"}
              </h2>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingProject(null);
                }}
                className="text-muted hover:text-primary text-2xl"
              >
                ×
              </button>
            </div>

            <div className="p-6">
              <ProjectForm
                initialData={editingProject}
                onSuccess={refreshProjects}
                onCancel={() => {
                  setShowForm(false);
                  setEditingProject(null);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}