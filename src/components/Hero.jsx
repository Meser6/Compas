import { Reveal } from "../hooks/Reveal";
import { CompassMark } from "./CompassMark.jsx";
import { InstagramIcon } from "./InstagramIcon.jsx";
import { INSTAGRAM_URL } from "../constants/social.js";
import { CONTENT } from "../lib/t.js";
import { useContentStrings } from "../context/ContentStringsContext.jsx";

export function Hero({ onNavigateTab, onOpenContact }) {
  const { tx } = useContentStrings();
  const p = CONTENT.pages.hero;

  return (
    <section className="hero" id="hero">
      <CompassMark size={220} className="hero-compass-decor" />
      <div className="container hero-top">
        <Reveal>
          <p className="hero-eyebrow">{tx("pages.hero.eyebrow", p.eyebrow)}</p>
          <p className="hero-kicker">
            <span className="hero-kicker__name">{tx("pages.hero.kicker", p.kicker)}</span>
          </p>
          <p className="hero-kicker__sub">{tx("pages.hero.kickerSub", p.kickerSub)}</p>
          <a
            className="hero-instagram"
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon width={18} height={18} />
            {tx("pages.hero.instagramHandle", p.instagramHandle)}
          </a>
        </Reveal>
      </div>

      <div className="hero-diagonal">
        <div className="container hero-diagonal__inner">
          <Reveal>
            <div className="hero-services">
              <ul className="hero-services__col">
                {p.servicesLeft.map((label, i) => (
                  <li key={label}>{tx(`pages.hero.servicesLeft[${i}]`, label)}</li>
                ))}
              </ul>
              <ul className="hero-services__col">
                {p.servicesRight.map((label, i) => (
                  <li key={label}>{tx(`pages.hero.servicesRight[${i}]`, label)}</li>
                ))}
              </ul>
            </div>
            <div className="hero-cta-row">
              <button type="button" className="btn btn-primary btn-lg" onClick={onOpenContact}>
                {tx("pages.hero.ctaPrimary", p.ctaPrimary)}
              </button>
              <button
                type="button"
                className="btn btn-ghost btn-lg"
                onClick={() => onNavigateTab?.("oferta")}
              >
                {tx("pages.hero.ctaSecondary", p.ctaSecondary)}
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
