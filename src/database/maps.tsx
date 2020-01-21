import { MONSTERS } from "./monsters";
import { RARITY, ITEMS } from "./items";

export enum MAPS {
  SHOP = "SHOP",
  TRAINING_GROUND = "TRAINING_GROUND",
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
    name: "Shop",
    key: MAPS.SHOP
  },
  {
    name: "Training Ground",
    key: MAPS.TRAINING_GROUND,
    levelGuide: "(level 1-3)",
    monsters: [
      { monsterKey: MONSTERS.CHICKEN, chanceOfAppear: 0.5 },
      { monsterKey: MONSTERS.DUCK, chanceOfAppear: 0.5 },
      { monsterKey: MONSTERS.PIG, chanceOfAppear: 0.3 },
      { monsterKey: MONSTERS.COW, chanceOfAppear: 0.3 },
      { monsterKey: MONSTERS.FARMER, chanceOfAppear: 0.1 }
    ],
    treasure: [
      {
        itemKey: ITEMS.COIN,
        rarity: RARITY.COMMON,
        quantity: { min: 1, max: 100 }
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
    monsters: []
  },
  {
    name: "Dark Forest",
    key: MAPS.DARK_FOREST,
    levelGuide: "(level 6-10)",
    monsters: []
  }
];

export default FULL_MAPS;
