import { useEffect, useRef } from "react";

const SWIPE_MIN_PX = 64;
const SWIPE_MAX_OFF_AXIS_PX = 80;
const MOBILE_QUERY = "(max-width: 850px)";
/** Elementy z własnym przeciąganiem poziomym — swipe nawigacji między zakładkami ich nie przejmuje. */
const OWN_GESTURE_SELECTOR =
  ".about-carousel, .offer-pagination, .offer-filters, .trusted-by-marquee, .gallery-lightbox-root, input, textarea, select";

/** Swipe w lewo/prawo na mobile przełącza między sąsiednimi zakładkami z `tabIds`. */
export function useSwipeNav({ containerRef, tabIds, activeTab, onNavigate }) {
  const start = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onPointerDown = (e) => {
      if (e.pointerType === "mouse") return;
      if (!window.matchMedia(MOBILE_QUERY).matches) return;
      if (e.target.closest?.(OWN_GESTURE_SELECTOR)) return;
      start.current = { x: e.clientX, y: e.clientY, id: e.pointerId };
    };

    const onPointerUp = (e) => {
      const s = start.current;
      start.current = null;
      if (!s || s.id !== e.pointerId) return;

      const dx = e.clientX - s.x;
      const dy = e.clientY - s.y;
      if (Math.abs(dy) > SWIPE_MAX_OFF_AXIS_PX) return;
      if (Math.abs(dx) < SWIPE_MIN_PX) return;

      const idx = tabIds.indexOf(activeTab);
      if (idx === -1) return;

      if (dx < 0 && idx < tabIds.length - 1) {
        onNavigate(tabIds[idx + 1]);
      } else if (dx > 0 && idx > 0) {
        onNavigate(tabIds[idx - 1]);
      }
    };

    const onPointerCancel = () => {
      start.current = null;
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointercancel", onPointerCancel);
    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointercancel", onPointerCancel);
    };
  }, [containerRef, tabIds, activeTab, onNavigate]);
}
