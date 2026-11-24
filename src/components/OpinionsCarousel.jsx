import { Reveal } from "../hooks/Reveal";
import { useContentStrings } from "../context/ContentStringsContext.jsx";
import { CONTENT } from "../lib/t.js";
import { StarIcon } from "./Icons.jsx";

/** Przewijane opinie (anonimowe) — automatyczne przewijanie w pętli z prawej do lewej. */
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
        <div className="opinions-marquee__track" style={{ "--marquee-duration": `${items.length * 6}s` }}>
          {loop.map((item, i) => (
            <article
              className={`opinion-card${item.quote.length > 300 ? " opinion-card--long" : ""}`}
              key={`${item.id}-${i}`}
              aria-hidden={i >= items.length || undefined}
            >
              <div className="opinion-card__rating" aria-hidden="true">
                {Array.from({ length: 5 }, (_, s2) => (
                  <StarIcon key={s2} size={14} filled={s2 < item.rating} />
                ))}
              </div>
              <p className="opinion-card__quote">
                „{tx(`opinions.items[${i % items.length}].quote`, item.quote)}”
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
