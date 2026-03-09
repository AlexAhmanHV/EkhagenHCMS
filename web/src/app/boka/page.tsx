import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl, breadcrumbJsonLd, pageTitle } from "@/lib/seo";
import { getHomepageContent } from "@/lib/strapi";

export const metadata: Metadata = {
  title: pageTitle("Boka bord"),
  description: "Boka bord på Ekhagens Restaurang. Ring eller mejla för bokning.",
  alternates: {
    canonical: absoluteUrl("/boka"),
  },
};

export default async function BokaPage() {
  const home = await getHomepageContent();
  const breadcrumb = breadcrumbJsonLd([
    { name: "Hem", path: "/" },
    { name: "Boka bord", path: "/boka" },
  ]);

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 py-10 md:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <section className="section-card p-6 md:p-8">
        <h1 className="font-[var(--font-playfair)] text-4xl text-[var(--brand)]">Boka bord</h1>
        <p className="mt-3 text-zinc-700">
          Vi hjälper dig med bokningar för lunch, middag och större sällskap.
        </p>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          <a
            href={`tel:${home.footerTelefon.replace(/\s+/g, "")}`}
            className="rounded-lg border border-[var(--line)] bg-white px-4 py-3 text-sm font-semibold text-[var(--brand-2)]"
          >
            Ring: {home.footerTelefon}
          </a>
          <a
            href={`mailto:${home.footerEpost}`}
            className="rounded-lg border border-[var(--line)] bg-white px-4 py-3 text-sm font-semibold text-[var(--brand-2)]"
          >
            Mejla: {home.footerEpost}
          </a>
        </div>
      </section>

      <section className="section-card p-6 md:p-8">
        <h2 className="font-[var(--font-playfair)] text-2xl text-[var(--brand)]">Öppettider</h2>
        <p className="mt-3 text-zinc-700">{home.footerOppettiderRad1}</p>
        <p className="text-zinc-700">{home.footerOppettiderRad2}</p>
        <p className="mt-5 text-sm text-zinc-600">
          Du hittar menyunderlag på <Link href="/meny" className="underline">menysidan</Link>,
          dagens lunch på <Link href="/lunch" className="underline">lunchsidan</Link> och kontaktvägar på <Link href="/kontakt" className="underline">kontaktsidan</Link>.
        </p>
      </section>
    </main>
  );
}
