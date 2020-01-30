import SHOP, { ShopItemInterface } from "../database/shop";
import {
  ShopDataInterface,
  ShopDataItemInterface
} from "../machines/GameMachine";
import { getRandomBooleanByProbability, getRandomNumByMinMax } from "./random";

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
