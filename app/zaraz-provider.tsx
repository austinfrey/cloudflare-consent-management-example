import { ReactNode, useEffect, useState } from "react";
import MockZaraz from "./mock-zaraz";

declare const zaraz: any;

type Props = {
  children: ReactNode;
};

const mockZaraz = typeof zaraz === "undefined" ? MockZaraz() : zaraz;

const ZarazProvider = ({ children }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [purposes, setPurposes] = useState<any[]>([]);

  useEffect(() => {
    const purposes = mockZaraz.consent.getAll();
    setPurposes(Object.keys(purposes).map((key) => ({ [key]: purposes[key] })));

    // if any purposes still false, show modal
    Object.keys(purposes).map((key: any) => {
      !purposes[key] && setShowModal(true);
    });
  }, [showModal]);

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
            onClick={(e: React.MouseEvent<HTMLInputElement>) => {
              if (e.currentTarget.checked) {
              }
              console.log(e.currentTarget.value);
            }}
            type="checkbox"
            id="marketingCheckbox"
            name="marketingCheckbox"
            value={JSON.stringify(purposes[1])}
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
            value={JSON.stringify(purposes[2])}
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
        <button
          className="approve-button"
          onClick={() => {
            mockZaraz.consent.setAll(true);
            setShowModal(false);
          }}
        >
          Accept All
        </button>
        <button
          className="approve-button"
          onClick={() => {
            mockZaraz.consent.setAll(false);
            setShowModal(false);
          }}
        >
          Reject All
        </button>
      </div>
    );
  };

  return showModal ? <Modal></Modal> : <>{children}</>;
};

export default ZarazProvider;
