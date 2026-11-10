import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SmartImage } from "./SmartImage";
import { CONTENT } from "../lib/t.js";
import { useContentStrings } from "../context/ContentStringsContext.jsx";

const PER_SLIDE = 3;
const AUTOPLAY_MS = 10_000;
const SWIPE_MIN_PX = 48;

function chunkItems(items, size) {
  const out = [];
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size));
  return out;
}

/** Siatka miniatur „O autorze” — kliknięcie otwiera wspólny `PhotoLightbox` (przez `onOpenPhoto`). */
export function AboutGalleryCarousel({ onOpenPhoto }) {
  const { t, tx } = useContentStrings();
  const aboutGallery = CONTENT.about.gallery;
  const ac = CONTENT.ui.aboutCarousel;
  const slides = useMemo(() => chunkItems(aboutGallery, PER_SLIDE), [aboutGallery]);
  const pageCount = slides.length;
  const [page, setPage] = useState(0);
  const pageRef = useRef(0);

  useEffect(() => {
    pageRef.current = page;
  }, [page]);

  const [autoplayEpoch, setAutoplayEpoch] = useState(0);
  const restartAutoplay = useCallback(() => setAutoplayEpoch((n) => n + 1), []);

  const activePointerId = useRef(null);
  const startX = useRef(0);
  const startY = useRef(0);

  useEffect(() => {
    if (pageCount <= 1) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const id = window.setInterval(() => {
      setPage((p) => (p + 1) % pageCount);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(id);
  }, [pageCount, autoplayEpoch]);

  const onPointerDown = useCallback((e) => {
    if (!e.isPrimary) return;
    activePointerId.current = e.pointerId;
    startX.current = e.clientX;
    startY.current = e.clientY;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  }, []);

  const onPointerUp = useCallback(
    (e) => {
      if (activePointerId.current !== e.pointerId) return;

      if (pageCount <= 1) {
        activePointerId.current = null;
        return;
      }

      const dx = e.clientX - startX.current;
      const dy = e.clientY - startY.current;
      activePointerId.current = null;

      if (Math.abs(dx) < SWIPE_MIN_PX || Math.abs(dx) < Math.abs(dy)) return;

      const p = pageRef.current;
      let next = p;
      if (dx < 0 && p < pageCount - 1) next = p + 1;
      else if (dx > 0 && p > 0) next = p - 1;

      if (next !== p) {
        setPage(next);
        restartAutoplay();
      }
    },
    [pageCount, restartAutoplay],
  );

  const onPointerCancel = useCallback((e) => {
    if (activePointerId.current === e.pointerId) activePointerId.current = null;
  }, []);

  return (
    <div className="about-carousel" role="region" aria-label={tx("ui.aboutCarousel.regionAria", ac.regionAria)}>
      <div
        className="about-carousel__viewport"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
      >
        <div
          className="about-carousel__track"
          style={{ transform: `translate3d(-${page * 100}%, 0, 0)` }}
        >
          {slides.map((group, slideIdx) => (
            <div
              key={slideIdx}
              id={`about-slide-${slideIdx}`}
              className="about-carousel__slide"
              aria-hidden={page !== slideIdx}
              role="group"
              aria-roledescription={tx("ui.aboutCarousel.slideRole", ac.slideRole)}
              aria-label={t("ui.aboutCarousel.slideLabel", { n: String(slideIdx + 1), total: String(pageCount) })}
            >
              {group.map((shot, i) => {
                const gIdx = slideIdx * PER_SLIDE + i;
                const alt = tx(`about.gallery[${gIdx}].alt`, shot.alt);
                return (
                  <button
                    key={`${shot.alt}-${slideIdx}-${i}`}
                    type="button"
                    className="about-gallery__thumb-btn"
                    aria-label={t("ui.aboutCarousel.openLightboxAria", { alt })}
                    onClick={() => {
                      onOpenPhoto?.(gIdx);
                      restartAutoplay();
                    }}
                  >
                    <div className="media-frame media-frame--4-3 about-gallery__frame">
                      <SmartImage
                        primary={shot.primary}
                        fallback={shot.fallback}
                        alt={alt}
                        loading="lazy"
                        className="about-gallery__img"
                        draggable={false}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {pageCount > 1 ? (
        <nav className="about-carousel__dots" aria-label={tx("ui.aboutCarousel.dotsAria", ac.dotsAria)}>
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`about-carousel__dot ${page === i ? "is-active" : ""}`}
              aria-current={page === i ? "true" : undefined}
              aria-label={t("ui.aboutCarousel.dotLabel", { n: String(i + 1), total: String(pageCount) })}
              onClick={() => {
                setPage(i);
                restartAutoplay();
              }}
            />
          ))}
        </nav>
      ) : null}
    </div>
  );
}
