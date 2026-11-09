import { IMG, imgPair } from "../constants/images";
import { Reveal } from "../hooks/Reveal";
import { SmartImage } from "./SmartImage";
import { ArrowRightIcon } from "./Icons.jsx";
import { CONTENT } from "../lib/t.js";
import { useContentStrings } from "../context/ContentStringsContext.jsx";

export function Hero({ onNavigateTab, onOpenContact }) {
  const { tx } = useContentStrings();
  const p = CONTENT.pages.hero;

  return (
    <section className="hero container" id="hero">
      <div className="hero-grid">
        <Reveal>
          <span className="eyebrow">{tx("pages.hero.eyebrow", p.eyebrow)}</span>
          <h1>{tx("pages.hero.title", p.title)}</h1>
          <p className="hero-lead">
            {tx("pages.hero.leadBefore", p.leadBefore)}
            <strong style={{ color: "var(--ink)", fontWeight: 700 }}>{tx("pages.hero.leadHighlight", p.leadHighlight)}</strong>
            {tx("pages.hero.leadAfter", p.leadAfter)}
          </p>
          <div className="tags" aria-label={tx("pages.hero.tagsAria", p.tagsAria)}>
            {p.tags.map((label, i) => (
              <span key={label} className="tag">
                {tx(`pages.hero.tags[${i}]`, label)}
              </span>
            ))}
          </div>
          <div className="hero-cta-row">
            <button type="button" className="btn btn-primary btn-lg" onClick={onOpenContact}>
              {tx("pages.hero.ctaPrimary", p.ctaPrimary)}
              <ArrowRightIcon size={18} />
            </button>
            <button type="button" className="btn btn-ghost btn-lg" onClick={() => onNavigateTab?.("oferta")}>
              {tx("pages.hero.ctaSecondary", p.ctaSecondary)}
            </button>
          </div>
          <dl className="hero-stats" aria-label={tx("pages.hero.statsAria", p.statsAria)}>
            {p.stats.map((stat, i) => (
              <div key={stat.label} className="hero-stats__item">
                <dt className="hero-stats__value">{tx(`pages.hero.stats[${i}].value`, stat.value)}</dt>
                <dd className="hero-stats__label">{tx(`pages.hero.stats[${i}].label`, stat.label)}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
        <Reveal>
          <div className="hero-visual media-frame media-frame--4-3">
            <SmartImage
              imageKey="hero"
              {...imgPair(IMG.hero)}
              alt={tx("pages.hero.visualAlt", p.visualAlt)}
              width={800}
              height={600}
              loading="eager"
            />
            <div className="hero-badge">
              {tx("pages.hero.badgeBefore", p.badgeBefore)}
              <strong>{tx("pages.hero.badgeStrong", p.badgeStrong)}</strong>
              {tx("pages.hero.badgeAfter", p.badgeAfter)}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
