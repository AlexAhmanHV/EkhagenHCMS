import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl, breadcrumbJsonLd, pageTitle, siteName } from "@/lib/seo";
import { getHomepageContent } from "@/lib/strapi";

export const metadata: Metadata = {
  title: pageTitle("Kontakt"),
  description: "Kontaktuppgifter till Ekhagens Restaurang: adress, telefon, e-post och öppettider.",
  alternates: {
    canonical: absoluteUrl("/kontakt"),
  },
};

export default async function KontaktPage() {
  const home = await getHomepageContent();
  const breadcrumb = breadcrumbJsonLd([
    { name: "Hem", path: "/" },
    { name: "Kontakt", path: "/kontakt" },
  ]);
  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: siteName,
    url: absoluteUrl("/"),
    telephone: home.footerTelefon || undefined,
    email: home.footerEpost || undefined,
    address: home.footerAdress
      ? {
          "@type": "PostalAddress",
          streetAddress: home.footerAdress,
          addressCountry: "SE",
        }
      : undefined,
  };

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 py-10 md:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <section className="section-card p-6 md:p-8">
        <h1 className="font-[var(--font-playfair)] text-4xl text-[var(--brand)]">Kontakt</h1>
        <div className="mt-5 grid gap-4 text-zinc-800 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">Adress</p>
            <p className="mt-1">{home.footerAdress}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">Telefon</p>
            <p className="mt-1">
              <a
                className="font-semibold text-[var(--brand-2)] underline decoration-[var(--accent)] underline-offset-4"
                href={`tel:${home.footerTelefon.replace(/\s+/g, "")}`}
              >
                {home.footerTelefon}
              </a>
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">E-post</p>
            <p className="mt-1">
              <a
                className="font-semibold text-[var(--brand-2)] underline decoration-[var(--accent)] underline-offset-4"
                href={`mailto:${home.footerEpost}`}
              >
                {home.footerEpost}
              </a>
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">Öppettider</p>
            <p className="mt-1">{home.footerOppettiderRad1}</p>
            <p>{home.footerOppettiderRad2}</p>
          </div>
        </div>
        <p className="mt-5 text-sm text-zinc-600">
          Läs mer om <Link href="/lunch" className="underline">lunch</Link>, <Link href="/middag" className="underline">middag</Link> och <Link href="/nyheter" className="underline">nyheter</Link> innan du bokar.
        </p>
      </section>
    </main>
  );
}
