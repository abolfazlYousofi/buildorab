"use client";

import { useState } from "react";
import { RichTextEditor } from "./RichTextEditor";

interface PostFormProps {
  initialData?: any;
  onSuccess: () => void;
  onCancel: () => void;
}

export function PostForm({ initialData, onSuccess, onCancel }: PostFormProps) {
  const [formData, setFormData] = useState({
    slug: initialData?.slug || "",
    titleEn: initialData?.titleEn || "",
    titleFa: initialData?.titleFa || "",
    excerptEn: initialData?.excerptEn || "",
    excerptFa: initialData?.excerptFa || "",
    contentEn: initialData?.contentEn || "",
    contentFa: initialData?.contentFa || "",
    coverImage: initialData?.coverImage || "",
    published: initialData?.published ?? false,
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
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const url = initialData
      ? `/api/admin/posts/${initialData.id}`
      : "/api/admin/posts";
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
            placeholder="my-article-name"
            className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

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

        <div>
          <label className="block text-sm font-semibold text-primary mb-2">
            Excerpt (English)
          </label>
          <textarea
            name="excerptEn"
            rows={2}
            value={formData.excerptEn}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-primary mb-2">
            خلاصه (فارسی)
          </label>
          <textarea
            name="excerptFa"
            rows={2}
            value={formData.excerptFa}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-primary mb-2">
            Cover Image URL
          </label>
          <input
            type="text"
            name="coverImage"
            value={formData.coverImage}
            onChange={handleChange}
            placeholder="/images/blog-cover.jpg"
            className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-primary mb-2">
            Content (English) *
          </label>
          <RichTextEditor
            content={formData.contentEn}
            onChange={(html) => setFormData((prev) => ({ ...prev, contentEn: html }))}
            placeholder="Write your article in English..."
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-primary mb-2">
            محتوا (فارسی) *
          </label>
          <RichTextEditor
            content={formData.contentFa}
            onChange={(html) => setFormData((prev) => ({ ...prev, contentFa: html }))}
            placeholder="مقاله خود را به فارسی بنویسید..."
          />
        </div>

        <div className="md:col-span-2">
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
        </div>
      </div>

      <div className="flex gap-3 pt-4 border-t border-border">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-accent text-primary px-6 py-3 rounded-lg font-semibold hover:bg-accent-hover transition disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : initialData ? "Update Post" : "Create Post"}
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