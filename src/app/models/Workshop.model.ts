import { PRODUCTS } from '../utils/db/products';
import { Base } from './Base';

export class Workshop extends Base {
  key!: string;
  id!: string;
  date!: string;
  description?: string;
  products?: string[];
  coverImage?: string;
  media!: string[];

  get type() {
    return 'workshop';
  }

  get productNames() {
    return this.products?.map((product) => PRODUCTS[product]?.name || product);
  }

  get productLinks() {
    return this.products?.map((product) =>
      PRODUCTS[product] ? '/product/' + product : undefined
    );
  }

  get allMediaUrls() {
    return this.media.map((img) =>
      img.startsWith('http') ? img : `assets/media/workshops/${this.key}/${img}`
    );
  }

  get coverImageUrl() {
    return `assets/media/workshops/${this.key}/${
      this.coverImage || this.media[0]
    }`;
  }
}
