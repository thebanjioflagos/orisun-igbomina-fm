"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import Link from "next/link";

const newsItems = [
  {
    id:       1,
    category: "Culture",
    title:    "Ila-Orangun Annual Heritage Festival: A Global Gathering",
    excerpt:  "Thousands of Igbomina sons and daughters from across the world converged on Ila-Orangun for the 2026 heritage celebration.",
    date:     "Oct 12, 2026",
    slug:     "heritage-festival-2026",
    accent:   "bg-orisun-gold",
  },
  {
    id:       2,
    category: "News",
    title:    "New 102.1 FM Transmitter Expands Reach to Neighbouring States",
    excerpt:  "The installation of a high-power transmitter will extend Orisun FM's signal into Kwara and Ekiti State communities.",
    date:     "Oct 10, 2026",
    slug:     "transmitter-expansion",
    accent:   "bg-orisun-crimson",
  },
  {
    id:       3,
    category: "Community",
    title:    "Empowering Local Youth Through Digital Storytelling Workshops",
    excerpt:  "OIBN partners with Ila-Orangun secondary schools to train young voices in podcast production and digital journalism.",
    date:     "Oct 08, 2026",
    slug:     "youth-storytelling-workshops",
    accent:   "bg-orisun-adire",
  },
];

export default function NewsShowcase() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {newsItems.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15 }}
          className="group cursor-pointer"
        >
          <Link href={`/news/${item.slug}`}>
            {/* Image area — unique gradient per card since all use the same banner for now */}
            <div className="relative aspect-[16/10] overflow-hidden rounded-sm mb-6 bg-orisun-ivory/5 border border-orisun-gold/10">
              <img
                src="/images/banner.jpg"
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70"
              />
              {/* Unique colour overlay per card */}
              <div className={`absolute inset-0 ${item.accent} opacity-20 mix-blend-multiply`} />
              {/* Category badge */}
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 ${item.accent} text-white font-unbounded text-[8px] font-bold uppercase tracking-widest`}>
                  {item.category}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {/* Date */}
              <div className="flex items-center gap-2 text-orisun-gold/60">
                <Calendar size={12} />
                <p className="font-unbounded text-[10px] tracking-widest uppercase">{item.date}</p>
              </div>

              {/* Title */}
              <h3 className="text-xl font-fraunces text-orisun-ivory group-hover:text-orisun-gold transition-colors leading-tight italic">
                {item.title}
              </h3>

              {/* Excerpt */}
              <p className="text-sm font-dm-sans text-orisun-ivory/50 leading-relaxed line-clamp-2">
                {item.excerpt}
              </p>

              {/* Read More */}
              <div className="flex items-center gap-2 text-orisun-ivory/40 group-hover:text-orisun-gold transition-colors pt-2">
                <span className="text-[10px] font-unbounded font-bold uppercase tracking-widest">Read More</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
