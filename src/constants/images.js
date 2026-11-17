/**
 * Grafiki globalne — wpis: **`file` i/lub `url`** (wystarczy jedno).
 * Oba: `primary` = plik z `public/`, `fallback` = URL. Tylko jedno: jedno źródło, bez zapasu.
 * Użycie: `{...imgPair(IMG.hero)}` z `SmartImage` + `imageKey`.
 */
export const IMG = {
  /** Portret dr. Daniela Syrka — „O autorze”. */
  aboutPortrait: {
    file: "/images/photos/daniel-syrek.jpg",
  },
  /** Portret na stronie głównej (nagłówek) — grafika z własną zieloną obwódką w pliku. */
  heroPortrait: {
    file: "/images/photos/daniel-syrek-badge.jpg",
  },
  /** Zdjęcie grupowe z rady pedagogicznej — zakładka „Kontakt”. */
  groupTeachers: {
    file: "/images/photos/szkolenie-grono-pedagogiczne.jpg",
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
