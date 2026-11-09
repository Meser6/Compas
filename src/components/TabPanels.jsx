import { imgPair, IMG } from "../constants/images";
import { INSTAGRAM_URL } from "../constants/social.js";
import { Reveal } from "../hooks/Reveal";
import { CONTENT } from "../lib/t.js";
import { useContentStrings } from "../context/ContentStringsContext.jsx";
import { AboutGalleryCarousel } from "./AboutGalleryCarousel.jsx";
import { OfferCatalog } from "./OfferCatalog.jsx";
import { SmartImage } from "./SmartImage";
import { CooperationSteps } from "./CooperationSteps.jsx";
import { CompassMark } from "./CompassMark.jsx";
import { InstagramIcon } from "./InstagramIcon.jsx";
import { MailIcon, PhoneIcon, ArrowRightIcon } from "./Icons.jsx";

function Panel({ id, active, labelledBy, children }) {
  return (
    <div
      id={`panel-${id}`}
      className={`tab-panel ${active ? "is-active" : ""}`}
      role="tabpanel"
      aria-labelledby={labelledBy}
      hidden={!active}
    >
      {children}
    </div>
  );
}

export function TabPanels({ activeTab, onOpenModal, onOpenTraining }) {
  const { tx } = useContentStrings();
  const is = (id) => activeTab === id;
  const s = CONTENT.pages.start;
  const a = CONTENT.pages.about;
  const o = CONTENT.pages.offer;
  const c = CONTENT.pages.contact;
  const co = CONTENT.contact;
  const aboutData = CONTENT.about;

  return (
    <div className="tab-panels container">
      <Panel id="start" active={is("start")} labelledBy="tab-start">
        <CooperationSteps />

        <section className="values-banner" aria-labelledby="values-heading">
          <Reveal>
            <div className="values-banner__media">
              <SmartImage
                imageKey="groupTeens"
                {...imgPair(IMG.groupTeens)}
                alt="Zajęcia integracyjne z młodzieżą"
                loading="lazy"
              />
            </div>
          </Reveal>
          <Reveal>
            <div className="values-banner__copy">
              <h2 id="values-heading" className="values-banner__title">
                <span>{tx("pages.start.valuesTitle", s.valuesTitle)}</span>
                <span className="values-banner__accent">{tx("pages.start.valuesTitleAccent", s.valuesTitleAccent)}</span>
              </h2>
              <ul className="values-list">
                {aboutData.values.map((value, i) => (
                  <li key={value}>{tx(`about.values[${i}]`, value)}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </section>

        <section className="quote-banner" aria-labelledby="quote-banner-heading">
          <Reveal>
            <div className="quote-banner__circle">
              <h2 id="quote-banner-heading" className="quote-banner__title">
                {tx("pages.start.bannerBefore", s.bannerBefore)}{" "}
                <span className="quote-banner__accent">{tx("pages.start.bannerAccent", s.bannerAccent)}</span>{" "}
                {tx("pages.start.bannerAfter", s.bannerAfter)}
              </h2>
              <p className="quote-banner__note">{tx("pages.start.bannerNote", s.bannerNote)}</p>
              <button type="button" className="btn btn-primary" onClick={() => onOpenModal("contact")}>
                {tx("pages.start.bannerCta", s.bannerCta)}
              </button>
            </div>
          </Reveal>
        </section>
      </Panel>

      <Panel id="o-mnie" active={is("o-mnie")} labelledBy="tab-o-mnie">
        <div className="split about-intro-split">
          <Reveal>
            <div className="about-portrait-wrap">
              <div className="media-frame media-frame--portrait about-portrait">
                <SmartImage
                  imageKey="aboutPortrait"
                  {...imgPair(IMG.aboutPortrait)}
                  alt={tx("pages.about.portraitAlt", a.portraitAlt)}
                  loading="lazy"
                  className="about-portrait__img"
                />
              </div>
              <span className="about-compass-badge" aria-hidden="true">
                <CompassMark size={34} />
              </span>
            </div>
          </Reveal>
          <Reveal>
            <div className="about-intro-copy">
              <p className="about-kicker">{tx("pages.about.kickerTop", a.kickerTop)}</p>
              <h2 className="about-title">
                <span className="about-title__accent">{tx("pages.about.titleAccent", a.titleAccent)}</span>
                <br />
                {tx("pages.about.titleRest", a.titleRest)}
              </h2>
              <a className="hero-instagram hero-instagram--dark" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                <InstagramIcon width={18} height={18} />
                compas.dr.syrek
              </a>
              <p className="about-intro-lead">{tx("pages.about.lead", a.lead)}</p>
              <p>{tx("pages.about.p2", a.p2)}</p>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <section className="about-block about-qualifications" aria-labelledby="about-qual-heading">
            <h3 id="about-qual-heading" className="about-block__title">
              {tx("pages.about.qualificationsTitle", a.qualificationsTitle)}
            </h3>
            <ul className="qualifications-list">
              {aboutData.qualifications.map((item, i) => (
                <li key={item}>{tx(`about.qualifications[${i}]`, item)}</li>
              ))}
            </ul>
          </section>
        </Reveal>

        <Reveal>
          <div className="about-end-gallery">
            <AboutGalleryCarousel />
          </div>
        </Reveal>
      </Panel>

      <Panel id="oferta" active={is("oferta")} labelledBy="tab-oferta">
        <h2 className="section-title">{tx("pages.offer.title", o.title)}</h2>
        <p className="section-sub section-sub--wide">{tx("pages.offer.sub", o.sub)}</p>
        <OfferCatalog onOpenTraining={onOpenTraining} />
      </Panel>

      <Panel id="kontakt" active={is("kontakt")} labelledBy="tab-kontakt">
        <h2 className="section-title">{tx("pages.contact.title", c.title)}</h2>
        <p className="section-sub">{tx("pages.contact.sub", c.sub)}</p>

        <div className="contact-layout">
          <div className="contact-tiles">
            <Reveal as="a" className="contact-tile contact-tile--insta" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
              <span className="contact-tile__icon">
                <InstagramIcon width={22} height={22} />
              </span>
              <span className="contact-tile__body">
                <span className="contact-tile__label">{tx("pages.contact.instagramLabel", c.instagramLabel)}</span>
                <span className="contact-tile__value">{tx("pages.contact.instagramDisplayPath", c.instagramDisplayPath)}</span>
              </span>
              <ArrowRightIcon size={18} className="contact-tile__arrow" />
            </Reveal>

            <Reveal as="a" className="contact-tile" href={`tel:${co.phoneTel}`}>
              <span className="contact-tile__icon">
                <PhoneIcon size={22} />
              </span>
              <span className="contact-tile__body">
                <span className="contact-tile__label">{tx("pages.contact.phoneLabel", c.phoneLabel)}</span>
                <span className="contact-tile__value">{tx("contact.phoneDisplay", co.phoneDisplay)}</span>
              </span>
              <ArrowRightIcon size={18} className="contact-tile__arrow" />
            </Reveal>

            <Reveal as="a" className="contact-tile" href={`mailto:${co.email}`}>
              <span className="contact-tile__icon">
                <MailIcon size={22} />
              </span>
              <span className="contact-tile__body">
                <span className="contact-tile__label">{tx("pages.contact.emailLabel", c.emailLabel)}</span>
                <span className="contact-tile__value">{tx("contact.email", co.email)}</span>
              </span>
              <ArrowRightIcon size={18} className="contact-tile__arrow" />
            </Reveal>

            <Reveal>
              <button type="button" className="btn btn-ghost contact-hint-btn" onClick={() => onOpenModal("contact")}>
                {tx("pages.contact.openModalCta", c.openModalCta)}
              </button>
            </Reveal>
          </div>

          <Reveal>
            <div className="media-frame media-frame--natural contact-visual">
              <SmartImage
                imageKey="aboutCutout"
                {...imgPair(IMG.aboutCutout)}
                alt={tx("pages.contact.visualAlt", c.visualAlt)}
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </Panel>
    </div>
  );
}
