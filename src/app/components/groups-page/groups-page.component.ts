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
  selector: 'app-groups-page',
  templateUrl: './groups-page.component.html',
  styleUrls: ['./groups-page.component.scss'],
})
export class GroupsPageComponent implements OnInit {
  title = 'אאוריקה - סדנאות לקבוצות';
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
      content: environment.baseUrl + 'groups',
    });
  }

  get products() {
    return this.productService.getProducts(undefined, ['groups']);
  }

  contactMe() {
    navigateNonSmooth(this.router, '/');
    setTimeout(() => {
      navigateToContactFormAndMessage(
        `היי אור! \nאשמח אם תוכלי לחזור אלי בקשר לסדנה קבוצתית.`
      );
    }, 100);
  }
}
