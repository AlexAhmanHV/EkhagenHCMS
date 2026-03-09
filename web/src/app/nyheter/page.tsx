import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { absoluteUrl, breadcrumbJsonLd, pageTitle } from "@/lib/seo";
import { getArticles } from "@/lib/strapi";

export const metadata: Metadata = {
  title: pageTitle("Nyheter"),
  description:
    "Senaste nyheterna från Ekhagens Restaurang med uppdateringar om meny, event och restaurangen.",
  alternates: {
    canonical: absoluteUrl("/nyheter"),
  },
};

export default async function NyheterPage() {
  const articles = (await getArticles()).filter((article) => !article.seoNoIndex);
  const breadcrumb = breadcrumbJsonLd([
    { name: "Hem", path: "/" },
    { name: "Nyheter", path: "/nyheter" },
  ]);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 md:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <section className="section-card p-6 md:p-8">
        <h1 className="font-[var(--font-playfair)] text-4xl text-[var(--brand)]">Nyheter</h1>
        <p className="mt-3 text-zinc-700">
          Här samlar vi våra senaste uppdateringar, händelser och nyheter från köket.
        </p>
        <p className="mt-3 text-sm text-zinc-600">
          Letar du efter dagens rätter? Se vår <Link href="/lunch" className="underline">lunchsida</Link> eller
          hela <Link href="/meny" className="underline">menyn</Link>. Du kan även <Link href="/boka" className="underline">boka bord</Link> direkt.
        </p>
      </section>

      {articles.length === 0 ? (
        <section className="section-card p-6 md:p-8">
          <p className="text-zinc-700">Inga publicerade artiklar just nu.</p>
        </section>
      ) : (
        <section className="grid gap-4 md:grid-cols-2">
          {articles.map((article) => (
            <article key={article.id} className="section-card overflow-hidden p-0">
              {article.coverUrl ? (
                <Image
                  src={article.coverUrl}
                  alt={article.coverAlt || "Nyhetsbild från Ekhagens Restaurang"}
                  width={960}
                  height={620}
                  className="h-52 w-full object-cover"
                />
              ) : null}
              <div className="p-5">
                <h2 className="font-[var(--font-playfair)] text-2xl text-[var(--brand)]">
                  <Link href={`/articles/${article.slug}`}>{article.title}</Link>
                </h2>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">
                  /{article.slug}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-zinc-700">
                  {article.content.slice(0, 220)}
                  {article.content.length > 220 ? "..." : ""}
                </p>
                <Link
                  href={`/articles/${article.slug}`}
                  className="mt-4 inline-block text-sm font-semibold text-[var(--brand-2)] underline decoration-[var(--accent)] underline-offset-4"
                >
                  Läs hela artikeln
                </Link>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
