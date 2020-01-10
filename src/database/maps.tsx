import MONSTERS from "./monsters";
import ITEMS, { RARITY } from "./items";

const MAPS = {
  SHOP: {
    name: "Shop",
    key: "SHOP",
    levelGuide: null,

    monsters: null
  },
  TRAINING_GROUND: {
    name: "Training Ground",
    key: "TRAINING_GROUND",
    levelGuide: "(Level 1-3)",
    monsters: [
      { monster: MONSTERS.CHICKEN.key, chanceOfAppear: 0.5 },
      { monster: MONSTERS.DUCK.key, chanceOfAppear: 0.5 },
      { monster: MONSTERS.PIG.key, chanceOfAppear: 0.3 },
      { monster: MONSTERS.COW.key, chanceOfAppear: 0.3 },
      { monster: MONSTERS.FARMER.key, chanceOfAppear: 0.1 }
    ],
    treasure: [
      {
        item: "COIN",
        rarity: RARITY.COMMON,
        quantity: { min: 1, max: 100 }
      },
      {
        item: "SMALL_HEALTH_POTIONS",
        rarity: RARITY.RARE,
        quantity: { min: 1, max: 2 }
      },
      {
        item: "MEDIUM_HEALTH_POTIONS",
        rarity: RARITY.EPIC,
        quantity: { min: 1, max: 2 }
      },
      {
        item: "WOODEN_SWORD",
        rarity: RARITY.RARE,
        quantity: { min: 1, max: 1 }
      },
      {
        item: "WOODEN_HELMET",
        rarity: RARITY.RARE,
        quantity: { min: 1, max: 1 }
      },
      {
        item: "WOODEN_PLATE_BODY",
        rarity: RARITY.RARE,
        quantity: { min: 1, max: 1 }
      },
      {
        item: "WOODEN_PLATE_LEGS",
        rarity: RARITY.RARE,
        quantity: { min: 1, max: 1 }
      },
      {
        item: "WOODEN_SPEAR",
        rarity: RARITY.RARE,
        quantity: { min: 1, max: 1 }
      },
      {
        item: "WOODEN_SHIELD",
        rarity: RARITY.EPIC,
        quantity: { min: 1, max: 1 }
      }
    ]
  },
  GOBLIN_WOODS: {
    name: "Goblin Woods",
    key: "GOBLIN_WOODS",
    levelGuide: "(Level 3-6)",
    monsters: []
  },
  DARK_FOREST: {
    name: "Dark Forest",
    key: "DARK_FOREST",
    levelGuide: "(Level 6-10)",
    monsters: []
  }
};

export default MAPS;
