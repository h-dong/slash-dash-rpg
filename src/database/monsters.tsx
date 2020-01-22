import { RARITY, ITEMS } from "./items";

// https://oldschoolrunescape.fandom.com/wiki/Goblin_Champion
// dark forest 1 - 20
// Rabbit L1
// Monkey L1
// Snake L2
// Giant Rat L3
// goblin soldier L6
// human hunter L10
// Bear L8
// Giant spider L9
// goblin captain L10 // https://vignette.wikia.nocookie.net/2007scape/images/0/04/Goblin_Champion.png/revision/latest?cb=20160603225208
// Skeleton L10
// Skeleton Warrior L15
// Skeleton Mage L15
// Young Troll L15
// Troll L18
// Unicorn L20

export interface MonsterDropInterface {
  itemKey: ITEMS;
  rarity: RARITY;
  quantity: {
    min: number;
    max: number;
  };
}

export interface FullMonsterInterface {
  key: MONSTERS;
  name: string;
  icon: string;
  description: string;
  level: number;
  drops: MonsterDropInterface[];
}

export enum MONSTERS {
  CHICKEN = "CHICKEN",
  DUCK = "DUCK",
  PIG = "PIG",
  COW = "COW",
  FARMER = "FARMER",
  GOBLIN = "GOBLIN",
  GOBLIN_GUARD = "GOBLIN_GUARD",
  GOBLIN_SOLDIER = "GOBLIN_SOLDIER"
}

