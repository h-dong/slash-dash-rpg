import SHOP, { ShopItemInterface } from "../database/shop";
import {
  ShopDataInterface,
  ShopDataItemInterface,
  InventoryItemInterface
} from "../machines/GameMachine";
import { getRandomBooleanByProbability, getRandomNumByMinMax } from "./random";
import { ITEM } from "../database/items";

export function generateShopItems(): ShopDataInterface {
  const possibleStocks = SHOP.items;
  const items: ShopDataItemInterface[] = possibleStocks
    .filter((elem: ShopItemInterface) =>
      getRandomBooleanByProbability(elem.rarity)
    )
    .map(
      (elem: ShopItemInterface): ShopDataItemInterface => ({
        key: elem.key,
        quantity: getRandomNumByMinMax(
          elem.generatedStockLevel.min,
          elem.generatedStockLevel.max
        )
      })
    );

  return {
    date: new Date(),
    items
  };
}

export function toNumberWithUnits(price: number): string {
  if (price >= 1000000) return `${Math.floor(price / 1000000)}m`;
  if (price >= 1000) return `${Math.floor(price / 1000)}k`;
  return price.toString();
}

export function canAffordItem(
  inventory: InventoryItemInterface[],
  itemKey: ITEM
) {
  const coinInInventory = inventory.find(elem => (elem.itemKey = ITEM.COIN));
  const itemPrice = SHOP.items.find(elem => elem.key === itemKey);
  if (!coinInInventory || !itemPrice) return false;
  return coinInInventory.quantity >= itemPrice.price.purchase;
}
