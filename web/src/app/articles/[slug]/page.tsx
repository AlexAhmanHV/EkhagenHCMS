import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { absoluteUrl, breadcrumbJsonLd, siteName } from "@/lib/seo";
import { getArticleBySlug, getArticles } from "@/lib/strapi";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: siteName,
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const pageTitle = article.metaTitle || `${article.title} | ${siteName}`;
  const description =
    article.metaDescription || article.content.slice(0, 160) || `Läs mer på ${siteName}.`;
  const canonical = absoluteUrl(`/articles/${article.slug}`);
  const noIndex = article.seoNoIndex;

  return {
    title: pageTitle,
    description,
    alternates: {
      canonical,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
    openGraph: {
      type: "article",
      url: canonical,
      title: article.metaTitle || article.title,
      description,
      images: article.coverUrl ? [{ url: article.coverUrl }] : [],
      publishedTime: article.publishedAt || undefined,
      modifiedTime: article.updatedAt || undefined,
      locale: "sv_SE",
    },
    twitter: {
      card: "summary_large_image",
      title: article.metaTitle || article.title,
      description,
      images: article.coverUrl ? [article.coverUrl] : [],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = (await getArticles())
    .filter((item) => item.slug !== article.slug && !item.seoNoIndex)
    .slice(0, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.content.slice(0, 160),
    image: article.coverUrl || undefined,
    datePublished: article.publishedAt || undefined,
    dateModified: article.updatedAt || undefined,
    mainEntityOfPage: absoluteUrl(`/articles/${article.slug}`),
    author: {
      "@type": "Organization",
      name: siteName,
    },
    publisher: {
      "@type": "Organization",
      name: siteName,
    },
  };
  const breadcrumb = breadcrumbJsonLd([
    { name: "Hem", path: "/" },
    { name: "Nyheter", path: "/nyheter" },
    { name: article.title, path: `/articles/${article.slug}` },
  ]);

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 py-10 md:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <Link
        href="/"
        className="text-sm font-semibold text-[var(--brand-2)] underline decoration-[var(--accent)] underline-offset-4"
      >
        Tillbaka till startsidan
      </Link>

      <article className="section-card p-6 md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
          Artikel
        </p>
        <h1 className="mt-2 font-[var(--font-playfair)] text-4xl text-[var(--brand)]">
          {article.title}
        </h1>
        <p className="mt-1 text-sm text-zinc-500">/{article.slug}</p>

        {article.coverUrl ? (
          <Image
            src={article.coverUrl}
            alt={article.coverAlt || "Bild från Ekhagens Restaurang"}
            width={1200}
            height={800}
            className="mt-6 h-auto w-full rounded-xl object-cover"
          />
        ) : null}

        {article.content ? (
          <p className="mt-7 whitespace-pre-wrap leading-relaxed text-zinc-800">
            {article.content}
          </p>
        ) : (
          <p className="mt-7 text-zinc-500">Ingen brödtext i denna artikel.</p>
        )}

        <div className="mt-8 border-t border-[var(--line)] pt-6">
          <h2 className="font-[var(--font-playfair)] text-2xl text-[var(--brand)]">Relaterat</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {relatedArticles.map((related) => (
              <Link
                key={related.id}
                href={`/articles/${related.slug}`}
                className="rounded-lg border border-[var(--line)] bg-white px-4 py-3 text-sm font-semibold text-[var(--brand-2)] underline decoration-[var(--accent)] underline-offset-4"
              >
                {related.title}
              </Link>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/meny" className="text-sm font-semibold text-[var(--brand-2)] underline decoration-[var(--accent)] underline-offset-4">
              Meny
            </Link>
            <Link href="/boka" className="text-sm font-semibold text-[var(--brand-2)] underline decoration-[var(--accent)] underline-offset-4">
              Boka bord
            </Link>
            <Link href="/kontakt" className="text-sm font-semibold text-[var(--brand-2)] underline decoration-[var(--accent)] underline-offset-4">
              Kontakt
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}

