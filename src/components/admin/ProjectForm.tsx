"use client";

import { useState } from "react";

interface ProjectFormProps {
  initialData?: any;
  onSuccess: () => void;
  onCancel: () => void;
}

export function ProjectForm({ initialData, onSuccess, onCancel }: ProjectFormProps) {
  const [formData, setFormData] = useState({
    slug: initialData?.slug || "",
    titleEn: initialData?.titleEn || "",
    titleFa: initialData?.titleFa || "",
    industryEn: initialData?.industryEn || "",
    industryFa: initialData?.industryFa || "",
    descriptionEn: initialData?.descriptionEn || "",
    descriptionFa: initialData?.descriptionFa || "",
    contentEn: initialData?.contentEn || "",
    contentFa: initialData?.contentFa || "",
    image: initialData?.image || "",
    demoUrl: initialData?.demoUrl || "",
    tags: initialData?.tags || "",
    clientName: initialData?.clientName || "",
    result: initialData?.result || "",
    published: initialData?.published ?? false,
    featured: initialData?.featured ?? false,
    order: initialData?.order ?? 0,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : type === "number"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const url = initialData
      ? `/api/admin/projects/${initialData.id}`
      : "/api/admin/projects";
    const method = initialData ? "PATCH" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        setIsSubmitting(false);
        return;
      }

      onSuccess();
    } catch (err) {
      setError("Something went wrong");
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Slug */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-primary mb-2">
            Slug (URL) *
          </label>
          <input
            type="text"
            name="slug"
            required
            value={formData.slug}
            onChange={handleChange}
            placeholder="my-project-name"
            className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        {/* Title EN / FA */}
        <div>
          <label className="block text-sm font-semibold text-primary mb-2">
            Title (English) *
          </label>
          <input
            type="text"
            name="titleEn"
            required
            value={formData.titleEn}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-primary mb-2">
            عنوان (فارسی) *
          </label>
          <input
            type="text"
            name="titleFa"
            required
            value={formData.titleFa}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        {/* Industry EN / FA */}
        <div>
          <label className="block text-sm font-semibold text-primary mb-2">
            Industry (English)
          </label>
          <input
            type="text"
            name="industryEn"
            value={formData.industryEn}
            onChange={handleChange}
            placeholder="Roofing · Dallas, TX"
            className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-primary mb-2">
            صنعت (فارسی)
          </label>
          <input
            type="text"
            name="industryFa"
            value={formData.industryFa}
            onChange={handleChange}
            placeholder="سقف‌سازی · دالاس"
            className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        {/* Description EN / FA */}
        <div>
          <label className="block text-sm font-semibold text-primary mb-2">
            Description (English)
          </label>
          <textarea
            name="descriptionEn"
            rows={3}
            value={formData.descriptionEn}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-primary mb-2">
            توضیحات (فارسی)
          </label>
          <textarea
            name="descriptionFa"
            rows={3}
            value={formData.descriptionFa}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        {/* Demo URL */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-primary mb-2">
            Demo URL
          </label>
          <input
            type="url"
            name="demoUrl"
            value={formData.demoUrl}
            onChange={handleChange}
            placeholder="https://example.com"
            className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        {/* Image */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-primary mb-2">
            Image URL
          </label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="/images/project-1.jpg"
            className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        {/* Tags */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-primary mb-2">
            Tags (comma separated)
          </label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="HTML, CSS, JavaScript"
            className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        {/* Client Name */}
        <div>
          <label className="block text-sm font-semibold text-primary mb-2">
            Client Name
          </label>
          <input
            type="text"
            name="clientName"
            value={formData.clientName}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        {/* Result */}
        <div>
          <label className="block text-sm font-semibold text-primary mb-2">
            Result / Outcome
          </label>
          <input
            type="text"
            name="result"
            value={formData.result}
            onChange={handleChange}
            placeholder="+150% leads"
            className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        {/* Order */}
        <div>
          <label className="block text-sm font-semibold text-primary mb-2">
            Order
          </label>
          <input
            type="number"
            name="order"
            value={formData.order}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        {/* Checkboxes */}
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="published"
              checked={formData.published}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <span className="text-sm font-semibold text-primary">Published</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <span className="text-sm font-semibold text-primary">Featured</span>
          </label>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-4 border-t border-border">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-accent text-primary px-6 py-3 rounded-lg font-semibold hover:bg-accent-hover transition disabled:opacity-50"
        >
          {isSubmitting
            ? "Saving..."
            : initialData
            ? "Update Project"
            : "Create Project"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="border border-border text-primary px-6 py-3 rounded-lg font-semibold hover:bg-background transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}