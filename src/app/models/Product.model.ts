import { Base } from './Base';

export class Product extends Base {
  key!: string;
  id!: string;
  name!: string;
  price!: number;
  description?: string;
  coverImage?: string;
  images!: string[];

  get allImageUrls() {
    return this.images.map((img) => `assets/images/products/${img}`);
  }

  get coverImageUrl() {
    return `assets/images/products/${this.coverImage || this.images[0]}`;
  }
}
