import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { UsersTable } from "@/components/admin/UsersTable";

export default async function UsersPage() {
  const session = await getServerSession(authOptions);
  const currentUserRole = (session?.user as any)?.role;

  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-primary">Users</h1>
        <p className="text-muted mt-1">Manage team members and permissions</p>
      </div>

      <UsersTable initialUsers={users} currentUserRole={currentUserRole} />
    </div>
  );
}