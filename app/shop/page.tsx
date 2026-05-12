"use client";

import { motion } from "framer-motion";
import { ShoppingBag, Star, ShieldCheck, ArrowRight } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Ayan Agalu Carving",
    artisan: "Baba Tunde of Ila",
    price: "₦45,000",
    image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&q=80&w=800",
    category: "Woodwork"
  },
  {
    id: 2,
    name: "Igbomina Adire Silk",
    artisan: "Mama Osun Dyers",
    price: "₦12,500",
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=800",
    category: "Textiles"
  },
  {
    id: 3,
    name: "Bronze Ife Replica",
    artisan: "Osun Heritage Guild",
    price: "₦85,000",
    image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&q=80&w=800",
    category: "Sculpture"
  }
];

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-orisun-deep pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto space-y-24">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-orisun-gold/10 border border-orisun-gold/20 rounded-full">
              <Star className="text-orisun-gold" size={12} />
              <span className="text-[10px] font-unbounded text-orisun-gold font-bold uppercase tracking-widest">Heritage Marketplace</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-fraunces text-orisun-ivory italic">The Heritage Shop</h1>
            <p className="text-orisun-ivory/60 font-dm-sans text-lg">
              Empowering local Igbomina artisans. Every purchase directly supports the hands that carve our history.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="text-right">
              <p className="text-orisun-gold font-unbounded text-2xl font-bold">12</p>
              <p className="text-orisun-ivory/40 text-[10px] font-unbounded uppercase tracking-widest">Local Artisans</p>
            </div>
            <div className="w-px h-12 bg-orisun-gold/20" />
            <div className="text-right">
              <p className="text-orisun-gold font-unbounded text-2xl font-bold">100%</p>
              <p className="text-orisun-ivory/40 text-[10px] font-unbounded uppercase tracking-widest">Fair Trade</p>
            </div>
          </div>
        </header>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {products.map((product) => (
            <motion.div 
              key={product.id}
              whileHover={{ y: -10 }}
              className="group space-y-6"
            >
              <div className="aspect-[4/5] relative overflow-hidden bg-orisun-gold/5 border border-orisun-gold/10">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-orisun-deep/80 backdrop-blur-md border border-orisun-gold/20 text-[10px] font-unbounded text-orisun-gold uppercase tracking-widest">
                  {product.category}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="text-2xl font-fraunces text-orisun-ivory">{product.name}</h3>
                  <p className="text-xl font-unbounded text-orisun-gold">{product.price}</p>
                </div>
                <p className="text-orisun-ivory/40 text-sm font-dm-sans">by {product.artisan}</p>
              </div>

              <button className="w-full py-4 border border-orisun-gold/40 text-orisun-gold font-unbounded text-[10px] font-bold tracking-widest hover:bg-orisun-gold hover:text-orisun-deep transition-all flex items-center justify-center gap-2">
                VIEW DETAILS <ArrowRight size={14} />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Support Banner */}
        <section className="bg-orisun-gold/5 border border-orisun-gold/20 p-12 text-center space-y-8">
          <ShieldCheck className="text-orisun-gold mx-auto" size={48} />
          <h2 className="text-4xl font-fraunces text-orisun-ivory italic">Authenticity Guaranteed</h2>
          <p className="max-w-2xl mx-auto text-orisun-ivory/60 font-dm-sans">
            Every item in the Heritage Shop is verified by the Orisun Igbomina Cultural Council for authenticity and craftsmanship.
          </p>
        </section>
      </div>
    </main>
  );
}
