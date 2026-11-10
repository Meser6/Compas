import { Reveal } from "../hooks/Reveal";
import { useContentStrings } from "../context/ContentStringsContext.jsx";
import { CONTENT } from "../lib/t.js";
import { StarIcon } from "./Icons.jsx";

function initials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

/** Przewijane opinie — pasek 3 kart w rzędzie, automatyczne przewijanie w pętli. */
export function OpinionsCarousel() {
  const { tx } = useContentStrings();
  const items = CONTENT.opinions.items;
  const s = CONTENT.pages.start;
  if (!items?.length) return null;

  const loop = [...items, ...items];

  return (
    <section className="opinions" aria-labelledby="opinions-heading">
      <Reveal>
        <h2 id="opinions-heading" className="section-title">
          {tx("pages.start.opinionsTitle", s.opinionsTitle)}
        </h2>
        <p className="section-sub">{tx("pages.start.opinionsSub", s.opinionsSub)}</p>
      </Reveal>
      <div className="opinions-marquee" role="region" aria-label={tx("pages.start.opinionsTitle", s.opinionsTitle)}>
        <div className="opinions-marquee__track">
          {loop.map((item, i) => (
            <article className="opinion-card" key={`${item.id}-${i}`}>
              <div className="opinion-card__rating" aria-hidden="true">
                {Array.from({ length: 5 }, (_, s2) => (
                  <StarIcon key={s2} size={14} filled={s2 < item.rating} />
                ))}
              </div>
              <p className="opinion-card__quote">
                „{tx(`opinions.items[${i % items.length}].quote`, item.quote)}”
              </p>
              <div className="opinion-card__person">
                <span className="opinion-card__avatar" aria-hidden="true">
                  {initials(item.name)}
                </span>
                <span className="opinion-card__meta">
                  <strong>{tx(`opinions.items[${i % items.length}].name`, item.name)}</strong>
                  <span>
                    {tx(`opinions.items[${i % items.length}].role`, item.role)} · {tx(`opinions.items[${i % items.length}].org`, item.org)}
                  </span>
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
