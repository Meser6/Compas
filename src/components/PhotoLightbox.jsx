import { createPortal } from "react-dom";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const GALLERY_LIGHTBOX_MOUNT_ID = "gallery-lightbox-mount";
const SWIPE_MIN_PX = 48;

/**
 * Lightbox na pełnym ekranie z nawigacją lewo/prawo (strzałki, klawiatura, swipe).
 * `photos`: [{ primary, fallback, alt }]. `index`: aktywne zdjęcie albo `null` (zamknięty).
 */
export function PhotoLightbox({ photos, index, onClose, onNavigate, closeLabel = "Zamknij", prevLabel = "Poprzednie zdjęcie", nextLabel = "Następne zdjęcie" }) {
  const closeBtnRef = useRef(null);
  const lastFocusRef = useRef(null);
  const [portalEl, setPortalEl] = useState(null);
  const startX = useRef(null);
  const startY = useRef(null);

  const open = index != null && photos?.[index] != null;
  const shot = open ? photos[index] : null;
  const [src, setSrc] = useState(shot?.primary ?? "");

  useLayoutEffect(() => {
    setPortalEl(document.getElementById(GALLERY_LIGHTBOX_MOUNT_ID) ?? document.body);
  }, []);

  useEffect(() => {
    setSrc(shot?.primary ?? "");
  }, [shot]);

  useEffect(() => {
    if (!open) return undefined;
    lastFocusRef.current = document.activeElement;
    const t = window.setTimeout(() => closeBtnRef.current?.focus(), 0);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = prevOverflow;
      const prev = lastFocusRef.current;
      if (prev && typeof prev.focus === "function") prev.focus();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate(1);
      if (e.key === "ArrowLeft") onNavigate(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose, onNavigate]);

  if (!open || !portalEl) return null;

  const fb = shot.fallback ?? shot.primary ?? "";
  const hasMultiple = photos.length > 1;

  return createPortal(
    <div className="gallery-lightbox-root" role="presentation">
      <button type="button" className="gallery-lightbox__backdrop" aria-label={closeLabel} onClick={onClose} />
      <div
        className="gallery-lightbox"
        role="dialog"
        aria-modal="true"
        aria-label={shot.alt || ""}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="gallery-lightbox__inner"
          onPointerDown={(e) => {
            startX.current = e.clientX;
            startY.current = e.clientY;
          }}
          onPointerUp={(e) => {
            if (startX.current == null) return;
            const dx = e.clientX - startX.current;
            const dy = e.clientY - (startY.current ?? e.clientY);
            startX.current = null;
            if (Math.abs(dx) < SWIPE_MIN_PX || Math.abs(dx) < Math.abs(dy)) return;
            onNavigate(dx < 0 ? 1 : -1);
          }}
        >
          <button type="button" ref={closeBtnRef} className="gallery-lightbox__close" aria-label={closeLabel} onClick={onClose}>
            ×
          </button>
          {hasMultiple ? (
            <button
              type="button"
              className="gallery-lightbox__nav gallery-lightbox__nav--prev"
              aria-label={prevLabel}
              onClick={() => onNavigate(-1)}
            >
              ‹
            </button>
          ) : null}
          <img
            className="gallery-lightbox__img"
            src={src}
            alt={shot.alt || ""}
            decoding="async"
            draggable={false}
            onError={() => {
              if (fb && src !== fb) setSrc(fb);
            }}
          />
          {hasMultiple ? (
            <button
              type="button"
              className="gallery-lightbox__nav gallery-lightbox__nav--next"
              aria-label={nextLabel}
              onClick={() => onNavigate(1)}
            >
              ›
            </button>
          ) : null}
        </div>
      </div>
    </div>,
    portalEl,
  );
}
