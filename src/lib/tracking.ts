// Util de captura de UTMs, cookies e metadados
export type TrackingFields = Record<string, string>;

const getQueryParams = (): Record<string, string> => {
  const params = new URLSearchParams(window.location.search);
  const result: Record<string, string> = {};
  params.forEach((v, k) => (result[k] = v));
  return result;
};

const getCookie = (name: string): string | null => {
  const match = document.cookie.match(new RegExp(`(^|;\\s*)${name}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : null;
};

const parseGaClientId = (ga: string | null): string | null => {
  if (!ga) return null;
  const parts = ga.split(".");
  if (parts.length >= 4) {
    const a = parts[parts.length - 2];
    const b = parts[parts.length - 1];
    return `${a}.${b}`;
  }
  return ga;
};

const getDeviceType = (): string => {
  const w = window.innerWidth;
  if (w <= 767) return "mobile";
  if (w <= 1024) return "tablet";
  return "desktop";
};

const getClientIds = () => {
  const ga = parseGaClientId(getCookie("_ga"));
  const fbp = getCookie("_fbp");
  const fbc = getCookie("_fbc");
  return { ga_client_id: ga ?? "", fbp: fbp ?? "", fbc: fbc ?? "" };
};

const getUTMs = (qp: Record<string, string>) => {
  return {
    utm_source: qp.utm_source ?? "",
    utm_medium: qp.utm_medium ?? "",
    utm_campaign: qp.utm_campaign ?? "",
    utm_term: qp.utm_term ?? "",
    utm_content: qp.utm_content ?? "",
    gclid: qp.gclid ?? "",
    fbclid: qp.fbclid ?? "",
    ttclid: qp.ttclid ?? "",
    li_fat_id: qp.li_fat_id ?? "",
    wbraid: qp.wbraid ?? "",
    gbraid: qp.gbraid ?? "",
  };
};

const getFirstTouch = (qp: Record<string, string>) => {
  const key = "tracking:first_touch";
  const existing = localStorage.getItem(key);
  if (existing) {
    try {
      return JSON.parse(existing) as TrackingFields;
    } catch {
      // ignore parse errors
    }
  }
  const first: TrackingFields = {
    first_utm_source: qp.utm_source ?? "",
    first_utm_medium: qp.utm_medium ?? "",
    first_utm_campaign: qp.utm_campaign ?? "",
    first_utm_term: qp.utm_term ?? "",
    first_utm_content: qp.utm_content ?? "",
    first_referrer: document.referrer ?? "",
    first_landing_page_url: window.location.href,
    first_landing_page_path: window.location.pathname,
    first_touch_at: new Date().toISOString(),
    first_gclid: qp.gclid ?? "",
    first_fbclid: qp.fbclid ?? "",
    first_ttclid: qp.ttclid ?? "",
    first_li_fat_id: qp.li_fat_id ?? "",
  };
  localStorage.setItem(key, JSON.stringify(first));
  return first;
};

const getLastTouch = (qp: Record<string, string>) => {
  return {
    referrer: document.referrer ?? "",
    landing_page_url: window.location.href,
    landing_page_path: window.location.pathname,
    page_url: window.location.href,
    page_path: window.location.pathname,
    page_title: document.title,
    last_touch_at: new Date().toISOString(),
  };
};

const getSessionMeta = () => {
  return {
    user_agent: navigator.userAgent,
    browser_language: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone ?? "",
    timezone_offset: String(new Date().getTimezoneOffset()),
    device_type: getDeviceType(),
    screen_resolution: `${window.screen.width}x${window.screen.height}`,
  };
};

const shouldTrackCookies = (): boolean => {
  const requireConsent = (import.meta.env.VITE_REQUIRE_CONSENT ?? "false").toString() === "true";
  if (!requireConsent) return true;
  const marketing = getCookie("consent_marketing");
  const analytics = getCookie("consent_analytics");
  return marketing === "true" || analytics === "true";
};

export const getGeoFromIP = async (): Promise<Record<string, string>> => {
  const enabled = (import.meta.env.VITE_TRACK_IP_GEO ?? "false").toString() === "true";
  if (!enabled) return {};
  const endpoint = import.meta.env.VITE_IP_GEO_ENDPOINT as string | undefined;
  const token = import.meta.env.VITE_IP_GEO_TOKEN as string | undefined;
  if (!endpoint) return {};
  try {
    const url = token ? `${endpoint}?token=${encodeURIComponent(token)}` : endpoint;
    const res = await fetch(url, { headers: { Accept: "application/json" } });
    if (!res.ok) return {};
    const data = await res.json();
    return {
      geo_ip: JSON.stringify(data),
      geo_city: data.city ?? "",
      geo_region: data.region ?? data.region_name ?? "",
      geo_country: data.country ?? data.country_name ?? "",
      geo_loc: data.loc ?? `${data.latitude ?? ""},${data.longitude ?? ""}`,
    };
  } catch {
    return {};
  }
};

export const collectTrackingSync = (): TrackingFields => {
  const qp = getQueryParams();
  const fields: TrackingFields = {
    ...getUTMs(qp),
    ...getLastTouch(qp),
    ...getSessionMeta(),
  };
  if (shouldTrackCookies()) {
    Object.assign(fields, getClientIds(), getFirstTouch(qp));
  }
  return fields;
};