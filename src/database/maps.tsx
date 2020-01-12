import MONSTERS from "./monsters";
import { RARITY, ITEMS } from "./items";

export enum MAPS {
  SHOP = "SHOP",
  TRAINING_GROUND = "TRAINING_GROUND",
  GOBLIN_WOODS = "GOBLIN_WOODS",
  DARK_FOREST = "DARK_FOREST"
}

interface TreasureInterface {
  item: string;
  rarity: RARITY;
  quantity: {
    min: number;
    max: number;
  };
}

interface MapMonsterInterface {
  monster: string;
  chanceOfAppear: number;
}

interface MapInterface {
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
    levelGuide: "(Recommended level 1-3)",
    monsters: [
      { monster: MONSTERS.CHICKEN.key, chanceOfAppear: 0.5 },
      { monster: MONSTERS.DUCK.key, chanceOfAppear: 0.5 },
      { monster: MONSTERS.PIG.key, chanceOfAppear: 0.3 },
      { monster: MONSTERS.COW.key, chanceOfAppear: 0.3 },
      { monster: MONSTERS.FARMER.key, chanceOfAppear: 0.1 }
    ],
    treasure: [
      {
        item: ITEMS.COIN,
        rarity: RARITY.COMMON,
        quantity: { min: 1, max: 100 }
      },
      {
        item: ITEMS.SMALL_HEALTH_POTIONS,
        rarity: RARITY.RARE,
        quantity: { min: 1, max: 2 }
      },
      {
        item: ITEMS.MEDIUM_HEALTH_POTIONS,
        rarity: RARITY.EPIC,
        quantity: { min: 1, max: 2 }
      },
      {
        item: ITEMS.WOODEN_SWORD,
        rarity: RARITY.RARE,
        quantity: { min: 1, max: 1 }
      },
      {
        item: ITEMS.WOODEN_HELMET,
        rarity: RARITY.RARE,
        quantity: { min: 1, max: 1 }
      },
      {
        item: ITEMS.WOODEN_PLATE_BODY,
        rarity: RARITY.RARE,
        quantity: { min: 1, max: 1 }
      },
      {
        item: ITEMS.WOODEN_PLATE_LEGS,
        rarity: RARITY.RARE,
        quantity: { min: 1, max: 1 }
      },
      {
        item: ITEMS.WOODEN_SPEAR,
        rarity: RARITY.RARE,
        quantity: { min: 1, max: 1 }
      },
      {
        item: ITEMS.WOODEN_SHIELD,
        rarity: RARITY.EPIC,
        quantity: { min: 1, max: 1 }
      }
    ]
  },
  {
    name: "Goblin Woods",
    key: MAPS.GOBLIN_WOODS,
    levelGuide: "(Recommended level 3-6)",
    monsters: []
  },
  {
    name: "Dark Forest",
    key: MAPS.DARK_FOREST,
    levelGuide: "(Recommended level 6-10)",
    monsters: []
  }
];

export default FULL_MAPS;
