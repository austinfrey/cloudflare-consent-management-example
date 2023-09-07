import { ReactNode, useEffect, useState } from "react";
import MockZaraz from "./mock-zaraz";

declare const zaraz: any;

type Props = {
  children: ReactNode;
};

const mockZaraz =
  typeof zaraz === "undefined" ? MockZaraz([{ "test-purpose": false }]) : zaraz;

const ZarazProvider = ({ children }: Props) => {
  const [contentApiReady, setContentApiReady] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const purposes = mockZaraz.consent.getAll();
    Object.keys(purposes).filter((key: any) => {
      !purposes[key] && setShowModal(true);
    });
    const handleEvent = () => {
      console.log("Zaraz Content API ready");
      setContentApiReady(true);
    };
    console.log("adding zarazConsentAPIReady event listener");
    document.addEventListener("zarazConsentAPIReady", handleEvent);

    return () =>
      document.removeEventListener("zarazConsentAPIReady", handleEvent);
  }, [showModal, contentApiReady]);

  const Modal = () => {
    return (
      <div className="zaraz-modal">
        <p>
          We use cookies and other tracking technologies, including session
          replay tracking, to improve your experience, to provide and remember
          your login, to personalize content and ads, to record sessions for
          later playback, and to optimize site functionality.
        </p>

        <button
          className="approve-button"
          onClick={() => {
            mockZaraz.consent.set({ "test-purpose": true });
            setShowModal(false);
          }}
        >
          Submit
        </button>
      </div>
    );
  };

  return showModal && contentApiReady ? <Modal></Modal> : <>{children}</>;
};

export default ZarazProvider;
