import { Indexable } from '../interfaces/Indexable';
import { assetUrl } from '../pipes/Asset.pipe';
import { isPhoto } from '../utils/stringUtils';
import { Base } from './Base';

export class Product extends Base {
  key!: string;
  id!: string;
  name!: string;
  price!: number;
  groupPrice?: number;
  duration?: number; // in minutes
  dimensions?: string;
  description?: string;
  coverImage?: string;
  media!: string[];
  tags?: Indexable;

  constructor(obj: any) {
    super(obj);
    Object.assign(this, obj);
  }

  get type() {
    return 'product';
  }

  get allMediaUrls() {
    return this.media.map((filename) =>
      filename.startsWith('http')
        ? filename
        : assetUrl(
            `products/${this.key}/${filename}`,
            isPhoto(filename) ? 'image' : 'video'
          )
    );
  }

  get coverImageUrl() {
    return assetUrl(
      `products/${this.key}/${this.coverImage || this.media[0]}`,
      'image',
      'h_500'
    );
  }
}
