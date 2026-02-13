import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/strapi";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 py-10 md:py-14">
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
            alt={article.coverAlt}
            width={1200}
            height={800}
            className="mt-6 h-auto w-full rounded-xl object-cover"
            unoptimized
          />
        ) : null}

        {article.content ? (
          <p className="mt-7 whitespace-pre-wrap leading-relaxed text-zinc-800">
            {article.content}
          </p>
        ) : (
          <p className="mt-7 text-zinc-500">Ingen brodtext i denna artikel.</p>
        )}
      </article>
    </main>
  );
}
