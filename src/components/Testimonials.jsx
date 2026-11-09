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

export function Testimonials() {
  const { t, tx } = useContentStrings();
  const items = CONTENT.testimonials.items;
  const ui = CONTENT.ui.testimonials;

  if (!items?.length) return null;

  return (
    <section className="testimonials" aria-labelledby="testimonials-heading">
      <Reveal>
        <h2 id="testimonials-heading" className="section-title">
          {tx("ui.testimonials.heading", ui.heading)}
        </h2>
        <p className="section-sub">{tx("ui.testimonials.sub", ui.sub)}</p>
      </Reveal>
      <div className="testimonials-grid" role="list" aria-label={tx("ui.testimonials.regionAria", ui.regionAria)}>
        {items.map((item, i) => (
          <Reveal as="article" key={item.id} className="testimonial-card" role="listitem">
            <div
              className="testimonial-card__rating"
              aria-label={t("ui.testimonials.ratingAria", { value: String(item.rating) })}
            >
              {Array.from({ length: 5 }, (_, s) => (
                <StarIcon key={s} size={15} filled={s < item.rating} />
              ))}
            </div>
            <p className="testimonial-card__quote">
              “{tx(`testimonials.items[${i}].quote`, item.quote)}”
            </p>
            <div className="testimonial-card__person">
              <span className="testimonial-card__avatar" aria-hidden="true">
                {initials(item.name)}
              </span>
              <span className="testimonial-card__meta">
                <strong>{tx(`testimonials.items[${i}].name`, item.name)}</strong>
                <span>
                  {tx(`testimonials.items[${i}].role`, item.role)} · {tx(`testimonials.items[${i}].org`, item.org)}
                </span>
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
