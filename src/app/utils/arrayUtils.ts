import { Indexable } from '../interfaces/Indexable';

export const chooseRandom = (arr: any[], num = 1) => {
  const res: any[] = [];
  const indices: Indexable = {};
  let i = 0;
  if (num > arr.length) num = arr.length;
  while (i < num) {
    const random = Math.floor(Math.random() * arr.length);
    if (indices[random]) {
      continue;
    }
    indices[random] = true;
    res.push(arr[random]);
    i++;
  }
  return res;
};
