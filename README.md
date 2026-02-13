# Ekhagens Golfrestaurang - Headless CMS (Strapi + Next.js)

Detta repo innehåller en komplett demo för en restaurangsajt med:

- `cms/`: Strapi v5 (innehållsadministration)
- `web/`: Next.js 16 (frontend)

Sajten är byggd för att icke-tekniska användare ska kunna uppdatera innehåll i CMS.

## Tech Stack

- Strapi `5.36`
- Next.js `16.1.6`
- React `19`
- Tailwind CSS `4`
- SQLite (lokalt i Strapi)

## Projektstruktur

- `cms/` - Strapi-projekt
- `web/` - Next.js-projekt
- `package.json` (root) - gemensamma scripts

## Viktigt om Node-version

Strapi stöder Node `20-24`.
Root-scripts är redan satta att köra CMS med temporär Node 24 via `npx`.

## Kommandon

Kör från repo-roten:

```powershell
npm run dev:cms
npm run dev:web
```

Build:

```powershell
npm run build:cms
npm run build:web
```

## Miljövariabler

Frontend (valfritt), skapa `web/.env.local`:

```text
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_PREVIEW_SECRET=change-me
STRAPI_API_TOKEN=
```

Notera:

- `NEXT_PUBLIC_STRAPI_URL` defaultar till `http://localhost:1337` om ej satt.
- `STRAPI_API_TOKEN` behövs bara om ni vill läsa skyddat innehåll via token.

## CMS-struktur (Single Types)

Projektet använder separata single types i Strapi:

- `Header (Toppen)`
- `Menyer`
- `Reklam-bilder`
- `Galleri (6 bilder)`
- `Nyheter`
- `Footer`

Samt collection type:

- `Article` (nyhetsinlägg)

## Public-rättigheter (viktigt)

I Strapi: `Settings -> Users & Permissions -> Roles -> Public`

Ge `find` till:

- `article`
- `header`
- `menyer`
- `reklam`
- `galleri`
- `nyheter-home` (eller motsvarande route i din install)
- `footer`

Efter ändringar i innehåll: klicka alltid `Publish`.

## Viktiga CMS-fält

### Menyer

- `visaLunchmenyDel` - visa/dölj lunchkort
- `visaKvallsmenyDel` - visa/dölj kvällskort
- Om bara en är aktiv centreras den automatiskt på sidan.

### Reklam-bilder

- `menyKort1Etikett`
- `menyKort2Etikett`
- `menyKort3Etikett`

Dessa styr t.ex. "Signaturrätt", "Grill", "Dessert".

### Galleri (6 bilder)

- `galleriBild1` ... `galleriBild6`

Om de är tomma används fallback/random-bilder.

### Footer

- `footerSkapadAvText`
- `footerSkapadAvLank`
- `footerSkapadAvLogga`

"Skapad av"-delen i footer och i kontaktflöde kan visa logga + text.

## Preview-läge

Aktivera preview:

```text
http://localhost:3000/api/preview?secret=change-me&slug=min-slug
```

Stäng preview:

```text
http://localhost:3000/api/preview/exit
```

## Vanliga problem

### "Ändringar i CMS syns inte"

Kontrollera:

1. Innehåll är `Published` (inte bara Draft).
2. `Public`-rollen har `find` på relevant API.
3. Rätt single type uppdaterades.
4. Starta om processerna vid behov:

```powershell
npm run dev:cms
npm run dev:web
```

### "Strapi request failed (403/401)"

Saknar oftast `Public`-rättighet eller token för endpointen.

### "PDF visas inte"

- Kontrollera att PDF är vald i `Menyer`.
- Kontrollera att filen är publicerbar/läsbar i Strapi.

## Deployment-notering

Detta repo är satt för lokal utveckling. Innan deployment:

- sätt produktions-URL för Strapi
- konfigurera permanenta miljö-variabler
- byt SQLite vid behov till managed databas

---

Om du vill kan README utökas med deployment-steg för Vercel + Strapi Cloud i nästa steg.
