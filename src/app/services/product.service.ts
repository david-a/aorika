import { Injectable } from '@angular/core';
import { Product } from '../models/Product.model';
import { PRODUCTS } from '../utils/db/products';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  allProducts: Product[];

  constructor() {
    this.allProducts = Object.keys(PRODUCTS).map((productKey) =>
      this.wrapItem({ key: productKey, ...PRODUCTS[productKey] })
    );
  }

  wrapItem = (obj: any) => new Product(obj);

  getProductsByKeys(keys: string[]) {
    return keys
      .map((key) => PRODUCTS[key] && this.wrapItem({ key, ...PRODUCTS[key] }))
      .filter((product) => !!product);
  }

  getProductByKey(key: string) {
    return this.wrapItem({ key, ...PRODUCTS[key] });
  }

  getProducts(limit?: number) {
    return this.allProducts.slice(0, limit);
  }
}
