import offerData from "../content/offer.json";

const IMAGES_PUBLIC_PREFIX = "/images";

/**
 * Rozwiązuje odniesienie do grafiki:
 * - `https://…` / `http://…` — bez zmian
 * - `/…` — plik z `public/` (np. `/images/…`)
 * - inne (np. `about/zdjecie.jpg`) — URL `/images/about/zdjecie.jpg`
 */
function resolveMediaRef(ref) {
  if (ref == null || ref === "") return "";
  const s = String(ref).trim();
  if (/^https?:\/\//i.test(s)) return s;
  if (s.startsWith("/")) return s;
  return `${IMAGES_PUBLIC_PREFIX}/${s.replace(/^\/+/, "")}`;
}

/**
 * Struktura `content/offer.json`:
 * - `groups[]` — grupy odbiorców (rady pedagogiczne, rodzice, uczniowie, biznes),
 *   każda z `categories[]` → `items[]` ({ id, title, description? }).
 * - `descriptions{}` — pełne opisy szkoleń (opis, korzyści, program); pozycja w katalogu
 *   wskazuje opis przez pole `description`. Jeden opis może być użyty w kilku grupach.
 */
export const offerGroups = offerData.groups.map((g) => ({ ...g, image: resolveMediaRef(g.image) }));
export const offerDescriptions = offerData.descriptions;

/** Klucz pozycji w modalu: `grupa/pozycja`. */
export const offerItemKey = (groupId, itemId) => `${groupId}/${itemId}`;

export function findOfferItem(key) {
  if (!key) return null;
  const [groupId, itemId] = key.split("/");
  const group = offerGroups.find((g) => g.id === groupId);
  if (!group) return null;
  for (const category of group.categories) {
    const item = category.items.find((i) => i.id === itemId);
    if (item) {
      return {
        group,
        category,
        item,
        description: item.description ? offerDescriptions[item.description] ?? null : null,
      };
    }
  }
  return null;
}
