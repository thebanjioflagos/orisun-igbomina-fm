"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: ""
  });
  
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to send message");
      }

      setStatus("success");
      setFormData({ name: "", email: "", subject: "General Inquiry", message: "" });
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setErrorMessage(err.message || "An error occurred. Please try again.");
    }
  };

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
            
            {status === "success" ? (
              <div className="bg-green-500/10 border border-green-500/20 p-8 text-center space-y-4">
                <CheckCircle2 className="text-green-500 mx-auto" size={48} />
                <h4 className="text-xl font-fraunces text-green-500">Ẹ kaabọ̀! Message Sent.</h4>
                <p className="text-orisun-ivory/80 font-dm-sans">Thank you for reaching out. Our team will get back to you shortly.</p>
                <button 
                  onClick={() => setStatus("idle")}
                  className="mt-4 text-[10px] font-unbounded text-orisun-gold tracking-widest uppercase underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label className="text-[10px] font-unbounded text-orisun-gold tracking-widest uppercase">Your Name</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-orisun-gold/40 py-2 outline-none text-orisun-ivory focus:border-orisun-gold transition-colors font-dm-sans" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-unbounded text-orisun-gold tracking-widest uppercase">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-orisun-gold/40 py-2 outline-none text-orisun-ivory focus:border-orisun-gold transition-colors font-dm-sans" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-unbounded text-orisun-gold tracking-widest uppercase">Subject</label>
                  <select 
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-orisun-gold/40 py-2 outline-none text-orisun-ivory focus:border-orisun-gold transition-colors font-dm-sans"
                  >
                    <option className="bg-orisun-deep" value="General Inquiry">General Inquiry</option>
                    <option className="bg-orisun-deep" value="Advertising">Advertising</option>
                    <option className="bg-orisun-deep" value="News Tip">News Tip</option>
                    <option className="bg-orisun-deep" value="Dedication">Dedication</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-unbounded text-orisun-gold tracking-widest uppercase">Message</label>
                  <textarea 
                    rows={4} 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    minLength={10}
                    className="w-full bg-transparent border-b border-orisun-gold/40 py-2 outline-none text-orisun-ivory focus:border-orisun-gold transition-colors font-dm-sans resize-none" 
                  />
                </div>
                
                {status === "error" && (
                  <div className="flex items-center gap-2 text-red-400 text-sm font-dm-sans">
                    <AlertCircle size={16} />
                    <span>{errorMessage}</span>
                  </div>
                )}
                
                <button 
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full py-4 bg-orisun-gold text-orisun-deep font-unbounded font-bold text-xs tracking-widest flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "submitting" ? "SENDING..." : (
                    <>SEND MESSAGE <Send size={14} /></>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
