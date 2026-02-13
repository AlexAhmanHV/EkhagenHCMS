import { draftMode } from "next/headers";

type ApiImage = {
  url?: string;
  alternativeText?: string;
  formats?: Record<string, { url?: string }>;
  data?: {
    url?: string;
    alternativeText?: string;
    formats?: Record<string, { url?: string }>;
    attributes?: {
      url?: string;
      alternativeText?: string;
      formats?: Record<string, { url?: string }>;
    };
  };
  attributes?: {
    url?: string;
    alternativeText?: string;
    formats?: Record<string, { url?: string }>;
    data?: {
      attributes?: {
        url?: string;
        alternativeText?: string;
        formats?: Record<string, { url?: string }>;
      };
    };
  };
};

type ApiArticle = {
  id?: number;
  documentId?: string;
  title?: string;
  slug?: string;
  content?: string;
  cover?: ApiImage;
  attributes?: {
    title?: string;
    slug?: string;
    content?: string;
    cover?: ApiImage;
  };
};

type StrapiCollectionResponse = {
  data?: ApiArticle[];
};

type StrapiSingleResponse<T> = {
  data?: T | null;
};

type ApiHomepageFields = {
  visaToppen?: boolean;
  visaOverrubrikToppen?: boolean;
  visaHuvudrubrikToppen?: boolean;
  visaBeskrivningToppen?: boolean;
  visaKnappToppen?: boolean;
  visaSekundarKnappToppen?: boolean;
  visaBildToppen?: boolean;
  visaSchema?: boolean;
  visaSchemaRubrik?: boolean;
  visaSchemaRad1?: boolean;
  visaSchemaRad2?: boolean;
  visaSchemaRad3?: boolean;
  visaSchemaRad4?: boolean;
  visaLunchmenySektion?: boolean;
  visaLunchmenyDel?: boolean;
  visaKvallsmenyDel?: boolean;
  visaLunchmenyRubrik?: boolean;
  visaLunchmenyBeskrivning?: boolean;
  visaLunchmenyPdf?: boolean;
  visaKvallsmenyRubrik?: boolean;
  visaKvallsmenyBeskrivning?: boolean;
  visaKvallsmenyPdf?: boolean;
  visaMenykortSektion?: boolean;
  visaMenyKort1?: boolean;
  visaMenyKort2?: boolean;
  visaMenyKort3?: boolean;
  menyKort1Etikett?: string;
  menyKort2Etikett?: string;
  menyKort3Etikett?: string;
  visaGalleriSektion?: boolean;
  galleriBild1?: ApiImage;
  galleriBild2?: ApiImage;
  galleriBild3?: ApiImage;
  galleriBild4?: ApiImage;
  galleriBild5?: ApiImage;
  galleriBild6?: ApiImage;
  visaEventSektion?: boolean;
  visaEventOverrubrik?: boolean;
  visaEventRubrik?: boolean;
  visaEventText?: boolean;
  visaEventKnapp?: boolean;
  visaEventBild?: boolean;
  visaNyheterSektion?: boolean;
  visaNyheterOverrubrik?: boolean;
  visaNyheterRubrik?: boolean;
  visaFooterKolumn1?: boolean;
  visaFooterKolumn2?: boolean;
  visaFooterKolumn3?: boolean;
  visaFooterSkapadAv?: boolean;

  overrubrikToppen?: string;
  huvudrubrikToppen?: string;
  beskrivningToppen?: string;
  knappTextToppen?: string;
  knappLankToppen?: string;
  sekundarKnappTextToppen?: string;
  bildToppen?: ApiImage;
  schemaRubrik?: string;
  schemaRad1Text?: string;
  schemaRad1Tid?: string;
  schemaRad2Text?: string;
  schemaRad2Tid?: string;
  schemaRad3Text?: string;
  schemaRad3Tid?: string;
  schemaRad4Text?: string;
  schemaRad4Tid?: string;
  menyKort1Rubrik?: string;
  menyKort1Text?: string;
  menyKort1Bild?: ApiImage;
  menyKort2Rubrik?: string;
  menyKort2Text?: string;
  menyKort2Bild?: ApiImage;
  menyKort3Rubrik?: string;
  menyKort3Text?: string;
  menyKort3Bild?: ApiImage;
  eventOverrubrik?: string;
  eventRubrik?: string;
  eventText?: string;
  eventKnappText?: string;
  eventKnappLank?: string;
  eventBild?: ApiImage;
  nyheterOverrubrik?: string;
  nyheterRubrik?: string;
  lunchmenyRubrik?: string;
  lunchmenyBeskrivning?: string;
  lunchmenyPdf?: ApiImage;
  lunchmenyKnappText?: string;
  kvallsmenyRubrik?: string;
  kvallsmenyBeskrivning?: string;
  kvallsmenyPdf?: ApiImage;
  kvallsmenyKnappText?: string;
  footerKolumn1Rubrik?: string;
  footerKolumn1Text?: string;
  footerKolumn2Rubrik?: string;
  footerOppettiderRad1?: string;
  footerOppettiderRad2?: string;
  footerKolumn3Rubrik?: string;
  footerAdress?: string;
  footerTelefon?: string;
  footerEpost?: string;
  footerSkapadAvText?: string;
  footerSkapadAvLank?: string;
  footerSkapadAvLogga?: ApiImage;

  heroKicker?: string;
  heroTitle?: string;
  heroDescription?: string;
  heroPrimaryCtaLabel?: string;
  heroPrimaryCtaHref?: string;
  heroSecondaryCtaLabel?: string;
  heroImage?: ApiImage;
  scheduleTitle?: string;
  scheduleLine1?: string;
  scheduleLine2?: string;
  scheduleLine3?: string;
  scheduleLine4?: string;
  scheduleItem1Label?: string;
  scheduleItem1Time?: string;
  scheduleItem2Label?: string;
  scheduleItem2Time?: string;
  scheduleItem3Label?: string;
  scheduleItem3Time?: string;
  scheduleItem4Label?: string;
  scheduleItem4Time?: string;
  menuCardOneTitle?: string;
  menuCardOneText?: string;
  menuCardOneImage?: ApiImage;
  menuCardTwoTitle?: string;
  menuCardTwoText?: string;
  menuCardTwoImage?: ApiImage;
  menuCardThreeTitle?: string;
  menuCardThreeText?: string;
  menuCardThreeImage?: ApiImage;
  eventKicker?: string;
  eventTitle?: string;
  eventDescription?: string;
  eventCtaLabel?: string;
  eventCtaHref?: string;
  eventImage?: ApiImage;
  cmsKicker?: string;
  cmsTitle?: string;
};

