import { Indexable } from '../interfaces/Indexable';
export class Base implements Indexable {
  [k: string]: any;
  // dateAdded?: string;
  constructor(obj: any) {
    Object.assign(this, obj);
  }
  // addedAt?(): Date | undefined {
  //   return (this.dateAdded && new Date(this.dateAdded)) || undefined;
  // }
}
