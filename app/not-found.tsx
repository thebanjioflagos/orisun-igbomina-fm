import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-orisun-deep px-6">
      <div className="text-center space-y-8 max-w-md">
        {/* Decorative 404 */}
        <div className="space-y-2">
          <h1 className="text-9xl font-fraunces text-orisun-gold italic">404</h1>
          <div className="w-24 h-[2px] bg-orisun-gold/40 mx-auto" />
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-fraunces text-orisun-ivory italic">
            Page Not Found
          </h2>
          <p className="text-orisun-ivory/60 font-dm-sans text-sm leading-relaxed">
            Ẹ má bínú — the page you&apos;re looking for doesn&apos;t exist or has been moved.
            Let us guide you back to the broadcast.
          </p>
        </div>

        <Link
          href="/"
          className="inline-block px-8 py-3 bg-orisun-gold text-orisun-deep font-unbounded text-[10px] font-bold tracking-widest uppercase hover:bg-orisun-gold/90 transition-colors"
        >
          Return Home
        </Link>
      </div>
    </main>
  );
}
