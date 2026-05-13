import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Title, Meta } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import { assetUrl } from './pipes/Asset.pipe';
import { DEFAULT_META_DATA } from './utils/constants';
import { AnalyticsService } from './services/analytics/analytics.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  env = environment.production ? 'production' : 'development';
  private navigationSub?: Subscription;

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private router: Router,
    private analytics: AnalyticsService,
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(DEFAULT_META_DATA.title);
    this.metaService.addTags([
      { property: 'og:url', content: environment.baseUrl },
      {
        name: 'keywords',
        content: DEFAULT_META_DATA.keywords,
      },
      {
        property: 'og:image',
        content: assetUrl(DEFAULT_META_DATA.og_image_filename),
      },
      {
        name: 'og:description',
        content: DEFAULT_META_DATA.og_description,
      },
      {
        name: 'description',
        content: DEFAULT_META_DATA.description,
      },
      { name: 'robots', content: DEFAULT_META_DATA.robots },
    ]);
    document.onkeydown = this.onKeyDown;

    this.navigationSub = this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        map((e) => e.urlAfterRedirects.split('?')[0]),
        map((path) => {
          const hashIdx = path.indexOf('#');
          return (hashIdx >= 0 ? path.slice(0, hashIdx) : path) || '/';
        }),
        distinctUntilChanged(),
      )
      .subscribe((pagePath) => {
        const pageUrl =
          typeof window !== 'undefined' ? window.location.href.split('#')[0] : '';
        this.analytics.trackPageViewed({
          page_path: pagePath,
          page_title: this.titleService.getTitle(),
          page_url: pageUrl,
        });
      });
  }

  ngOnDestroy(): void {
    this.navigationSub?.unsubscribe();
  }

  onKeyDown(event: KeyboardEvent | undefined): void {
    if (!event) {
      return;
    }
    if (event.keyCode == 72 && event.altKey) {
      document.getElementById('aorika-logo-anchor')?.focus();
    }
  }
}
