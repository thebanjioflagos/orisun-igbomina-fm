import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Orisun Igbomina FM 102.1",
  description: "Privacy Policy for Orisun Igbomina Broadcasting Network (OIBN). How we collect, use, and protect your information.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-orisun-deep pt-24 pb-24 px-6">
      <div className="max-w-3xl mx-auto space-y-12">
        <header className="space-y-4 border-b border-orisun-gold/20 pb-12">
          <p className="text-orisun-gold font-unbounded text-[10px] tracking-widest uppercase">Legal</p>
          <h1 className="text-5xl md:text-7xl font-fraunces text-orisun-ivory italic">Privacy Policy</h1>
          <p className="text-orisun-ivory/40 font-dm-sans text-sm">
            Effective Date: 1 May 2026 &nbsp;·&nbsp; Last Updated: 13 May 2026
          </p>
        </header>

        <div className="space-y-10 font-dm-sans text-orisun-ivory/70 leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl font-fraunces text-orisun-gold">1. Who We Are</h2>
            <p>
              Orisun Igbomina Broadcasting Network (OIBN), operating as <strong className="text-orisun-ivory">Orisun Igbomina FM 102.1</strong>, is a licensed radio broadcasting company headquartered in Ila-Orangun, Osun State, Nigeria. This Privacy Policy explains how we collect and use information when you visit our website (<strong className="text-orisun-ivory">orisunigbominafm.com</strong>) or interact with our services.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-fraunces text-orisun-gold">2. Information We Collect</h2>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li><strong className="text-orisun-ivory">Contact information</strong> — name, email address, and phone number submitted via contact or advertising forms.</li>
              <li><strong className="text-orisun-ivory">Newsletter subscriptions</strong> — your email address when you subscribe to our newsletter.</li>
              <li><strong className="text-orisun-ivory">Payment data</strong> — advertising booking payments are processed securely by Paystack. We do not store your card details.</li>
              <li><strong className="text-orisun-ivory">Usage data</strong> — anonymous analytics data (pages visited, session duration) to improve our services.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-fraunces text-orisun-gold">3. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>To respond to your inquiries and service requests.</li>
              <li>To process and confirm advertising bookings.</li>
              <li>To send you news, cultural updates, and station announcements (only with your consent).</li>
              <li>To improve our website and services through analytics.</li>
              <li>To comply with our legal obligations under the Nigeria Data Protection Act (NDPA) 2023.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-fraunces text-orisun-gold">4. Data Sharing</h2>
            <p>
              We do not sell your personal data. We may share data with trusted third-party service providers (e.g., Paystack for payments, email delivery services) strictly for the purpose of providing our services. All third parties are contractually bound to protect your data.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-fraunces text-orisun-gold">5. Your Rights (NDPA 2023)</h2>
            <p>Under the Nigeria Data Protection Act 2023, you have the right to:</p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>Access the personal data we hold about you.</li>
              <li>Request correction of inaccurate data.</li>
              <li>Request deletion of your personal data.</li>
              <li>Withdraw consent for marketing communications at any time.</li>
            </ul>
            <p>
              To exercise any of these rights, email us at{" "}
              <a href="mailto:info@orisunigbominafm.com" className="text-orisun-gold hover:underline">
                info@orisunigbominafm.com
              </a>.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-fraunces text-orisun-gold">6. Cookies</h2>
            <p>
              We use essential cookies to ensure the website functions correctly. We use analytics cookies to understand how visitors use our site. You may disable cookies in your browser settings, but some features may not work properly.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-fraunces text-orisun-gold">7. Contact Us</h2>
            <p>
              For privacy-related questions, contact our Data Protection Officer at:{" "}
              <a href="mailto:info@orisunigbominafm.com" className="text-orisun-gold hover:underline">
                info@orisunigbominafm.com
              </a>
            </p>
          </section>
        </div>

        <div className="pt-8 border-t border-orisun-gold/20">
          <Link href="/terms" className="text-orisun-gold font-unbounded text-[10px] tracking-widest uppercase hover:text-orisun-ivory transition-colors">
            View Terms of Service →
          </Link>
        </div>
      </div>
    </main>
  );
}
