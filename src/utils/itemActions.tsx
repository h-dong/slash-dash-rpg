import { WEAR_POSITION, Item } from "../database/items";
import { Equipments, InventoryItemInterface } from "../machines/GameMachine";
import { getItemById } from "./findItem";

// export const ITEM_ACTIONS = {
//   EQUIP: "Equip",
//   UNEQUIP: "Unequip",
//   EXAMINE: "Examine"
// };

export interface EquipmentItemActionInterface {
  type: string;
  itemId: number;
}

export interface InventoryItemActionInterface {
  type: string;
  order: number;
  itemId: number;
}

export function getInventoryItemActions(
  fullItem: Item
): InventoryItemActionInterface[] {
  const actions: InventoryItemActionInterface[] = [];
  if (fullItem) {
    actions.push({
      type: "EXAMINE_ITEM",
      order: 1,
      itemId: fullItem.id
    });
    if (fullItem.equipment) {
      actions.push({
        type: "EQUIP_ITEM",
        order: 2,
        itemId: fullItem.id
      });
    }
  }
  return actions;
}

export function getEquippedItemActions(
  itemId: number
): EquipmentItemActionInterface[] {
  return [
    {
      type: "UNEQUIP_ITEM",
      itemId
    }
  ];
}

export function moveEquipmentItemToInventory(
  equipments: Equipments,
  inventory: InventoryItemInterface[],
  itemId: number
): { equipments: Equipments; inventory: InventoryItemInterface[] } {
  return {
    equipments: removeItemFromEquipment({ ...equipments }, itemId),
    inventory: addItemToInventory([...inventory], itemId)
  };
}

export function moveInventoryItemToEquipment(
  equipments: Equipments,
  inventory: InventoryItemInterface[],
  itemId: number
) {
  const fullItem = getItemById(itemId);
  let newEquipments = { ...equipments };
  let newInventory = [...inventory];

  if (fullItem?.equipment) {
    const itemIdToUnequip: number[] = calcEquipToTakeOff(newEquipments, itemId);

    itemIdToUnequip.forEach(id => {
      newInventory = addItemToInventory(newInventory, id);
      newEquipments = removeItemFromEquipment(newEquipments, id);
    });

    newEquipments = addItemToEquipment(newEquipments, itemId);
    newInventory = removeItemFromInventory(newInventory, itemId);
  }

  return { equipments: newEquipments, inventory: newInventory };
}

function addItemToEquipment(equipments: Equipments, itemId: number) {
  const newEquipments = { ...equipments };
  const fullItem = getItemById(itemId);

  if (fullItem?.equipment?.position)
    newEquipments[fullItem?.equipment?.position] = itemId;

  return newEquipments;
}

function removeItemFromEquipment(equipments: Equipments, itemId: number) {
  const newEquipments = { ...equipments };
  const fullItem = getItemById(itemId);

  if (fullItem?.equipment?.position)
    delete newEquipments[fullItem.equipment.position];

  return newEquipments;
}

function addItemToInventory(
  inventory: InventoryItemInterface[],
  itemId: number
) {
  const newInventory = [...inventory];
  const itemInInventory = newInventory.find(item => item.itemId === itemId);

  itemInInventory
    ? (itemInInventory.quantity += 1)
    : newInventory.push({ itemId, quantity: 1 });

  return newInventory;
}

function removeItemFromInventory(
  inventory: InventoryItemInterface[],
  itemId: number
) {
  const newInventory = [...inventory];
  const inventoryItem = newInventory.find(item => item.itemId === itemId);

  if (inventoryItem) {
    if (inventoryItem.quantity > 1) {
      // remove quality by 1
      inventoryItem.quantity -= 1;
    } else {
      // remove item completely from Inventory
      const index = newInventory.findIndex(item => item.itemId === itemId);
      newInventory.splice(index, 1);
    }
  }

  return newInventory;
}

function calcEquipToTakeOff(equipments: Equipments, itemId: number): number[] {
  const fullItem = getItemById(itemId);

  if (!fullItem?.equipment) return [];

  const {
    position: positionToEquip,
    requirements: requirementsToEquip
  } = fullItem.equipment;

  const itemInPosition = getItemById(Number(equipments[positionToEquip]));

  // when equiping an off hand item, unequip current two handed weapon
  if (positionToEquip === WEAR_POSITION.OFF_HAND) {
    const currentMainHand = getItemById(
      Number(equipments[WEAR_POSITION.MAIN_HAND])
    );

    if (currentMainHand) {
      const requirements = currentMainHand?.equipment?.requirements;
      if (requirements?.twoHanded) return [currentMainHand.id];
    }
  }

  if (positionToEquip === WEAR_POSITION.MAIN_HAND && requirementsToEquip) {
    const { twoHanded } = requirementsToEquip;
    if (twoHanded) {
      const currentMainHand = getItemById(
        Number(equipments[WEAR_POSITION.MAIN_HAND])
      );
      const currentOffHand = getItemById(
        Number(equipments[WEAR_POSITION.OFF_HAND])
      );
      return [currentMainHand, currentOffHand]
        .filter(elem => elem)
        .map(elem => Number(elem?.id));
    }
  }

  // if nothing is equipped return [], else return array with id
  return !itemInPosition ? [] : [itemInPosition.id];
}

// export function equipItemAction(inventory, equipments, item) {
//   const itemsToMoveToInventory = equipToTakeOff(equipments, item);
//   itemsToMoveToInventory.forEach(itemToMove => {
//     const existingItemInInventory = inventory.find(elem => {
//       return elem.item.id === itemToMove.id;
//     });
//     if (existingItemInInventory) {
//       // if item already exist in inventory
//       existingItemInInventory.quantity += 1;
//     } else {
//       // if item doesn't exist in inventory
//       inventory.push({ item: itemToMove, quantity: 1 });
//     }

//     // remove from equipments
//     delete equipments[itemToMove.equipment.position];
//   });

//   // equip selected item
//   equipments[item.equipment.position] = { item };

//   // remove item from inventory if quantity is 1, else decrement quaity by 1
//   const itemInventoryIndex = inventory.findIndex(elem => {
//     return elem.item.key === item.key;
//   });
//   if (itemInventoryIndex > 0 && inventory[itemInventoryIndex].quantity > 1) {
//     inventory[itemInventoryIndex].quantity -= 1;
//   } else {
//     inventory.splice(itemInventoryIndex, 1);
//   }

//   return { inventory, equipments };
// }

// function updateInventoryWithItem(inventory, item, quantity = 1) {
//   const tempInventory = [...inventory];
//   // console.log("ada", tempInventory, item);
//   const itemInInventory = tempInventory.find(elem => {
//     return elem.item.key === item.key;
//   });
//   if (itemInInventory) {
//     // if item already exist in inventory
//     itemInInventory.quantity += quantity;
//   } else {
//     // if item doesn't exist in inventory
//     tempInventory.push({ item: item, quantity });
//   }
//   return tempInventory;
// }

// export function unequipItemAction(inventory, equipments, item) {
//   const newInventory = updateInventoryWithItem(inventory, item);

//   // remove item from equipments
//   delete equipments[item.equipment.position];

//   return { inventory: newInventory, equipments };
// }

// export function pickUpItemAction(inventory, item, quantity) {
//   const newInventory = updateInventoryWithItem(inventory, item, quantity);
//   return { inventory: newInventory };
// }
