import { ANALYTICS_LANDING_ATTRIBUTION_SESSION_KEY } from 'src/app/utils/constants';

export interface LandingAttributionPayload {
  landing_page_path: string;
  document_referrer: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
}

function setOptionalUtm(
  payload: LandingAttributionPayload,
  params: URLSearchParams,
  key: keyof Pick<
    LandingAttributionPayload,
    'utm_source' | 'utm_medium' | 'utm_campaign' | 'utm_content' | 'utm_term'
  >,
): void {
  const v = params.get(key);
  if (v) {
    payload[key] = v;
  }
}

/** Snapshot first-visit marketing context once per browser session. */
export function ensureLandingAttributionCaptured(pagePath: string): void {
  if (typeof window === 'undefined' || typeof sessionStorage === 'undefined') {
    return;
  }
  try {
    if (sessionStorage.getItem(ANALYTICS_LANDING_ATTRIBUTION_SESSION_KEY)) {
      return;
    }
    const params = new URLSearchParams(window.location.search);
    const payload: LandingAttributionPayload = {
      landing_page_path: pagePath,
      document_referrer: document.referrer || '',
    };
    setOptionalUtm(payload, params, 'utm_source');
    setOptionalUtm(payload, params, 'utm_medium');
    setOptionalUtm(payload, params, 'utm_campaign');
    setOptionalUtm(payload, params, 'utm_content');
    setOptionalUtm(payload, params, 'utm_term');
    sessionStorage.setItem(ANALYTICS_LANDING_ATTRIBUTION_SESSION_KEY, JSON.stringify(payload));
  } catch {
    /* private mode / quota */
  }
}

/** Flat props for Mixpanel (omit empty strings / undefined). */
export function readLandingAttributionForTracking(): Record<string, unknown> {
  if (typeof window === 'undefined' || typeof sessionStorage === 'undefined') {
    return {};
  }
  try {
    const raw = sessionStorage.getItem(ANALYTICS_LANDING_ATTRIBUTION_SESSION_KEY);
    if (!raw) {
      return {};
    }
    const parsed = JSON.parse(raw) as LandingAttributionPayload;
    const out: Record<string, unknown> = {};
    (Object.entries(parsed) as [string, string | undefined][]).forEach(([k, v]) => {
      if (v !== undefined && v !== '') {
        out[k] = v;
      }
    });
    return out;
  } catch {
    return {};
  }
}
