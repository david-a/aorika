import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatalogPageComponent } from './components/catalog-page/catalog-page.component';
import { GalleryPageComponent } from './components/gallery-page/gallery-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { MediaPageComponent } from './components/media-page/media-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomePageComponent,
  },
  { path: 'catalog', component: CatalogPageComponent },
  { path: 'gallery', component: GalleryPageComponent },
  { path: 'product/:id', component: MediaPageComponent },
  { path: 'workshop/:id', component: MediaPageComponent },
  { path: 'contact', redirectTo: '/#contact' },
  // { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      scrollOffset: [0, 70],
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
