import { IMG, imgPair } from "../constants/images";
import { INSTAGRAM_URL, LINKEDIN_URL } from "../constants/social.js";
import { Reveal } from "../hooks/Reveal";
import { CONTENT } from "../lib/t.js";
import { useContentStrings } from "../context/ContentStringsContext.jsx";
import { AboutGalleryCarousel } from "./AboutGalleryCarousel.jsx";
import { OfferTrainings } from "./OfferTrainings.jsx";
import { SmartImage } from "./SmartImage";
import { TrustedByMarquee } from "./TrustedByMarquee.jsx";
import { FaqSection } from "./FaqSection.jsx";
import { FeatureGrid } from "./FeatureGrid.jsx";
import { ProcessSteps } from "./ProcessSteps.jsx";
import { Testimonials } from "./Testimonials.jsx";
import { ContactForm } from "./ContactForm.jsx";

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
  const f = CONTENT.pages.faq;
  const c = CONTENT.pages.contact;
  const co = CONTENT.contact;
  const aboutData = CONTENT.about;

  return (
    <div className="tab-panels container">
      <Panel id="start" active={is("start")} labelledBy="tab-start">
        <h2 className="section-title">{tx("pages.start.title", s.title)}</h2>
        <p className="section-sub section-sub--wide">{tx("pages.start.sub", s.sub)}</p>

        <FeatureGrid items={s.features} trPrefix="pages.start.features" />

        <div className="split split--reverse-mobile split--process">
          <Reveal>
            <div className="media-frame media-frame--natural">
              <SmartImage
                imageKey="featuresLeft"
                {...imgPair(IMG.featuresLeft)}
                alt={tx("pages.start.altFeatures", s.altFeatures)}
                loading="lazy"
              />
            </div>
          </Reveal>
          <ProcessSteps />
        </div>

        <TrustedByMarquee />
        <Testimonials />
      </Panel>

      <Panel id="o-mnie" active={is("o-mnie")} labelledBy="tab-o-mnie">
        <div className="split about-intro-split">
          <Reveal>
            <div className="media-frame media-frame--portrait about-portrait">
              <SmartImage
                imageKey="aboutPortrait"
                {...imgPair(IMG.aboutPortrait)}
                alt={tx("pages.about.portraitAlt", a.portraitAlt)}
                loading="lazy"
                className="about-portrait__img"
              />
            </div>
          </Reveal>
          <Reveal>
            <div className="about-intro-copy">
              <p className="about-intro-lead">{tx("pages.about.lead", a.lead)}</p>
              <p>{tx("pages.about.p2", a.p2)}</p>
              <p>{tx("pages.about.p3", a.p3)}</p>
            </div>
          </Reveal>
        </div>

        <div className="about-cv">
          <Reveal>
            <section className="about-block" aria-labelledby="about-edu-heading">
              <h3 id="about-edu-heading" className="about-block__title">
                {tx("pages.about.educationTitle", a.educationTitle)}
              </h3>
              <ul className="about-list">
                {aboutData.education.map((item, i) => (
                  <li key={item.title}>
                    <strong className="about-list__title">{tx(`about.education[${i}].title`, item.title)}</strong>
                    <span className="about-list__meta">{tx(`about.education[${i}].meta`, item.meta)}</span>
                    {item.note ? (
                      <p className="about-list__note">{tx(`about.education[${i}].note`, item.note)}</p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>
          <Reveal>
            <section className="about-block" aria-labelledby="about-exp-heading">
              <h3 id="about-exp-heading" className="about-block__title">
                {tx("pages.about.experienceTitle", a.experienceTitle)}
              </h3>
              <ul className="about-list">
                {aboutData.experience.map((item, i) => (
                  <li key={item.title}>
                    <strong className="about-list__title">{tx(`about.experience[${i}].title`, item.title)}</strong>
                    <span className="about-list__meta">{tx(`about.experience[${i}].meta`, item.meta)}</span>
                    <p className="about-list__desc">{tx(`about.experience[${i}].summary`, item.summary)}</p>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>
        </div>

        <Reveal>
          <div className="about-end-gallery">
            <AboutGalleryCarousel />
          </div>
        </Reveal>
      </Panel>

      <Panel id="oferta" active={is("oferta")} labelledBy="tab-oferta">
        <h2 className="section-title">{tx("pages.offer.title", o.title)}</h2>
        <p className="section-sub section-sub--wide">{tx("pages.offer.sub", o.sub)}</p>
        <OfferTrainings onOpenTraining={onOpenTraining} />
      </Panel>

      <Panel id="faq" active={is("faq")} labelledBy="tab-faq">
        <h2 className="section-title">{tx("pages.faq.title", f.title)}</h2>
        <p className="section-sub">{tx("pages.faq.sub", f.sub)}</p>
        <FaqSection />
      </Panel>

      <Panel id="kontakt" active={is("kontakt")} labelledBy="tab-kontakt">
        <h2 className="section-title">{tx("pages.contact.title", c.title)}</h2>
        <p className="section-sub">{tx("pages.contact.sub", c.sub)}</p>
        <div className="split split--contact">
          <Reveal className="card contact-form-card">
            <ContactForm />
          </Reveal>
          <Reveal>
            <div className="media-frame media-frame--natural contact-visual">
              <SmartImage
                imageKey="registerRight"
                {...imgPair(IMG.registerRight)}
                alt={tx("pages.contact.visualAlt", c.visualAlt)}
                loading="lazy"
              />
            </div>
            <div className="card contact-channels-card">
              <p>
                <strong>{tx("pages.contact.instagramLabel", c.instagramLabel)}</strong>
                <br />
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                  {tx("pages.contact.instagramDisplayPath", c.instagramDisplayPath)}
                </a>
              </p>
              <p>
                <strong>{tx("pages.contact.linkedinLabel", c.linkedinLabel)}</strong>
                <br />
                <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
                  {tx("pages.contact.linkedinDisplayPath", c.linkedinDisplayPath)}
                </a>
              </p>
              <p>
                <strong>{tx("pages.contact.phoneLabel", c.phoneLabel)}</strong>
                <br />
                <a href={`tel:${co.phoneTel}`}>{tx("contact.phoneDisplay", co.phoneDisplay)}</a>
              </p>
              <p style={{ marginBottom: 0 }}>
                <strong>{tx("pages.contact.emailLabel", c.emailLabel)}</strong>{" "}
                <a href={`mailto:${co.email}`}>{tx("contact.email", co.email)}</a>
              </p>
            </div>
            <button type="button" className="btn btn-ghost contact-hint-btn" onClick={() => onOpenModal("contact")}>
              {tx("pages.contact.openModalCta", c.openModalCta)}
            </button>
          </Reveal>
        </div>
      </Panel>
    </div>
  );
}
