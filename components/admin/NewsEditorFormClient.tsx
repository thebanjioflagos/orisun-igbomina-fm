"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { Save, ArrowLeft, Image as ImageIcon, Loader2 } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface Post {
  id?: string;
  title: string;
  content: string;
  status: string;
  image?: string | null;
}

interface NewsEditorFormClientProps {
  post?: Post;
}

export default function NewsEditorFormClient({ post }: NewsEditorFormClientProps) {
  const router = useRouter();
  const { data: session } = useSession();
  
  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "<p>Write your article here...</p>");
  const [image, setImage] = useState(post?.image || "");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"DRAFT" | "UNDER_REVIEW" | "PUBLISHED">(
    (post?.status as "DRAFT" | "UNDER_REVIEW" | "PUBLISHED") || "DRAFT"
  );

  const isEditMode = !!post?.id;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    
    setIsSubmitting(true);
    try {
      const url = isEditMode ? `/api/admin/posts/${post.id}` : "/api/admin/posts";
      const method = isEditMode ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content,
          image,
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
            <h1 className="font-fraunces text-2xl text-orisun-ivory font-bold">
              {isEditMode ? "Edit Article" : "New Article"}
            </h1>
            <p className="text-orisun-ivory/40 text-xs font-dm-sans">
              {isEditMode ? "Modify existing publication" : "Create a new publication"}
            </p>
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
            {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
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
        
        {/* Featured Image Upload */}
        <div>
          <label className="block text-orisun-ivory/60 text-xs font-dm-sans uppercase tracking-widest mb-2">Featured Image</label>
          <div className="relative w-full h-48 border-2 border-dashed border-orisun-gold/20 rounded-sm bg-white/[0.01] flex flex-col items-center justify-center overflow-hidden hover:bg-white/[0.03] hover:border-orisun-gold/40 transition-all cursor-pointer group">
            {image ? (
              <img src={image} alt="Featured" className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center text-orisun-ivory/40 group-hover:text-orisun-gold transition-colors">
                {uploadingImage ? <Loader2 size={24} className="mb-2 animate-spin" /> : <ImageIcon size={24} className="mb-2" />}
                <span className="text-sm font-dm-sans">{uploadingImage ? "Uploading..." : "Click to upload featured image"}</span>
              </div>
            )}
            <input 
              type="file" 
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setUploadingImage(true);
                try {
                  const fd = new FormData();
                  fd.append("file", file);
                  const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
                  if (!res.ok) throw new Error("Upload failed");
                  const data = await res.json();
                  setImage(data.url);
                } catch (err: any) {
                  alert(err.message);
                } finally {
                  setUploadingImage(false);
                }
              }}
            />
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
