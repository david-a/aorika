import { AnalyticsProvider } from './analytics-provider';
import { MixpanelAnalyticsProvider } from './mixpanel-analytics.provider';

export function createAnalyticsBackends(
  mixpanel: MixpanelAnalyticsProvider,
): readonly AnalyticsProvider[] {
  return mixpanel.isEnabled() ? [mixpanel] : [];
}
