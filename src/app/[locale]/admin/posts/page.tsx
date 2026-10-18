import { prisma } from "@/lib/prisma";
import { PostsTable } from "@/components/admin/PostsTable";

export default async function PostsPage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-primary">Posts</h1>
        <p className="text-muted mt-1">Manage your blog articles</p>
      </div>

      <PostsTable initialPosts={posts} />
    </div>
  );
}