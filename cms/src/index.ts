import type { Core } from '@strapi/strapi';

type Dict = Record<string, unknown>;

function camelToSnake(value: string) {
  return value.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`);
}

function pickBoolean(existing: unknown, legacy: unknown, fallback: boolean) {
  if (typeof existing === 'boolean') return existing;
  if (typeof legacy === 'boolean') return legacy;
  return fallback;
}

function pickString(existing: unknown, legacy: unknown, fallback: string) {
  if (typeof existing === 'string' && existing.trim().length > 0) return existing;
  if (typeof legacy === 'string' && legacy.trim().length > 0) return legacy;
  return fallback;
}

function mergeDefaults(defaults: Dict, legacyRow: Dict | null, existing: Dict | null) {
  const output: Dict = {};

  for (const [key, fallback] of Object.entries(defaults)) {
    const legacyValue = legacyRow?.[camelToSnake(key)];
    const existingValue = existing?.[key];

    if (typeof fallback === 'boolean') {
      output[key] = pickBoolean(existingValue, legacyValue, fallback);
      continue;
    }

    if (typeof fallback === 'string') {
      output[key] = pickString(existingValue, legacyValue, fallback);
      continue;
    }

    output[key] = existingValue ?? legacyValue ?? fallback;
  }

  return output;
}

async function upsertSingleType(
  strapi: Core.Strapi,
  uid: string,
  defaults: Dict,
  legacyRow: Dict | null,
) {
  const found = await strapi.db.query(uid).findMany({
    limit: 1,
    orderBy: [{ updatedAt: 'desc' }, { id: 'desc' }],
  });

  const current = (found?.[0] ?? null) as (Dict & { id?: number }) | null;
  const data = mergeDefaults(defaults, legacyRow, current);

  if (current?.id) {
    await strapi.db.query(uid).update({
      where: { id: current.id },
      data,
    });
    return;
  }

  await strapi.db.query(uid).create({ data });
}

export default {
  register() {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    let legacyRow: Dict | null = null;

    try {
      legacyRow = ((await strapi.db.connection('homepages').select('*').first()) ?? null) as
        | Dict
        | null;
    } catch {
      legacyRow = null;
    }

    await upsertSingleType(
      strapi,
      'api::header.header',
      {
        visaToppen: true,
        visaOverrubrikToppen: true,
        visaHuvudrubrikToppen: true,
        visaBeskrivningToppen: true,
        visaKnappToppen: true,
        visaSekundarKnappToppen: true,
        visaBildToppen: true,
        overrubrikToppen: 'Ekhagens Golfrestaurang',
        huvudrubrikToppen: 'Smaker av skog och fairway',
        beskrivningToppen:
          'En modern golfrestaurang med nordiska ratter, weekend-brunch och kvallsservering intill 18:e green.',
        knappTextToppen: 'Ring och boka',
        knappLankToppen: 'tel:+46123456789',
        sekundarKnappTextToppen: 'Se nyheter fran koket',
        visaSchema: true,
        visaSchemaRubrik: true,
        visaSchemaRad1: true,
        visaSchemaRad2: true,
        visaSchemaRad3: true,
        visaSchemaRad4: true,
        schemaRubrik: 'Dagens spelschema',
        schemaRad1Text: 'Frukost vid rangen',
        schemaRad1Tid: '08:00',
        schemaRad2Text: 'Lunchbuffe',
        schemaRad2Tid: '11:30',
        schemaRad3Text: 'After golf',
        schemaRad3Tid: '16:00',
        schemaRad4Text: "Chef's table",
        schemaRad4Tid: '19:00',
      },
      legacyRow,
    );

    await upsertSingleType(
      strapi,
      'api::menyer.menyer',
      {
        visaLunchmenySektion: true,
        visaLunchmenyDel: true,
        visaKvallsmenyDel: true,
        visaLunchmenyRubrik: true,
        visaLunchmenyBeskrivning: true,
        visaLunchmenyPdf: true,
        visaKvallsmenyRubrik: true,
        visaKvallsmenyBeskrivning: true,
        visaKvallsmenyPdf: true,
        lunchmenyRubrik: 'Lunchmeny den har veckan',
        lunchmenyBeskrivning:
          'Uppdateras varje vecka. Klicka for att oppna eller ladda ner aktuell PDF.',
        lunchmenyKnappText: 'Oppna lunchmeny (PDF)',
        kvallsmenyRubrik: 'Kvallsmeny',
        kvallsmenyBeskrivning:
          'Fastare meny for kvallen. Byts vid behov och kan laddas upp som ny PDF.',
        kvallsmenyKnappText: 'Oppna kvallsmeny (PDF)',
      },
      legacyRow,
    );

    await upsertSingleType(
      strapi,
      'api::reklam.reklam',
      {
        visaMenykortSektion: true,
        visaMenyKort1: true,
        visaMenyKort2: true,
        visaMenyKort3: true,
        menyKort1Etikett: 'Signaturratt',
        menyKort1Rubrik: 'Smoked trout brioche',
        menyKort1Text: 'Varmrokt regnbage, pepparrotscreme och picklad gurka.',
        menyKort2Etikett: 'Grill',
        menyKort2Rubrik: 'Oak fired flank steak',
        menyKort2Text: 'Serveras med rostad potatis, smorad spetskal och timjansky.',
        menyKort3Etikett: 'Dessert',
        menyKort3Rubrik: 'Lingon creme brulee',
        menyKort3Text: 'Krispig karamell, vispad vanilj och varma bar.',
        visaEventSektion: true,
        visaEventOverrubrik: true,
        visaEventRubrik: true,
        visaEventText: true,
        visaEventKnapp: true,
        visaEventBild: true,
        eventOverrubrik: 'Event',
        eventRubrik: 'Fredagskvall: Jazz pa terrassen',
        eventText:
          'Levande musik, 5-ratters sharing menu och panoramavy over banan. Begransat antal platser.',
        eventKnappText: 'Reservera 18:30',
        eventKnappLank: 'tel:+46123456789',
      },
      legacyRow,
    );

    await upsertSingleType(
      strapi,
      'api::galleri.galleri',
      {
        visaGalleriSektion: true,
      },
      legacyRow,
    );

    await upsertSingleType(
      strapi,
      'api::nyheter-home.nyheter-home',
      {
        visaNyheterSektion: true,
        visaNyheterOverrubrik: true,
        visaNyheterRubrik: true,
        nyheterOverrubrik: 'Live fran Strapi',
        nyheterRubrik: 'Nytt fran koket',
      },
      legacyRow,
    );

    await upsertSingleType(
      strapi,
      'api::footer.footer',
      {
        visaFooterKolumn1: true,
        footerKolumn1Rubrik: 'Ekhagens Golfrestaurang',
        footerKolumn1Text: 'Modern mat i klubbhusmiljo, utsikt over fairway och green.',
        visaFooterKolumn2: true,
        footerKolumn2Rubrik: 'Oppettider',
        footerOppettiderRad1: 'Man-fre 11:00-22:00',
        footerOppettiderRad2: 'Lor-son 09:00-23:00',
        visaFooterKolumn3: true,
        footerKolumn3Rubrik: 'Kontakt',
        footerAdress: 'Bistrovagen 7, Ekhagen',
        footerTelefon: '+46 123 456 789',
        footerEpost: 'bokning@ekhagengolfbistro.se',
        visaFooterSkapadAv: true,
        footerSkapadAvText: 'Skapad av AlexAhman.se',
        footerSkapadAvLank: 'https://alexahman.se',
      },
      legacyRow,
    );
  },
};
