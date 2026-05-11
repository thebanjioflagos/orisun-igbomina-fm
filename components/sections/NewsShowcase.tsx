"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const newsItems = [
  {
    id: 1,
    category: "Culture",
    title: "Ila-Orangun Annual Heritage Festival: A Global Gathering",
    date: "Oct 12, 2026",
    image: "/images/banner.jpg"
  },
  {
    id: 2,
    category: "News",
    title: "New 102.1 FM Transmitter Expands Reach to Neighboring States",
    date: "Oct 10, 2026",
    image: "/images/banner.jpg"
  },
  {
    id: 3,
    category: "Community",
    title: "Empowering Local Youth Through Digital Storytelling Workshops",
    date: "Oct 08, 2026",
    image: "/images/banner.jpg"
  }
];

export default function NewsShowcase() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {newsItems.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
          className="group cursor-pointer"
        >
          <div className="relative aspect-[16/10] overflow-hidden rounded-sm mb-6 bg-orisun-ivory/5 border border-orisun-gold/10">
            <img 
              src={item.image} 
              alt={item.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60"
            />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-orisun-crimson text-white font-unbounded text-[8px] font-bold uppercase tracking-widest">
                {item.category}
              </span>
            </div>
          </div>
          
          <div className="space-y-4">
            <p className="text-orisun-gold font-unbounded text-[10px] tracking-widest uppercase">{item.date}</p>
            <h3 className="text-2xl font-fraunces text-orisun-ivory group-hover:text-orisun-gold transition-colors leading-tight italic">
              {item.title}
            </h3>
            <div className="flex items-center gap-2 text-orisun-ivory/40 group-hover:text-orisun-gold transition-colors">
              <span className="text-[10px] font-unbounded font-bold uppercase tracking-widest">Read More</span>
              <ArrowRight size={14} />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
