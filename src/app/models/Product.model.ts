import { Base } from './Base';

export class Product extends Base {
  key!: string;
  id!: string;
  name!: string;
  price!: number;
  duration?: number; // in minutes
  description?: string;
  coverImage?: string;
  media!: string[];

  get type() {
    return 'product';
  }

  get allMediaUrls() {
    return this.media.map((img) =>
      img.startsWith('http') ? img : `assets/media/products/${this.key}/${img}`
    );
  }

  get coverImageUrl() {
    return `assets/media/products/${this.key}/${
      this.coverImage || this.media[0]
    }`;
  }
}
