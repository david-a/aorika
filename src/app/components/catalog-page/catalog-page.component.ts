import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.scss'],
})
export class CatalogPageComponent implements OnInit {
  constructor(private productService: ProductService) {}

  ngOnInit(): void {}

  get products() {
    return this.productService.getProducts(undefined, ['catalog']);
  }
}
