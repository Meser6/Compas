import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Reveal } from "../hooks/Reveal";
import { useContentStrings } from "../context/ContentStringsContext.jsx";
import { CONTENT } from "../lib/t.js";
import { StarIcon } from "./Icons.jsx";

const AUTOPLAY_MS = 9_000;
const SWIPE_MIN_PX = 48;
const MOBILE_QUERY = "(max-width: 700px)";

/** Dzieli na strony; niepełną ostatnią stronę dopełnia opiniami z początku, żeby zawsze były pełne ramki. */
function chunkItems(items, size) {
  const out = [];
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size));
  const last = out[out.length - 1];
  if (last && last.length < size && items.length > size) {
    out[out.length - 1] = [...last, ...items.slice(0, size - last.length)];
  }
  return out;
}

/** 3 opinie na stronę na desktopie, 1 na telefonie. */
function usePerSlide() {
  const get = () => (window.matchMedia(MOBILE_QUERY).matches ? 1 : 3);
  const [perSlide, setPerSlide] = useState(get);
  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const onChange = () => setPerSlide(get());
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return perSlide;
}

/** Opinie (anonimowe) jako galeria: strony po 3 karty równej wysokości, kropki, swipe i autoprzewijanie. */
export function OpinionsCarousel() {
  const { tx } = useContentStrings();
  const items = CONTENT.opinions.items;
  const s = CONTENT.pages.start;
  const perSlide = usePerSlide();
  const slides = useMemo(() => chunkItems(items ?? [], perSlide), [items, perSlide]);
  const pageCount = slides.length;
  const [page, setPage] = useState(0);
  const [autoplayEpoch, setAutoplayEpoch] = useState(0);
  const restartAutoplay = useCallback(() => setAutoplayEpoch((n) => n + 1), []);
  const pointer = useRef({ id: null, x: 0, y: 0 });

  useEffect(() => {
    setPage((p) => Math.min(p, Math.max(pageCount - 1, 0)));
  }, [pageCount]);

  useEffect(() => {
    if (pageCount <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setPage((p) => (p + 1) % pageCount), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [pageCount, autoplayEpoch]);

  const goTo = (next) => {
    setPage((next + pageCount) % pageCount);
    restartAutoplay();
  };

  const onPointerDown = (e) => {
    if (!e.isPrimary) return;
    pointer.current = { id: e.pointerId, x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e) => {
    if (pointer.current.id !== e.pointerId) return;
    const dx = e.clientX - pointer.current.x;
    const dy = e.clientY - pointer.current.y;
    pointer.current.id = null;
    if (pageCount <= 1 || Math.abs(dx) < SWIPE_MIN_PX || Math.abs(dx) < Math.abs(dy)) return;
    goTo(page + (dx < 0 ? 1 : -1));
  };

  if (!items?.length) return null;
  const title = tx("pages.start.opinionsTitle", s.opinionsTitle);

  return (
    <section className="opinions" aria-labelledby="opinions-heading">
      <Reveal>
        <h2 id="opinions-heading" className="section-title">
          {title}
        </h2>
        <p className="section-sub">{tx("pages.start.opinionsSub", s.opinionsSub)}</p>
      </Reveal>
      <div className="opinions-carousel" role="region" aria-roledescription="karuzela" aria-label={title}>
        <div
          className="opinions-carousel__viewport"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => (pointer.current.id = null)}
        >
          <div className="opinions-carousel__track" style={{ transform: `translate3d(-${page * 100}%, 0, 0)` }}>
            {slides.map((group, slideIdx) => (
              <div
                key={slideIdx}
                className="opinions-carousel__slide"
                style={{ "--per-slide": perSlide }}
                role="group"
                aria-roledescription="slajd"
                aria-label={`${slideIdx + 1} z ${pageCount}`}
                aria-hidden={page !== slideIdx}
              >
                {group.map((item) => {
                  const idx = items.indexOf(item);
                  return (
                    <article className="opinion-card" key={item.id}>
                      <div className="opinion-card__rating" aria-hidden="true">
                        {Array.from({ length: 5 }, (_, s2) => (
                          <StarIcon key={s2} size={14} filled={s2 < item.rating} />
                        ))}
                      </div>
                      <p className="opinion-card__quote">„{tx(`opinions.items[${idx}].quote`, item.quote)}”</p>
                    </article>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {pageCount > 1 ? (
          <div className="opinions-carousel__controls">
            <button type="button" className="opinions-carousel__arrow" aria-label="Poprzednie opinie" onClick={() => goTo(page - 1)}>
              ‹
            </button>
            <nav className="about-carousel__dots opinions-carousel__dots" aria-label="Wybierz stronę opinii">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`about-carousel__dot ${page === i ? "is-active" : ""}`}
                  aria-current={page === i ? "true" : undefined}
                  aria-label={`Strona ${i + 1} z ${pageCount}`}
                  onClick={() => goTo(i)}
                />
              ))}
            </nav>
            <button type="button" className="opinions-carousel__arrow" aria-label="Następne opinie" onClick={() => goTo(page + 1)}>
              ›
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
