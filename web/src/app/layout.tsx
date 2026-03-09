import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Manrope, Playfair_Display } from "next/font/google";
import ContactModalTrigger from "@/components/contact-modal-trigger";
import { absoluteUrl, siteName, siteUrl } from "@/lib/seo";
import { getHomepageContent, strapiBaseUrl } from "@/lib/strapi";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const fixedRestaurantLogoUrl = `${strapiBaseUrl}/uploads/logo_39849e5e8f_5f18fafab9.png`;
const fixedCreatorIconUrl = `${strapiBaseUrl}/uploads/favicon_96x96_750ca0c174_fb0e7198bc.png`;

export async function generateMetadata(): Promise<Metadata> {
  const logoUrl = fixedRestaurantLogoUrl;
  const description = "Golfrestaurang med lunch, kvällsmeny och nyheter från köket.";

  return {
    metadataBase: new URL(siteUrl),
    title: siteName,
    description,
    alternates: {
      canonical: absoluteUrl("/"),
    },
    openGraph: {
      type: "website",
      url: absoluteUrl("/"),
      title: siteName,
      description,
      siteName,
      images: logoUrl ? [{ url: logoUrl }] : [],
      locale: "sv_SE",
    },
    twitter: {
      card: "summary_large_image",
      title: siteName,
      description,
      images: logoUrl ? [logoUrl] : [],
    },
    icons: logoUrl
      ? {
          icon: [{ url: logoUrl }],
          apple: [{ url: logoUrl }],
          shortcut: [{ url: logoUrl }],
        }
      : undefined,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const home = await getHomepageContent();
  const logoUrl = fixedRestaurantLogoUrl;
  const creatorIconUrl = home.footerSkapadAvLogoUrl || fixedCreatorIconUrl;
  const restaurantJsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: siteName,
    url: absoluteUrl("/"),
    image: logoUrl || undefined,
    description: home.footerKolumn1Text || home.heroDescription,
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
    <html lang="sv">
      <body className={`${manrope.variable} ${playfair.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd) }}
        />
        <div className="page-glow" />
        <header className="site-nav">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 py-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              {logoUrl ? (
                <Image
                  src={logoUrl}
                  alt="Ekhagens Restaurang logga"
                  width={44}
                  height={44}
                  className="h-11 w-11 rounded-full border border-amber-100/40 bg-white/85 object-contain p-1 shadow-sm"
                />
              ) : (
                <span className="brand-dot" />
              )}
              <Link href="/" className="brand">
                Ekhagens Restaurang
              </Link>
            </div>
            <nav className="nav-links flex items-center gap-1 self-center md:gap-2">
              <Link className="nav-link" href="/nyheter">
                <svg
                  className="nav-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M4 7h16" />
                  <path d="M4 12h10" />
                  <path d="M4 17h8" />
                  <circle cx="17.5" cy="16.5" r="2.5" />
                </svg>
                Nyheter
              </Link>
              <Link className="nav-link" href="/#meny-pdf">
                <svg
                  className="nav-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="4" y="5" width="16" height="14" rx="2.5" />
                  <path d="M8 9h8" />
                  <path d="M8 13h5" />
                </svg>
                Meny
              </Link>
              <Link className="nav-link" href="/boka">
                <svg
                  className="nav-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="4" y="5" width="16" height="15" rx="2" />
                  <path d="M8 3v4" />
                  <path d="M16 3v4" />
                  <path d="M4 10h16" />
                </svg>
                Boka
              </Link>
              <Link className="nav-link" href="/om-oss">
                <svg
                  className="nav-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="8" r="3.2" />
                  <path d="M6 20c1-3.2 3.3-4.8 6-4.8s5 1.6 6 4.8" />
                </svg>
                Om oss
              </Link>
              <ContactModalTrigger
                title={home.footerKolumn3Rubrik || "Kontakt"}
                address={home.footerAdress}
                phone={home.footerTelefon}
                email={home.footerEpost}
                openingHoursTitle={home.footerKolumn2Rubrik}
                openingHoursRow1={home.footerOppettiderRad1}
                openingHoursRow2={home.footerOppettiderRad2}
              />
            </nav>
          </div>
        </header>

        {children}

        <footer id="kontakt" className="site-footer">
          <div className="mx-auto grid w-full max-w-6xl gap-6 px-6 py-10 text-center md:grid-cols-3 md:text-left">
            {home.visaFooterKolumn1 ? (
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-3 md:justify-start">
                {logoUrl ? (
                  <Image
                    src={logoUrl}
                    alt="Ekhagens Restaurang logga"
                    width={52}
                    height={52}
                    className="h-12 w-12 rounded-full border border-amber-100/30 bg-white/90 object-contain p-1"
                  />
                ) : null}
                <p className="footer-title">{home.footerKolumn1Rubrik}</p>
              </div>
              <p className="footer-copy">{home.footerKolumn1Text}</p>
            </div>
            ) : null}
            {home.visaFooterKolumn2 ? (
            <div>
              <p className="footer-title">{home.footerKolumn2Rubrik}</p>
              <p className="footer-copy">{home.footerOppettiderRad1}</p>
              <p className="footer-copy">{home.footerOppettiderRad2}</p>
            </div>
            ) : null}
            {home.visaFooterKolumn3 ? (
            <div>
              <p className="footer-title">{home.footerKolumn3Rubrik}</p>
              <p className="footer-copy">{home.footerAdress}</p>
              <p className="footer-copy">{home.footerTelefon}</p>
              <p className="footer-copy">{home.footerEpost}</p>
              {home.visaFooterSkapadAv ? (
                <p className="footer-copy mt-2">
                  <a
                    href={home.footerSkapadAvLank}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 underline decoration-amber-200/70 underline-offset-4 hover:text-amber-100"
                  >
                    {creatorIconUrl ? (
                      <Image
                        src={creatorIconUrl}
                        alt={home.footerSkapadAvLogoAlt}
                        width={22}
                        height={22}
                        className="h-5 w-5 rounded-sm bg-white/90 object-contain p-0.5"
                      />
                    ) : null}
                    {home.footerSkapadAvText}
                  </a>
                </p>
              ) : null}
            </div>
            ) : null}
          </div>
        </footer>
      </body>
    </html>
  );
}
