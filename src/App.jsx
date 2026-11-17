import { useEffect, useRef, useState } from "react";
import "./App.css";
import { ContentStringsProvider, useContentStrings } from "./context/ContentStringsContext.jsx";
import { Footer } from "./components/Footer.jsx";
import { Header } from "./components/Header.jsx";
import { Hero } from "./components/Hero.jsx";
import { Modal } from "./components/Modal.jsx";
import { TabPanels } from "./components/TabPanels.jsx";
import { findOfferItem } from "./data/offerTrainings.js";
import { TrainingModalBody } from "./components/TrainingModalBody.jsx";
import { TrainingConspectButton } from "./components/TrainingConspectButton.jsx";
import { ContactModalBody } from "./components/ContactModalBody.jsx";
import { useSwipeNav } from "./hooks/useSwipeNav.js";
import { CONTENT } from "./lib/t.js";

const TAB_IDS = CONTENT.pages.navigation.tabs.map((t) => t.id);

function tabFromHash() {
  const id = window.location.hash.replace(/^#/, "");
  return TAB_IDS.includes(id) ? id : "start";
}

function AppShell() {
  const { showKeys, getStaticModal, tx } = useContentStrings();
  const [tab, setTabState] = useState(tabFromHash);
  const [modal, setModal] = useState(null);
  const trainingPdfTargetRef = useRef(null);
  const mainRef = useRef(null);

  const setTab = (next) => {
    setTabState(next);
    const hash = `#${next}`;
    if (window.location.hash !== hash) {
      window.history.pushState(null, "", next === "start" ? "#start" : hash);
    }
  };

  useEffect(() => {
    const onHashChange = () => setTabState(tabFromHash());
    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("popstate", onHashChange);
    return () => {
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("popstate", onHashChange);
    };
  }, []);

  const openStatic = (key) => {
    const d = getStaticModal(key);
    if (d) setModal({ kind: "static", title: d.title, bodyHtml: d.bodyHtml });
  };

  const openTraining = (trainingKey) => {
    if (findOfferItem(trainingKey)) {
      setModal({ kind: "training", trainingKey });
    }
  };

  const openContactCta = () => {
    setModal({ kind: "contactCta", title: tx("pages.contact.title", CONTENT.pages.contact.title) });
  };

  const closeModal = () => setModal(null);

  const trainingEntry = modal?.kind === "training" ? findOfferItem(modal.trainingKey) : null;
  const trainingItem = trainingEntry ? { title: trainingEntry.item.title } : null;

  const modalTitle =
    modal?.kind === "training"
      ? showKeys
        ? `offer · ${modal.trainingKey}`
        : trainingEntry?.group.label ?? ""
      : modal?.title ?? "";

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [tab]);

  useSwipeNav({ containerRef: mainRef, tabIds: TAB_IDS, activeTab: tab, onNavigate: setTab });

  return (
    <div id="top" className="page-shell">
      <div className="bg-gradient" aria-hidden="true" />
      <Header
        activeTab={tab}
        onTab={setTab}
        onOpenContact={openContactCta}
        onBrandClick={() => {
          setTab("start");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
      <main ref={mainRef} className={tab === "start" ? "" : "main--subpage"}>
        {tab === "start" && <Hero onNavigateTab={setTab} onOpenContact={openContactCta} />}
        <TabPanels activeTab={tab} onOpenModal={openStatic} onOpenTraining={openTraining} />
        {/* Portal lightboxa galerii — poniżej headera i dolnego menu (z-index w App.css) */}
        <div id="gallery-lightbox-mount" className="gallery-lightbox-mount" />
      </main>
      <Footer onTab={setTab} />
      <Modal
        open={!!modal}
        onClose={closeModal}
        title={modalTitle}
        variant={modal?.kind === "training" ? "sheet" : "default"}
        headerTrailing={
          modal?.kind === "training" ? (
            <TrainingConspectButton pdfTargetRef={trainingPdfTargetRef} item={trainingItem} />
          ) : null
        }
      >
        {modal?.kind === "static" && (
          <div dangerouslySetInnerHTML={{ __html: modal.bodyHtml }} />
        )}
        {modal?.kind === "training" && (
          <TrainingModalBody ref={trainingPdfTargetRef} entry={trainingEntry} />
        )}
        {modal?.kind === "contactCta" && (
          <ContactModalBody onOpenHint={() => openStatic("contact")} />
        )}
      </Modal>
    </div>
  );
}

export default function App() {
  return (
    <ContentStringsProvider>
      <AppShell />
    </ContentStringsProvider>
  );
}
