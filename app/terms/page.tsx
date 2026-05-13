import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — Orisun Igbomina FM 102.1",
  description: "Terms of Service for Orisun Igbomina Broadcasting Network (OIBN). Your rights and obligations when using our website and services.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-orisun-deep pt-24 pb-24 px-6">
      <div className="max-w-3xl mx-auto space-y-12">
        <header className="space-y-4 border-b border-orisun-gold/20 pb-12">
          <p className="text-orisun-gold font-unbounded text-[10px] tracking-widest uppercase">Legal</p>
          <h1 className="text-5xl md:text-7xl font-fraunces text-orisun-ivory italic">Terms of Service</h1>
          <p className="text-orisun-ivory/40 font-dm-sans text-sm">
            Effective Date: 1 May 2026 &nbsp;·&nbsp; Last Updated: 13 May 2026
          </p>
        </header>

        <div className="space-y-10 font-dm-sans text-orisun-ivory/70 leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl font-fraunces text-orisun-gold">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the Orisun Igbomina FM website (<strong className="text-orisun-ivory">orisunigbominafm.com</strong>), you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-fraunces text-orisun-gold">2. Services Provided</h2>
            <p>Orisun Igbomina Broadcasting Network (OIBN) provides:</p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>Live and archived FM radio broadcast streaming.</li>
              <li>News and cultural content about the Igbomina people.</li>
              <li>Advertising booking and payment services.</li>
              <li>A community newsletter and AI cultural guide.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-fraunces text-orisun-gold">3. Advertising Bookings</h2>
            <p>
              All advertising bookings made through this website are subject to availability and confirmation by our team within 24 hours. Payments are processed securely by Paystack. Refunds are handled on a case-by-case basis and must be requested before the campaign air date.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-fraunces text-orisun-gold">4. Intellectual Property</h2>
            <p>
              All content on this website — including text, images, audio recordings, logos, and broadcast material — is the property of Orisun Igbomina Broadcasting Network and is protected under Nigerian copyright law. You may not reproduce, distribute, or use any content without written permission.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-fraunces text-orisun-gold">5. User Conduct</h2>
            <p>You agree not to:</p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>Use the website for any unlawful purpose.</li>
              <li>Submit false or misleading information in any form.</li>
              <li>Attempt to gain unauthorised access to any part of our systems.</li>
              <li>Use automated tools to scrape, crawl, or overload our servers.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-fraunces text-orisun-gold">6. Limitation of Liability</h2>
            <p>
              Orisun Igbomina FM is not liable for any direct, indirect, or consequential damages arising from your use of this website or our services, including but not limited to service interruptions or content inaccuracies.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-fraunces text-orisun-gold">7. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Any disputes shall be resolved in the courts of Osun State, Nigeria.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-fraunces text-orisun-gold">8. Contact</h2>
            <p>
              For any questions regarding these Terms, contact us at{" "}
              <a href="mailto:info@orisunigbominafm.com" className="text-orisun-gold hover:underline">
                info@orisunigbominafm.com
              </a>.
            </p>
          </section>
        </div>

        <div className="pt-8 border-t border-orisun-gold/20">
          <Link href="/privacy" className="text-orisun-gold font-unbounded text-[10px] tracking-widest uppercase hover:text-orisun-ivory transition-colors">
            View Privacy Policy →
          </Link>
        </div>
      </div>
    </main>
  );
}
