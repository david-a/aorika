import { Inject, Injectable, Optional } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ANALYTICS_BACKENDS } from './analytics-backends.token';
import { ensureLandingAttributionCaptured, readLandingAttributionForTracking } from './analytics-attribution';
import { AnalyticsProvider } from './analytics-provider';

/** Where the user tapped “save contact card”. */
export type ContactCardPlacement = 'mini_workshop' | 'home' | 'header' | 'footer';

export const ANALYTICS_EVENTS = {
  PAGE_VIEWED: 'Page Viewed',
  MINI_WORKSHOP_LANDING_VIEWED: 'Mini Workshop Landing Viewed',
  CONTACT_CARD_SAVED: 'Contact Card Saved',
  CONTACT_FORM_SUBMITTED: 'Contact Form Submitted',
} as const;

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private readonly backends: readonly AnalyticsProvider[];

  constructor(
    @Optional()
    @Inject(ANALYTICS_BACKENDS)
    backends: readonly AnalyticsProvider[] | undefined,
  ) {
    this.backends = backends ?? [];
    this.backends.forEach((b) => b.init());
  }

  trackPageViewed(details: { page_path: string; page_title: string; page_url: string }): void {
    ensureLandingAttributionCaptured(details.page_path);
    this.dispatch(ANALYTICS_EVENTS.PAGE_VIEWED, {
      ...details,
      env: environment.production ? 'production' : 'development',
    });
  }

  trackMiniWorkshopLandingViewed(): void {
    this.dispatch(ANALYTICS_EVENTS.MINI_WORKSHOP_LANDING_VIEWED, {
      page_path: '/mini-workshop',
      landing_page: 'mini_workshop',
    });
  }

  trackContactCardSaved(placement: ContactCardPlacement, method: 'anchor' | 'button'): void {
    this.dispatch(ANALYTICS_EVENTS.CONTACT_CARD_SAVED, {
      contact_card_placement: placement,
      contact_card_method: method,
    });
  }

  trackContactFormSubmitted(pagePath: string, postVcfContactFlow: boolean): void {
    const attribution = readLandingAttributionForTracking();
    this.dispatch(ANALYTICS_EVENTS.CONTACT_FORM_SUBMITTED, {
      page_path: pagePath,
      post_vcf_contact_flow: postVcfContactFlow,
      ...attribution,
    });
  }

  private dispatch(eventName: string, properties?: Record<string, unknown>): void {
    this.backends.forEach((b) => b.track(eventName, properties));
  }
}
