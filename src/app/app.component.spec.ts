import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AnalyticsService } from './services/analytics/analytics.service';

describe('AppComponent', () => {
  beforeEach(async () => {
    const analyticsSpy = jasmine.createSpyObj<AnalyticsService>('AnalyticsService', [
      'trackPageViewed',
    ]);
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [{ provide: AnalyticsService, useValue: analyticsSpy }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
