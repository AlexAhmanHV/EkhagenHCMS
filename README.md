# Ekhagens Golfrestaurang - Headless CMS (Strapi + Next.js)

Detta repo innehaller en komplett demo for en restaurangsajt med:

- `cms/`: Strapi v5 (innehallsadministration)
- `web/`: Next.js 16 (frontend)

Sajten ar byggd for att icke-tekniska anvandare ska kunna uppdatera innehall i CMS.

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

Strapi stoder Node `20-24`.
Root-scripts ar redan satta att kora CMS med temporar Node 24 via `npx`.

## Kommandon

Kor fran repo-roten:

```powershell
npm run dev:cms
npm run dev:web
```

Build:

```powershell
npm run build:cms
npm run build:web
```

## Miljovariabler

Frontend (valfritt), skapa `web/.env.local`:

```text
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_PREVIEW_SECRET=change-me
STRAPI_API_TOKEN=
```

Notera:

- `NEXT_PUBLIC_STRAPI_URL` defaultar till `http://localhost:1337` om ej satt.
- `STRAPI_API_TOKEN` behovs bara om ni vill lasa skyddat innehall via token.

## CMS-struktur (Single Types)

Projektet anvander separata single types i Strapi:

- `Header (Toppen)`
- `Menyer`
- `Reklam-bilder`
- `Galleri (6 bilder)`
- `Nyheter`
- `Footer`

Samt collection type:

- `Article` (nyhetsinlagg)

## Public-rattigheter (viktigt)

I Strapi: `Settings -> Users & Permissions -> Roles -> Public`

Ge `find` till:

- `article`
- `header`
- `menyer`
- `reklam`
- `galleri`
- `nyheter-home` (eller motsvarande route i din install)
- `footer`

Efter andringar i innehall: klicka alltid `Publish`.

## Viktiga CMS-falt

### Menyer

- `visaLunchmenyDel` - visa/dolj lunchkort
- `visaKvallsmenyDel` - visa/dolj kvallskort
- Om bara en ar aktiv centreras den automatiskt pa sidan.

### Reklam-bilder

- `menyKort1Etikett`
- `menyKort2Etikett`
- `menyKort3Etikett`

Dessa styr t.ex. "Signaturratt", "Grill", "Dessert".

### Galleri (6 bilder)

- `galleriBild1` ... `galleriBild6`

Om de ar tomma anvands fallback/random-bilder.

### Footer

- `footerSkapadAvText`
- `footerSkapadAvLank`
- `footerSkapadAvLogga`

"Skapad av"-delen i footer och i kontaktflode kan visa logga + text.

## Preview-lage

Aktivera preview:

```text
http://localhost:3000/api/preview?secret=change-me&slug=min-slug
```

Stang preview:

```text
http://localhost:3000/api/preview/exit
```

## Vanliga problem

### "Andringar i CMS syns inte"

Kontrollera:

1. Innehall ar `Published` (inte bara Draft).
2. `Public`-rollen har `find` pa relevant API.
3. Ratt single type uppdaterades.
4. Starta om processerna vid behov:

```powershell
npm run dev:cms
npm run dev:web
```

### "Strapi request failed (403/401)"

Saknar oftast `Public`-rattighet eller token for endpointen.

### "PDF visas inte"

- Kontrollera att PDF ar vald i `Menyer`.
- Kontrollera att filen ar publicerbar/lasbar i Strapi.

## Deployment-notering

Detta repo ar satt for lokal utveckling. Innan deployment:

- satt produktions-URL for Strapi
- konfigurera permanenta miljo-variabler
- byt SQLite vid behov till managed databas

---

Om du vill kan README utokas med deployment-steg for Vercel + Strapi Cloud i nasta steg.
