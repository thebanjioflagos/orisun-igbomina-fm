"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Italic, List, ListOrdered, Quote, Heading2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
}

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    editorProps: {
      attributes: {
        class: "prose prose-invert prose-orisun max-w-none focus:outline-none min-h-[400px] p-4 text-orisun-ivory/80 text-sm font-dm-sans",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="border border-orisun-gold/20 rounded-sm overflow-hidden bg-white/[0.02]">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-orisun-gold/20 bg-black/40">
        <ToolbarButton 
          active={editor.isActive("bold")} 
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold size={14} />
        </ToolbarButton>
        <ToolbarButton 
          active={editor.isActive("italic")} 
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic size={14} />
        </ToolbarButton>
        <div className="w-px h-4 bg-orisun-gold/20 mx-1" />
        <ToolbarButton 
          active={editor.isActive("heading", { level: 2 })} 
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          <Heading2 size={14} />
        </ToolbarButton>
        <div className="w-px h-4 bg-orisun-gold/20 mx-1" />
        <ToolbarButton 
          active={editor.isActive("bulletList")} 
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List size={14} />
        </ToolbarButton>
        <ToolbarButton 
          active={editor.isActive("orderedList")} 
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered size={14} />
        </ToolbarButton>
        <div className="w-px h-4 bg-orisun-gold/20 mx-1" />
        <ToolbarButton 
          active={editor.isActive("blockquote")} 
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <Quote size={14} />
        </ToolbarButton>
      </div>
      
      {/* Editor Content */}
      <EditorContent editor={editor} />
    </div>
  );
}

function ToolbarButton({ children, active, onClick }: { children: React.ReactNode, active: boolean, onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "p-1.5 rounded transition-colors",
        active 
          ? "bg-orisun-gold/20 text-orisun-gold" 
          : "text-orisun-ivory/50 hover:bg-white/5 hover:text-orisun-ivory"
      )}
    >
      {children}
    </button>
  );
}
