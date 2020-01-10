import ITEMS from "../database/items";

export function getItemById(id: number) {
  return ITEMS.find(item => item.id === id);
}
