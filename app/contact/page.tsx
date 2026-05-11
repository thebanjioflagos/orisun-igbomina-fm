import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-orisun-deep pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-16 text-center">
          <h1 className="text-6xl md:text-8xl font-fraunces text-orisun-ivory mb-6 italic">Reach Out</h1>
          <p className="text-orisun-gold font-unbounded text-xs tracking-widest uppercase">The Studio is Always Open</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          {/* Info */}
          <div className="space-y-12">
            <div className="space-y-4">
              <h2 className="text-4xl font-fraunces text-orisun-gold italic">Connect with Orisun</h2>
              <p className="text-orisun-ivory/60 text-lg font-dm-sans leading-relaxed">
                Whether you have a news tip, a song dedication, or a business inquiry, our team in Ila-Orangun is ready to listen.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 border border-orisun-gold/10 bg-orisun-gold/5 space-y-4">
                <MapPin className="text-orisun-gold" size={24} />
                <h3 className="font-unbounded text-[10px] text-orisun-gold tracking-widest uppercase font-bold">Studio Location</h3>
                <p className="text-orisun-ivory font-dm-sans">
                  Broadcasting House,<br />
                  Ila-Orangun, Osun State,<br />
                  Nigeria
                </p>
              </div>
              <div className="p-8 border border-orisun-gold/10 bg-orisun-gold/5 space-y-4">
                <Phone className="text-orisun-gold" size={24} />
                <h3 className="font-unbounded text-[10px] text-orisun-gold tracking-widest uppercase font-bold">Direct Line</h3>
                <p className="text-orisun-ivory font-dm-sans">
                  +234 (0) 800 ORISUN<br />
                  +234 (0) 102 1021
                </p>
              </div>
              <div className="p-8 border border-orisun-gold/10 bg-orisun-gold/5 space-y-4">
                <Mail className="text-orisun-gold" size={24} />
                <h3 className="font-unbounded text-[10px] text-orisun-gold tracking-widest uppercase font-bold">General Email</h3>
                <p className="text-orisun-ivory font-dm-sans">
                  info@orisunigbominafm.com<br />
                  studio@orisunigbominafm.com
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-orisun-gold/5 border border-orisun-gold/20 p-12 space-y-8">
            <h3 className="text-3xl font-fraunces text-orisun-ivory italic">Send a Message</h3>
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-unbounded text-orisun-gold tracking-widest uppercase">Your Name</label>
                <input type="text" className="w-full bg-transparent border-b border-orisun-gold/40 py-2 outline-none text-orisun-ivory focus:border-orisun-gold transition-colors font-dm-sans" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-unbounded text-orisun-gold tracking-widest uppercase">Email Address</label>
                <input type="email" className="w-full bg-transparent border-b border-orisun-gold/40 py-2 outline-none text-orisun-ivory focus:border-orisun-gold transition-colors font-dm-sans" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-unbounded text-orisun-gold tracking-widest uppercase">Subject</label>
                <select className="w-full bg-transparent border-b border-orisun-gold/40 py-2 outline-none text-orisun-ivory focus:border-orisun-gold transition-colors font-dm-sans">
                  <option className="bg-orisun-deep">General Inquiry</option>
                  <option className="bg-orisun-deep">Advertising</option>
                  <option className="bg-orisun-deep">News Tip</option>
                  <option className="bg-orisun-deep">Dedication</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-unbounded text-orisun-gold tracking-widest uppercase">Message</label>
                <textarea rows={4} className="w-full bg-transparent border-b border-orisun-gold/40 py-2 outline-none text-orisun-ivory focus:border-orisun-gold transition-colors font-dm-sans resize-none" />
              </div>
              <button className="w-full py-4 bg-orisun-gold text-orisun-deep font-unbounded font-bold text-xs tracking-widest flex items-center justify-center gap-2">
                SEND MESSAGE <Send size={14} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
