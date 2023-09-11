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
    const purposes: any = Object.keys(mockZaraz.consent.getAll()).map((key) => [
      key,
      mockZaraz.consent.getAll()[key],
    ]);

    setPurposes(purposes);

    // if essential cookie not set
    !purposes[0][1] && setShowModal(true);
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
                purposes[1][1] = true;
              } else {
                purposes[1][1] = false;
              }
              setPurposes(purposes);
            }}
            type="checkbox"
            id="marketingCheckbox"
            name="marketingCheckbox"
          />
        </div>
        <div>
          <label htmlFor="allowTracking">Opt into usage tracking cookies</label>
          <input
            onClick={(e: React.MouseEvent<HTMLInputElement>) => {
              if (e.currentTarget.checked) {
                purposes[2][1] = true;
              } else {
                purposes[2][1] = false;
              }
              setPurposes(purposes);
            }}
            type="checkbox"
            id="trackingCheckbox"
            name="trackingCheckbox"
          />
        </div>

        <button
          className="decision-button"
          onClick={() => {
            purposes[0][1] = true;
            purposes.forEach((p) => mockZaraz.consent.set({ [p[0]]: p[1] }));
            setShowModal(false);
          }}
        >
          Submit
        </button>
        <button
          className="decision-button"
          onClick={() => {
            mockZaraz.consent.setAll(true);
            setShowModal(false);
          }}
        >
          Accept All
        </button>
        <button
          className="decision-button"
          onClick={() => {
            mockZaraz.consent.setAll(false);
            setShowModal(true);
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
