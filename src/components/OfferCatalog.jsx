import { useMemo, useState } from "react";
import { offerFilterTypes, offerTrainings } from "../data/offerTrainings.js";
import { Reveal } from "../hooks/Reveal";
import { SmartImage } from "./SmartImage";
import { TargetIcon } from "./Icons.jsx";
import { CONTENT } from "../lib/t.js";
import { useContentStrings } from "../context/ContentStringsContext.jsx";

export function OfferCatalog({ onOpenTraining }) {
  const { tx, t } = useContentStrings();
  const u = CONTENT.ui.offer;
  const [filterId, setFilterId] = useState("all");

  const filtered = useMemo(() => {
    if (filterId === "all") return offerTrainings;
    return offerTrainings.filter((item) => item.typeId === filterId);
  }, [filterId]);

  return (
    <div className="offer-section">
      <div className="offer-filters" role="toolbar" aria-label={tx("ui.offer.filterToolbarAria", u.filterToolbarAria)}>
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

      {filtered.length === 0 ? (
        <p className="offer-empty">{tx("ui.offer.empty", u.empty)}</p>
      ) : (
        <div className="offer-grid">
          {filtered.map((item) => {
            const suf = t("ui.offer.cardAriaSuffix");
            const ariaLabel = `${item.title}. ${suf}`;
            const targets = Array.isArray(item.target) ? item.target : item.target ? [item.target] : [];
            const subcategories = item.detail?.lists?.map((l) => l.heading) ?? [];
            return (
              <article
                key={item.id}
                className="card offer-card"
                tabIndex={0}
                role="button"
                aria-label={tx(`offer.card · ${item.id}`, ariaLabel)}
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

                  {subcategories.length > 1 ? (
                    <div className="offer-card__subtags">
                      {subcategories.map((heading, li) => (
                        <span className="offer-card__subtag" key={heading}>
                          {tx(`offer.trainings.${item.id}.detail.lists[${li}].heading`, heading)}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  {targets.length ? (
                    <div className="offer-card__badges">
                      {targets.map((label, ti) => (
                        <span className="offer-card__badge" key={label}>
                          <TargetIcon size={13} />
                          <span className="offer-card__badge-text">
                            {tx(`offer.trainings.${item.id}.target[${ti}]`, label)}
                          </span>
                        </span>
                      ))}
                    </div>
                  ) : null}

                  <div className="card-actions card-actions--offer">
                    <span className="btn btn-ghost offer-card__cta">{tx("ui.offer.cta", u.cta)}</span>
                  </div>
                </Reveal>
              </article>
            );
          })}
        </div>
      )}

      <Reveal>
        <p className="offer-flourish">
          <span className="offer-flourish__word">oraz</span>
          <span className="offer-flourish__big">WIELE</span>
          <span className="offer-flourish__word">innych</span>
        </p>
      </Reveal>
    </div>
  );
}
