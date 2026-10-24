"use client";

import { useState } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: Date | string;
}

const roles = ["OWNER", "ADMIN", "EDITOR", "VIEWER"];

const roleColors: Record<string, string> = {
  OWNER: "bg-red-100 text-red-800",
  ADMIN: "bg-purple-100 text-purple-800",
  EDITOR: "bg-blue-100 text-blue-800",
  VIEWER: "bg-gray-100 text-gray-800",
};

export function UsersTable({
  initialUsers,
  currentUserRole,
}: {
  initialUsers: User[];
  currentUserRole: string;
}) {
  const [users, setUsers] = useState(initialUsers);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    role: "EDITOR",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const refreshUsers = async () => {
    const res = await fetch("/api/admin/users");
    if (res.ok) {
      const data = await res.json();
      setUsers(data);
    }
    setShowForm(false);
    setFormData({ email: "", name: "", password: "", role: "EDITOR" });
  };

  const updateRole = async (id: string, role: string) => {
    const res = await fetch(`/api/admin/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });

    if (res.ok) {
      setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role } : u)));
    }
  };

  const deleteUser = async (id: string) => {
    if (!confirm("Delete this user? This cannot be undone.")) return;

    const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });

    if (res.ok) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } else {
      const data = await res.json();
      alert(data.error || "Failed to delete user");
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
      refreshUsers();
    } else {
      setError(data.error || "Failed to create user");
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <p className="text-muted">{users.length} total users</p>
        {["OWNER", "ADMIN"].includes(currentUserRole) && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-accent text-primary px-6 py-3 rounded-lg font-semibold hover:bg-accent-hover transition"
          >
            + Add User
          </button>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-soft overflow-hidden">
        <table className="w-full">
          <thead className="bg-background border-b border-border">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-semibold text-primary">
                Name
              </th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-primary">
                Email
              </th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-primary">
                Role
              </th>
              <th className="text-right px-6 py-4 text-sm font-semibold text-primary">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-border hover:bg-background transition"
              >
                <td className="px-6 py-4 font-medium text-primary">
                  {user.name}
                </td>
                <td className="px-6 py-4 text-muted text-sm">{user.email}</td>
                <td className="px-6 py-4">
                  {["OWNER", "ADMIN"].includes(currentUserRole) ? (
                    <select
                      value={user.role}
                      onChange={(e) => updateRole(user.id, e.target.value)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold border-0 cursor-pointer ${
                        roleColors[user.role]
                      }`}
                    >
                      {roles.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        roleColors[user.role]
                      }`}
                    >
                      {user.role}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  {currentUserRole === "OWNER" && (
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="text-red-600 hover:underline text-sm font-semibold"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">
              Add New User
            </h2>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  Password
                </label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  Role
                </label>
                <select
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  {roles.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              {error && (
                <p className="text-red-600 text-sm font-semibold">{error}</p>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-accent text-primary px-6 py-3 rounded-lg font-semibold hover:bg-accent-hover transition disabled:opacity-50"
                >
                  {isSubmitting ? "Creating..." : "Create User"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="border border-border text-primary px-6 py-3 rounded-lg font-semibold hover:bg-background transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}