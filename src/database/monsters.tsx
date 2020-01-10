import ITEMS, { RARITY } from "./items";

// goblin woods 3 - 6
// Rabbit L1
// Giant Rat L2
// goblin villager L3
// goblin guard L5
// goblin soldier L6

// dark forest 6 - 10
// Rabbit L1
// Monkey L1
// Snake L2
// Giant Rat L3
// goblin soldier L6
// human hunter L10
// Bear L8
// Giant spider L9
// goblin captain L10
// Skeleton L10
// Skeleton Warrior L15
// Skeleton Mage L15
// Young Troll L15
// Troll L18
// Unicorn L20

const MONSTERS = {
  CHICKEN: {
    key: "CHICKEN",
    name: "Chicken",
    icon:
      "https://vignette.wikia.nocookie.net/2007scape/images/a/a3/Chicken.png/revision/latest?cb=20161207181258",
    description: "Yep. Definitely a chicken.",
    level: 1,
    drops: [{ item: "LOW_QUALITY_MEAT", rarity: RARITY.ALWAYS }]
  },
  DUCK: {
    key: "DUCK",
    name: "Duck",
    icon:
      "https://vignette.wikia.nocookie.net/2007scape/images/3/38/Duck.png/revision/latest?cb=20150905042847",
    description: "Waddle waddle waddle quack.",
    level: 1,
    drops: [{ item: "LOW_QUALITY_MEAT", rarity: RARITY.ALWAYS }]
  },
  PIG: {
    key: "PIG",
    name: "Pig",
    icon:
      "https://vignette.wikia.nocookie.net/2007scape/images/3/30/Pig.png/revision/latest/scale-to-width-down/700?cb=20180303064642",
    description: "Swine",
    level: 2,
    drops: [{ item: "HIGH_QUALITY_MEAT", rarity: RARITY.ALWAYS }]
  },
  COW: {
    key: "COW",
    name: "Cow",
    icon:
      "https://vignette.wikia.nocookie.net/2007scape/images/8/84/Cow.png/revision/latest/scale-to-width-down/700?cb=20160613020452",
    description: "Converts grass to beef",
    level: 2,
    drops: [{ item: "HIGH_QUALITY_MEAT", rarity: RARITY.ALWAYS }]
  },
  FARMER: {
    key: "FARMER",
    name: "Farmer",
    icon:
      "https://vignette.wikia.nocookie.net/2007scape/images/3/3d/Farmer.png/revision/latest?cb=20170225131827",
    description: "He grows the crops in this area",
    level: 3,
    drops: [
      {
        item: "COIN",
        rarity: RARITY.ALWAYS,
        quatity: { min: 1, max: 50 }
      },
      {
        item: "SMALL_HEALTH_POTIONS",
        rarity: RARITY.RARE,
        quatity: { min: 1, max: 2 }
      }
    ]
  }
};

export default MONSTERS;