const FULL_MONSTERS: FullMonsterInterface[] = [
  {
    key: MONSTERS.CHICKEN,
    name: "Chicken",
    icon:
      "https://vignette.wikia.nocookie.net/2007scape/images/a/a3/Chicken.png/revision/latest?cb=20161207181258",
    description: "Yep. Definitely a chicken.",
    level: 1,
    drops: [
      {
        itemKey: ITEMS.LOW_QUALITY_MEAT,
        rarity: RARITY.ALWAYS,
        quantity: { min: 1, max: 1 }
      }
    ]
  },
  {
    key: MONSTERS.DUCK,
    name: "Duck",
    icon:
      "https://vignette.wikia.nocookie.net/2007scape/images/3/38/Duck.png/revision/latest?cb=20150905042847",
    description: "Waddle waddle waddle quack.",
    level: 1,
    drops: [
      {
        itemKey: ITEMS.LOW_QUALITY_MEAT,
        rarity: RARITY.ALWAYS,
        quantity: { min: 1, max: 1 }
      }
    ]
  },
  {
    key: MONSTERS.PIG,
    name: "Pig",
    icon:
      "https://vignette.wikia.nocookie.net/2007scape/images/3/30/Pig.png/revision/latest/scale-to-width-down/700?cb=20180303064642",
    description: "Swine",
    level: 2,
    drops: [
      {
        itemKey: ITEMS.HIGH_QUALITY_MEAT,
        rarity: RARITY.ALWAYS,
        quantity: { min: 1, max: 1 }
      }
    ]
  },
  {
    key: MONSTERS.COW,
    name: "Cow",
    icon:
      "https://vignette.wikia.nocookie.net/2007scape/images/8/84/Cow.png/revision/latest/scale-to-width-down/700?cb=20160613020452",
    description: "Converts grass to beef",
    level: 2,
    drops: [
      {
        itemKey: ITEMS.HIGH_QUALITY_MEAT,
        rarity: RARITY.ALWAYS,
        quantity: { min: 1, max: 1 }
      }
    ]
  },
  {
    key: MONSTERS.FARMER,
    name: "Farmer",
    icon:
      "https://vignette.wikia.nocookie.net/2007scape/images/3/3d/Farmer.png/revision/latest?cb=20170225131827",
    description: "He grows the crops in this area",
    level: 3,
    drops: [
      {
        itemKey: ITEMS.COIN,
        rarity: RARITY.ALWAYS,
        quantity: { min: 10, max: 50 }
      },
      {
        itemKey: ITEMS.SMALL_HEALTH_POTIONS,
        rarity: RARITY.COMMON,
        quantity: { min: 1, max: 2 }
      },
      {
        itemKey: ITEMS.WOODEN_HELMET,
        rarity: RARITY.COMMON,
        quantity: { min: 1, max: 1 }
      },
      {
        itemKey: ITEMS.WOODEN_PLATE_BODY,
        rarity: RARITY.COMMON,
        quantity: { min: 1, max: 1 }
      },
      {
        itemKey: ITEMS.WOODEN_PLATE_LEGS,
        rarity: RARITY.COMMON,
        quantity: { min: 1, max: 1 }
      },
      {
        itemKey: ITEMS.WOODEN_SWORD,
        rarity: RARITY.COMMON,
        quantity: { min: 1, max: 1 }
      },
      {
        itemKey: ITEMS.WOODEN_SHIELD,
        rarity: RARITY.COMMON,
        quantity: { min: 1, max: 1 }
      },
      {
        itemKey: ITEMS.WOODEN_SPEAR,
        rarity: RARITY.COMMON,
        quantity: { min: 1, max: 1 }
      },
      {
        itemKey: ITEMS.BRONZE_SWORD,
        rarity: RARITY.RARE,
        quantity: { min: 1, max: 1 }
      }
    ]
  },
  {
    key: MONSTERS.GOBLIN,
    name: "Goblin",
    icon:
      "https://vignette.wikia.nocookie.net/2007scape/images/d/d2/Goblin.png/revision/latest?cb=20170212092103",
    description: "An ugly green creature.",
    level: 3,
    drops: [
      {
        itemKey: ITEMS.COIN,
        rarity: RARITY.ALWAYS,
        quantity: { min: 20, max: 60 }
      },
      {
        itemKey: ITEMS.LOW_QUALITY_MEAT,
        rarity: RARITY.COMMON,
        quantity: { min: 1, max: 3 }
      },
      {
        itemKey: ITEMS.HIGH_QUALITY_MEAT,
        rarity: RARITY.RARE,
        quantity: { min: 1, max: 1 }
      },
      {
        itemKey: ITEMS.SMALL_HEALTH_POTIONS,
        rarity: RARITY.COMMON,
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
        itemKey: ITEMS.WOODEN_HELMET,
        rarity: RARITY.COMMON,
        quantity: { min: 1, max: 1 }
      },
      {
        itemKey: ITEMS.WOODEN_PLATE_BODY,
        rarity: RARITY.COMMON,
        quantity: { min: 1, max: 1 }
      },
      {
        itemKey: ITEMS.WOODEN_PLATE_LEGS,
        rarity: RARITY.COMMON,
        quantity: { min: 1, max: 1 }
      },
      {
        itemKey: ITEMS.WOODEN_SWORD,
        rarity: RARITY.COMMON,
        quantity: { min: 1, max: 1 }
      },
      {
        itemKey: ITEMS.WOODEN_SHIELD,
        rarity: RARITY.COMMON,
        quantity: { min: 1, max: 1 }
      },
      {
        itemKey: ITEMS.WOODEN_SPEAR,
        rarity: RARITY.COMMON,
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
      }
    ]
  },
  {
    key: MONSTERS.GOBLIN_GUARD,
    name: "Goblin Guard",
    icon:
      "https://vignette.wikia.nocookie.net/2007scape/images/0/05/Goblin_guard.png/revision/latest?cb=20150829134401",
    description: "He doesn't look like he'd trust his own mother.",
    level: 5,
    drops: [
      {
        itemKey: ITEMS.COIN,
        rarity: RARITY.ALWAYS,
        quantity: { min: 30, max: 80 }
      },
      {
        itemKey: ITEMS.HIGH_QUALITY_MEAT,
        rarity: RARITY.COMMON,
        quantity: { min: 1, max: 5 }
      },
      {
        itemKey: ITEMS.SMALL_HEALTH_POTIONS,
        rarity: RARITY.COMMON,
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
        itemKey: ITEMS.BRONZE_SPEAR,
        rarity: RARITY.COMMON,
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
      }
    ]
  },
  {
    key: MONSTERS.GOBLIN_SOLDIER,
    name: "Goblin Soldier",
    icon:
      "https://vignette.wikia.nocookie.net/2007scape/images/5/5c/Goblin_Recruiter.png/revision/latest?cb=20141021185712",
    description: "Looks somewhat important, not sure how you can tell though.",
    level: 6,
    drops: [
      {
        itemKey: ITEMS.COIN,
        rarity: RARITY.ALWAYS,
        quantity: { min: 50, max: 100 }
      },
      {
        itemKey: ITEMS.HIGH_QUALITY_MEAT,
        rarity: RARITY.COMMON,
        quantity: { min: 1, max: 5 }
      },
      {
        itemKey: ITEMS.SMALL_HEALTH_POTIONS,
        rarity: RARITY.COMMON,
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
        itemKey: ITEMS.BRONZE_SPEAR,
        rarity: RARITY.COMMON,
        quantity: { min: 1, max: 1 }
      },
      {
        itemKey: ITEMS.BRONZE_PLATE_BODY,
        rarity: RARITY.COMMON,
        quantity: { min: 1, max: 1 }
      },
      {
        itemKey: ITEMS.BRONZE_SWORD,
        rarity: RARITY.COMMON,
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
  }
];

export default FULL_MONSTERS;
