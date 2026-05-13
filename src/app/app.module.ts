import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { CatalogPageComponent } from './components/catalog-page/catalog-page.component';
import { WorkshopCardComponent } from './components/workshop-card/workshop-card.component';
import { GalleryPageComponent } from './components/gallery-page/gallery-page.component';
import { MediaPlayerComponent } from './components/media-player/media-player.component';
import { MediaPageComponent } from './components/media-page/media-page.component';
import { MinuteSecondsPipe } from './pipes/MinuteSeconds.pipe';
import { AssetPipe } from './pipes/Asset.pipe';
import { FooterComponent } from './components/footer/footer.component';
import { GroupsPageComponent } from './components/groups-page/groups-page.component';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { AccessibilityPageComponent } from './components/accessibility-page/accessibility-page.component';
import { ContactSectionComponent } from './components/contact-section/contact-section.component';
import { MiniWorkshopLandingComponent } from './components/mini-workshop-landing/mini-workshop-landing.component';
import { ANALYTICS_BACKENDS } from './services/analytics/analytics-backends.token';
import { createAnalyticsBackends } from './services/analytics/analytics-backends.factory';
import { MixpanelAnalyticsProvider } from './services/analytics/mixpanel-analytics.provider';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomePageComponent,
    ContactSectionComponent,
    MiniWorkshopLandingComponent,
    ProductCardComponent,
    CatalogPageComponent,
    WorkshopCardComponent,
    GalleryPageComponent,
    MediaPlayerComponent,
    MediaPageComponent,
    MinuteSecondsPipe,
    AssetPipe,
    FooterComponent,
    GroupsPageComponent,
    AccessibilityPageComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ScullyLibModule],
  providers: [
    MixpanelAnalyticsProvider,
    {
      provide: ANALYTICS_BACKENDS,
      useFactory: createAnalyticsBackends,
      deps: [MixpanelAnalyticsProvider],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
