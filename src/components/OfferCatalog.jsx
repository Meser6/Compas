import { offerTrainings } from "../data/offerTrainings.js";
import { Reveal } from "../hooks/Reveal";
import { SmartImage } from "./SmartImage";
import { TargetIcon } from "./Icons.jsx";
import { CONTENT } from "../lib/t.js";
import { useContentStrings } from "../context/ContentStringsContext.jsx";

export function OfferCatalog({ onOpenTraining }) {
  const { tx, t } = useContentStrings();
  const u = CONTENT.ui.offer;

  return (
    <div className="offer-section">
      <div className="offer-grid">
        {offerTrainings.map((item) => {
          const suf = t("ui.offer.cardAriaSuffix");
          const ariaLabel = `${item.title}. ${suf}`;
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
                {item.target ? (
                  <div className="offer-card__badges">
                    <span
                      className="offer-card__badge"
                      title={t("ui.offer.badgeTargetAria", { value: item.target })}
                    >
                      <TargetIcon size={14} />
                      <span className="offer-card__badge-text">
                        {tx(`offer.trainings.${item.id}.target`, item.target)}
                      </span>
                    </span>
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
