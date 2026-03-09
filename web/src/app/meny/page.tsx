import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { absoluteUrl, breadcrumbJsonLd, pageTitle, siteName } from "@/lib/seo";
import { getHomepageContent } from "@/lib/strapi";

export const metadata: Metadata = {
  title: pageTitle("Meny"),
  description: "Lunchmeny och kvällsmeny på Ekhagens Restaurang.",
  alternates: {
    canonical: absoluteUrl("/meny"),
  },
};

export default async function MenyPage() {
  const home = await getHomepageContent();
  const breadcrumb = breadcrumbJsonLd([
    { name: "Hem", path: "/" },
    { name: "Meny", path: "/meny" },
  ]);
  const menuJsonLd = {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: `${siteName} meny`,
    hasMenuSection: [
      {
        "@type": "MenuSection",
        name: home.lunchmenyRubrik,
      },
      {
        "@type": "MenuSection",
        name: home.kvallsmenyRubrik,
      },
    ],
  };
  const lunchMenuPdf = home.lunchmenyPdfUrl;
  const dinnerMenuPdf = home.kvallsmenyPdfUrl;
  const lunchMenuPdfEmbed = lunchMenuPdf
    ? `/api/pdf-proxy?src=${encodeURIComponent(lunchMenuPdf)}`
    : "";
  const dinnerMenuPdfEmbed = dinnerMenuPdf
    ? `/api/pdf-proxy?src=${encodeURIComponent(dinnerMenuPdf)}`
    : "";

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-10 md:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(menuJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <section className="section-card p-6 md:p-8">
        <h1 className="font-[var(--font-playfair)] text-4xl text-[var(--brand)]">Meny</h1>
        <p className="mt-3 text-zinc-700">
          Här hittar du lunchmeny, kvällsmeny och ett urval av våra populära rätter.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="section-card overflow-hidden p-0">
          <div className="p-6 pb-0">
            <h2 className="mt-2 font-[var(--font-playfair)] text-3xl text-[var(--brand)]">
              {home.lunchmenyRubrik}
            </h2>
            <p className="mt-3 text-sm text-zinc-700">{home.lunchmenyBeskrivning}</p>
          </div>
          {lunchMenuPdfEmbed ? (
            <div className="mt-5 overflow-hidden border-y border-[var(--line)] bg-white shadow-sm">
              <iframe
                src={`${lunchMenuPdfEmbed}#toolbar=0&navpanes=0&scrollbar=0&view=FitH&zoom=page-width`}
                title="Lunchmeny PDF"
                scrolling="no"
                className="h-[52vh] min-h-[380px] w-full md:h-[84vh] md:min-h-[720px]"
              />
            </div>
          ) : (
            <p className="m-6 rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-900">
              Ingen lunchmeny-PDF vald än i CMS.
            </p>
          )}
        </article>

        <article className="section-card overflow-hidden p-0">
          <div className="p-6 pb-0">
            <h2 className="mt-2 font-[var(--font-playfair)] text-3xl text-[var(--brand)]">
              {home.kvallsmenyRubrik}
            </h2>
            <p className="mt-3 text-sm text-zinc-700">{home.kvallsmenyBeskrivning}</p>
          </div>
          {dinnerMenuPdfEmbed ? (
            <div className="mt-5 overflow-hidden border-y border-[var(--line)] bg-white shadow-sm">
              <iframe
                src={`${dinnerMenuPdfEmbed}#toolbar=0&navpanes=0&scrollbar=0&view=FitH&zoom=page-width`}
                title="Kvällsmeny PDF"
                scrolling="no"
                className="h-[52vh] min-h-[380px] w-full md:h-[84vh] md:min-h-[720px]"
              />
            </div>
          ) : (
            <p className="m-6 text-sm text-zinc-500">Ingen kvällsmeny-PDF vald.</p>
          )}
        </article>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <article className="section-card overflow-hidden p-0">
          {home.menuCardOneImageUrl ? (
            <Image
              src={home.menuCardOneImageUrl}
              alt={home.menuCardOneImageAlt || "Lunchrätt från Ekhagens Restaurang"}
              width={900}
              height={620}
              className="h-44 w-full object-cover"
            />
          ) : null}
          <div className="p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
              {home.menuCardOneLabel}
            </p>
            <h2 className="mt-2 font-[var(--font-playfair)] text-2xl">{home.menuCardOneTitle}</h2>
            <p className="mt-3 text-sm text-zinc-700">{home.menuCardOneText}</p>
          </div>
        </article>

        <article className="section-card overflow-hidden p-0">
          {home.menuCardTwoImageUrl ? (
            <Image
              src={home.menuCardTwoImageUrl}
              alt={home.menuCardTwoImageAlt || "Middagsrätt från Ekhagens Restaurang"}
              width={900}
              height={620}
              className="h-44 w-full object-cover"
            />
          ) : null}
          <div className="p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
              {home.menuCardTwoLabel}
            </p>
            <h2 className="mt-2 font-[var(--font-playfair)] text-2xl">{home.menuCardTwoTitle}</h2>
            <p className="mt-3 text-sm text-zinc-700">{home.menuCardTwoText}</p>
          </div>
        </article>

        <article className="section-card overflow-hidden p-0">
          {home.menuCardThreeImageUrl ? (
            <Image
              src={home.menuCardThreeImageUrl}
              alt={home.menuCardThreeImageAlt || "Dessert från Ekhagens Restaurang"}
              width={900}
              height={620}
              className="h-44 w-full object-cover"
            />
          ) : null}
          <div className="p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
              {home.menuCardThreeLabel}
            </p>
            <h2 className="mt-2 font-[var(--font-playfair)] text-2xl">{home.menuCardThreeTitle}</h2>
            <p className="mt-3 text-sm text-zinc-700">{home.menuCardThreeText}</p>
          </div>
        </article>
      </section>

      <section className="section-card p-6 md:p-8">
        <p className="text-sm text-zinc-700">
          Vill du se mer detaljerat innehåll? Läs om <Link href="/lunch" className="underline">lunch</Link> och <Link href="/middag" className="underline">middag</Link>, eller <Link href="/boka" className="underline">boka bord</Link> direkt.
        </p>
      </section>
    </main>
  );
}