type ApiHomepage = ApiHomepageFields & {
  attributes?: ApiHomepageFields;
};

class StrapiRequestError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export type Article = {
  id: string;
  title: string;
  slug: string;
  content: string;
  coverUrl: string;
  coverAlt: string;
};

export type HomepageContent = {
  visaToppen: boolean;
  visaOverrubrikToppen: boolean;
  visaHuvudrubrikToppen: boolean;
  visaBeskrivningToppen: boolean;
  visaKnappToppen: boolean;
  visaSekundarKnappToppen: boolean;
  visaBildToppen: boolean;
  visaSchema: boolean;
  visaSchemaRubrik: boolean;
  visaSchemaRad1: boolean;
  visaSchemaRad2: boolean;
  visaSchemaRad3: boolean;
  visaSchemaRad4: boolean;
  visaLunchmenySektion: boolean;
  visaLunchmenyDel: boolean;
  visaKvallsmenyDel: boolean;
  visaLunchmenyRubrik: boolean;
  visaLunchmenyBeskrivning: boolean;
  visaLunchmenyPdf: boolean;
  visaKvallsmenyRubrik: boolean;
  visaKvallsmenyBeskrivning: boolean;
  visaKvallsmenyPdf: boolean;
  visaMenykortSektion: boolean;
  visaMenyKort1: boolean;
  visaMenyKort2: boolean;
  visaMenyKort3: boolean;
  visaGalleriSektion: boolean;
  galleryImageUrls: string[];
  visaEventSektion: boolean;
  visaEventOverrubrik: boolean;
  visaEventRubrik: boolean;
  visaEventText: boolean;
  visaEventKnapp: boolean;
  visaEventBild: boolean;
  visaNyheterSektion: boolean;
  visaNyheterOverrubrik: boolean;
  visaNyheterRubrik: boolean;
  visaFooterKolumn1: boolean;
  visaFooterKolumn2: boolean;
  visaFooterKolumn3: boolean;
  visaFooterSkapadAv: boolean;

  heroKicker: string;
  heroTitle: string;
  heroDescription: string;
  heroPrimaryCtaLabel: string;
  heroPrimaryCtaHref: string;
  heroSecondaryCtaLabel: string;
  heroImageUrl: string;
  heroImageAlt: string;
  scheduleTitle: string;
  scheduleItem1Label: string;
  scheduleItem1Time: string;
  scheduleItem2Label: string;
  scheduleItem2Time: string;
  scheduleItem3Label: string;
  scheduleItem3Time: string;
  scheduleItem4Label: string;
  scheduleItem4Time: string;
  menuCardOneTitle: string;
  menuCardOneLabel: string;
  menuCardOneText: string;
  menuCardOneImageUrl: string;
  menuCardOneImageAlt: string;
  menuCardTwoTitle: string;
  menuCardTwoLabel: string;
  menuCardTwoText: string;
  menuCardTwoImageUrl: string;
  menuCardTwoImageAlt: string;
  menuCardThreeTitle: string;
  menuCardThreeLabel: string;
  menuCardThreeText: string;
  menuCardThreeImageUrl: string;
  menuCardThreeImageAlt: string;
  eventKicker: string;
  eventTitle: string;
  eventDescription: string;
  eventCtaLabel: string;
  eventCtaHref: string;
  eventImageUrl: string;
  eventImageAlt: string;
  cmsKicker: string;
  cmsTitle: string;
  lunchmenyRubrik: string;
  lunchmenyBeskrivning: string;
  lunchmenyPdfUrl: string;
  lunchmenyKnappText: string;
  kvallsmenyRubrik: string;
  kvallsmenyBeskrivning: string;
  kvallsmenyPdfUrl: string;
  kvallsmenyKnappText: string;
  footerKolumn1Rubrik: string;
  footerKolumn1Text: string;
  footerKolumn2Rubrik: string;
  footerOppettiderRad1: string;
  footerOppettiderRad2: string;
  footerKolumn3Rubrik: string;
  footerAdress: string;
  footerTelefon: string;
  footerEpost: string;
  footerSkapadAvText: string;
  footerSkapadAvLank: string;
  footerSkapadAvLogoUrl: string;
  footerSkapadAvLogoAlt: string;
};

