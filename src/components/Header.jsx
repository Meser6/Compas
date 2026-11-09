import { BrandMark } from "./BrandMark";
import { CONTENT } from "../lib/t.js";
import { useContentStrings } from "../context/ContentStringsContext.jsx";

export function Header({ activeTab, onTab, onOpenContact, onBrandClick }) {
  const { t, tx } = useContentStrings();
  const tabs = CONTENT.pages.navigation.tabs;

  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="header-top-bar">
          <a
            className="brand"
            href="#top"
            aria-label={t("ui.header.brandAriaLabel")}
            onClick={(e) => {
              e.preventDefault();
              onBrandClick?.();
            }}
          >
            <BrandMark />
          </a>
          <button type="button" className="header-cta" onClick={onOpenContact}>
            {t("ui.header.cta")}
          </button>
        </div>
        <div className="header-nav-region">
          <nav className="nav-tabs" role="tablist" aria-label={t("ui.header.navAriaLabel")}>
            {tabs.map((tab, i) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={activeTab === tab.id}
                aria-controls={`panel-${tab.id}`}
                data-tab={tab.id}
                onClick={() => onTab(tab.id)}
              >
                {tx(`pages.navigation.tabs[${i}].label`, tab.label)}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
