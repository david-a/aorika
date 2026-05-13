import { Injectable } from '@angular/core';

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/** Where the user tapped “save contact card” — becomes GA4 event parameter via GTM */
export type ContactCardPlacement = 'mini_workshop' | 'home' | 'header' | 'footer';

export const ANALYTICS_EVENTS = {
  MINI_WORKSHOP_LANDING_VIEW: 'mini_workshop_landing_view',
  CONTACT_CARD_SAVE: 'contact_card_save',
  CONTACT_FORM_SUBMIT_SUCCESS: 'contact_form_submit_success',
} as const;

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  pushEvent(eventName: string, params?: Record<string, unknown>): void {
    window.dataLayer = window.dataLayer ?? [];
    const payload: Record<string, unknown> = { event: eventName };
    if (params) {
      Object.assign(payload, params);
    }
    window.dataLayer.push(payload);
  }

  miniWorkshopLandingView(): void {
    this.pushEvent(ANALYTICS_EVENTS.MINI_WORKSHOP_LANDING_VIEW, {
      page_path: '/mini-workshop',
    });
  }

  contactCardSave(
    placement: ContactCardPlacement,
    method: 'anchor' | 'button'
  ): void {
    this.pushEvent(ANALYTICS_EVENTS.CONTACT_CARD_SAVE, {
      contact_card_placement: placement,
      contact_card_method: method,
    });
  }

  contactFormSubmitSuccess(
    pagePath: string,
    postVcfContactFlow: boolean
  ): void {
    this.pushEvent(ANALYTICS_EVENTS.CONTACT_FORM_SUBMIT_SUCCESS, {
      page_path: pagePath,
      post_vcf_contact_flow: postVcfContactFlow,
    });
  }
}
