import { forwardRef } from "react";
import { BrandMark } from "./BrandMark.jsx";
import { CONTENT } from "../lib/t.js";
import { useContentStrings } from "../context/ContentStringsContext.jsx";

/**
 * Pełny opis szkolenia (treść modalu i źródło PDF-a z konspektem).
 * `entry` = wynik `findOfferItem()`: { group, category, item, description }.
 */
export const TrainingModalBody = forwardRef(function TrainingModalBody({ entry }, ref) {
  const { tx } = useContentStrings();
  const tm = CONTENT.ui.trainingModal;

  if (!entry) {
    return <p className="training-modal__placeholder">{tx("ui.trainingModal.notFound", tm.notFound)}</p>;
  }

  const { group, category, item, description: d } = entry;
  const pdfUi = CONTENT.ui.pdf;
  const co = CONTENT.contact;
  // Wezwanie „Zamów szkolenie dla rady pedagogicznej” pasuje tylko do oferty dla rad pedagogicznych.
  const showCta = d?.cta && group.id === "rady";

  return (
    <div ref={ref} className="training-modal__shell training-modal training-modal--pdf-root">
      <header className="training-pdf-header">
        <BrandMark markSize={34} />
      </header>

      <p className="training-modal__eyebrow">
        {group.title} · {category.label}
      </p>
      <h2 className="training-modal__title">{item.title}</h2>
      {d?.subtitle ? <p className="training-modal__subtitle">{d.subtitle}</p> : null}

      {d ? (
        <>
          <section className="training-modal__block">
            <h3 className="training-modal__heading">{tx("ui.trainingModal.descriptionHeading", tm.descriptionHeading)}</h3>
            {d.description.map((p, i) => (
              <p className="training-modal__intro" key={i}>
                {p}
              </p>
            ))}
          </section>

          {d.benefits?.length ? (
            <section className="training-modal__block">
              <h3 className="training-modal__heading">{tx("ui.trainingModal.benefitsHeading", tm.benefitsHeading)}</h3>
              {d.benefitsIntro ? <p className="training-modal__lead-in">{d.benefitsIntro}</p> : null}
              <ul className="training-modal__list">
                {d.benefits.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </section>
          ) : null}

          {d.program?.length ? (
            <section className="training-modal__block">
              <h3 className="training-modal__heading">{tx("ui.trainingModal.programHeading", tm.programHeading)}</h3>
              <ol className="training-modal__list training-modal__list--ordered">
                {d.program.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ol>
            </section>
          ) : null}

          {showCta ? <p className="training-modal__cta">{d.cta}</p> : null}
        </>
      ) : (
        <p className="training-modal__intro">{tx("ui.trainingModal.noDescription", tm.noDescription)}</p>
      )}

      <p className="training-modal__custom-note">{tx("ui.trainingModal.customNote", tm.customNote)}</p>

      <footer className="training-pdf-footer">
        <p className="training-pdf-footer__title">{tx("ui.pdf.contactFooterTitle", pdfUi.contactFooterTitle)}</p>
        <p className="training-pdf-footer__name">{tx("contact.fullName", co.fullName)}</p>
        <p className="training-pdf-footer__line">
          <span>{tx("contact.phoneDisplay", co.phoneDisplay)}</span>
          <span className="training-pdf-footer__sep" aria-hidden="true">
            ·
          </span>
          <span>{tx("contact.email", co.email)}</span>
        </p>
      </footer>
    </div>
  );
});
