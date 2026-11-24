import { Reveal } from "../hooks/Reveal";
import { useContentStrings } from "../context/ContentStringsContext.jsx";
import { CONTENT } from "../lib/t.js";

/** Pasek logo firm i instytucji — białe tło, ciągłe przewijanie z prawej do lewej. */
export function PartnersMarquee() {
  const { tx } = useContentStrings();
  const items = CONTENT.partners.items;
  const s = CONTENT.pages.start;
  if (!items?.length) return null;

  const loop = [...items, ...items];
  const title = tx("pages.start.partnersTitle", s.partnersTitle);

  return (
    <section className="partners" aria-labelledby="partners-heading">
      <Reveal>
        <h2 id="partners-heading" className="section-title">
          {title}
        </h2>
      </Reveal>
      <div className="partners-marquee" role="region" aria-label={title}>
        <ul
          className="partners-marquee__track"
          style={{ "--marquee-duration": `${items.length * 4}s` }}
        >
          {loop.map((item, i) => (
            <li className="partners-logo" key={`${item.logo}-${i}`} aria-hidden={i >= items.length || undefined}>
              <img src={`/images/${item.logo}`} alt={item.name} loading="lazy" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
