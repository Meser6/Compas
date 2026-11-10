import { INSTAGRAM_URL } from "../constants/social.js";
import { CONTENT } from "../lib/t.js";
import { useContentStrings } from "../context/ContentStringsContext.jsx";
import { InstagramIcon } from "./InstagramIcon.jsx";
import { MailIcon, PhoneIcon, ArrowRightIcon } from "./Icons.jsx";

/** Treść modala „Umów rozmowę” — ten sam zestaw danych kontaktowych, co na stronie Kontakt. */
export function ContactModalBody({ onOpenHint }) {
  const { tx } = useContentStrings();
  const c = CONTENT.pages.contact;
  const co = CONTENT.contact;

  return (
    <div className="contact-modal-body">
      <p className="contact-modal-body__sub">{tx("pages.contact.sub", c.sub)}</p>

      <div className="contact-tiles">
        <a className="contact-tile contact-tile--insta" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
          <span className="contact-tile__icon">
            <InstagramIcon width={22} height={22} />
          </span>
          <span className="contact-tile__body">
            <span className="contact-tile__label">{tx("pages.contact.instagramLabel", c.instagramLabel)}</span>
            <span className="contact-tile__value">{tx("pages.contact.instagramDisplayPath", c.instagramDisplayPath)}</span>
          </span>
          <ArrowRightIcon size={18} className="contact-tile__arrow" />
        </a>

        <a className="contact-tile" href={`tel:${co.phoneTel}`}>
          <span className="contact-tile__icon">
            <PhoneIcon size={22} />
          </span>
          <span className="contact-tile__body">
            <span className="contact-tile__label">{tx("pages.contact.phoneLabel", c.phoneLabel)}</span>
            <span className="contact-tile__value">{tx("contact.phoneDisplay", co.phoneDisplay)}</span>
          </span>
          <ArrowRightIcon size={18} className="contact-tile__arrow" />
        </a>

        <a className="contact-tile" href={`mailto:${co.email}`}>
          <span className="contact-tile__icon">
            <MailIcon size={22} />
          </span>
          <span className="contact-tile__body">
            <span className="contact-tile__label">{tx("pages.contact.emailLabel", c.emailLabel)}</span>
            <span className="contact-tile__value">{tx("contact.email", co.email)}</span>
          </span>
          <ArrowRightIcon size={18} className="contact-tile__arrow" />
        </a>

        <button type="button" className="btn btn-ghost contact-hint-btn" onClick={onOpenHint}>
          {tx("pages.contact.openModalCta", c.openModalCta)}
        </button>
      </div>
    </div>
  );
}
