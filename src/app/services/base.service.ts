import { BaseItem } from '../types/BaseItem';
import { chooseRandom } from '../utils/arrayUtils';

export abstract class BaseService<T> {
  allItemsObject: { [key: string]: T };
  wrapItem!: (obj: T) => T;
  allItems: T[];

  constructor(allItemsObject: { [key: string]: T }, wrapItem: (obj: T) => T) {
    this.allItemsObject = allItemsObject;
    this.wrapItem = wrapItem;
    this.allItems = Object.keys(allItemsObject).map((itemKey) =>
      this.wrapItem({ key: itemKey, ...allItemsObject[itemKey] })
    );
  }

  getItemsByKeys(keys: string[]) {
    return keys
      .map(
        (key) =>
          this.allItemsObject[key] &&
          this.wrapItem({ key, ...this.allItemsObject[key] })
      )
      .filter((item) => !!item);
  }

  getItemByKey(key: string) {
    return this.wrapItem({ key, ...this.allItemsObject[key] });
  }

  itemsWithTags(tags?: string[]) {
    return tags && tags.length
      ? this.allItems.filter(
          (item) =>
            (item as any).tags &&
            tags.filter((tag) => (item as any).tags[tag]).length === tags.length
        )
      : this.allItems;
  }

  getItems(limit?: number, tags?: string[]) {
    return this.itemsWithTags(tags).slice(0, limit);
  }

  getRandomItems(limit?: number, tags?: string[]) {
    return chooseRandom(this.itemsWithTags(tags), limit);
  }
}
