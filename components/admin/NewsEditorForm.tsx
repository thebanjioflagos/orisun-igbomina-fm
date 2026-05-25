"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { Save, ArrowLeft, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function NewsEditorForm() {
  const router = useRouter();
  const { data: session } = useSession();
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("<p>Write your article here...</p>");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"DRAFT" | "UNDER_REVIEW" | "PUBLISHED">("DRAFT");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/admin/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content,
          status,
          authorId: session?.user?.id
        }),
      });

      if (res.ok) {
        router.push("/admin/news");
        router.refresh();
      } else {
        const error = await res.json();
        alert(`Failed to save: ${error.message || 'Unknown error'}`);
      }
    } catch (err) {
      console.error(err);
      alert("Network error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isEditor = session?.user?.role === "admin" || session?.user?.role === "presenter";

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-5xl mx-auto w-full">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/news" className="w-8 h-8 flex items-center justify-center rounded-sm bg-white/5 hover:bg-white/10 text-orisun-ivory/60 transition-colors">
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="font-fraunces text-2xl text-orisun-ivory font-bold">New Article</h1>
            <p className="text-orisun-ivory/40 text-xs font-dm-sans">Create a new publication</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <select 
            value={status}
            onChange={(e) => setStatus(e.target.value as "DRAFT" | "UNDER_REVIEW" | "PUBLISHED")}
            className="bg-black/50 border border-orisun-gold/20 text-sm text-orisun-ivory rounded px-3 py-2 outline-none focus:border-orisun-gold font-dm-sans"
          >
            <option value="DRAFT">Save as Draft</option>
            <option value="UNDER_REVIEW">Submit for Review</option>
            {isEditor && <option value="PUBLISHED">Publish Immediately</option>}
          </select>
          
          <button 
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 bg-orisun-gold text-orisun-deep px-6 py-2 rounded font-unbounded text-sm hover:bg-orisun-gold/90 transition-colors disabled:opacity-50"
          >
            <Save size={16} />
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-orisun-ivory/60 text-xs font-dm-sans uppercase tracking-widest mb-2">Article Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a compelling title..."
            className="w-full bg-white/[0.02] border border-orisun-gold/20 rounded-sm p-4 text-xl font-fraunces text-orisun-ivory placeholder:text-orisun-ivory/20 focus:outline-none focus:border-orisun-gold/50 transition-colors"
            required
          />
        </div>
        
        {/* Featured Image - Mockup for now */}
        <div>
          <label className="block text-orisun-ivory/60 text-xs font-dm-sans uppercase tracking-widest mb-2">Featured Image</label>
          <div className="w-full h-32 border-2 border-dashed border-orisun-gold/20 rounded-sm bg-white/[0.01] flex flex-col items-center justify-center text-orisun-ivory/40 hover:bg-white/[0.03] hover:border-orisun-gold/40 transition-all cursor-pointer group">
            <ImageIcon size={24} className="mb-2 group-hover:text-orisun-gold transition-colors" />
            <span className="text-sm font-dm-sans">Click to upload featured image</span>
          </div>
        </div>

        <div>
          <label className="block text-orisun-ivory/60 text-xs font-dm-sans uppercase tracking-widest mb-2">Content</label>
          <RichTextEditor content={content} onChange={setContent} />
        </div>
      </div>
    </form>
  );
}
