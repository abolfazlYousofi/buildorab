import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const [leadCount, projectCount, postCount, newLeads] = await Promise.all([
    prisma.lead.count(),
    prisma.project.count(),
    prisma.post.count(),
    prisma.lead.count({ where: { status: "NEW" } }),
  ]);

  const stats = [
    { label: "Total Leads", value: leadCount, icon: "📬", color: "text-accent" },
    { label: "New Leads", value: newLeads, icon: "🔥", color: "text-red-500" },
    { label: "Projects", value: projectCount, icon: "🏗️", color: "text-primary" },
    { label: "Posts", value: postCount, icon: "📝", color: "text-primary" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-heading font-bold text-primary mb-2">
        Dashboard
      </h1>
      <p className="text-muted mb-8">Welcome to Buildorab admin panel</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white p-6 rounded-xl shadow-soft"
          >
            <div className="text-3xl mb-3">{stat.icon}</div>
            <p className="text-sm text-muted mb-1">{stat.label}</p>
            <p className={`text-3xl font-heading font-bold ${stat.color}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}