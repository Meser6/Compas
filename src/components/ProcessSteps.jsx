import { Reveal } from "../hooks/Reveal";
import { useContentStrings } from "../context/ContentStringsContext.jsx";
import { CONTENT } from "../lib/t.js";

export function ProcessSteps() {
  const { tx } = useContentStrings();
  const s = CONTENT.pages.start;

  return (
    <section className="process" aria-labelledby="process-heading">
      <Reveal>
        <h2 id="process-heading" className="section-title">
          {tx("pages.start.processTitle", s.processTitle)}
        </h2>
        <p className="section-sub">{tx("pages.start.processSub", s.processSub)}</p>
      </Reveal>
      <ol className="process-steps">
        {s.process.map((step, i) => (
          <Reveal as="li" key={step.title} className="process-step">
            <span className="process-step__num">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="process-step__title">{tx(`pages.start.process[${i}].title`, step.title)}</h3>
            <p className="process-step__desc">{tx(`pages.start.process[${i}].desc`, step.desc)}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
