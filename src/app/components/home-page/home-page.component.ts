import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from 'src/app/models/Product.model';
import { Workshop } from 'src/app/models/Workshop.model';
import { ContactCardDownloadService } from 'src/app/services/contact-card-download.service';
import { ProductService } from 'src/app/services/product.service';
import { WorkshopService } from 'src/app/services/workshop.service';
import { DEFAULT_META_DATA } from 'src/app/utils/constants';
import { isMobile } from 'src/app/utils/domUtils';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  sampleProducts!: Product[];
  sampleWorkshops!: Workshop[];
  isMobile = isMobile;

  constructor(
    private productService: ProductService,
    private workshopService: WorkshopService,
    private titleService: Title,
    private metaService: Meta,
    public contactCardDownload: ContactCardDownloadService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(DEFAULT_META_DATA.title);
    this.metaService.updateTag({
      property: 'og:url',
      content: environment.baseUrl,
    });
    this.sampleProducts = this.productService.getRandomProducts(3, [
      'catalog',
      'homepage',
    ]);
    this.sampleWorkshops = this.workshopService.getRandomWorkshops(3, [
      'gallery',
      'homepage',
    ]);
  }

  playVideoIfMobile() {
    const bgVideo = document.getElementById('main-background-video');
    if (bgVideo) {
      (bgVideo as any).style.display = 'block';
      if (isMobile()) (bgVideo as any).play();
    }
  }

  onPause() {
    const bgVideo = document.getElementById('main-background-video');
    if (bgVideo && isMobile()) {
      (bgVideo as any).style.display = 'none';
    }
  }
}
