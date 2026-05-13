import { InjectionToken } from '@angular/core';
import { AnalyticsProvider } from './analytics-provider';

export const ANALYTICS_BACKENDS = new InjectionToken<readonly AnalyticsProvider[]>(
  'ANALYTICS_BACKENDS',
);
