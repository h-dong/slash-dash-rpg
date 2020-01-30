import FULL_ITEMS, {
  WEAR_POSITION,
  ItemInterface,
  ITEM
} from "../database/items";
import {
  EquipmentsInterface,
  InventoryItemInterface,
  WorldDropsInterface,
  ShopDataItemInterface
} from "../machines/GameMachine";
import { getItemByKey } from "./itemHelper";
import { getRandomNumByMinMax } from "./random";
import SHOP from "../database/shop";

export interface EquipmentItemActionInterface {
  type: string;
  itemKey: ITEM;
}

export interface InventoryItemActionInterface {
  type: string;
  order: number;
  itemKey: ITEM;
}

export function getInventoryItemActions(
  fullItem: ItemInterface,
  inShop: boolean
): InventoryItemActionInterface[] {
  const actions: InventoryItemActionInterface[] = [];
  if (fullItem) {
    actions.push({
      type: "EXAMINE_ITEM",
      order: 4,
      itemKey: fullItem.key
    });
    actions.push({
      type: "DROP_ITEM",
      order: 3,
      itemKey: fullItem.key
    });
    if (fullItem.equipment) {
      actions.push({
        type: "EQUIP_ITEM",
        order: 2,
        itemKey: fullItem.key
      });
    }
    if (fullItem.food) {
      actions.push({
        type: "CONSUME_FOOD",
        order: 2,
        itemKey: fullItem.key
      });
    }
    if (inShop) {
      actions.push({
        type: "SELL_ITEM",
        order: 1,
        itemKey: fullItem.key
      });
    }
  }
  return actions;
}

export function getEquippedItemActions(
  itemKey: ITEM
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
  itemKey: ITEM
): { equipments: EquipmentsInterface; inventory: InventoryItemInterface[] } {
  return {
    equipments: removeItemFromEquipment({ ...equipments }, itemKey),
    inventory: addItemToInventory([...inventory], itemKey, 1)
  };
}

export function moveInventoryItemToEquipment(
  equipments: EquipmentsInterface,
  inventory: InventoryItemInterface[],
  itemKey: ITEM
) {
  const fullItem = getItemByKey(itemKey);
  let newEquipments = { ...equipments };
  let newInventory = [...inventory];

  if (fullItem?.equipment) {
    const itemKeyToUnequip: ITEM[] = calcEquipToTakeOff(newEquipments, itemKey);

    itemKeyToUnequip.forEach(id => {
      newInventory = addItemToInventory(newInventory, id, 1);
      newEquipments = removeItemFromEquipment(newEquipments, id);
    });

    newEquipments = addItemToEquipment(newEquipments, itemKey);
    newInventory = removeItemFromInventory(newInventory, itemKey);
  }

  return { equipments: newEquipments, inventory: newInventory };
}

function addItemToEquipment(equipments: EquipmentsInterface, itemKey: ITEM) {
  const newEquipments = { ...equipments };
  const fullItem = getItemByKey(itemKey);

  if (fullItem?.equipment?.position)
    newEquipments[fullItem?.equipment?.position] = itemKey;

  return newEquipments;
}

function removeItemFromEquipment(
  equipments: EquipmentsInterface,
  itemKey: ITEM
) {
  const newEquipments = { ...equipments };
  const fullItem = getItemByKey(itemKey);

  if (fullItem?.equipment?.position)
    delete newEquipments[fullItem.equipment.position];

  return newEquipments;
}

export function sellItemFromInventory(
  inventory: InventoryItemInterface[],
  itemKey: ITEM
): InventoryItemInterface[] {
  const newInventory = [...inventory];
  const shopItem = SHOP.items.find(elem => elem.key === itemKey);
  const sellPrice = shopItem ? shopItem.price.sell : 0;
  const inventoryMinusItem = removeItemFromInventory(newInventory, itemKey);
  const inventoryPlusCoins = addItemToInventory(
    inventoryMinusItem,
    ITEM.COIN,
    sellPrice
  );
  return inventoryPlusCoins;
}

export function addItemToInventory(
  inventory: InventoryItemInterface[],
  itemKey: ITEM,
  itemQuantity: number
): InventoryItemInterface[] {
  const newInventory = [...inventory];
  const itemInInventory = newInventory.find(item => item.itemKey === itemKey);

  itemInInventory
    ? (itemInInventory.quantity += itemQuantity)
    : newInventory.push({ itemKey, quantity: itemQuantity });

  return newInventory;
}

export function removeItemFromInventory(
  inventory: InventoryItemInterface[],
  itemKey: ITEM
) {
  const newInventory = [...inventory];
  const inventoryItem = newInventory.find(item => item.itemKey === itemKey);

  if (inventoryItem) {
    if (inventoryItem.quantity > 1) {
      // remove quantity by 1
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
  itemKey: ITEM
): ITEM[] {
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
      const itemsToUnequip: ITEM[] = [];
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

export function addItemToDrops(
  drops: WorldDropsInterface[],
  dropToAdd: WorldDropsInterface
): WorldDropsInterface[] {
  const newDrops = [...drops];
  const index = newDrops.findIndex(elem => elem.itemKey === dropToAdd.itemKey);
  if (index !== -1) {
    newDrops[index].quantity += dropToAdd.quantity;
  } else {
    newDrops.push(dropToAdd);
  }
  return newDrops;
}

export function consumeInventoryFood(
  inventory: InventoryItemInterface[],
  itemKey: ITEM
): InventoryItemInterface[] {
  let newInventory = [...inventory];
  const index = newInventory.findIndex(elem => elem.itemKey === itemKey);

  if (newInventory[index].quantity > 1) {
    newInventory[index].quantity -= 1;
  } else {
    newInventory = newInventory.filter(elem => elem.itemKey !== itemKey);
  }
  return newInventory;
}

export function addItemToShop(
  itemsInShop: ShopDataItemInterface[],
  itemKey: ITEM,
  quantity: number
): ShopDataItemInterface[] {
  let newShopItems = [...itemsInShop];
  const index = newShopItems.findIndex(elem => elem.key === itemKey);
  if (newShopItems[index].quantity > 1) {
    newShopItems[index].quantity += quantity;
  } else {
    newShopItems.push({
      key: itemKey,
      quantity
    });
  }
  return newShopItems;
}

export function getHealAmountByItemKey(
  maxHealth: number,
  itemKey: ITEM
): number {
  const healStats = FULL_ITEMS.find(elem => elem.key === itemKey)?.food?.heal;

  if (healStats?.percentage) {
    return Math.floor(maxHealth * healStats.percentage);
  } else if (healStats?.min && healStats?.max) {
    return getRandomNumByMinMax(healStats.min, healStats.max);
  }

  return 0;
}

export function loseRandomInventoryOnDeath(
  inventory: InventoryItemInterface[]
): InventoryItemInterface[] {
  const newInventory: InventoryItemInterface[] = [];
  inventory.forEach(elem => {
    const itemsLeft = getRandomNumByMinMax(0, elem.quantity);
    if (itemsLeft > 0) {
      newInventory.push({
        itemKey: elem.itemKey,
        quantity: itemsLeft
      });
    }
  });
  return newInventory;
}
