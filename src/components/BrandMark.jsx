import { CompassMark } from "./CompassMark.jsx";

/**
 * Wordmark „COMPAS” — litera „O” zastąpiona różą wiatrów (CompassMark).
 * `variant="full"` (domyślny): wordmark + odręczny podpis „kierujemy na rozwój”.
 * `variant="mark"`: sam kompas, bez tekstu (np. ciasne miejsca, favicon-like).
 */
export function BrandMark({ className = "", variant = "full", markSize = 34 }) {
  if (variant === "mark") {
    return <CompassMark size={markSize} className={`brandmark__glyph ${className}`} />;
  }

  return (
    <span className={`brandmark ${className}`}>
      <span className="brandmark__word">
        C<CompassMark size={markSize} className="brandmark__glyph" />
        MPAS
      </span>
      <span className="brandmark__tagline">kierujemy na rozwój</span>
    </span>
  );
}