export const strapiBaseUrl =
  process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

function pickString(...values: Array<string | undefined>) {
  for (const value of values) {
    if (typeof value === "string" && value.length > 0) {
      return value;
    }
  }
  return "";
}

function toAbsoluteUrl(pathOrUrl: string) {
  if (!pathOrUrl) {
    return "";
  }

  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
    return pathOrUrl;
  }

  return `${strapiBaseUrl}${pathOrUrl}`;
}

function extractImage(image: ApiImage | undefined) {
  const bestUrl = pickString(
    image?.formats?.large?.url,
    image?.formats?.medium?.url,
    image?.formats?.small?.url,
    image?.formats?.thumbnail?.url,
    image?.url,
    image?.data?.formats?.large?.url,
    image?.data?.formats?.medium?.url,
    image?.data?.formats?.small?.url,
    image?.data?.formats?.thumbnail?.url,
    image?.data?.url,
    image?.attributes?.formats?.large?.url,
    image?.attributes?.formats?.medium?.url,
    image?.attributes?.formats?.small?.url,
    image?.attributes?.formats?.thumbnail?.url,
    image?.attributes?.url,
    image?.attributes?.data?.attributes?.formats?.large?.url,
    image?.attributes?.data?.attributes?.formats?.medium?.url,
    image?.attributes?.data?.attributes?.formats?.small?.url,
    image?.attributes?.data?.attributes?.formats?.thumbnail?.url,
    image?.attributes?.data?.attributes?.url,
    image?.data?.attributes?.formats?.large?.url,
    image?.data?.attributes?.formats?.medium?.url,
    image?.data?.attributes?.formats?.small?.url,
    image?.data?.attributes?.formats?.thumbnail?.url,
    image?.data?.attributes?.url,
  );

  const alt = pickString(
    image?.alternativeText,
    image?.data?.alternativeText,
    image?.attributes?.alternativeText,
    image?.attributes?.data?.attributes?.alternativeText,
    image?.data?.attributes?.alternativeText,
  );

  return {
    coverUrl: toAbsoluteUrl(bestUrl),
    coverAlt: alt || "Artikelbild",
  };
}

function mapArticle(raw: ApiArticle): Article {
  const title = raw.title ?? raw.attributes?.title ?? "(utan titel)";
  const slug = raw.slug ?? raw.attributes?.slug ?? "utan-slug";
  const content = raw.content ?? raw.attributes?.content ?? "";
  const cover = extractImage(raw.cover ?? raw.attributes?.cover);

  return {
    id: raw.documentId ?? String(raw.id ?? `${slug}-${title}`),
    title,
    slug,
    content,
    coverUrl: cover.coverUrl,
    coverAlt: cover.coverAlt,
  };
}

async function strapiFetch<T>(path: string) {
  const { isEnabled } = await draftMode();
  const separator = path.includes("?") ? "&" : "?";
  const previewQuery = isEnabled ? `${separator}publicationState=preview` : "";
  const url = `${strapiBaseUrl}${path}${previewQuery}`;

  const headers: HeadersInit = {};
  if (process.env.STRAPI_API_TOKEN) {
    headers.Authorization = `Bearer ${process.env.STRAPI_API_TOKEN}`;
  }

  const response = await fetch(url, {
    cache: isEnabled ? "no-store" : undefined,
    next: isEnabled ? undefined : { revalidate: 10 },
    headers,
  });

  if (!response.ok) {
    throw new StrapiRequestError(
      response.status,
      `Strapi request failed (${response.status})`,
    );
  }

  return (await response.json()) as T;
}

async function getSingleTypeFields(path: string) {
  try {
    const payload = await strapiFetch<StrapiSingleResponse<Record<string, unknown>>>(
      `${path}?populate=*`,
    );
    const data = payload.data;
    if (!data || typeof data !== "object") {
      return {};
    }

    const attrs =
      "attributes" in data && data.attributes && typeof data.attributes === "object"
        ? (data.attributes as Record<string, unknown>)
        : {};

    return {
      ...attrs,
      ...data,
    } as Record<string, unknown>;
  } catch (error) {
    if (
      error instanceof StrapiRequestError &&
      (error.status === 400 ||
        error.status === 401 ||
        error.status === 403 ||
        error.status === 404)
    ) {
      return {};
    }
    throw error;
  }
}

async function getFirstSingleTypeFields(paths: string[]) {
  for (const path of paths) {
    const data = await getSingleTypeFields(path);
    if (Object.keys(data).length > 0) {
      return data;
    }
  }
  return {};
}

export async function getArticles() {
  let payload: StrapiCollectionResponse;
  try {
    payload = await strapiFetch<StrapiCollectionResponse>(
      "/api/articles?sort=createdAt:desc&populate=cover",
    );
  } catch (error) {
    if (error instanceof StrapiRequestError && error.status === 400) {
      payload = await strapiFetch<StrapiCollectionResponse>(
        "/api/articles?sort=createdAt:desc",
      );
    } else {
      throw error;
    }
  }

  return (payload.data ?? []).map(mapArticle);
}

export async function getArticleBySlug(slug: string) {
  let payload: StrapiCollectionResponse;
  try {
    payload = await strapiFetch<StrapiCollectionResponse>(
      `/api/articles?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=cover&pagination[pageSize]=1`,
    );
  } catch (error) {
    if (error instanceof StrapiRequestError && error.status === 400) {
      payload = await strapiFetch<StrapiCollectionResponse>(
        `/api/articles?filters[slug][$eq]=${encodeURIComponent(slug)}&pagination[pageSize]=1`,
      );
    } else {
      throw error;
    }
  }

  const first = payload.data?.[0];
  return first ? mapArticle(first) : null;
}

