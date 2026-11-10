import offerData from "../content/offer.json";

const IMAGES_PUBLIC_PREFIX = "/images";

/**
 * Rozwiązuje odniesienie do grafiki:
 * - `https://…` / `http://…` — bez zmian
 * - `/…` — plik z `public/` (np. `/images/…`)
 * - inne (np. `oferta/2025/zdjecie.jpg`) — `public/images/…` → URL `/images/oferta/2025/zdjecie.jpg`
 */
function resolveMediaRef(ref) {
  if (ref == null || ref === "") return "";
  const s = String(ref).trim();
  if (/^https?:\/\//i.test(s)) return s;
  if (s.startsWith("/")) return s;
  return `${IMAGES_PUBLIC_PREFIX}/${s.replace(/^\/+/, "")}`;
}

function normalizeImage(image) {
  if (image == null) return { primary: "", fallback: "" };
  if (typeof image === "string") {
    const u = resolveMediaRef(image);
    return { primary: u, fallback: u };
  }
  const primary = image.primary ?? image.url ?? image.src ?? "";
  const fallback = image.fallback ?? primary;
  return {
    primary: resolveMediaRef(primary),
    fallback: resolveMediaRef(fallback),
  };
}

function normalizeTraining(t) {
  const { image, ...rest } = t;
  return {
    ...rest,
    images: normalizeImage(image),
  };
}

export const offerFilterTypes = offerData.filterTypes;
export const offerTrainings = offerData.trainings.map(normalizeTraining);

export function getTrainingDetail(id) {
  return offerTrainings.find((t) => t.id === id)?.detail ?? null;
}
