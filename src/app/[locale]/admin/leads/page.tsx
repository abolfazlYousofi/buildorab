import { prisma } from "@/lib/prisma";
import { LeadsTable } from "@/components/admin/LeadsTable";

export default async function LeadsPage() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-primary">
            Leads
          </h1>
          <p className="text-muted mt-1">{leads.length} total leads</p>
        </div>
      </div>

      <LeadsTable initialLeads={leads} />
    </div>
  );
}