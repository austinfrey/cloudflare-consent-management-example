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
  const [purposes, setPurposes] = useState<any[]>([]);

  useEffect(() => {
    const purposes = mockZaraz.consent.getAll();
    setPurposes(Object.keys(purposes).map((key) => ({ [key]: purposes[key] })));

    // if any purposes still false, show modal
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

  console.log("purposes", purposes);

  const Modal = () => {
    return (
      <div className="zaraz-modal">
        <p>
          We use cookies and other tracking technologies, including session
          replay tracking, to improve your experience, to provide and remember
          your login, to personalize content and ads, to record sessions for
          later playback, and to optimize site functionality.
        </p>
        <div>
          <label htmlFor="allowMarketing">Opt into Marketing cookies</label>
          <input
            onClick={(e: React.MouseEvent<HTMLInputElement>) =>
              console.log(e.currentTarget.value)
            }
            type="checkbox"
            id="marketingCheckbox"
            name="marketingCheckbox"
            value={purposes[1]}
          />
        </div>
        <div>
          <label htmlFor="allowTracking">Opt into usage tracking cookies</label>
          <input
            onClick={(e: React.MouseEvent<HTMLInputElement>) =>
              console.log(e.currentTarget.value)
            }
            type="checkbox"
            id="trackingCheckbox"
            name="trackingCheckbox"
            value={purposes[2]}
          />
        </div>

        <button
          className="approve-button"
          onClick={() => {
            const purposeId = Object.keys(mockZaraz.consent.getAll())[0];
            mockZaraz.consent.set({ [purposeId]: true });
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
