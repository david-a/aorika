import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import {
  navigateNonSmooth,
  navigateToContactFormAndMessage,
} from 'src/app/utils/domUtils';

@Component({
  selector: 'app-groups-page',
  templateUrl: './groups-page.component.html',
  styleUrls: ['./groups-page.component.scss'],
})
export class GroupsPageComponent implements OnInit {
  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {}

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
