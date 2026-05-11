import { cn } from "@/lib/utils";

const newsCategories = [
  "All", "Breaking", "Community", "Politics", "Culture", "Economy", "Sports"
];

const mockNews = [
  {
    title: "Ila-Orangun Celebrates Ancient Heritage in Grand Style",
    category: "Culture",
    excerpt: "The annual festival brought together thousands of Igbomina people from across the globe...",
    image: "https://images.unsplash.com/photo-1599739291060-4578e77dac5d?auto=format&fit=crop&q=80&w=800",
    date: "May 5, 2026",
  },
  {
    title: "New Agricultural Hub to Boost Osun State Economy",
    category: "Economy",
    excerpt: "The State Government has commissioned a multi-billion naira processing center in Ila-Orangun...",
    image: "https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?auto=format&fit=crop&q=80&w=800",
    date: "May 4, 2026",
  },
  {
    title: "Orisun Igbomina FM Launches Digital Heritage Archive",
    category: "Community",
    excerpt: "The station has begun digitizing centuries of oral history and oriki for the next generation...",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800",
    date: "May 3, 2026",
  }
];

export default function NewsHub() {
  return (
    <main className="min-h-screen bg-orisun-deep pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-5xl md:text-7xl font-fraunces text-orisun-ivory mb-4">News Hub</h1>
          <p className="text-orisun-gold font-unbounded text-sm tracking-widest uppercase">
            Voices from the Heartland
          </p>
        </header>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-4 mb-12">
          {newsCategories.map((cat) => (
            <button
              key={cat}
              className={cn(
                "px-6 py-2 border border-orisun-gold/20 rounded-full text-sm font-unbounded transition-all hover:bg-orisun-gold hover:text-orisun-deep",
                cat === "All" ? "bg-orisun-gold text-orisun-deep" : "text-orisun-ivory/60"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockNews.map((post, idx) => (
            <article
              key={idx}
              className="group cursor-pointer"
            >
              <div className="aspect-video relative overflow-hidden mb-4 border border-orisun-gold/10">
                <img
                  src={post.image}
                  alt={post.title}
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-orisun-gold text-orisun-deep font-unbounded text-[10px] font-bold">
                    {post.category}
                  </span>
                </div>
              </div>
              <p className="text-orisun-gold/60 font-mono text-[10px] mb-2">{post.date}</p>
              <h3 className="text-2xl font-fraunces text-orisun-ivory mb-2 group-hover:text-orisun-gold transition-colors">
                {post.title}
              </h3>
              <p className="text-orisun-ivory/60 text-sm font-dm-sans leading-relaxed">
                {post.excerpt}
              </p>
              <div className="mt-4 flex items-center gap-2 text-orisun-gold font-unbounded text-[10px] font-bold">
                READ STORY <div className="w-8 h-px bg-orisun-gold" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
