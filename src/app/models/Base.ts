import { environment } from 'src/environments/environment';
import { Indexable } from '../interfaces/Indexable';
export class Base implements Indexable {
  [k: string]: any;
  // dateAdded?: string;

  constructor(obj: any) {
    // For some reason, when using json file as db source, ts overrides the object values with the type property initializers
    // Thus moving the Object.assign to the child classes
    // Object.assign(this, obj);
  }
  // addedAt?(): Date | undefined {
  //   return (this.dateAdded && new Date(this.dateAdded)) || undefined;
  // }

  get shareUrl() {
    return environment.baseUrl + `${this.type}/${this.key}`;
  }
}
