import { Indexable } from '../interfaces/Indexable';
import { assetUrl } from '../pipes/Asset.pipe';
import { PRODUCTS } from '../utils/db/products';
import { isPhoto } from '../utils/stringUtils';
import { Base } from './Base';

export class Workshop extends Base {
  key!: string;
  id!: string;
  date!: string;
  description?: string;
  products?: string[];
  coverImage?: string;
  media!: string[];
  tags?: Indexable;

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
    return this.media.map((filename) =>
      filename.startsWith('http')
        ? filename
        : assetUrl(
            `workshops/${this.key}/${filename}`,
            isPhoto(filename) ? 'image' : 'video'
          )
    );
  }

  get coverImageUrl() {
    return assetUrl(
      `workshops/${this.key}/${this.coverImage || this.media[0]}`,
      'image',
      'c_fill,g_faces,h_300'
    );
  }
}
