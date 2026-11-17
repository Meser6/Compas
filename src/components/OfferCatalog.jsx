import { useEffect, useMemo, useState } from "react";
import { offerDescriptions, offerGroups, offerItemKey } from "../data/offerTrainings.js";
import { Reveal } from "../hooks/Reveal";
import { ArrowRightIcon } from "./Icons.jsx";
import { CONTENT } from "../lib/t.js";
import { useContentStrings } from "../context/ContentStringsContext.jsx";

const ALL = "__all__";

/**
 * Katalog oferty: grupa odbiorców → kategoria tematyczna → szkolenie (kliknięcie otwiera pełny opis).
 */
export function OfferCatalog({ onOpenTraining }) {
  const { tx } = useContentStrings();
  const u = CONTENT.ui.offer;
  const [groupId, setGroupId] = useState(offerGroups[0].id);
  const [categoryId, setCategoryId] = useState(ALL);

  useEffect(() => {
    setCategoryId(ALL);
  }, [groupId]);

  const gi = offerGroups.findIndex((g) => g.id === groupId);
  const group = offerGroups[gi];
  const categories = useMemo(
    () => (categoryId === ALL ? group.categories : group.categories.filter((c) => c.id === categoryId)),
    [group, categoryId],
  );

  return (
    <div className="offer-section">
      <div className="offer-groups" role="toolbar" aria-label={tx("ui.offer.groupToolbarAria", u.groupToolbarAria)}>
        {offerGroups.map((g, i) => {
          const count = g.categories.reduce((n, c) => n + c.items.length, 0);
          return (
            <button
              key={g.id}
              type="button"
              className={`offer-group-btn ${groupId === g.id ? "is-active" : ""}`}
              aria-pressed={groupId === g.id}
              onClick={() => setGroupId(g.id)}
            >
              <span className="offer-group-btn__media" aria-hidden="true">
                <img src={g.image} alt="" loading="lazy" />
              </span>
              <span className="offer-group-btn__label">{tx(`offer.groups[${i}].title`, g.title)}</span>
              <span className="offer-group-btn__count">
                {count} {tx("ui.offer.topicsSuffix", u.topicsSuffix)}
              </span>
            </button>
          );
        })}
      </div>

      {group.intro ? <p className="offer-group-intro">{tx(`offer.groups[${gi}].intro`, group.intro)}</p> : null}

      <div className="offer-filters offer-filters--buttons offer-filters--sub" role="toolbar" aria-label={tx("ui.offer.categoryToolbarAria", u.categoryToolbarAria)}>
        <button
          type="button"
          className={`offer-filter-btn offer-filter-btn--sub ${categoryId === ALL ? "is-active" : ""}`}
          aria-pressed={categoryId === ALL}
          onClick={() => setCategoryId(ALL)}
        >
          {tx("ui.offer.allTopics", u.allTopics)}
        </button>
        {group.categories.map((c, ci) => (
          <button
            key={c.id}
            type="button"
            className={`offer-filter-btn offer-filter-btn--sub ${categoryId === c.id ? "is-active" : ""}`}
            aria-pressed={categoryId === c.id}
            onClick={() => setCategoryId(c.id)}
          >
            {tx(`offer.groups[${gi}].categories[${ci}].label`, c.label)}
          </button>
        ))}
      </div>
      <div className="offer-filters-select-wrap offer-filters-select-wrap--sub">
        <label htmlFor="offer-subfilter-select" className="offer-filters-select-label">
          {tx("ui.offer.categoryToolbarAria", u.categoryToolbarAria)}
        </label>
        <select
          id="offer-subfilter-select"
          className="offer-filters-select"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value={ALL}>{tx("ui.offer.allTopics", u.allTopics)}</option>
          {group.categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      {categories.map((c) => {
        const ci = group.categories.indexOf(c);
        return (
          <section className="offer-category" key={`${group.id}-${c.id}`} aria-labelledby={`offer-cat-${group.id}-${c.id}`}>
            <h3 className="offer-category__title" id={`offer-cat-${group.id}-${c.id}`}>
              {tx(`offer.groups[${gi}].categories[${ci}].label`, c.label)}
            </h3>
            <ul className="offer-topic-list">
              {c.items.map((item, ii) => {
                const desc = item.description ? offerDescriptions[item.description] : null;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      className="offer-topic"
                      onClick={() => onOpenTraining(offerItemKey(group.id, item.id))}
                    >
                      <span className="offer-topic__body">
                        <span className="offer-topic__title">
                          {tx(`offer.groups[${gi}].categories[${ci}].items[${ii}].title`, item.title)}
                        </span>
                        {desc?.subtitle ? <span className="offer-topic__sub">{desc.subtitle}</span> : null}
                      </span>
                      <ArrowRightIcon size={18} className="offer-topic__arrow" />
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}

      <Reveal>
        <p className="offer-custom-note">{tx("ui.trainingModal.customNote", CONTENT.ui.trainingModal.customNote)}</p>
      </Reveal>
    </div>
  );
}
