import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(private productService: ProductService) {}

  ngOnInit(): void {}

  get sampleProducts() {
    return this.productService.getProducts(3);
  }
}
