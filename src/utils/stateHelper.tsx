export function newInventoryObject(item: any) {
  return {
    item,
    quantity: 1
  };
}

export function newEquipmentObject(item: any) {
  return {
    item
  };
}
