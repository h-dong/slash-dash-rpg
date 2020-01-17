import { WEAR_POSITION, ItemInterface, ITEMS } from "../database/items";
import {
  EquipmentsInterface,
  InventoryItemInterface
} from "../machines/GameMachine";
import { getItemByKey } from "./itemHelper";

// export const ITEM_ACTIONS = {
//   EQUIP: "Equip",
//   UNEQUIP: "Unequip",
//   EXAMINE: "Examine"
// };

export interface EquipmentItemActionInterface {
  type: string;
  itemKey: ITEMS;
}

export interface InventoryItemActionInterface {
  type: string;
  order: number;
  itemKey: ITEMS;
}

export function getInventoryItemActions(
  fullItem: ItemInterface
): InventoryItemActionInterface[] {
  const actions: InventoryItemActionInterface[] = [];
  if (fullItem) {
    actions.push({
      type: "EXAMINE_ITEM",
      order: 2,
      itemKey: fullItem.key
    });
    if (fullItem.equipment) {
      actions.push({
        type: "EQUIP_ITEM",
        order: 1,
        itemKey: fullItem.key
      });
    }
  }
  return actions;
}

export function getEquippedItemActions(
  itemKey: ITEMS
): EquipmentItemActionInterface[] {
  return [
    {
      type: "UNEQUIP_ITEM",
      itemKey
    }
  ];
}

export function moveEquipmentItemToInventory(
  equipments: EquipmentsInterface,
  inventory: InventoryItemInterface[],
  itemKey: ITEMS
): { equipments: EquipmentsInterface; inventory: InventoryItemInterface[] } {
  return {
    equipments: removeItemFromEquipment({ ...equipments }, itemKey),
    inventory: addItemToInventory([...inventory], itemKey, 1)
  };
}

export function moveInventoryItemToEquipment(
  equipments: EquipmentsInterface,
  inventory: InventoryItemInterface[],
  itemKey: ITEMS
) {
  const fullItem = getItemByKey(itemKey);
  let newEquipments = { ...equipments };
  let newInventory = [...inventory];

  if (fullItem?.equipment) {
    const itemKeyToUnequip: ITEMS[] = calcEquipToTakeOff(
      newEquipments,
      itemKey
    );

    itemKeyToUnequip.forEach(id => {
      newInventory = addItemToInventory(newInventory, id, 1);
      newEquipments = removeItemFromEquipment(newEquipments, id);
    });

    newEquipments = addItemToEquipment(newEquipments, itemKey);
    newInventory = removeItemFromInventory(newInventory, itemKey);
  }

  return { equipments: newEquipments, inventory: newInventory };
}

function addItemToEquipment(equipments: EquipmentsInterface, itemKey: ITEMS) {
  const newEquipments = { ...equipments };
  const fullItem = getItemByKey(itemKey);

  if (fullItem?.equipment?.position)
    newEquipments[fullItem?.equipment?.position] = itemKey;

  return newEquipments;
}

function removeItemFromEquipment(
  equipments: EquipmentsInterface,
  itemKey: ITEMS
) {
  const newEquipments = { ...equipments };
  const fullItem = getItemByKey(itemKey);

  if (fullItem?.equipment?.position)
    delete newEquipments[fullItem.equipment.position];

  return newEquipments;
}

export function addItemToInventory(
  inventory: InventoryItemInterface[],
  itemKey: ITEMS,
  itemQuantity: number
) {
  const newInventory = [...inventory];
  const itemInInventory = newInventory.find(item => item.itemKey === itemKey);

  itemInInventory
    ? (itemInInventory.quantity += itemQuantity)
    : newInventory.push({ itemKey, quantity: itemQuantity });

  return newInventory;
}

function removeItemFromInventory(
  inventory: InventoryItemInterface[],
  itemKey: ITEMS
) {
  const newInventory = [...inventory];
  const inventoryItem = newInventory.find(item => item.itemKey === itemKey);

  if (inventoryItem) {
    if (inventoryItem.quantity > 1) {
      // remove quality by 1
      inventoryItem.quantity -= 1;
    } else {
      // remove item completely from Inventory
      const index = newInventory.findIndex(item => item.itemKey === itemKey);
      newInventory.splice(index, 1);
    }
  }

  return newInventory;
}

function calcEquipToTakeOff(
  equipments: EquipmentsInterface,
  itemKey: ITEMS
): ITEMS[] {
  const fullItem = getItemByKey(itemKey);

  if (!fullItem?.equipment) return [];

  const {
    position: positionToEquip,
    requirements: requirementsToEquip
  } = fullItem.equipment;

  const equipmentInPositionToEquip = equipments[positionToEquip];
  const itemInPosition = equipmentInPositionToEquip
    ? getItemByKey(equipmentInPositionToEquip)
    : null;

  // when equiping an off hand item, unequip current two handed weapon
  if (positionToEquip === WEAR_POSITION.OFF_HAND) {
    const currentMainHand: ItemInterface | null =
      getItemByKey(equipments[WEAR_POSITION.MAIN_HAND]) || null;

    if (currentMainHand) {
      const requirements = currentMainHand?.equipment?.requirements;
      if (requirements?.twoHanded) return [currentMainHand.key];
    }
  }

  if (positionToEquip === WEAR_POSITION.MAIN_HAND && requirementsToEquip) {
    const { twoHanded } = requirementsToEquip;
    if (twoHanded) {
      const currentMainHand: ItemInterface | null =
        getItemByKey(equipments[WEAR_POSITION.MAIN_HAND]) || null;
      const currentOffHand: ItemInterface | null =
        getItemByKey(equipments[WEAR_POSITION.OFF_HAND]) || null;
      const itemsToUnequip: ITEMS[] = [];
      [currentMainHand, currentOffHand].forEach(elem => {
        if (elem?.key) {
          itemsToUnequip.push(elem.key);
        }
      });
      return itemsToUnequip;
    }
  }

  // if nothing is equipped return [], else return array with key
  return !itemInPosition ? [] : [itemInPosition.key];
}
