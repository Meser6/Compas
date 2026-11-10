import { useEffect, useMemo, useState } from "react";
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
  const [subFilter, setSubFilter] = useState(null);

  useEffect(() => {
    setSubFilter(null);
  }, [filterId]);

  const filtered = useMemo(() => {
    if (filterId === "all") return offerTrainings;
    return offerTrainings.filter((item) => item.typeId === filterId);
  }, [filterId]);

  const soleItem = filtered.length === 1 ? filtered[0] : null;
  const subLists = soleItem?.detail?.lists?.length > 1 ? soleItem.detail.lists : null;
  const activeSubList = subLists?.find((l) => l.heading === subFilter) ?? null;

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
        <label htmlFor="offer-filter-select" className="offer-filters-select-label">
          {tx("ui.offer.filterToolbarAria", u.filterToolbarAria)}
        </label>
        <select
          id="offer-filter-select"
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

      {subLists ? (
        <>
          <div className="offer-filters offer-filters--buttons offer-filters--sub" role="toolbar" aria-label="Filtr podkategorii">
            <button
              type="button"
              className={`offer-filter-btn offer-filter-btn--sub ${subFilter == null ? "is-active" : ""}`}
              aria-pressed={subFilter == null}
              onClick={() => setSubFilter(null)}
            >
              Wszystkie tematy
            </button>
            {subLists.map((list, li) => (
              <button
                key={list.heading}
                type="button"
                className={`offer-filter-btn offer-filter-btn--sub ${subFilter === list.heading ? "is-active" : ""}`}
                aria-pressed={subFilter === list.heading}
                onClick={() => setSubFilter(list.heading)}
              >
                {tx(`offer.trainings.${soleItem.id}.detail.lists[${li}].heading`, list.heading)}
              </button>
            ))}
          </div>
          <div className="offer-filters-select-wrap offer-filters-select-wrap--sub">
            <label htmlFor="offer-subfilter-select" className="offer-filters-select-label">
              Filtr podkategorii
            </label>
            <select
              id="offer-subfilter-select"
              className="offer-filters-select"
              value={subFilter ?? "__all__"}
              onChange={(e) => setSubFilter(e.target.value === "__all__" ? null : e.target.value)}
            >
              <option value="__all__">Wszystkie tematy</option>
              {subLists.map((list, li) => (
                <option key={list.heading} value={list.heading}>
                  {tx(`offer.trainings.${soleItem.id}.detail.lists[${li}].heading`, list.heading)}
                </option>
              ))}
            </select>
          </div>
        </>
      ) : null}

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

      {activeSubList ? (
        <Reveal>
          <div className="offer-sublist-panel">
            <h3 className="offer-sublist-panel__heading">{activeSubList.heading}</h3>
            <div className="offer-sublist-panel__items">
              {activeSubList.items.map((label) => (
                <span className="offer-card__subtag offer-card__subtag--big" key={label}>
                  {label}
                </span>
              ))}
            </div>
            <button type="button" className="btn btn-ghost" onClick={() => onOpenTraining(soleItem.id)}>
              {tx("ui.offer.cta", u.cta)}
            </button>
          </div>
        </Reveal>
      ) : null}

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
