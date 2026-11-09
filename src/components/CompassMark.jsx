/**
 * Kompas z katalogu marki: koło, przerywany pierścień, strzałki na osiach,
 * znaczniki w narożnikach i stalówka pióra wiecznego na środku.
 * Kolor dziedziczony przez `currentColor` — steruje się przez CSS `color`.
 */
export function CompassMark({ size = 40, className }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="3.2" />
      <circle
        cx="50"
        cy="50"
        r="35"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeDasharray="4 5"
        opacity="0.75"
      />

      {/* znaczniki w narożnikach */}
      <path
        d="M17 17 L24 20 M17 17 L20 24"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M83 17 L76 20 M83 17 L80 24"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M17 83 L24 80 M17 83 L20 76"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M83 83 L76 80 M83 83 L80 76"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />

      {/* trójkąty N / S */}
      <path d="M50 2 L56 15 L44 15 Z" fill="currentColor" />
      <path d="M50 98 L56 85 L44 85 Z" fill="currentColor" />

      {/* strzałki < > na osi W / E */}
      <path
        d="M14 44 L5 50 L14 56"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M86 44 L95 50 L86 56"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* stalówka pióra wiecznego, na ukos */}
      <g transform="rotate(45 50 50)">
        <path
          d="M50 25 C56 25 60 32 60 42 C60 52 55 58 50 68 C45 58 40 52 40 42 C40 32 44 25 50 25 Z"
          fill="currentColor"
        />
        <line x1="50" y1="34" x2="50" y2="60" stroke="var(--compass-nib-slit, #fff)" strokeWidth="1.6" />
        <circle cx="50" cy="44" r="2.1" fill="var(--compass-nib-slit, #fff)" />
      </g>
    </svg>
  );
}
