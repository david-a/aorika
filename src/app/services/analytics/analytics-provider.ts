export interface AnalyticsProvider {
  /** Called once when the app boots (browser only, when this backend is active). */
  init(): void;

  track(eventName: string, properties?: Record<string, unknown>): void;
}
