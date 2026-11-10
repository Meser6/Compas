import { forwardRef } from "react";
import { BrandMark } from "./BrandMark.jsx";
import { CONTENT } from "../lib/t.js";
import { useContentStrings } from "../context/ContentStringsContext.jsx";

export const TrainingModalBody = forwardRef(function TrainingModalBody({ item, detail }, ref) {
  const { tx } = useContentStrings();
  const tm = CONTENT.ui.trainingModal;
  const lb = tm.labels;
  const tid = item?.id ?? "";

  if (!item) {
    return <p className="training-modal__placeholder">{tx("ui.trainingModal.notFound", tm.notFound)}</p>;
  }

  const intro = detail?.intro ?? item.summary;
  const introKey = detail?.intro
    ? `offer.trainings.${tid}.detail.intro`
    : `offer.trainings.${tid}.summary`;
  const lists = detail?.lists?.length ? detail.lists : null;
  const target = Array.isArray(item.target) ? item.target.join(", ") : item.target;
  const format = item.format;

  const orgRows = [
    target ? { label: lb.target, labelKey: "ui.trainingModal.labels.target", value: target, valueKey: `offer.trainings.${tid}.target` } : null,
    format ? { label: lb.format, labelKey: "ui.trainingModal.labels.format", value: format, valueKey: `offer.trainings.${tid}.format` } : null,
  ].filter(Boolean);

  const pdfUi = CONTENT.ui.pdf;
  const co = CONTENT.contact;

  return (
    <div ref={ref} className="training-modal__shell training-modal training-modal--pdf-root">
      <header className="training-pdf-header">
        <BrandMark markSize={34} />
      </header>

      {orgRows.length > 0 ? (
        <section className="training-modal__block" aria-labelledby="tm-org-heading">
          <h3 id="tm-org-heading" className="training-modal__heading">
            {tx("ui.trainingModal.orgHeading", tm.orgHeading)}
          </h3>
          <table className="training-modal__org-table">
            <tbody>
              {orgRows.map((row) => (
                <tr key={row.labelKey}>
                  <td className="training-modal__org-label">{tx(row.labelKey, row.label)}</td>
                  <td className="training-modal__org-value">{tx(row.valueKey, row.value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ) : null}

      <section className="training-modal__block" aria-labelledby="tm-intro-heading">
        <h3 id="tm-intro-heading" className="training-modal__heading">
          {tx("ui.trainingModal.introHeading", tm.introHeading)}
        </h3>
        <p className="training-modal__intro">{tx(introKey, intro)}</p>
      </section>

      {lists
        ? lists.map((block, li) => (
            <section className="training-modal__block" key={block.heading}>
              <h3 className="training-modal__heading">
                {tx(`offer.trainings.${tid}.detail.lists[${li}].heading`, block.heading)}
              </h3>
              <ul className="training-modal__list">
                {block.items.map((line, i) => (
                  <li key={i}>{tx(`offer.trainings.${tid}.detail.lists[${li}].items[${i}]`, line)}</li>
                ))}
              </ul>
            </section>
          ))
        : null}

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
