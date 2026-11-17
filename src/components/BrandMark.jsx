/**
 * Logo COMPAS (wordmark z kompasem i podpisem „kierujemy na rozwój”).
 * `tone="dark"` — czarno-zielone, na jasne tło; `tone="light"` — kremowe, na zielone tło (stopka).
 */
const SOURCES = {
  dark: "/images/brand/logo-compas.png",
  light: "/images/brand/logo-compas-cream.png",
};

export function BrandMark({ className = "", tone = "dark" }) {
  return (
    <img
      className={`brandmark ${className}`}
      src={SOURCES[tone] ?? SOURCES.dark}
      alt="COMPAS — kierujemy na rozwój"
      width="543"
      height="136"
      decoding="async"
    />
  );
}
