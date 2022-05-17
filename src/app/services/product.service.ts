import { Injectable } from '@angular/core';
import { Indexable } from '../interfaces/Indexable';
import { Product } from '../models/Product.model';
// import * as PRODUCTS from '../utils/db/products.json';
import PRODUCTS from '../utils/db/products.json';

import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends BaseService<Product> {
  constructor() {
    super(PRODUCTS as Indexable, (obj: any) => new Product(obj));
  }

  getProductsByKeys = this.getItemsByKeys;

  getProductByKey = this.getItemByKey;

  getProducts = this.getItems;

  getRandomProducts = this.getRandomItems;
}
