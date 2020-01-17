import FULL_ITEMS, { ITEMS, ItemInterface } from "../database/items";

export function getItemById(id: number) {
  return FULL_ITEMS.find(item => item.id === id);
}

export function getItemByKey(
  key: ITEMS | undefined
): ItemInterface | undefined | null {
  if (!key) return null;
  return FULL_ITEMS.find(item => item.key === key);
}
