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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomePageComponent,
    ProductCardComponent,
    CatalogPageComponent,
    WorkshopCardComponent,
    GalleryPageComponent,
    MediaPlayerComponent,
    MediaPageComponent,
    MinuteSecondsPipe,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
