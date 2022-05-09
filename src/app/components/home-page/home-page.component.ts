import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product.model';
import { Workshop } from 'src/app/models/Workshop.model';
import { ProductService } from 'src/app/services/product.service';
import { WorkshopService } from 'src/app/services/workshop.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  sampleProducts!: Product[];
  sampleWorkshops!: Workshop[];

  constructor(
    private productService: ProductService,
    private workshopService: WorkshopService
  ) {}

  ngOnInit(): void {
    this.sampleProducts = this.productService.getRandomProducts(3, [
      'catalog',
      'homepage',
    ]);
    this.sampleWorkshops = this.workshopService.getRandomWorkshops(3, [
      'gallery',
      'homepage',
    ]);
  }
}
