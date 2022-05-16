import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import {
  navigateNonSmooth,
  navigateToContactFormAndMessage,
} from 'src/app/utils/domUtils';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.scss'],
})
export class CatalogPageComponent implements OnInit {
  title = 'אאוריקה - קטלוג המוצרים';
  constructor(
    private productService: ProductService,
    private router: Router,
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.metaService.updateTag({
      property: 'og:url',
      content: environment.baseUrl + 'catalog',
    });
  }

  get products() {
    return this.productService.getProducts(undefined, ['catalog']);
  }

  contactMe() {
    navigateNonSmooth(this.router, '/');
    setTimeout(() => {
      navigateToContactFormAndMessage(
        `היי אור! \nביקרתי בקטלוג אאוריקה והייתי רוצה לבנות מוצר חדש.`
      );
    }, 100);
  }
}
