/**
 * Grafiki globalne — wpis: **`file` i/lub `url`** (wystarczy jedno).
 * Oba: `primary` = plik z `public/`, `fallback` = URL. Tylko jedno: jedno źródło, bez zapasu.
 * Użycie: `{...imgPair(IMG.hero)}` z `SmartImage` + `imageKey`.
 */
export const IMG = {
  /** Portret dr. Daniela Syrka (okrągłe ujęcie w nagłówku „O autorze”). */
  aboutPortrait: {
    file: "/images/about/portrait-daniel.jpg",
  },
  /** Wycięta sylwetka autora — bez tła, element dekoracyjny przy osi „Obszary współpracy”. */
  aboutCutout: {
    file: "/images/about/cutout-daniel.png",
  },
  /** Zdjęcie grupowe — szkolenie rady pedagogicznej. */
  groupTeachers: {
    file: "/images/about/group-teachers.jpg",
  },
  /** Zdjęcie grupowe — młodzież, zajęcia integracyjne (sekcja „Główne wartości”). */
  groupTeens: {
    file: "/images/about/group-teens.jpg",
  },
  /** Rodzic i nastolatka — warsztaty dla rodziców. */
  parentTeen: {
    file: "/images/offer/parent-teen.png",
  },
  /** Prelekcje podróżnicze — Indie, słonie. */
  travelElephant: {
    file: "/images/offer/travel-elephant.jpg",
  },
  /** Prelekcje podróżnicze — Taj Mahal. */
  travelTajMahal: {
    file: "/images/offer/travel-tajmahal.jpg",
  },
  /** Spotkanie / konsultacja — tło banera „Szkolenia łączą refleksję i praktykę”. */
  stockMeeting: {
    file: "/images/misc/stock-meeting.jpg",
  },
};

/**
 * Props pod `SmartImage`: `primary` / `fallback` oraz `keysSource` (surowe `file`/`url` do podglądu kluczy).
 */
export function imgPair(entry) {
  const file = typeof entry.file === "string" ? entry.file.trim() : "";
  const url = typeof entry.url === "string" ? entry.url.trim() : "";
  if (!file && !url) {
    throw new Error("IMG: podaj `file` albo `url` (albo oba)");
  }
  const primary = file || url;
  const fallback = file && url ? url : "";
  return {
    primary,
    fallback,
    keysSource: { file, url },
  };
}
