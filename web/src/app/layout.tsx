import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Manrope, Playfair_Display } from "next/font/google";
import ContactModalTrigger from "@/components/contact-modal-trigger";
import { getLogoUploadImage } from "@/lib/local-images";
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

export const metadata: Metadata = {
  title: "Ekhagens Golfrestaurang",
  description: "Modern golfrestaurang demo med Next.js och Strapi",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const home = await getHomepageContent();
  const logoUploadPath = await getLogoUploadImage();
  const logoUrl = logoUploadPath ? `${strapiBaseUrl}${logoUploadPath}` : "";

  return (
    <html lang="sv">
      <body className={`${manrope.variable} ${playfair.variable} antialiased`}>
        <div className="page-glow" />
        <header className="site-nav">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 py-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              {logoUrl ? (
                <Image
                  src={logoUrl}
                  alt="Ekhagens Golfrestaurang logga"
                  width={44}
                  height={44}
                  className="h-11 w-11 rounded-full border border-amber-100/40 bg-white/85 object-contain p-1 shadow-sm"
                  unoptimized
                />
              ) : (
                <span className="brand-dot" />
              )}
              <Link href="/" className="brand">
                Ekhagens Golfrestaurang
              </Link>
            </div>
            <nav className="nav-links flex items-center gap-1 self-center md:gap-2">
              <Link className="nav-link" href="/#cms">
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
                    alt="Ekhagens Golfrestaurang logga"
                    width={52}
                    height={52}
                    className="h-12 w-12 rounded-full border border-amber-100/30 bg-white/90 object-contain p-1"
                    unoptimized
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
                    {home.footerSkapadAvLogoUrl ? (
                      <Image
                        src={home.footerSkapadAvLogoUrl}
                        alt={home.footerSkapadAvLogoAlt}
                        width={22}
                        height={22}
                        className="h-5 w-5 rounded-sm bg-white/90 object-contain p-0.5"
                        unoptimized
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
