export type Purpose = {
  [key: string]: boolean | undefined;
};

const document = { cookie: "" };

function MockZaraz() {
  const PURPOSES: { [key: string]: boolean | undefined } = {
    "test-purpose": false,
  };
  const createCookieString = (consentPreferences: any) =>
    `cf_consent=${JSON.stringify(consentPreferences)}`;

  if (document) {
    document.cookie = createCookieString({
      essentialCookie: false,
      marketingCookie: false,
      trackingCookie: false,
    });
  }

  const getParsedCookieString = () =>
    document.cookie && JSON.parse(document.cookie.split("=")[1]);

  function get(purposeId: string): boolean | undefined {
    const cookie = getParsedCookieString();
    return cookie[purposeId];
  }

  function set(consentPreferences: Purpose) {
    const purposeId = Object.keys(consentPreferences)[0];
    const cookie = getParsedCookieString();

    cookie[purposeId] = consentPreferences[purposeId];
    document.cookie = createCookieString(cookie);
  }

  function getAll() {
    return getParsedCookieString();
  }

  function setAll(consentStatus: boolean) {
    const cookie = getParsedCookieString();
    const purposeIds = Object.keys(cookie);

    purposeIds.map((id) => {
      cookie[id] = consentStatus;
    });

    document.cookie = cookie;
  }

  function sendQueueEvents() {}

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
