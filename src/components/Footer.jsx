import { INSTAGRAM_URL } from "../constants/social.js";
import { CONTENT, resolveT } from "../lib/t.js";
import { InstagramIcon } from "./InstagramIcon";
import { BrandMark } from "./BrandMark.jsx";
import { MailIcon, PhoneIcon } from "./Icons.jsx";
import { useContentStrings } from "../context/ContentStringsContext.jsx";

export function Footer({ onTab }) {
  const { t, tx, showKeys, setShowKeys } = useContentStrings();
  const toggleLabel = showKeys ? resolveT("ui.footer.hideKeys") : resolveT("ui.footer.showKeys");
  const toggleTitle = resolveT("ui.footer.toggleKeysTitle");
  const co = CONTENT.contact;
  const ui = CONTENT.ui.footer;
  const tabs = CONTENT.pages.navigation.tabs;

  return (
    <footer>
      <div className="container footer-grid">
        <div className="footer-col footer-col--brand">
          <a className="brand" href="#top" onClick={(e) => { e.preventDefault(); onTab?.("start"); }}>
            <BrandMark />
          </a>
          <p className="footer-tagline">{tx("ui.footer.tagline", ui.tagline)}</p>
          <div className="social">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="insta-pill"
              aria-label={t("ui.footer.instagramAria")}
            >
              <InstagramIcon width={18} height={18} /> {t("ui.footer.instagram")}
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h3 className="footer-col__heading">{tx("ui.footer.navHeading", ui.navHeading)}</h3>
          <ul className="footer-links">
            {tabs.map((tab, i) => (
              <li key={tab.id}>
                <a
                  href={`#${tab.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onTab?.(tab.id);
                  }}
                >
                  {tx(`pages.navigation.tabs[${i}].label`, tab.label)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h3 className="footer-col__heading">{tx("ui.footer.contactHeading", ui.contactHeading)}</h3>
          <p className="footer-identity__name">{tx("contact.fullName", co.fullName)}</p>
          <ul className="footer-links footer-links--contact">
            <li>
              <a href={`tel:${co.phoneTel}`}>
                <PhoneIcon size={16} /> {tx("contact.phoneDisplay", co.phoneDisplay)}
              </a>
            </li>
            <li>
              <a href={`mailto:${co.email}`}>
                <MailIcon size={16} /> {tx("contact.email", co.email)}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container footer-row">
        <span>{t("ui.footer.copyright")}</span>
        <button
          type="button"
          className="footer-keys-toggle"
          onClick={() => setShowKeys((v) => !v)}
          aria-pressed={showKeys}
          title={toggleTitle}
        >
          {toggleLabel}
        </button>
      </div>
    </footer>
  );
}
