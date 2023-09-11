export type Purpose = {
  [key: string]: boolean | undefined;
};

function MockZaraz() {
  const PURPOSES: { [key: string]: boolean | undefined } = {
    "test-purpose": false,
  };
  const createCookieString = (consentPreferences: any) =>
    `cf_consent=${JSON.stringify(consentPreferences)}`;

  document.cookie = createCookieString({ testPurpose: false });

  const getParsedCookieString = () =>
    document.cookie && JSON.parse(document.cookie.split("=")[1]);

  function get(purposeId: string): boolean | undefined {
    const cookie = getParsedCookieString();
    console.log("MOCK get", purposeId, cookie[purposeId]);
    return cookie[purposeId];
  }

  function set(consentPreferences: Purpose) {
    const purposeId = Object.keys(consentPreferences)[0];
    const cookie = getParsedCookieString();

    cookie[purposeId] = consentPreferences[purposeId];
    document.cookie = createCookieString(cookie);

    console.log("MOCK set", document.cookie);
  }

  function getAll() {
    console.log("MOCK getAll", getParsedCookieString());
    return getParsedCookieString();
  }

  function setAll(consentStatus: boolean) {
    const cookie = getParsedCookieString();
    const purposeIds = Object.keys(cookie);
    purposeIds.map((id) => {
      cookie[id] = consentStatus;
    });
    document.cookie = cookie;
    console.log("MOCK setAll", consentStatus, cookie);
  }

  function sendQueueEvents() {
    console.log("MOCK sendQueuedEvents");
  }

  const consent = {
    get,
    set,
    getAll,
    setAll,
    sendQueueEvents,
  };

  return {
    consent,
  };
}

export default MockZaraz;