function pickHomepageValue(
  raw: ApiHomepage | undefined,
  key: keyof ApiHomepageFields,
  fallback: string,
) {
  const rootRaw = raw?.[key];
  const nestedRaw = raw?.attributes?.[key];
  const rootValue = typeof rootRaw === "string" ? rootRaw : undefined;
  const nestedValue = typeof nestedRaw === "string" ? nestedRaw : undefined;
  return pickString(rootValue, nestedValue, fallback);
}

function pickHomepageAliases(
  raw: ApiHomepage | undefined,
  keys: Array<keyof ApiHomepageFields>,
  fallback: string,
) {
  for (const key of keys) {
    const value = pickHomepageValue(raw, key, "");
    if (value) {
      return value;
    }
  }
  return fallback;
}

function pickHomepageBoolean(
  raw: ApiHomepage | undefined,
  key: keyof ApiHomepageFields,
  fallback: boolean,
) {
  const rootRaw = raw?.[key];
  const nestedRaw = raw?.attributes?.[key];
  if (typeof rootRaw === "boolean") {
    return rootRaw;
  }
  if (typeof nestedRaw === "boolean") {
    return nestedRaw;
  }
  return fallback;
}

function pickHomepageImage(
  raw: ApiHomepage | undefined,
  keys: Array<keyof ApiHomepageFields>,
) {
  for (const key of keys) {
    const rootRaw = raw?.[key];
    const nestedRaw = raw?.attributes?.[key];
    const image =
      typeof rootRaw === "object" && rootRaw ? extractImage(rootRaw as ApiImage) : null;
    if (image?.coverUrl) {
      return image;
    }
    const nestedImage =
      typeof nestedRaw === "object" && nestedRaw
        ? extractImage(nestedRaw as ApiImage)
        : null;
    if (nestedImage?.coverUrl) {
      return nestedImage;
    }
  }
  return { coverUrl: "", coverAlt: "" };
}

