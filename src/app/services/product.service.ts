import { Injectable } from '@angular/core';
import { Product } from '../models/Product.model';
import { PRODUCTS } from '../utils/db/products';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends BaseService<Product> {
  constructor() {
    super(PRODUCTS, (obj: any) => new Product(obj));
  }

  getProductsByKeys = this.getItemsByKeys;

  getProductByKey = this.getItemByKey;

  getProducts = this.getItems;
}
