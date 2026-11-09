import { Reveal } from "../hooks/Reveal";
import { useContentStrings } from "../context/ContentStringsContext.jsx";
import { CONTENT } from "../lib/t.js";
import { HeadLightbulbIcon, HandHeartIcon, AtomIcon, SproutIcon } from "./Icons.jsx";

const ICONS = {
  headLightbulb: HeadLightbulbIcon,
  handHeart: HandHeartIcon,
  atom: AtomIcon,
  sprout: SproutIcon,
};

/** Oś „obszary współpracy” — pięć kroków schodkowych, jak w katalogu marki. */
export function CooperationSteps() {
  const { tx } = useContentStrings();
  const s = CONTENT.pages.start;

  return (
    <section className="cooperation" aria-labelledby="cooperation-heading">
      <Reveal>
        <span className="cooperation__kicker">{tx("pages.start.cooperationTitle", s.cooperationTitle)}</span>
        <p className="section-sub">{tx("pages.start.cooperationSub", s.cooperationSub)}</p>
      </Reveal>
      <ol className="cooperation-steps">
        {s.cooperation.map((step, i) => {
          const Icon = ICONS[step.icon] ?? HeadLightbulbIcon;
          return (
            <Reveal as="li" key={step.title} className="cooperation-step">
              <span className="cooperation-step__num" aria-hidden="true">
                {i + 1}
              </span>
              <div className="cooperation-step__card">
                <div className="cooperation-step__body">
                  <h3 className="cooperation-step__title">
                    {tx(`pages.start.cooperation[${i}].title`, step.title)}
                  </h3>
                  <ul className="cooperation-step__list">
                    {step.items.map((item, j) => (
                      <li key={item}>{tx(`pages.start.cooperation[${i}].items[${j}]`, item)}</li>
                    ))}
                  </ul>
                </div>
                <span className="cooperation-step__icon">
                  <Icon size={26} />
                </span>
              </div>
            </Reveal>
          );
        })}
      </ol>
    </section>
  );
}
