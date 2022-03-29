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

  getItems(limit?: number) {
    return this.allItems.slice(0, limit);
  }
}
