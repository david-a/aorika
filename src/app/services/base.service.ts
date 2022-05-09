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

  itemsWithVisibility(visibility?: string) {
    return visibility
      ? this.allItems.filter(
          (item) =>
            (item as any).visibility && (item as any).visibility[visibility]
        )
      : this.allItems;
  }

  getItems(limit?: number, visibility?: string) {
    return this.itemsWithVisibility(visibility).slice(0, limit);
  }

  getRandomItems(limit?: number, visibility?: string) {
    return chooseRandom(this.itemsWithVisibility(visibility), limit);
  }
}
