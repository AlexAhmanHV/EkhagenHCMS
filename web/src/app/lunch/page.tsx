import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl, breadcrumbJsonLd, pageTitle } from "@/lib/seo";
import { getHomepageContent } from "@/lib/strapi";

export const metadata: Metadata = {
  title: pageTitle("Lunch"),
  description:
    "Aktuell lunch på Ekhagens Restaurang med veckans rätter, öppettider och kontakt för bokning.",
  alternates: {
    canonical: absoluteUrl("/lunch"),
  },
};

export default async function LunchPage() {
  const home = await getHomepageContent();
  const breadcrumb = breadcrumbJsonLd([
    { name: "Hem", path: "/" },
    { name: "Lunch", path: "/lunch" },
  ]);

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 py-10 md:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <section className="section-card p-6 md:p-8">
        <h1 className="font-[var(--font-playfair)] text-4xl text-[var(--brand)]">
          Lunch på Ekhagens Restaurang
        </h1>
        <p className="mt-3 text-zinc-700">
          {home.lunchmenyBeskrivning ||
            "Vi serverar lunch med fokus på råvaror i säsong och tydliga smaker."}
        </p>
      </section>

      <section className="section-card p-6 md:p-8">
        <h2 className="font-[var(--font-playfair)] text-2xl text-[var(--brand)]">
          {home.lunchmenyRubrik || "Aktuell lunchmeny"}
        </h2>
        <p className="mt-3 text-sm text-zinc-700">
          Menyn uppdateras löpande och kan variera över veckan. För hela PDF-menyn, besök{" "}
          <Link href="/meny" className="underline">
            menysidan
          </Link>
          .
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/boka"
            className="rounded-lg border border-[var(--line)] bg-white px-4 py-2 text-sm font-semibold text-[var(--brand-2)]"
          >
            Boka bord till lunch
          </Link>
          <Link
            href="/kontakt"
            className="rounded-lg border border-[var(--line)] bg-white px-4 py-2 text-sm font-semibold text-[var(--brand-2)]"
          >
            Kontakt och öppettider
          </Link>
          <Link
            href="/nyheter"
            className="rounded-lg border border-[var(--line)] bg-white px-4 py-2 text-sm font-semibold text-[var(--brand-2)]"
          >
            Senaste nyheterna
          </Link>
        </div>
      </section>
    </main>
  );
}
