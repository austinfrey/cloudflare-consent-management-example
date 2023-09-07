export type Purpose = {
  [key: string]: boolean;
};

function MockZaraz(initialPurposes: Purpose[] = []) {
  const PURPOSES: { [key: string]: boolean } = {};

  initialPurposes.map((p) => {
    const purposeId = Object.keys(p)[0];
    PURPOSES[purposeId] = p[purposeId];
  });

  function get(purposeId: string): boolean {
    console.log("MOCK get", purposeId, PURPOSES[purposeId]);
    return PURPOSES[purposeId];
  }

  function set(consentPreferences: Purpose) {
    const purposeId = Object.keys(consentPreferences)[0];
    PURPOSES[purposeId] = consentPreferences[purposeId];
    console.log("MOCK set", consentPreferences);
  }

  function getAll() {
    console.log("MOCK getAll", PURPOSES);
    return PURPOSES;
  }

  function setAll(consentStatus: boolean) {
    const purposeIds = Object.keys(PURPOSES);
    purposeIds.map((id) => {
      PURPOSES[id] = consentStatus;
    });
    console.log("MOCK setAll", consentStatus, PURPOSES);
  }

  const consent = {
    get,
    set,
    getAll,
    setAll,
  };

  return {
    consent,
  };
}

export default MockZaraz;
