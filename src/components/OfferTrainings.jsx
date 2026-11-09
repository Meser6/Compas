import { useEffect, useMemo, useState } from "react";
import { offerFilterTypes, offerTrainings } from "../data/offerTrainings.js";
import { Reveal } from "../hooks/Reveal";
import { SmartImage } from "./SmartImage";
import { ClockIcon, TargetIcon } from "./Icons.jsx";
import { CONTENT } from "../lib/t.js";
import { useContentStrings } from "../context/ContentStringsContext.jsx";

const PAGE_SIZE = 9;

export function OfferTrainings({ onOpenTraining }) {
  const { tx, t } = useContentStrings();
  const [filterId, setFilterId] = useState("all");
  const [page, setPage] = useState(1);
  const u = CONTENT.ui.offer;

  const filtered = useMemo(() => {
    if (filterId === "all") return offerTrainings;
    return offerTrainings.filter((item) => item.typeId === filterId);
  }, [filterId]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  useEffect(() => {
    setPage(1);
  }, [filterId]);

  const safePage = Math.min(Math.max(1, page), totalPages);
  const pageSlice = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  return (
    <div className="offer-section">
      <div className="offer-filters offer-filters--buttons" role="toolbar" aria-label={tx("ui.offer.filterToolbarAria", u.filterToolbarAria)}>
        {offerFilterTypes.map((ft, i) => (
          <button
            key={ft.id}
            type="button"
            className={`offer-filter-btn ${filterId === ft.id ? "is-active" : ""}`}
            aria-pressed={filterId === ft.id}
            onClick={() => setFilterId(ft.id)}
          >
            {tx(`offer.filterTypes[${i}].label`, ft.label)}
          </button>
        ))}
      </div>

      <div className="offer-filters-select-wrap">
        <label htmlFor="offer-type-filter" className="offer-filters-select-label">
          {tx("ui.offer.typeLabel", u.typeLabel)}
        </label>
        <select
          id="offer-type-filter"
          className="offer-filters-select"
          value={filterId}
          onChange={(e) => setFilterId(e.target.value)}
        >
          {offerFilterTypes.map((ft, i) => (
            <option key={ft.id} value={ft.id}>
              {tx(`offer.filterTypes[${i}].label`, ft.label)}
            </option>
          ))}
        </select>
      </div>

      {pageSlice.length === 0 ? (
        <p className="offer-empty">{tx("ui.offer.empty", u.empty)}</p>
      ) : (
        <div className="offer-grid">
          {pageSlice.map((item) => {
            const rec = t("ui.offer.recommendedPrefix");
            const suf = t("ui.offer.cardAriaSuffix");
            const ariaLabel = `${item.recommended ? rec : ""}${item.title}, ${item.price}. ${suf}`;
            const ariaKeyHint = `offer.card · ${item.id} · aria-label (ui.offer.recommendedPrefix + trainings.* + ui.offer.cardAriaSuffix)`;
            const duration = item.detail?.duration;
            const target = item.detail?.target;
            return (
              <article
                key={item.id}
                className="card offer-card"
                tabIndex={0}
                role="button"
                aria-label={tx(ariaKeyHint, ariaLabel)}
                onClick={() => onOpenTraining(item.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onOpenTraining(item.id);
                  }
                }}
              >
                <Reveal>
                  <div className="offer-card__media-wrap">
                    {item.recommended ? (
                      <span className="offer-card__ribbon" aria-hidden="true">
                        {tx("ui.offer.ribbon", u.ribbon)}
                      </span>
                    ) : null}
                    <div className="media-frame card-img-frame">
                      <SmartImage
                        className="card-img"
                        primary={item.images.primary}
                        fallback={item.images.fallback}
                        alt=""
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <h3>{tx(`offer.trainings.${item.id}.title`, item.title)}</h3>
                  <p>{tx(`offer.trainings.${item.id}.summary`, item.summary)}</p>
                  {duration || target ? (
                    <div className="offer-card__badges">
                      {duration ? (
                        <span
                          className="offer-card__badge"
                          title={t("ui.offer.badgeDurationAria", { value: duration })}
                        >
                          <ClockIcon size={14} />
                          <span className="offer-card__badge-text">
                            {tx(`offer.trainings.${item.id}.detail.duration`, duration)}
                          </span>
                        </span>
                      ) : null}
                      {target ? (
                        <span
                          className="offer-card__badge"
                          title={t("ui.offer.badgeTargetAria", { value: target })}
                        >
                          <TargetIcon size={14} />
                          <span className="offer-card__badge-text">
                            {tx(`offer.trainings.${item.id}.detail.target`, target)}
                          </span>
                        </span>
                      ) : null}
                    </div>
                  ) : null}
                  <div className="card-actions card-actions--offer">
                    <span className="btn btn-ghost offer-card__cta">{tx("ui.offer.cta", u.cta)}</span>
                    <span className="offer-card__price">{tx(`offer.trainings.${item.id}.price`, item.price)}</span>
                  </div>
                </Reveal>
              </article>
            );
          })}
        </div>
      )}

      {totalPages > 1 && pageSlice.length > 0 ? (
        <nav className="offer-pagination" aria-label={tx("ui.offer.paginationAria", u.paginationAria)}>
          <button
            type="button"
            className="offer-pagination__nav"
            disabled={safePage <= 1}
            aria-disabled={safePage <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            {tx("ui.offer.prev", u.prev)}
          </button>
          <div className="offer-pagination__pages">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                type="button"
                className={`offer-pagination__page ${safePage === num ? "is-active" : ""}`}
                aria-current={safePage === num ? "page" : undefined}
                onClick={() => setPage(num)}
              >
                {num}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="offer-pagination__nav"
            disabled={safePage >= totalPages}
            aria-disabled={safePage >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            {tx("ui.offer.next", u.next)}
          </button>
        </nav>
      ) : null}
    </div>
  );
}
