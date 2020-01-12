import FULL_ITEMS, { ITEMS } from "../database/items";

export function getItemById(id: number) {
  return FULL_ITEMS.find(item => item.id === id);
}

export function getItemByKey(key: ITEMS) {
  return FULL_ITEMS.find(item => item.key === key);
}
