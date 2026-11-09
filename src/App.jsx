import { useEffect, useRef, useState } from "react";
import "./App.css";
import { ContentStringsProvider, useContentStrings } from "./context/ContentStringsContext.jsx";
import { Footer } from "./components/Footer.jsx";
import { Header } from "./components/Header.jsx";
import { Hero } from "./components/Hero.jsx";
import { Modal } from "./components/Modal.jsx";
import { BackgroundThreads } from "./components/BackgroundThreads.jsx";
import { TabPanels } from "./components/TabPanels.jsx";
import { getTrainingDetail, offerTrainings } from "./data/offerTrainings.js";
import { TrainingModalBody } from "./components/TrainingModalBody.jsx";
import { TrainingConspectButton } from "./components/TrainingConspectButton.jsx";
import { CONTENT } from "./lib/t.js";

const TAB_IDS = CONTENT.pages.navigation.tabs.map((t) => t.id);

function tabFromHash() {
  const id = window.location.hash.replace(/^#/, "");
  return TAB_IDS.includes(id) ? id : "start";
}

function AppShell() {
  const { showKeys, getStaticModal } = useContentStrings();
  const [tab, setTabState] = useState(tabFromHash);
  const [modal, setModal] = useState(null);
  const trainingPdfTargetRef = useRef(null);

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

  const openTraining = (trainingId) => {
    if (offerTrainings.some((t) => t.id === trainingId)) {
      setModal({ kind: "training", trainingId });
    }
  };

  const closeModal = () => setModal(null);

  const trainingTitle = offerTrainings.find((t) => t.id === modal?.trainingId)?.title ?? "";

  const modalTitle =
    modal?.kind === "training"
      ? showKeys
        ? `offer.trainings.${modal.trainingId}.title`
        : trainingTitle
      : modal?.title ?? "";

  const trainingItem =
    modal?.kind === "training" ? offerTrainings.find((t) => t.id === modal.trainingId) : null;
  const trainingDetail =
    modal?.kind === "training" && modal.trainingId ? getTrainingDetail(modal.trainingId) : null;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [tab]);

  return (
    <div id="top" className="page-shell">
      <div className="bg-gradient" aria-hidden="true" />
      <BackgroundThreads />
      <Header
        activeTab={tab}
        onTab={setTab}
        onOpenContact={() => setTab("kontakt")}
        onBrandClick={() => {
          setTab("start");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
      <main className={tab === "start" ? "" : "main--subpage"}>
        {tab === "start" && <Hero onNavigateTab={setTab} onOpenContact={() => setTab("kontakt")} />}
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
          <TrainingModalBody ref={trainingPdfTargetRef} item={trainingItem} detail={trainingDetail} />
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
