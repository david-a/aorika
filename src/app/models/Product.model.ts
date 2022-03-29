import { Base } from './Base';

export class Product extends Base {
  key!: string;
  id!: string;
  name!: string;
  price!: number;
  description?: string;
  coverImage?: string;
  media!: string[];

  get allMediaUrls() {
    return this.media.map((img) => `assets/media/products/${this.key}/${img}`);
  }

  get coverImageUrl() {
    return `assets/media/products/${this.key}/${
      this.coverImage || this.media[0]
    }`;
  }
}