export async function getHomepageContent(): Promise<HomepageContent> {
  const fallback: HomepageContent = {
    visaToppen: true,
    visaOverrubrikToppen: true,
    visaHuvudrubrikToppen: true,
    visaBeskrivningToppen: true,
    visaKnappToppen: true,
    visaSekundarKnappToppen: true,
    visaBildToppen: true,
    visaSchema: true,
    visaSchemaRubrik: true,
    visaSchemaRad1: true,
    visaSchemaRad2: true,
    visaSchemaRad3: true,
    visaSchemaRad4: true,
    visaLunchmenySektion: true,
    visaLunchmenyDel: true,
    visaKvallsmenyDel: true,
    visaLunchmenyRubrik: true,
    visaLunchmenyBeskrivning: true,
    visaLunchmenyPdf: true,
    visaKvallsmenyRubrik: true,
    visaKvallsmenyBeskrivning: true,
    visaKvallsmenyPdf: true,
    visaMenykortSektion: true,
    visaMenyKort1: true,
    visaMenyKort2: true,
    visaMenyKort3: true,
    visaGalleriSektion: true,
    galleryImageUrls: [],
    visaEventSektion: true,
    visaEventOverrubrik: true,
    visaEventRubrik: true,
    visaEventText: true,
    visaEventKnapp: true,
    visaEventBild: true,
    visaNyheterSektion: true,
    visaNyheterOverrubrik: true,
    visaNyheterRubrik: true,
    visaFooterKolumn1: true,
    visaFooterKolumn2: true,
    visaFooterKolumn3: true,
    visaFooterSkapadAv: true,

    heroKicker: "Ekhagens Golfrestaurang",
    heroTitle: "Smaker av skog och fairway",
    heroDescription:
      "En modern golfrestaurang med nordiska ratter, weekend-brunch och kvallsservering intill 18:e green.",
    heroPrimaryCtaLabel: "Ring och boka",
    heroPrimaryCtaHref: "tel:+46123456789",
    heroSecondaryCtaLabel: "Se nyheter fran koket",
    heroImageUrl: "",
    heroImageAlt: "Hero-bild",
    scheduleTitle: "Dagens spelschema",
    scheduleItem1Label: "Frukost vid rangen",
    scheduleItem1Time: "08:00",
    scheduleItem2Label: "Lunchbuffe",
    scheduleItem2Time: "11:30",
    scheduleItem3Label: "After golf",
    scheduleItem3Time: "16:00",
    scheduleItem4Label: "Chef's table",
    scheduleItem4Time: "19:00",
    menuCardOneTitle: "Smoked trout brioche",
    menuCardOneLabel: "Signaturratt",
    menuCardOneText: "Varmrokt regnbage, pepparrotscreme och picklad gurka.",
    menuCardOneImageUrl: "",
    menuCardOneImageAlt: "Menykort ett",
    menuCardTwoTitle: "Oak fired flank steak",
    menuCardTwoLabel: "Grill",
    menuCardTwoText: "Serveras med rostad potatis, smorad spetskal och timjansky.",
    menuCardTwoImageUrl: "",
    menuCardTwoImageAlt: "Menykort tva",
    menuCardThreeTitle: "Lingon creme brulee",
    menuCardThreeLabel: "Dessert",
    menuCardThreeText: "Krispig karamell, vispad vanilj och varma bar.",
    menuCardThreeImageUrl: "",
    menuCardThreeImageAlt: "Menykort tre",
    eventKicker: "Event",
    eventTitle: "Fredagskvall: Jazz pa terrassen",
    eventDescription:
      "Levande musik, 5-ratters sharing menu och panoramavy over banan. Begransat antal platser.",
    eventCtaLabel: "Reservera 18:30",
    eventCtaHref: "tel:+46123456789",
    eventImageUrl: "",
    eventImageAlt: "Event-bild",
    cmsKicker: "Live fran Strapi",
    cmsTitle: "Nytt fran koket",
    lunchmenyRubrik: "Lunchmeny den har veckan",
    lunchmenyBeskrivning:
      "Uppdateras varje vecka. Klicka for att oppna eller ladda ner aktuell PDF.",
    lunchmenyPdfUrl: "",
    lunchmenyKnappText: "Oppna lunchmeny (PDF)",
    kvallsmenyRubrik: "Kvallsmeny",
    kvallsmenyBeskrivning:
      "Fastare meny for kvallen. Byts vid behov och kan laddas upp som ny PDF.",
    kvallsmenyPdfUrl: "",
    kvallsmenyKnappText: "Oppna kvallsmeny (PDF)",
    footerKolumn1Rubrik: "Ekhagens Golfrestaurang",
    footerKolumn1Text:
      "Modern mat i klubbhusmiljo, utsikt over fairway och green.",
    footerKolumn2Rubrik: "Oppettider",
    footerOppettiderRad1: "Man-fre 11:00-22:00",
    footerOppettiderRad2: "Lor-son 09:00-23:00",
    footerKolumn3Rubrik: "Kontakt",
    footerAdress: "Bistrovagen 7, Ekhagen",
    footerTelefon: "+46 123 456 789",
    footerEpost: "bokning@ekhagengolfbistro.se",
    footerSkapadAvText: "Skapad av AlexAhman.se",
    footerSkapadAvLank: "https://alexahman.se",
    footerSkapadAvLogoUrl: "",
    footerSkapadAvLogoAlt: "AlexAhman.se logga",
  };

  try {
    const [homepagePayload, headerFields, menyerFields, reklamFields, galleriFields, nyheterFields, footerFields] =
      await Promise.all([
        strapiFetch<StrapiSingleResponse<ApiHomepage>>("/api/homepage?populate=*").catch(
          (error) => {
            if (
              error instanceof StrapiRequestError &&
              (error.status === 400 || error.status === 404)
            ) {
              return { data: null } as StrapiSingleResponse<ApiHomepage>;
            }
            throw error;
          },
        ),
        getSingleTypeFields("/api/header"),
        getSingleTypeFields("/api/menyer"),
        getSingleTypeFields("/api/reklam"),
        getSingleTypeFields("/api/galleri"),
        getFirstSingleTypeFields([
          "/api/nyheter-home",
          "/api/nyheter-homes",
          "/api/nyheter",
        ]),
        getSingleTypeFields("/api/footer"),
      ]);

    const homepageData = homepagePayload.data;
    const homepageAttrs =
      homepageData?.attributes && typeof homepageData.attributes === "object"
        ? homepageData.attributes
        : {};
    const homepageRoot =
      homepageData && typeof homepageData === "object" ? homepageData : {};

    const merged = {
      ...homepageAttrs,
      ...homepageRoot,
      ...headerFields,
      ...menyerFields,
      ...reklamFields,
      ...galleriFields,
      ...nyheterFields,
      ...footerFields,
    } as ApiHomepageFields & Record<string, unknown>;

    const raw =
      Object.keys(merged).length > 0
        ? ({ ...merged, attributes: merged } as ApiHomepage)
        : undefined;

    if (!raw) {
      return fallback;
    }

    const heroImage = pickHomepageImage(raw, ["bildToppen", "heroImage"]);
    const menuCardOneImage = pickHomepageImage(raw, ["menyKort1Bild", "menuCardOneImage"]);
    const menuCardTwoImage = pickHomepageImage(raw, ["menyKort2Bild", "menuCardTwoImage"]);
    const menuCardThreeImage = pickHomepageImage(raw, ["menyKort3Bild", "menuCardThreeImage"]);
    const eventImage = pickHomepageImage(raw, ["eventBild", "eventImage"]);
    const lunchPdf = pickHomepageImage(raw, ["lunchmenyPdf"]);
    const dinnerPdf = pickHomepageImage(raw, ["kvallsmenyPdf"]);
    const creatorLogo = pickHomepageImage(raw, ["footerSkapadAvLogga"]);
    const galleryImageUrls = (
      [
        pickHomepageImage(raw, ["galleriBild1"]).coverUrl,
        pickHomepageImage(raw, ["galleriBild2"]).coverUrl,
        pickHomepageImage(raw, ["galleriBild3"]).coverUrl,
        pickHomepageImage(raw, ["galleriBild4"]).coverUrl,
        pickHomepageImage(raw, ["galleriBild5"]).coverUrl,
        pickHomepageImage(raw, ["galleriBild6"]).coverUrl,
      ] as string[]
    ).filter(Boolean);

    const scheduleLine1 = pickHomepageAliases(raw, ["scheduleLine1"], "");
    const scheduleLine2 = pickHomepageAliases(raw, ["scheduleLine2"], "");
    const scheduleLine3 = pickHomepageAliases(raw, ["scheduleLine3"], "");
    const scheduleLine4 = pickHomepageAliases(raw, ["scheduleLine4"], "");
    const scheduleLine1Parts = scheduleLine1.split("|");
    const scheduleLine2Parts = scheduleLine2.split("|");
    const scheduleLine3Parts = scheduleLine3.split("|");
    const scheduleLine4Parts = scheduleLine4.split("|");

    return {
      visaToppen: pickHomepageBoolean(raw, "visaToppen", fallback.visaToppen),
      visaOverrubrikToppen: pickHomepageBoolean(
        raw,
        "visaOverrubrikToppen",
        fallback.visaOverrubrikToppen,
      ),
      visaHuvudrubrikToppen: pickHomepageBoolean(
        raw,
        "visaHuvudrubrikToppen",
        fallback.visaHuvudrubrikToppen,
      ),
      visaBeskrivningToppen: pickHomepageBoolean(
        raw,
        "visaBeskrivningToppen",
        fallback.visaBeskrivningToppen,
      ),
      visaKnappToppen: pickHomepageBoolean(
        raw,
        "visaKnappToppen",
        fallback.visaKnappToppen,
      ),
      visaSekundarKnappToppen: pickHomepageBoolean(
        raw,
        "visaSekundarKnappToppen",
        fallback.visaSekundarKnappToppen,
      ),
      visaBildToppen: pickHomepageBoolean(
        raw,
        "visaBildToppen",
        fallback.visaBildToppen,
      ),
      visaSchema: pickHomepageBoolean(raw, "visaSchema", fallback.visaSchema),
      visaSchemaRubrik: pickHomepageBoolean(
        raw,
        "visaSchemaRubrik",
        fallback.visaSchemaRubrik,
      ),
      visaSchemaRad1: pickHomepageBoolean(raw, "visaSchemaRad1", fallback.visaSchemaRad1),
      visaSchemaRad2: pickHomepageBoolean(raw, "visaSchemaRad2", fallback.visaSchemaRad2),
      visaSchemaRad3: pickHomepageBoolean(raw, "visaSchemaRad3", fallback.visaSchemaRad3),
      visaSchemaRad4: pickHomepageBoolean(raw, "visaSchemaRad4", fallback.visaSchemaRad4),
      visaLunchmenySektion: pickHomepageBoolean(
        raw,
        "visaLunchmenySektion",
        fallback.visaLunchmenySektion,
      ),
      visaLunchmenyDel: pickHomepageBoolean(
        raw,
        "visaLunchmenyDel",
        fallback.visaLunchmenyDel,
      ),
      visaKvallsmenyDel: pickHomepageBoolean(
        raw,
        "visaKvallsmenyDel",
        fallback.visaKvallsmenyDel,
      ),
      visaLunchmenyRubrik: pickHomepageBoolean(
        raw,
        "visaLunchmenyRubrik",
        fallback.visaLunchmenyRubrik,
      ),
      visaLunchmenyBeskrivning: pickHomepageBoolean(
        raw,
        "visaLunchmenyBeskrivning",
        fallback.visaLunchmenyBeskrivning,
      ),
      visaLunchmenyPdf: pickHomepageBoolean(
        raw,
        "visaLunchmenyPdf",
        fallback.visaLunchmenyPdf,
      ),
      visaKvallsmenyRubrik: pickHomepageBoolean(
        raw,
        "visaKvallsmenyRubrik",
        fallback.visaKvallsmenyRubrik,
      ),
      visaKvallsmenyBeskrivning: pickHomepageBoolean(
        raw,
        "visaKvallsmenyBeskrivning",
        fallback.visaKvallsmenyBeskrivning,
      ),
      visaKvallsmenyPdf: pickHomepageBoolean(
        raw,
        "visaKvallsmenyPdf",
        fallback.visaKvallsmenyPdf,
      ),
      visaMenykortSektion: pickHomepageBoolean(
        raw,
        "visaMenykortSektion",
        fallback.visaMenykortSektion,
      ),
      visaMenyKort1: pickHomepageBoolean(raw, "visaMenyKort1", fallback.visaMenyKort1),
      visaMenyKort2: pickHomepageBoolean(raw, "visaMenyKort2", fallback.visaMenyKort2),
      visaMenyKort3: pickHomepageBoolean(raw, "visaMenyKort3", fallback.visaMenyKort3),
      visaGalleriSektion: pickHomepageBoolean(
        raw,
        "visaGalleriSektion",
        fallback.visaGalleriSektion,
      ),
      galleryImageUrls,
      visaEventSektion: pickHomepageBoolean(
        raw,
        "visaEventSektion",
        fallback.visaEventSektion,
      ),
      visaEventOverrubrik: pickHomepageBoolean(
        raw,
        "visaEventOverrubrik",
        fallback.visaEventOverrubrik,
      ),
      visaEventRubrik: pickHomepageBoolean(raw, "visaEventRubrik", fallback.visaEventRubrik),
      visaEventText: pickHomepageBoolean(raw, "visaEventText", fallback.visaEventText),
      visaEventKnapp: pickHomepageBoolean(raw, "visaEventKnapp", fallback.visaEventKnapp),
      visaEventBild: pickHomepageBoolean(raw, "visaEventBild", fallback.visaEventBild),
      visaNyheterSektion: pickHomepageBoolean(
        raw,
        "visaNyheterSektion",
        fallback.visaNyheterSektion,
      ),
      visaNyheterOverrubrik: pickHomepageBoolean(
        raw,
        "visaNyheterOverrubrik",
        fallback.visaNyheterOverrubrik,
      ),
      visaNyheterRubrik: pickHomepageBoolean(
        raw,
        "visaNyheterRubrik",
        fallback.visaNyheterRubrik,
      ),
      visaFooterKolumn1: pickHomepageBoolean(
        raw,
        "visaFooterKolumn1",
        fallback.visaFooterKolumn1,
      ),
      visaFooterKolumn2: pickHomepageBoolean(
        raw,
        "visaFooterKolumn2",
        fallback.visaFooterKolumn2,
      ),
      visaFooterKolumn3: pickHomepageBoolean(
        raw,
        "visaFooterKolumn3",
        fallback.visaFooterKolumn3,
      ),
      visaFooterSkapadAv: pickHomepageBoolean(
        raw,
        "visaFooterSkapadAv",
        fallback.visaFooterSkapadAv,
      ),

      heroKicker: pickHomepageAliases(raw, ["overrubrikToppen", "heroKicker"], fallback.heroKicker),
      heroTitle: pickHomepageAliases(raw, ["huvudrubrikToppen", "heroTitle"], fallback.heroTitle),
      heroDescription: pickHomepageAliases(
        raw,
        ["beskrivningToppen", "heroDescription"],
        fallback.heroDescription,
      ),
      heroPrimaryCtaLabel: pickHomepageAliases(
        raw,
        ["knappTextToppen", "heroPrimaryCtaLabel"],
        fallback.heroPrimaryCtaLabel,
      ),
      heroPrimaryCtaHref: pickHomepageAliases(
        raw,
        ["knappLankToppen", "heroPrimaryCtaHref"],
        fallback.heroPrimaryCtaHref,
      ),
      heroSecondaryCtaLabel: pickHomepageAliases(
        raw,
        ["sekundarKnappTextToppen", "heroSecondaryCtaLabel"],
        fallback.heroSecondaryCtaLabel,
      ),
      heroImageUrl: heroImage.coverUrl || fallback.heroImageUrl,
      heroImageAlt: heroImage.coverAlt || fallback.heroImageAlt,
      scheduleTitle: pickHomepageAliases(raw, ["schemaRubrik", "scheduleTitle"], fallback.scheduleTitle),
      scheduleItem1Label: pickHomepageAliases(
        raw,
        ["schemaRad1Text", "scheduleItem1Label"],
        scheduleLine1Parts[0] || fallback.scheduleItem1Label,
      ),
      scheduleItem1Time: pickHomepageAliases(
        raw,
        ["schemaRad1Tid", "scheduleItem1Time"],
        scheduleLine1Parts[1] || fallback.scheduleItem1Time,
      ),
      scheduleItem2Label: pickHomepageAliases(
        raw,
        ["schemaRad2Text", "scheduleItem2Label"],
        scheduleLine2Parts[0] || fallback.scheduleItem2Label,
      ),
      scheduleItem2Time: pickHomepageAliases(
        raw,
        ["schemaRad2Tid", "scheduleItem2Time"],
        scheduleLine2Parts[1] || fallback.scheduleItem2Time,
      ),
      scheduleItem3Label: pickHomepageAliases(
        raw,
        ["schemaRad3Text", "scheduleItem3Label"],
        scheduleLine3Parts[0] || fallback.scheduleItem3Label,
      ),
      scheduleItem3Time: pickHomepageAliases(
        raw,
        ["schemaRad3Tid", "scheduleItem3Time"],
        scheduleLine3Parts[1] || fallback.scheduleItem3Time,
      ),
      scheduleItem4Label: pickHomepageAliases(
        raw,
        ["schemaRad4Text", "scheduleItem4Label"],
        scheduleLine4Parts[0] || fallback.scheduleItem4Label,
      ),
      scheduleItem4Time: pickHomepageAliases(
        raw,
        ["schemaRad4Tid", "scheduleItem4Time"],
        scheduleLine4Parts[1] || fallback.scheduleItem4Time,
      ),
      menuCardOneTitle: pickHomepageAliases(
        raw,
        ["menyKort1Rubrik", "menuCardOneTitle"],
        fallback.menuCardOneTitle,
      ),
      menuCardOneLabel: pickHomepageAliases(
        raw,
        ["menyKort1Etikett"],
        fallback.menuCardOneLabel,
      ),
      menuCardOneText: pickHomepageAliases(
        raw,
        ["menyKort1Text", "menuCardOneText"],
        fallback.menuCardOneText,
      ),
      menuCardOneImageUrl: menuCardOneImage.coverUrl || fallback.menuCardOneImageUrl,
      menuCardOneImageAlt: menuCardOneImage.coverAlt || fallback.menuCardOneImageAlt,
      menuCardTwoTitle: pickHomepageAliases(
        raw,
        ["menyKort2Rubrik", "menuCardTwoTitle"],
        fallback.menuCardTwoTitle,
      ),
      menuCardTwoLabel: pickHomepageAliases(
        raw,
        ["menyKort2Etikett"],
        fallback.menuCardTwoLabel,
      ),
      menuCardTwoText: pickHomepageAliases(
        raw,
        ["menyKort2Text", "menuCardTwoText"],
        fallback.menuCardTwoText,
      ),
      menuCardTwoImageUrl: menuCardTwoImage.coverUrl || fallback.menuCardTwoImageUrl,
      menuCardTwoImageAlt: menuCardTwoImage.coverAlt || fallback.menuCardTwoImageAlt,
      menuCardThreeTitle: pickHomepageAliases(
        raw,
        ["menyKort3Rubrik", "menuCardThreeTitle"],
        fallback.menuCardThreeTitle,
      ),
      menuCardThreeLabel: pickHomepageAliases(
        raw,
        ["menyKort3Etikett"],
        fallback.menuCardThreeLabel,
      ),
      menuCardThreeText: pickHomepageAliases(
        raw,
        ["menyKort3Text", "menuCardThreeText"],
        fallback.menuCardThreeText,
      ),
      menuCardThreeImageUrl:
        menuCardThreeImage.coverUrl || fallback.menuCardThreeImageUrl,
      menuCardThreeImageAlt:
        menuCardThreeImage.coverAlt || fallback.menuCardThreeImageAlt,
      eventKicker: pickHomepageAliases(raw, ["eventOverrubrik", "eventKicker"], fallback.eventKicker),
      eventTitle: pickHomepageAliases(raw, ["eventRubrik", "eventTitle"], fallback.eventTitle),
      eventDescription: pickHomepageAliases(
        raw,
        ["eventText", "eventDescription"],
        fallback.eventDescription,
      ),
      eventCtaLabel: pickHomepageAliases(raw, ["eventKnappText", "eventCtaLabel"], fallback.eventCtaLabel),
      eventCtaHref: pickHomepageAliases(raw, ["eventKnappLank", "eventCtaHref"], fallback.eventCtaHref),
      eventImageUrl: eventImage.coverUrl || fallback.eventImageUrl,
      eventImageAlt: eventImage.coverAlt || fallback.eventImageAlt,
      cmsKicker: pickHomepageAliases(raw, ["nyheterOverrubrik", "cmsKicker"], fallback.cmsKicker),
      cmsTitle: pickHomepageAliases(raw, ["nyheterRubrik", "cmsTitle"], fallback.cmsTitle),
      lunchmenyRubrik: pickHomepageAliases(
        raw,
        ["lunchmenyRubrik"],
        fallback.lunchmenyRubrik,
      ),
      lunchmenyBeskrivning: pickHomepageAliases(
        raw,
        ["lunchmenyBeskrivning"],
        fallback.lunchmenyBeskrivning,
      ),
      lunchmenyPdfUrl: lunchPdf.coverUrl || fallback.lunchmenyPdfUrl,
      lunchmenyKnappText: pickHomepageAliases(
        raw,
        ["lunchmenyKnappText"],
        fallback.lunchmenyKnappText,
      ),
      kvallsmenyRubrik: pickHomepageAliases(
        raw,
        ["kvallsmenyRubrik"],
        fallback.kvallsmenyRubrik,
      ),
      kvallsmenyBeskrivning: pickHomepageAliases(
        raw,
        ["kvallsmenyBeskrivning"],
        fallback.kvallsmenyBeskrivning,
      ),
      kvallsmenyPdfUrl: dinnerPdf.coverUrl || fallback.kvallsmenyPdfUrl,
      kvallsmenyKnappText: pickHomepageAliases(
        raw,
        ["kvallsmenyKnappText"],
        fallback.kvallsmenyKnappText,
      ),
      footerKolumn1Rubrik: pickHomepageAliases(
        raw,
        ["footerKolumn1Rubrik"],
        fallback.footerKolumn1Rubrik,
      ),
      footerKolumn1Text: pickHomepageAliases(
        raw,
        ["footerKolumn1Text"],
        fallback.footerKolumn1Text,
      ),
      footerKolumn2Rubrik: pickHomepageAliases(
        raw,
        ["footerKolumn2Rubrik"],
        fallback.footerKolumn2Rubrik,
      ),
      footerOppettiderRad1: pickHomepageAliases(
        raw,
        ["footerOppettiderRad1"],
        fallback.footerOppettiderRad1,
      ),
      footerOppettiderRad2: pickHomepageAliases(
        raw,
        ["footerOppettiderRad2"],
        fallback.footerOppettiderRad2,
      ),
      footerKolumn3Rubrik: pickHomepageAliases(
        raw,
        ["footerKolumn3Rubrik"],
        fallback.footerKolumn3Rubrik,
      ),
      footerAdress: pickHomepageAliases(raw, ["footerAdress"], fallback.footerAdress),
      footerTelefon: pickHomepageAliases(raw, ["footerTelefon"], fallback.footerTelefon),
      footerEpost: pickHomepageAliases(raw, ["footerEpost"], fallback.footerEpost),
      footerSkapadAvText: pickHomepageAliases(
        raw,
        ["footerSkapadAvText"],
        fallback.footerSkapadAvText,
      ),
      footerSkapadAvLank: pickHomepageAliases(
        raw,
        ["footerSkapadAvLank"],
        fallback.footerSkapadAvLank,
      ),
      footerSkapadAvLogoUrl:
        creatorLogo.coverUrl || fallback.footerSkapadAvLogoUrl,
      footerSkapadAvLogoAlt:
        creatorLogo.coverAlt || fallback.footerSkapadAvLogoAlt,
    };
  } catch (error) {
    if (error instanceof StrapiRequestError) {
      return fallback;
    }
    return fallback;
  }
}
