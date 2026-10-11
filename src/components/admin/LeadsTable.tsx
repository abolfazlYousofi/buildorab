"use client";

import { useState } from "react";

interface Lead {
  id: string;
  name: string;
  email: string;
  company: string | null;
  website: string | null;
  message: string | null;
  status: string;
  createdAt: Date | string;
}

const statusColors: Record<string, string> = {
  NEW: "bg-blue-100 text-blue-800",
  CONTACTED: "bg-yellow-100 text-yellow-800",
  QUALIFIED: "bg-purple-100 text-purple-800",
  PROPOSAL: "bg-orange-100 text-orange-800",
  WON: "bg-green-100 text-green-800",
  LOST: "bg-red-100 text-red-800",
};

const statusOptions = [
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "PROPOSAL",
  "WON",
  "LOST",
];

export function LeadsTable({ initialLeads }: { initialLeads: Lead[] }) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [filter, setFilter] = useState<string>("ALL");

  const filteredLeads =
    filter === "ALL" ? leads : leads.filter((l) => l.status === filter);

  const updateStatus = async (id: string, status: string) => {
    const res = await fetch(`/api/admin/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    if (res.ok) {
      setLeads((prev) =>
        prev.map((l) => (l.id === id ? { ...l, status } : l))
      );
      if (selectedLead?.id === id) {
        setSelectedLead({ ...selectedLead, status });
      }
    }
  };

  const deleteLead = async (id: string) => {
    if (!confirm("Delete this lead? This action cannot be undone.")) return;

    const res = await fetch(`/api/admin/leads/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setLeads((prev) => prev.filter((l) => l.id !== id));
      setSelectedLead(null);
    }
  };

  return (
    <>
      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFilter("ALL")}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
            filter === "ALL"
              ? "bg-primary text-white"
              : "bg-white text-muted hover:text-primary"
          }`}
        >
          All ({leads.length})
        </button>
        {statusOptions.map((status) => {
          const count = leads.filter((l) => l.status === status).length;
          return (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                filter === status
                  ? "bg-primary text-white"
                  : "bg-white text-muted hover:text-primary"
              }`}
            >
              {status} ({count})
            </button>
          );
        })}
      </div>

      {/* Table */}
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
                Company
              </th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-primary">
                Status
              </th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-primary">
                Date
              </th>
              <th className="text-right px-6 py-4 text-sm font-semibold text-primary">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-12 text-muted">
                  No leads yet. They will appear here when someone submits the
                  contact form.
                </td>
              </tr>
            )}
            {filteredLeads.map((lead) => (
              <tr
                key={lead.id}
                className="border-b border-border hover:bg-background transition"
              >
                <td className="px-6 py-4 font-medium text-primary">
                  {lead.name}
                </td>
                <td className="px-6 py-4 text-muted text-sm">{lead.email}</td>
                <td className="px-6 py-4 text-muted text-sm">
                  {lead.company || "—"}
                </td>
                <td className="px-6 py-4">
                  <select
                    value={lead.status}
                    onChange={(e) => updateStatus(lead.id, e.target.value)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold border-0 cursor-pointer ${
                      statusColors[lead.status]
                    }`}
                  >
                    {statusOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-6 py-4 text-muted text-sm">
                  {new Date(lead.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => setSelectedLead(lead)}
                    className="text-accent hover:underline text-sm font-semibold mr-3"
                  >
                    View
                  </button>
                  <button
                    onClick={() => deleteLead(lead.id)}
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
      {selectedLead && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedLead(null)}
        >
          <div
            className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="text-2xl font-heading font-bold text-primary">
                Lead Details
              </h2>
              <button
                onClick={() => setSelectedLead(null)}
                className="text-muted hover:text-primary text-2xl"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <p className="text-sm font-semibold text-muted mb-1">Name</p>
                <p className="text-primary">{selectedLead.name}</p>
              </div>

              <div>
                <p className="text-sm font-semibold text-muted mb-1">Email</p>
                <a
                  href={`mailto:${selectedLead.email}`}
                  className="text-accent hover:underline"
                >
                  {selectedLead.email}
                </a>
              </div>

              {selectedLead.company && (
                <div>
                  <p className="text-sm font-semibold text-muted mb-1">
                    Company
                  </p>
                  <p className="text-primary">{selectedLead.company}</p>
                </div>
              )}

              {selectedLead.website && (
                <div>
                  <p className="text-sm font-semibold text-muted mb-1">
                    Website
                  </p>
                  <a
                    href={selectedLead.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    {selectedLead.website}
                  </a>
                </div>
              )}

              {selectedLead.message && (
                <div>
                  <p className="text-sm font-semibold text-muted mb-1">
                    Message
                  </p>
                  <p className="text-primary whitespace-pre-wrap">
                    {selectedLead.message}
                  </p>
                </div>
              )}

              <div>
                <p className="text-sm font-semibold text-muted mb-1">Status</p>
                <select
                  value={selectedLead.status}
                  onChange={(e) =>
                    updateStatus(selectedLead.id, e.target.value)
                  }
                  className={`px-3 py-1 rounded-full text-xs font-semibold border-0 cursor-pointer ${
                    statusColors[selectedLead.status]
                  }`}
                >
                  {statusOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <p className="text-sm font-semibold text-muted mb-1">
                  Received
                </p>
                <p className="text-primary">
                  {new Date(selectedLead.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="pt-4 border-t border-border flex gap-3">
                <a
                  href={`mailto:${selectedLead.email}?subject=Re: Your inquiry to Buildorab`}
                  className="bg-accent text-primary px-6 py-3 rounded-lg font-semibold hover:bg-accent-hover transition"
                >
                  Reply via Email
                </a>
                <button
                  onClick={() => deleteLead(selectedLead.id)}
                  className="border-2 border-red-500 text-red-500 px-6 py-3 rounded-lg font-semibold hover:bg-red-500 hover:text-white transition"
                >
                  Delete Lead
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}