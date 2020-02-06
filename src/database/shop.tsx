import { ITEM, RARITY } from "./items";

export interface ShopItemInterface {
  key: ITEM;
  rarity: RARITY;
  price: {
    purchase: number;
    sell: number;
  };
  generatedStockLevel: {
    min: number;
    max: number;
  };
}

export interface ShopInterface {
  items: ShopItemInterface[];
}

export enum COMBAT_ITEM_PRICE {
  HELMET = 100,
  PLATE_BODY = 200,
  PLATE_LEGS = 200,
  SHIELD = 200,
  SWORD = 100,
  SPEAR = 200,
  BATTLE_AXE = 300
}

export enum MATERIAL_PRICE {
  WOOD = 1, // e.g. 100 gold
  BRONZE = 10, // e.g. 1k gold
  IRON = 40, // e.g. 4k gold
  STEEL = 100, // e.g. 10k gold
  MITHRIL = 1000, // e.g. 100k gold
  DRAGON = 10000 // e.g. 1m gold
}

const SHOP: ShopInterface = {
  items: [
    {
      key: ITEM.LOW_QUALITY_MEAT,
      rarity: RARITY.ALWAYS,
      price: { purchase: 10, sell: 5 },
      generatedStockLevel: { min: 500, max: 1000 }
    },
    {
      key: ITEM.HIGH_QUALITY_MEAT,
      rarity: RARITY.ALWAYS,
      price: { purchase: 30, sell: 15 },
      generatedStockLevel: { min: 500, max: 1000 }
    },
    {
      key: ITEM.SMALL_HEALTH_POTIONS,
      rarity: RARITY.ALWAYS,
      price: { purchase: 200, sell: 100 },
      generatedStockLevel: { min: 500, max: 1000 }
    },
    {
      key: ITEM.MEDIUM_HEALTH_POTIONS,
      rarity: RARITY.COMMON,
      price: { purchase: 350, sell: 200 },
      generatedStockLevel: { min: 500, max: 1000 }
    },
    {
      key: ITEM.LARGE_HEALTH_POTIONS,
      rarity: RARITY.COMMON,
      price: { purchase: 500, sell: 300 },
      generatedStockLevel: { min: 500, max: 1000 }
    },
    {
      key: ITEM.GREAT_HEALTH_POTIONS,
      rarity: RARITY.RARE,
      price: { purchase: 1000, sell: 500 },
      generatedStockLevel: { min: 500, max: 1000 }
    },
    {
      key: ITEM.WOODEN_HELMET,
      rarity: RARITY.ALWAYS,
      price: {
        purchase: COMBAT_ITEM_PRICE.HELMET * MATERIAL_PRICE.WOOD,
        sell: (COMBAT_ITEM_PRICE.HELMET * MATERIAL_PRICE.WOOD) / 2
      },
      generatedStockLevel: { min: 1, max: 10 }
    },
    {
      key: ITEM.WOODEN_PLATE_BODY,
      rarity: RARITY.ALWAYS,
      price: {
        purchase: COMBAT_ITEM_PRICE.PLATE_BODY * MATERIAL_PRICE.WOOD,
        sell: (COMBAT_ITEM_PRICE.PLATE_BODY * MATERIAL_PRICE.WOOD) / 2
      },
      generatedStockLevel: { min: 1, max: 10 }
    },
    {
      key: ITEM.WOODEN_PLATE_LEGS,
      rarity: RARITY.ALWAYS,
      price: {
        purchase: COMBAT_ITEM_PRICE.PLATE_LEGS * MATERIAL_PRICE.WOOD,
        sell: (COMBAT_ITEM_PRICE.PLATE_LEGS * MATERIAL_PRICE.WOOD) / 2
      },
      generatedStockLevel: { min: 1, max: 10 }
    },
    {
      key: ITEM.WOODEN_SHIELD,
      rarity: RARITY.ALWAYS,
      price: {
        purchase: COMBAT_ITEM_PRICE.SHIELD * MATERIAL_PRICE.WOOD,
        sell: (COMBAT_ITEM_PRICE.SHIELD * MATERIAL_PRICE.WOOD) / 2
      },
      generatedStockLevel: { min: 1, max: 10 }
    },
    {
      key: ITEM.WOODEN_SWORD,
      rarity: RARITY.ALWAYS,
      price: {
        purchase: COMBAT_ITEM_PRICE.SWORD * MATERIAL_PRICE.WOOD,
        sell: (COMBAT_ITEM_PRICE.SWORD * MATERIAL_PRICE.WOOD) / 2
      },
      generatedStockLevel: { min: 1, max: 10 }
    },
    {
      key: ITEM.WOODEN_SPEAR,
      rarity: RARITY.ALWAYS,
      price: {
        purchase: COMBAT_ITEM_PRICE.SPEAR * MATERIAL_PRICE.WOOD,
        sell: (COMBAT_ITEM_PRICE.SPEAR * MATERIAL_PRICE.WOOD) / 2
      },
      generatedStockLevel: { min: 1, max: 10 }
    },
    {
      key: ITEM.BRONZE_HELMET,
      rarity: RARITY.ALWAYS,
      price: {
        purchase: COMBAT_ITEM_PRICE.HELMET * MATERIAL_PRICE.BRONZE,
        sell: (COMBAT_ITEM_PRICE.HELMET * MATERIAL_PRICE.BRONZE) / 2
      },
      generatedStockLevel: { min: 1, max: 5 }
    },
    {
      key: ITEM.BRONZE_PLATE_BODY,
      rarity: RARITY.ALWAYS,
      price: {
        purchase: COMBAT_ITEM_PRICE.PLATE_BODY * MATERIAL_PRICE.BRONZE,
        sell: (COMBAT_ITEM_PRICE.PLATE_BODY * MATERIAL_PRICE.BRONZE) / 2
      },
      generatedStockLevel: { min: 1, max: 5 }
    },
    {
      key: ITEM.BRONZE_PLATE_LEGS,
      rarity: RARITY.ALWAYS,
      price: {
        purchase: COMBAT_ITEM_PRICE.PLATE_LEGS * MATERIAL_PRICE.BRONZE,
        sell: (COMBAT_ITEM_PRICE.PLATE_LEGS * MATERIAL_PRICE.BRONZE) / 2
      },
      generatedStockLevel: { min: 1, max: 5 }
    },
    {
      key: ITEM.BRONZE_SHIELD,
      rarity: RARITY.ALWAYS,
      price: {
        purchase: COMBAT_ITEM_PRICE.SHIELD * MATERIAL_PRICE.BRONZE,
        sell: (COMBAT_ITEM_PRICE.SHIELD * MATERIAL_PRICE.BRONZE) / 2
      },
      generatedStockLevel: { min: 1, max: 5 }
    },
    {
      key: ITEM.BRONZE_SWORD,
      rarity: RARITY.ALWAYS,
      price: {
        purchase: COMBAT_ITEM_PRICE.SWORD * MATERIAL_PRICE.BRONZE,
        sell: (COMBAT_ITEM_PRICE.SWORD * MATERIAL_PRICE.BRONZE) / 2
      },
      generatedStockLevel: { min: 1, max: 5 }
    },
    {
      key: ITEM.BRONZE_BATTLE_AXE,
      rarity: RARITY.ALWAYS,
      price: {
        purchase: COMBAT_ITEM_PRICE.BATTLE_AXE * MATERIAL_PRICE.BRONZE,
        sell: (COMBAT_ITEM_PRICE.BATTLE_AXE * MATERIAL_PRICE.BRONZE) / 2
      },
      generatedStockLevel: { min: 1, max: 5 }
    },
    {
      key: ITEM.BRONZE_SPEAR,
      rarity: RARITY.ALWAYS,
      price: {
        purchase: COMBAT_ITEM_PRICE.SPEAR * MATERIAL_PRICE.BRONZE,
        sell: (COMBAT_ITEM_PRICE.SPEAR * MATERIAL_PRICE.BRONZE) / 2
      },
      generatedStockLevel: { min: 1, max: 5 }
    },
    {
      key: ITEM.IRON_HELMET,
      rarity: RARITY.ALWAYS,
      price: {
        purchase: COMBAT_ITEM_PRICE.HELMET * MATERIAL_PRICE.IRON,
        sell: (COMBAT_ITEM_PRICE.HELMET * MATERIAL_PRICE.IRON) / 2
      },
      generatedStockLevel: { min: 1, max: 5 }
    },
    {
      key: ITEM.IRON_PLATE_BODY,
      rarity: RARITY.ALWAYS,
      price: {
        purchase: COMBAT_ITEM_PRICE.PLATE_BODY * MATERIAL_PRICE.IRON,
        sell: (COMBAT_ITEM_PRICE.PLATE_BODY * MATERIAL_PRICE.IRON) / 2
      },
      generatedStockLevel: { min: 1, max: 5 }
    },
    {
      key: ITEM.IRON_PLATE_LEGS,
      rarity: RARITY.ALWAYS,
      price: {
        purchase: COMBAT_ITEM_PRICE.PLATE_LEGS * MATERIAL_PRICE.IRON,
        sell: (COMBAT_ITEM_PRICE.PLATE_LEGS * MATERIAL_PRICE.IRON) / 2
      },
      generatedStockLevel: { min: 1, max: 5 }
    },
    {
      key: ITEM.IRON_SHIELD,
      rarity: RARITY.ALWAYS,
      price: {
        purchase: COMBAT_ITEM_PRICE.SHIELD * MATERIAL_PRICE.IRON,
        sell: (COMBAT_ITEM_PRICE.SHIELD * MATERIAL_PRICE.IRON) / 2
      },
      generatedStockLevel: { min: 1, max: 5 }
    },
    {
      key: ITEM.IRON_SWORD,
      rarity: RARITY.ALWAYS,
      price: {
        purchase: COMBAT_ITEM_PRICE.SWORD * MATERIAL_PRICE.IRON,
        sell: (COMBAT_ITEM_PRICE.SWORD * MATERIAL_PRICE.IRON) / 2
      },
      generatedStockLevel: { min: 1, max: 5 }
    },
    {
      key: ITEM.IRON_BATTLE_AXE,
      rarity: RARITY.ALWAYS,
      price: {
        purchase: COMBAT_ITEM_PRICE.BATTLE_AXE * MATERIAL_PRICE.IRON,
        sell: (COMBAT_ITEM_PRICE.BATTLE_AXE * MATERIAL_PRICE.IRON) / 2
      },
      generatedStockLevel: { min: 1, max: 5 }
    },
    {
      key: ITEM.IRON_SPEAR,
      rarity: RARITY.ALWAYS,
      price: {
        purchase: COMBAT_ITEM_PRICE.SPEAR * MATERIAL_PRICE.IRON,
        sell: (COMBAT_ITEM_PRICE.SPEAR * MATERIAL_PRICE.IRON) / 2
      },
      generatedStockLevel: { min: 1, max: 5 }
    }
  ]
};

export default SHOP;
