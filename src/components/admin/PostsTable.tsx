"use client";

import { useState } from "react";
import { PostForm } from "./PostForm";

interface Post {
  id: string;
  slug: string;
  titleEn: string;
  titleFa: string;
  published: boolean;
  createdAt: Date | string;
}

export function PostsTable({ initialPosts }: { initialPosts: Post[] }) {
  const [posts, setPosts] = useState(initialPosts);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  const refreshPosts = async () => {
    const res = await fetch("/api/admin/posts");
    if (res.ok) {
      const data = await res.json();
      setPosts(data);
    }
    setShowForm(false);
    setEditingPost(null);
  };

  const deletePost = async (id: string) => {
    if (!confirm("Delete this post? This action cannot be undone.")) return;

    const res = await fetch(`/api/admin/posts/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setPosts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <p className="text-muted">{posts.length} total posts</p>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingPost(null);
          }}
          className="bg-accent text-primary px-6 py-3 rounded-lg font-semibold hover:bg-accent-hover transition"
        >
          + Add Post
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
            {posts.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-12 text-muted">
                  No posts yet. Click "Add Post" to create one.
                </td>
              </tr>
            )}
            {posts.map((post) => (
              <tr
                key={post.id}
                className="border-b border-border hover:bg-background transition"
              >
                <td className="px-6 py-4 font-medium text-primary">
                  {post.titleEn}
                  <p className="text-xs text-muted">{post.titleFa}</p>
                </td>
                <td className="px-6 py-4 text-muted text-sm">{post.slug}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      post.published
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {post.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => {
                      setEditingPost(post);
                      setShowForm(true);
                    }}
                    className="text-accent hover:underline text-sm font-semibold mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deletePost(post.id)}
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

      {showForm && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto"
          onClick={() => {
            setShowForm(false);
            setEditingPost(null);
          }}
        >
          <div
            className="bg-white rounded-xl max-w-4xl w-full my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="text-2xl font-heading font-bold text-primary">
                {editingPost ? "Edit Post" : "Add New Post"}
              </h2>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingPost(null);
                }}
                className="text-muted hover:text-primary text-2xl"
              >
                ×
              </button>
            </div>
            <div className="p-6">
              <PostForm
                initialData={editingPost}
                onSuccess={refreshPosts}
                onCancel={() => {
                  setShowForm(false);
                  setEditingPost(null);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}