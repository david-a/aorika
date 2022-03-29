import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatalogPageComponent } from './components/catalog-page/catalog-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomePageComponent,
  },
  { path: 'catalog', component: CatalogPageComponent },
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
