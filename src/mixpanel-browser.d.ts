/**
 * mixpanel-browser@2.47 ships without bundled .d.ts; keep minimal typings for our usage.
 */
declare module 'mixpanel-browser' {
  export interface Mixpanel {
    init(token: string, config?: Record<string, unknown>): void;
    track(eventName: string, properties?: Record<string, unknown>): void;
  }
  const mixpanel: Mixpanel;
  export default mixpanel;
}
