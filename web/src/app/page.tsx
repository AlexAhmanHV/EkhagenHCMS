import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { draftMode } from "next/headers";
import { absoluteUrl, siteName } from "@/lib/seo";
import {
  getArticles,
  getHomepageContent,
  type Article,
} from "@/lib/strapi";

export async function generateMetadata(): Promise<Metadata> {
  const home = await getHomepageContent();
  const title = siteName;
  const description = home.heroDescription || "Välkommen till Ekhagens Restaurang.";
  const image = home.heroImageUrl || undefined;

  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl("/"),
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl("/"),
      type: "website",
      images: image ? [{ url: image }] : [],
      locale: "sv_SE",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : [],
    },
  };
}

export default async function Home() {
  const { isEnabled } = await draftMode();
  let articles: Article[] = [];
  let errorMessage = "";
  const home = await getHomepageContent();

  try {
    articles = await getArticles();
  } catch (error) {
    errorMessage = error instanceof Error ? error.message : "Okant fel.";
  }

  const heroImage = home.heroImageUrl;
  const galleryImages = home.galleryImageUrls;
  const lunchMenuPdf = home.lunchmenyPdfUrl;
  const dinnerMenuPdf = home.kvallsmenyPdfUrl;
  const lunchMenuPdfEmbed = lunchMenuPdf
    ? `/api/pdf-proxy?src=${encodeURIComponent(lunchMenuPdf)}`
    : "";
  const dinnerMenuPdfEmbed = dinnerMenuPdf
    ? `/api/pdf-proxy?src=${encodeURIComponent(dinnerMenuPdf)}`
    : "";
  const showLunchCard = home.visaLunchmenyDel;
  const showDinnerCard = home.visaKvallsmenyDel;
  const visibleMenuCards = Number(showLunchCard) + Number(showDinnerCard);
  const singleMenuCard = visibleMenuCards === 1;

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-10 md:py-14">
      {home.visaToppen ? (
      <section className="hero-shell reveal p-7 md:p-10">
        <div className="relative z-10 grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            {home.visaOverrubrikToppen ? (
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-200">
                {home.heroKicker}
              </p>
            ) : null}
            {home.visaHuvudrubrikToppen ? (
              <h1 className="font-[var(--font-playfair)] text-4xl leading-tight md:text-6xl">
                {home.heroTitle}
              </h1>
            ) : null}
            {home.visaBeskrivningToppen ? (
              <p className="max-w-xl text-sm text-emerald-50/90 md:text-base">
                {home.heroDescription}
              </p>
            ) : null}
          </div>

          <div>
            {home.visaBildToppen && heroImage ? (
              <div className="overflow-hidden rounded-2xl border border-white/30">
                <Image
                  src={heroImage}
                  alt={home.heroImageAlt || "Uteservering på Ekhagens Restaurang"}
                  width={1080}
                  height={720}
                  className="h-56 w-full object-cover md:h-64"
                />
              </div>
            ) : null}
          </div>
        </div>
      </section>
      ) : null}

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <Link className="section-card px-4 py-3 text-center text-sm font-semibold text-[var(--brand)] transition hover:bg-[color-mix(in_srgb,var(--brand)_7%,#fff)]" href="/nyheter">
          Nyheter
        </Link>
        <Link className="section-card px-4 py-3 text-center text-sm font-semibold text-[var(--brand)] transition hover:bg-[color-mix(in_srgb,var(--brand)_7%,#fff)]" href="/meny">
          Meny
        </Link>
        <Link className="section-card px-4 py-3 text-center text-sm font-semibold text-[var(--brand)] transition hover:bg-[color-mix(in_srgb,var(--brand)_7%,#fff)]" href="/boka">
          Boka bord
        </Link>
        <Link className="section-card px-4 py-3 text-center text-sm font-semibold text-[var(--brand)] transition hover:bg-[color-mix(in_srgb,var(--brand)_7%,#fff)]" href="/kontakt">
          Kontakt
        </Link>
        <Link className="section-card px-4 py-3 text-center text-sm font-semibold text-[var(--brand)] transition hover:bg-[color-mix(in_srgb,var(--brand)_7%,#fff)]" href="/om-oss">
          Om oss
        </Link>
      </section>

      {home.visaLunchmenySektion && visibleMenuCards > 0 ? (
      <section
        id="meny-pdf"
        className={`grid gap-4 ${singleMenuCard ? "md:grid-cols-1" : "md:grid-cols-2"}`}
      >
        {showLunchCard ? (
        <article className={`section-card reveal overflow-hidden p-0 ${singleMenuCard ? "md:mx-auto md:w-full md:max-w-3xl" : ""}`}>
          <div className="p-6 pb-0">
            {home.visaLunchmenyRubrik ? (
              <h2 className="mt-2 font-[var(--font-playfair)] text-3xl text-[var(--brand)]">
                {home.lunchmenyRubrik}
              </h2>
            ) : null}
            {home.visaLunchmenyBeskrivning ? (
              <p className="mt-3 text-sm text-zinc-700">{home.lunchmenyBeskrivning}</p>
            ) : null}
          </div>
          {home.visaLunchmenyPdf && lunchMenuPdfEmbed ? (
            <div className="mt-5 overflow-hidden border-y border-[var(--line)] bg-white shadow-sm">
              <iframe
                src={`${lunchMenuPdfEmbed}#toolbar=0&navpanes=0&scrollbar=0&view=FitH&zoom=page-width`}
                title="Lunchmeny PDF"
                scrolling="no"
                className="h-[52vh] min-h-[380px] w-full md:h-[84vh] md:min-h-[720px]"
              />
            </div>
          ) : (
            <p className="mt-5 rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-900">
              Ingen lunchmeny-PDF vald än i CMS.
            </p>
          )}
        </article>
        ) : null}

        {showDinnerCard ? (
        <article className={`section-card reveal delay-1 overflow-hidden p-0 ${singleMenuCard ? "md:mx-auto md:w-full md:max-w-3xl" : ""}`}>
          <div className="p-6 pb-0">
            {home.visaKvallsmenyRubrik ? (
              <h2 className="mt-2 font-[var(--font-playfair)] text-3xl text-[var(--brand)]">
                {home.kvallsmenyRubrik}
              </h2>
            ) : null}
            {home.visaKvallsmenyBeskrivning ? (
              <p className="mt-3 text-sm text-zinc-700">{home.kvallsmenyBeskrivning}</p>
            ) : null}
          </div>
          {home.visaKvallsmenyPdf && dinnerMenuPdfEmbed ? (
            <div className="mt-5 overflow-hidden border-y border-[var(--line)] bg-white shadow-sm">
              <iframe
                src={`${dinnerMenuPdfEmbed}#toolbar=0&navpanes=0&scrollbar=0&view=FitH&zoom=page-width`}
                title="Kvällsmeny PDF"
                scrolling="no"
                className="h-[52vh] min-h-[380px] w-full md:h-[84vh] md:min-h-[720px]"
              />
            </div>
          ) : (
            <p className="mt-5 text-sm text-zinc-500">Ingen kvällsmeny-PDF vald.</p>
          )}
        </article>
        ) : null}
      </section>
      ) : null}

      {home.visaMenykortSektion ? (
      <section id="meny" className="grid gap-4 md:grid-cols-3">
        {home.visaMenyKort1 ? (
        <article className="section-card reveal overflow-hidden p-0">
          {home.menuCardOneImageUrl ? (
            <Image
              src={home.menuCardOneImageUrl}
              alt={home.menuCardOneImageAlt || "Lunchrätt på Ekhagens Restaurang"}
              width={900}
              height={620}
              className="h-44 w-full object-cover"
            />
          ) : null}
          <div className="p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
              {home.menuCardOneLabel}
            </p>
            <h2 className="mt-2 font-[var(--font-playfair)] text-2xl">
              {home.menuCardOneTitle}
            </h2>
            <p className="mt-3 text-sm text-zinc-700">
              {home.menuCardOneText}
            </p>
          </div>
        </article>
        ) : null}

        {home.visaMenyKort2 ? (
        <article className="section-card reveal delay-1 overflow-hidden p-0">
          {home.menuCardTwoImageUrl ? (
            <Image
              src={home.menuCardTwoImageUrl}
              alt={home.menuCardTwoImageAlt || "Middagsrätt på Ekhagens Restaurang"}
              width={900}
              height={620}
              className="h-44 w-full object-cover"
            />
          ) : null}
          <div className="p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
              {home.menuCardTwoLabel}
            </p>
            <h2 className="mt-2 font-[var(--font-playfair)] text-2xl">
              {home.menuCardTwoTitle}
            </h2>
            <p className="mt-3 text-sm text-zinc-700">
              {home.menuCardTwoText}
            </p>
          </div>
        </article>
        ) : null}

        {home.visaMenyKort3 ? (
        <article className="section-card reveal delay-2 overflow-hidden p-0">
          {home.menuCardThreeImageUrl ? (
            <Image
              src={home.menuCardThreeImageUrl}
              alt={home.menuCardThreeImageAlt || "Dessert"}
              width={900}
              height={620}
              className="h-44 w-full object-cover"
            />
          ) : null}
          <div className="p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
              {home.menuCardThreeLabel}
            </p>
            <h2 className="mt-2 font-[var(--font-playfair)] text-2xl">
              {home.menuCardThreeTitle}
            </h2>
            <p className="mt-3 text-sm text-zinc-700">
              {home.menuCardThreeText}
            </p>
          </div>
        </article>
        ) : null}
      </section>
      ) : null}

      {home.visaGalleriSektion && galleryImages.length > 0 ? (
        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {galleryImages.map((imageUrl, index) => (
            <div
              key={imageUrl}
              className={`section-card reveal overflow-hidden p-0 ${
                index % 3 === 1 ? "delay-1" : index % 3 === 2 ? "delay-2" : ""
              }`}
            >
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

      {home.visaNyheterSektion ? (
      <section id="cms" className="section-card reveal overflow-hidden border-[color-mix(in_srgb,var(--brand)_24%,#fff)] bg-[color-mix(in_srgb,var(--brand)_10%,#fff)] p-0">
        <div className="border-b border-[color-mix(in_srgb,var(--brand)_24%,#fff)] bg-[color-mix(in_srgb,var(--brand)_16%,#fff)] px-5 py-5 md:px-6 md:py-6">
          <div>
            {home.visaNyheterOverrubrik ? (
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                {home.cmsKicker}
              </p>
            ) : null}
          </div>
        </div>

        <div className="space-y-4 p-5 md:p-6">
        {isEnabled ? (
          <div className="inline-flex rounded-full border border-amber-300 bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900">
            Preview-läge aktivt
          </div>
        ) : null}

        {errorMessage ? (
          <article className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-900">
            <h3 className="text-lg font-semibold">Kunde inte läsa från Strapi</h3>
            <p className="mt-2 text-sm">{errorMessage}</p>
            <p className="mt-3 text-sm">
              Starta `npm run dev:cms`, publicera minst en artikel och kontrollera
              Public-rättigheter.
            </p>
          </article>
        ) : null}

        {!errorMessage && articles.length === 0 ? (
          <article className="rounded-xl border border-[var(--line)] bg-white p-5">
            <h3 className="text-lg font-semibold text-[var(--brand)]">
              Inga artiklar än
            </h3>
            <p className="mt-2 text-sm text-zinc-700">
              Skapa en `article` i Strapi och publicera den så visas den här.
            </p>
          </article>
        ) : null}

        {articles.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {articles.map((article, index) => {
              const articleImage = article.coverUrl;

              return (
                <article
                  key={article.id}
                  className={`section-card border-[color-mix(in_srgb,var(--brand)_22%,#fff)] bg-[color-mix(in_srgb,var(--brand)_8%,#fff)] p-5 reveal ${index % 3 === 1 ? "delay-1" : ""} ${
                    index % 3 === 2 ? "delay-2" : ""
                  }`}
                >
                  {articleImage ? (
                    <Image
                      src={articleImage}
                      alt={article.coverAlt || "Maträtt på Ekhagens Restaurang"}
                      width={960}
                      height={620}
                      className="mb-4 h-52 w-full rounded-xl object-cover"
                    />
                  ) : null}
                  <h3 className="font-[var(--font-playfair)] text-2xl text-[var(--brand)]">
                    <Link href={`/articles/${article.slug}`}>{article.title}</Link>
                  </h3>
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
                </article>
              );
            })}
          </div>
        ) : null}
        </div>
      </section>
      ) : null}

    </main>
  );
}

