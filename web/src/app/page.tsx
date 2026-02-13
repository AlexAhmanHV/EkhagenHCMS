import Image from "next/image";
import Link from "next/link";
import { draftMode } from "next/headers";
import { getMenuPdfFallbacks, getRandomUploadImages } from "@/lib/local-images";
import {
  getArticles,
  getHomepageContent,
  strapiBaseUrl,
  type Article,
} from "@/lib/strapi";

function toCmsUrl(relativePath: string) {
  if (!relativePath) {
    return "";
  }

  if (relativePath.startsWith("http://") || relativePath.startsWith("https://")) {
    return relativePath;
  }

  return `${strapiBaseUrl}${relativePath}`;
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

  const randomUploads = await getRandomUploadImages(14);
  const pdfFallbacks = await getMenuPdfFallbacks();
  const heroImage = home.heroImageUrl || (randomUploads[0] ? toCmsUrl(randomUploads[0]) : "");
  const menuImages = randomUploads.slice(1, 4).map(toCmsUrl);
  const galleryImages =
    home.galleryImageUrls.length > 0
      ? home.galleryImageUrls
      : randomUploads.slice(4, 10).map(toCmsUrl);
  const lunchMenuPdf = home.lunchmenyPdfUrl || toCmsUrl(pdfFallbacks.lunchPdf);
  const dinnerMenuPdf = home.kvallsmenyPdfUrl || toCmsUrl(pdfFallbacks.dinnerPdf);
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
            {home.visaKnappToppen || home.visaSekundarKnappToppen ? (
              <div className="flex flex-wrap gap-3 pt-2">
                {home.visaKnappToppen ? (
                  <a className="cta-btn" href={home.heroPrimaryCtaHref}>
                    {home.heroPrimaryCtaLabel}
                  </a>
                ) : null}
                {home.visaSekundarKnappToppen ? (
                  <Link
                    href="#cms"
                    className="rounded-full border border-white/45 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    {home.heroSecondaryCtaLabel}
                  </Link>
                ) : null}
              </div>
            ) : null}
          </div>

          <div className="space-y-4">
            {home.visaBildToppen && heroImage ? (
              <div className="overflow-hidden rounded-2xl border border-white/30">
                <Image
                  src={heroImage}
                  alt={home.heroImageAlt || "Golfrestaurang"}
                  width={1080}
                  height={720}
                  className="h-56 w-full object-cover md:h-64"
                  unoptimized
                />
              </div>
            ) : null}

            {home.visaSchema ? (
            <div className="section-card bg-white/10 p-5 text-sm text-emerald-50 backdrop-blur">
              {home.visaSchemaRubrik ? (
                <p className="font-semibold uppercase tracking-[0.2em] text-amber-200">
                  {home.scheduleTitle}
                </p>
              ) : null}
              <div className="mt-4 space-y-2">
                {home.visaSchemaRad1 ? (
                  <div className="flex items-center justify-between border-b border-white/20 pb-2">
                    <span>{home.scheduleItem1Label}</span>
                    <span>{home.scheduleItem1Time}</span>
                  </div>
                ) : null}
                {home.visaSchemaRad2 ? (
                  <div className="flex items-center justify-between border-b border-white/20 pb-2">
                    <span>{home.scheduleItem2Label}</span>
                    <span>{home.scheduleItem2Time}</span>
                  </div>
                ) : null}
                {home.visaSchemaRad3 ? (
                  <div className="flex items-center justify-between border-b border-white/20 pb-2">
                    <span>{home.scheduleItem3Label}</span>
                    <span>{home.scheduleItem3Time}</span>
                  </div>
                ) : null}
                {home.visaSchemaRad4 ? (
                  <div className="flex items-center justify-between">
                    <span>{home.scheduleItem4Label}</span>
                    <span>{home.scheduleItem4Time}</span>
                  </div>
                ) : null}
              </div>
            </div>
            ) : null}
          </div>
        </div>
      </section>
      ) : null}

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
              Ingen lunchmeny-PDF vald an i CMS.
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
                title="Kvallsmeny PDF"
                scrolling="no"
                className="h-[52vh] min-h-[380px] w-full md:h-[84vh] md:min-h-[720px]"
              />
            </div>
          ) : (
            <p className="mt-5 text-sm text-zinc-500">Ingen kvallsmeny-PDF vald.</p>
          )}
        </article>
        ) : null}
      </section>
      ) : null}

      {home.visaMenykortSektion ? (
      <section id="meny" className="grid gap-4 md:grid-cols-3">
        {home.visaMenyKort1 ? (
        <article className="section-card reveal overflow-hidden p-0">
          {(home.menuCardOneImageUrl || menuImages[0]) ? (
            <Image
              src={home.menuCardOneImageUrl || menuImages[0]}
              alt={home.menuCardOneImageAlt || "Signaturratt"}
              width={900}
              height={620}
              className="h-44 w-full object-cover"
              unoptimized
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
          {(home.menuCardTwoImageUrl || menuImages[1]) ? (
            <Image
              src={home.menuCardTwoImageUrl || menuImages[1]}
              alt={home.menuCardTwoImageAlt || "Grillratt"}
              width={900}
              height={620}
              className="h-44 w-full object-cover"
              unoptimized
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
          {(home.menuCardThreeImageUrl || menuImages[2]) ? (
            <Image
              src={home.menuCardThreeImageUrl || menuImages[2]}
              alt={home.menuCardThreeImageAlt || "Dessert"}
              width={900}
              height={620}
              className="h-44 w-full object-cover"
              unoptimized
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
                alt="Restaurangmiljo"
                width={900}
                height={600}
                className="h-52 w-full object-cover"
                unoptimized
              />
            </div>
          ))}
        </section>
      ) : null}

      {home.visaEventSektion ? (
      <section id="event" className="section-card reveal delay-1 p-6 md:p-8">
        {home.visaEventBild && home.eventImageUrl ? (
          <Image
            src={home.eventImageUrl}
            alt={home.eventImageAlt || "Event-bild"}
            width={1400}
            height={500}
            className="mb-5 h-56 w-full rounded-xl object-cover"
            unoptimized
          />
        ) : null}
        <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            {home.visaEventOverrubrik ? (
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                {home.eventKicker}
              </p>
            ) : null}
            {home.visaEventRubrik ? (
              <h2 className="mt-2 font-[var(--font-playfair)] text-3xl text-[var(--brand)]">
                {home.eventTitle}
              </h2>
            ) : null}
            {home.visaEventText ? (
              <p className="mt-3 max-w-3xl text-zinc-700">
                {home.eventDescription}
              </p>
            ) : null}
          </div>
          {home.visaEventKnapp ? (
            <a className="cta-btn inline-block text-center" href={home.eventCtaHref}>
              {home.eventCtaLabel}
            </a>
          ) : null}
        </div>
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
            {home.visaNyheterRubrik ? (
              <h2 className="font-[var(--font-playfair)] text-3xl text-[var(--brand)]">
                {home.cmsTitle}
              </h2>
            ) : null}
          </div>
        </div>

        <div className="space-y-4 p-5 md:p-6">
        {isEnabled ? (
          <div className="inline-flex rounded-full border border-amber-300 bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900">
            Preview-lage aktivt
          </div>
        ) : null}

        {errorMessage ? (
          <article className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-900">
            <h3 className="text-lg font-semibold">Kunde inte lasa fran Strapi</h3>
            <p className="mt-2 text-sm">{errorMessage}</p>
            <p className="mt-3 text-sm">
              Starta `npm run dev:cms`, publicera minst en artikel och kontrollera
              Public-rattigheter.
            </p>
          </article>
        ) : null}

        {!errorMessage && articles.length === 0 ? (
          <article className="rounded-xl border border-[var(--line)] bg-white p-5">
            <h3 className="text-lg font-semibold text-[var(--brand)]">
              Inga artiklar an
            </h3>
            <p className="mt-2 text-sm text-zinc-700">
              Skapa en `article` i Strapi och publicera den sa visas den har.
            </p>
          </article>
        ) : null}

        {articles.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {articles.map((article, index) => {
              const fallbackImage = randomUploads.length
                ? toCmsUrl(randomUploads[(index + 6) % randomUploads.length])
                : "";
              const articleImage = article.coverUrl || fallbackImage;

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
                      alt={article.coverAlt || "Matratt"}
                      width={960}
                      height={620}
                      className="mb-4 h-52 w-full rounded-xl object-cover"
                      unoptimized
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
                    Las hela artikeln
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
