import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { ANALYTICS_BACKENDS } from './analytics-backends.token';
import { AnalyticsProvider } from './analytics-provider';
import {
  ANALYTICS_EVENTS,
  AnalyticsService,
} from './analytics.service';

class RecordingAnalyticsProvider implements AnalyticsProvider {
  initCalls = 0;
  readonly events: { name: string; props?: Record<string, unknown> }[] = [];

  init(): void {
    this.initCalls++;
  }

  track(eventName: string, properties?: Record<string, unknown>): void {
    this.events.push({ name: eventName, props: properties });
  }
}

describe('AnalyticsService', () => {
  let backend: RecordingAnalyticsProvider;
  let service: AnalyticsService;

  beforeEach(() => {
    backend = new RecordingAnalyticsProvider();
    TestBed.configureTestingModule({
      providers: [
        AnalyticsService,
        { provide: ANALYTICS_BACKENDS, useValue: [backend] },
      ],
    });
    service = TestBed.inject(AnalyticsService);
  });

  it('initializes each backend once', () => {
    expect(backend.initCalls).toBe(1);
  });

  it('trackContactCardSaved sends Contact Card Saved with placement and method', () => {
    service.trackContactCardSaved('header', 'anchor');
    expect(backend.events).toEqual([
      jasmine.objectContaining({
        name: ANALYTICS_EVENTS.CONTACT_CARD_SAVED,
        props: jasmine.objectContaining({
          contact_card_placement: 'header',
          contact_card_method: 'anchor',
        }),
      }),
    ]);
  });

  it('trackPageViewed includes env from environment flag', () => {
    service.trackPageViewed({
      page_path: '/catalog',
      page_title: 'Test',
      page_url: 'http://localhost/catalog',
    });
    const ev = backend.events.find((e) => e.name === ANALYTICS_EVENTS.PAGE_VIEWED);
    expect(ev).toBeTruthy();
    expect(ev!.props!.page_path).toBe('/catalog');
    expect(ev!.props!.env).toBe(environment.production ? 'production' : 'development');
  });
});
