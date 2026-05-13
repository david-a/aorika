import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import mixpanel from 'mixpanel-browser';
import { environment } from 'src/environments/environment';
import { AnalyticsProvider } from './analytics-provider';

@Injectable({ providedIn: 'root' })
export class MixpanelAnalyticsProvider implements AnalyticsProvider {
  private initialized = false;

  constructor(@Inject(PLATFORM_ID) private readonly platformId: object) {}

  /** True when Mixpanel should run in this build (browser + non-empty token). */
  isEnabled(): boolean {
    return isPlatformBrowser(this.platformId) && !!environment.mixpanelToken?.trim().length;
  }

  init(): void {
    if (!this.isEnabled() || this.initialized) {
      return;
    }    
    const opts: {
      debug?: boolean;
      persistence?: string;
      track_pageview?: boolean;
      api_host?: string;
    } = {
      debug: !environment.production,
      persistence: 'localStorage',
      track_pageview: false,
    };
    if (environment.mixpanelApiHost) {
      opts.api_host = environment.mixpanelApiHost;
    }
    mixpanel.init(environment.mixpanelToken, opts);
    this.initialized = true;
  }

  track(eventName: string, properties?: Record<string, unknown>): void {
    if (!this.isEnabled()) {
      return;
    }
    if (!this.initialized) {
      this.init();
    }
    mixpanel.track(eventName, properties);
  }
}
