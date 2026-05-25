"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Plus, Edit, Trash2, Loader2, Eye } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";

interface Post {
  id: string;
  title: string;
  status: string;
  createdAt: Date;
  author: { name: string };
}

export default function NewsActionsClient({ posts: initial }: { posts: Post[] }) {
  const router = useRouter();
  const [posts, setPosts] = useState(initial);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [loading, setLoading] = useState<string | null>(null);

  const filtered = posts.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.author.name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "ALL" || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  async function deletePost(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setLoading(`${id}-delete`);
    try {
      const res = await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch {
      alert("Failed to delete article.");
    } finally {
      setLoading(null);
    }
  }

  async function togglePublish(id: string, currentStatus: string) {
    const newStatus = currentStatus === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
    setLoading(`${id}-status`);
    try {
      const res = await fetch(`/api/admin/posts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed to update");
      setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p)));
    } catch {
      alert("Failed to update article status.");
    } finally {
      setLoading(null);
    }
  }

  const statusColors: Record<string, string> = {
    PUBLISHED: "bg-green-500/10 text-green-400 border-green-500/20",
    UNDER_REVIEW: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    DRAFT: "bg-orisun-gold/10 text-orisun-gold border-orisun-gold/20",
  };

  return (
    <>
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3 flex-1 w-full">
          <div className="flex items-center gap-2 bg-white/5 border border-orisun-gold/10 rounded-sm px-3 py-2 flex-1">
            <Search size={16} className="text-orisun-ivory/30 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-orisun-ivory text-sm outline-none placeholder:text-orisun-ivory/30 w-full"
            />
          </div>
          <div className="flex gap-2">
            {["ALL", "PUBLISHED", "UNDER_REVIEW", "DRAFT"].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 text-xs font-unbounded rounded border transition-colors whitespace-nowrap ${
                  statusFilter === s
                    ? "bg-orisun-gold text-orisun-deep border-orisun-gold"
                    : "bg-white/5 text-orisun-ivory/80 border-white/10 hover:bg-white/10"
                }`}
              >
                {s === "UNDER_REVIEW" ? "Review" : s.charAt(0) + s.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>

        <Link
          href="/admin/news/new"
          className="flex items-center gap-2 bg-orisun-gold text-orisun-deep px-4 py-2 rounded font-unbounded text-sm hover:bg-orisun-gold/90 transition-colors whitespace-nowrap"
        >
          <Plus size={16} /> New Article
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white/[0.02] border border-orisun-gold/10 rounded-sm overflow-hidden">
        <table className="w-full text-left text-sm font-dm-sans">
          <thead className="bg-white/5 text-orisun-ivory/70 border-b border-orisun-gold/10">
            <tr>
              <th className="px-6 py-4 font-medium">Title</th>
              <th className="px-6 py-4 font-medium hidden md:table-cell">Author</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium hidden lg:table-cell">Date</th>
              <th className="px-6 py-4 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-orisun-gold/5">
            {filtered.map((post) => (
              <tr key={post.id} className="hover:bg-white/[0.02] transition-colors text-orisun-ivory/80">
                <td className="px-6 py-4 font-fraunces truncate max-w-xs">
                  <span className="truncate block max-w-[200px] md:max-w-xs" title={post.title}>
                    {post.title}
                  </span>
                </td>
                <td className="px-6 py-4 hidden md:table-cell">{post.author.name}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => togglePublish(post.id, post.status)}
                    disabled={loading === `${post.id}-status`}
                    title={post.status === "PUBLISHED" ? "Click to unpublish" : "Click to publish"}
                    className={`inline-flex px-2 py-1 rounded text-[10px] font-unbounded font-bold uppercase border cursor-pointer hover:opacity-80 transition-opacity disabled:opacity-50 ${
                      statusColors[post.status] || "bg-white/10 text-orisun-ivory/60 border-white/20"
                    }`}
                  >
                    {loading === `${post.id}-status` ? (
                      <Loader2 size={12} className="animate-spin" />
                    ) : (
                      post.status.replace("_", " ")
                    )}
                  </button>
                </td>
                <td className="px-6 py-4 text-xs text-orisun-ivory/50 hidden lg:table-cell">
                  {format(new Date(post.createdAt), "MMM d, yyyy")}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-3">
                    <Link
                      href={`/admin/news/${post.id}/edit`}
                      className="text-orisun-ivory/50 hover:text-orisun-gold transition-colors"
                      title="Edit"
                    >
                      <Edit size={16} />
                    </Link>
                    <button
                      onClick={() => deletePost(post.id, post.title)}
                      disabled={!!loading}
                      className="text-orisun-ivory/50 hover:text-orisun-crimson transition-colors disabled:opacity-50"
                      title="Delete"
                    >
                      {loading === `${post.id}-delete` ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <Trash2 size={16} />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-orisun-ivory/50 border-t border-orisun-gold/5">
                  {search || statusFilter !== "ALL"
                    ? "No articles match your filter."
                    : "No articles yet. Create your first one."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
