import { Base } from './Base';

export class Workshop extends Base {
  key!: string;
  id!: string;
  date!: string;
  description?: string;
  products?: string[];
  coverImage?: string;
  media!: string[];

  get allMediaUrls() {
    return this.media.map((img) => `assets/media/workshops/${this.key}/${img}`);
  }

  get coverImageUrl() {
    return `assets/media/workshops/${this.key}/${
      this.coverImage || this.media[0]
    }`;
  }
}
