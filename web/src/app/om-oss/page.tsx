import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { absoluteUrl, breadcrumbJsonLd, pageTitle } from "@/lib/seo";
import { getHomepageContent } from "@/lib/strapi";

export const metadata: Metadata = {
  title: pageTitle("Om oss"),
  description: "Om Ekhagens Restaurang och vår matfilosofi.",
  alternates: {
    canonical: absoluteUrl("/om-oss"),
  },
};

export default async function OmOssPage() {
  const home = await getHomepageContent();
  const breadcrumb = breadcrumbJsonLd([
    { name: "Hem", path: "/" },
    { name: "Om oss", path: "/om-oss" },
  ]);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 md:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <section className="section-card p-6 md:p-8">
        <h1 className="font-[var(--font-playfair)] text-4xl text-[var(--brand)]">Om oss</h1>
        <p className="mt-3 max-w-3xl text-zinc-700">{home.heroDescription}</p>
        <p className="mt-4 text-zinc-700">{home.footerKolumn1Text}</p>
        <p className="mt-4 text-sm text-zinc-600">
          Utforska vår <Link href="/meny" className="underline">meny</Link>, se aktuell <Link href="/lunch" className="underline">lunch</Link> och läs <Link href="/nyheter" className="underline">nyheter</Link> från köket.
        </p>
      </section>

      {home.galleryImageUrls.length > 0 ? (
        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {home.galleryImageUrls.slice(0, 6).map((imageUrl) => (
            <div key={imageUrl} className="section-card overflow-hidden p-0">
              <Image
                src={imageUrl}
                alt="Miljöbild från Ekhagens Restaurang"
                width={900}
                height={600}
                className="h-52 w-full object-cover"
              />
            </div>
          ))}
        </section>
      ) : null}
    </main>
  );
}
