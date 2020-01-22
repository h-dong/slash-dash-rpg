import { MONSTERS } from "./monsters";
import { RARITY, ITEMS } from "./items";

export enum MAPS {
  INN = "INN",
  FARM = "FARM",
  GOBLIN_WOODS = "GOBLIN_WOODS",
  DARK_FOREST = "DARK_FOREST"
}

export interface TreasureInterface {
  itemKey: ITEMS;
  rarity: RARITY;
  quantity: {
    min: number;
    max: number;
  };
}

export interface MapMonsterInterface {
  monsterKey: MONSTERS;
  chanceOfAppear: number;
}

export interface MapInterface {
  name: string;
  key: MAPS;
  levelGuide?: string;
  monsters?: MapMonsterInterface[];
  treasure?: TreasureInterface[];
}

const FULL_MAPS: MapInterface[] = [
  {
    name: "Lion's Pride Inn",
    key: MAPS.INN
  },
  {
    name: "Farm",
    key: MAPS.FARM,
    levelGuide: "(level 1-3)",
    monsters: [
      { monsterKey: MONSTERS.CHICKEN, chanceOfAppear: 0.5 },
      { monsterKey: MONSTERS.DUCK, chanceOfAppear: 0.5 },
      { monsterKey: MONSTERS.PIG, chanceOfAppear: 0.3 },
      { monsterKey: MONSTERS.COW, chanceOfAppear: 0.3 },
      { monsterKey: MONSTERS.FARMER, chanceOfAppear: 0.2 }
    ],
    treasure: [
      {
        itemKey: ITEMS.COIN,
        rarity: RARITY.COMMON,
        quantity: { min: 1, max: 20 }
      },
      {
        itemKey: ITEMS.SMALL_HEALTH_POTIONS,
        rarity: RARITY.RARE,
        quantity: { min: 1, max: 2 }
      },
      {
        itemKey: ITEMS.MEDIUM_HEALTH_POTIONS,
        rarity: RARITY.EPIC,
        quantity: { min: 1, max: 2 }
      },
      {
        itemKey: ITEMS.WOODEN_SWORD,
        rarity: RARITY.RARE,
        quantity: { min: 1, max: 1 }
      },
      {
        itemKey: ITEMS.WOODEN_HELMET,
        rarity: RARITY.RARE,
        quantity: { min: 1, max: 1 }
      },
      {
        itemKey: ITEMS.WOODEN_PLATE_BODY,
        rarity: RARITY.RARE,
        quantity: { min: 1, max: 1 }
      },
      {
        itemKey: ITEMS.WOODEN_PLATE_LEGS,
        rarity: RARITY.RARE,
        quantity: { min: 1, max: 1 }
      },
      {
        itemKey: ITEMS.WOODEN_SPEAR,
        rarity: RARITY.RARE,
        quantity: { min: 1, max: 1 }
      },
      {
        itemKey: ITEMS.WOODEN_SHIELD,
        rarity: RARITY.EPIC,
        quantity: { min: 1, max: 1 }
      }
    ]
  },
  {
    name: "Goblin Woods",
    key: MAPS.GOBLIN_WOODS,
    levelGuide: "(level 3-6)",
    monsters: [
      { monsterKey: MONSTERS.GOBLIN, chanceOfAppear: 0.8 },
      { monsterKey: MONSTERS.GOBLIN_GUARD, chanceOfAppear: 0.6 },
      { monsterKey: MONSTERS.GOBLIN_SOLDIER, chanceOfAppear: 0.4 }
    ],
    treasure: [
      {
        itemKey: ITEMS.COIN,
        rarity: RARITY.COMMON,
        quantity: { min: 10, max: 50 }
      },
      {
        itemKey: ITEMS.SMALL_HEALTH_POTIONS,
        rarity: RARITY.RARE,
        quantity: { min: 1, max: 3 }
      },
      {
        itemKey: ITEMS.MEDIUM_HEALTH_POTIONS,
        rarity: RARITY.RARE,
        quantity: { min: 1, max: 1 }
      },
      {
        itemKey: ITEMS.LARGE_HEALTH_POTIONS,
        rarity: RARITY.EPIC,
        quantity: { min: 1, max: 1 }
      },
      {
        itemKey: ITEMS.WOODEN_SWORD,
        rarity: RARITY.RARE,
        quantity: { min: 1, max: 1 }
      },
      {
        itemKey: ITEMS.WOODEN_HELMET,
        rarity: RARITY.RARE,
        quantity: { min: 1, max: 1 }
      },
      {
        itemKey: ITEMS.WOODEN_PLATE_BODY,
        rarity: RARITY.RARE,
        quantity: { min: 1, max: 1 }
      },
      {
        itemKey: ITEMS.WOODEN_PLATE_LEGS,
        rarity: RARITY.RARE,
        quantity: { min: 1, max: 1 }
      },
      {
        itemKey: ITEMS.WOODEN_SPEAR,
        rarity: RARITY.RARE,
        quantity: { min: 1, max: 1 }
      },
      {
        itemKey: ITEMS.WOODEN_SHIELD,
        rarity: RARITY.RARE,
        quantity: { min: 1, max: 1 }
      },
      {
        itemKey: ITEMS.BRONZE_SPEAR,
        rarity: RARITY.RARE,
        quantity: { min: 1, max: 1 }
      },
      {
        itemKey: ITEMS.BRONZE_PLATE_BODY,
        rarity: RARITY.RARE,
        quantity: { min: 1, max: 1 }
      },
      {
        itemKey: ITEMS.BRONZE_SWORD,
        rarity: RARITY.RARE,
        quantity: { min: 1, max: 1 }
      },
      {
        itemKey: ITEMS.BRONZE_PLATE_LEGS,
        rarity: RARITY.RARE,
        quantity: { min: 1, max: 1 }
      },
      {
        itemKey: ITEMS.BRONZE_BATTLE_AXE,
        rarity: RARITY.RARE,
        quantity: { min: 1, max: 1 }
      },
      {
        itemKey: ITEMS.BRONZE_SHIELD,
        rarity: RARITY.RARE,
        quantity: { min: 1, max: 1 }
      },
      {
        itemKey: ITEMS.BRONZE_HELMET,
        rarity: RARITY.RARE,
        quantity: { min: 1, max: 1 }
      }
    ]
  },
  {
    name: "Dark Forest",
    key: MAPS.DARK_FOREST,
    levelGuide: "(level 6-10)",
    monsters: []
  }
];

export default FULL_MAPS;
