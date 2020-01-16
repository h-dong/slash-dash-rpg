// const WEAR_POSITION = {
//   HEAD: "HEAD" as WearPositions,
//   BODY: "BODY" as WearPositions,
//   LEGS: "LEGS" as WearPositions,
//   MAIN_HAND: "MAIN_HAND" as WearPositions,
//   OFF_HAND: "OFF_HAND" as WearPositions
//   // BACK: "BACK"
// };

export enum WEAR_POSITION {
  HEAD = "HEAD",
  BODY = "BODY",
  LEGS = "LEGS",
  MAIN_HAND = "MAIN_HAND",
  OFF_HAND = "OFF_HAND"
}

export enum RARITY {
  ALWAYS = 1, // 100%
  COMMON = 10, // 10%
  RARE = 100, // 1%
  EPIC = 1000, // 0.1%
  LEGENDARY = 10000 // 0.001%
}

interface FoodSchema {
  consumable: boolean;
  heal?: {
    min?: number;
    max?: number;
    percentage?: number;
  };
  requirements?: {
    notInCombat?: boolean;
  };
}

interface EquipmentSchema {
  wearable: boolean;
  position: WEAR_POSITION;
  requirements?: {
    twoHanded?: boolean;
    level?: 1;
  };
  combat?: {
    attack?: number;
    strength?: number;
    defence?: number;
    movementSpeed?: number;
  };
  effect?: {
    inventory?: number;
  };
}

export enum ITEMS {
  COIN = "COIN",
  LOW_QUALITY_MEAT = "LOW_QUALITY_MEAT",
  HIGH_QUALITY_MEAT = "HIGH_QUALITY_MEAT",
  SMALL_HEALTH_POTIONS = "SMALL_HEALTH_POTIONS",
  MEDIUM_HEALTH_POTIONS = "MEDIUM_HEALTH_POTIONS",
  LARGE_HEALTH_POTIONS = "LARGE_HEALTH_POTIONS",
  GREAT_HEALTH_POTIONS = "GREAT_HEALTH_POTIONS",
  WOODEN_HELMET = "WOODEN_HELMET",
  WOODEN_PLATE_BODY = "WOODEN_PLATE_BODY",
  WOODEN_PLATE_LEGS = "WOODEN_PLATE_LEGS",
  WOODEN_SHIELD = "WOODEN_SHIELD",
  WOODEN_SWORD = "WOODEN_SWORD",
  WOODEN_SPEAR = "WOODEN_SPEAR",
  BRONZE_HELMET = "BRONZE_HELMET",
  BRONZE_PLATE_BODY = "BRONZE_PLATE_BODY",
  BRONZE_PLATE_LEGS = "BRONZE_PLATE_LEGS",
  BRONZE_SHIELD = "BRONZE_SHIELD",
  BRONZE_SWORD = "BRONZE_SWORD",
  BRONZE_BATTLE_AXE = "BRONZE_BATTLE_AXE",
  BRONZE_SPEAR = "BRONZE_SPEAR"
}

export interface ItemInterface {
  id: number;
  key: ITEMS;
  name: string;
  icon: string;
  description?: string;
  food?: FoodSchema;
  equipment?: EquipmentSchema;
}

const rawData: ItemInterface[] = [
  {
    id: 1,
    key: ITEMS.COIN,
    name: "Coins",
    icon:
      "https://vignette.wikia.nocookie.net/2007scape/images/b/b6/Coins_100.png/revision/latest?cb=20130321223939",
    description: "Shinny gold coins!"
  },
  {
    id: 2,
    key: ITEMS.LOW_QUALITY_MEAT,
    name: "Low Quality Meat",
    icon:
      "https://vignette.wikia.nocookie.net/2007scape/images/c/c2/Cooked_chicken.png/revision/latest?cb=20130303155955",
    food: {
      consumable: true,
      heal: {
        min: 3,
        max: 5
      }
    }
  },
  {
    id: 3,
    key: ITEMS.HIGH_QUALITY_MEAT,
    name: "High Quality Meat",
    icon:
      "https://vignette.wikia.nocookie.net/2007scape/images/8/89/Cooked_meat.png/revision/latest?cb=20130303160059",
    food: {
      consumable: true,
      heal: {
        min: 5,
        max: 10
      }
    }
  },
  {
    id: 4,
    key: ITEMS.SMALL_HEALTH_POTIONS,
    name: "Health Potion (small)",
    icon:
      "https://vignette.wikia.nocookie.net/2007scape/images/8/8e/Restore_potion%281%29.png/revision/latest?cb=20140201184155",
    food: {
      consumable: true,
      heal: {
        percentage: 0.4
      }
    }
  },
  {
    id: 5,
    key: ITEMS.MEDIUM_HEALTH_POTIONS,
    name: "Health Potion (medium)",
    icon:
      "https://vignette.wikia.nocookie.net/2007scape/images/1/1b/Restore_potion%282%29.png/revision/latest?cb=20140201184205",
    food: {
      consumable: true,
      heal: {
        percentage: 0.6
      }
    }
  },
  {
    id: 6,
    key: ITEMS.LARGE_HEALTH_POTIONS,
    name: "Health Potion (large)",
    icon:
      "https://vignette.wikia.nocookie.net/2007scape/images/0/03/Restore_potion%283%29.png/revision/latest?cb=20140201184214",
    food: {
      consumable: true,
      heal: {
        percentage: 0.8
      }
    }
  },
  {
    id: 7,
    key: ITEMS.GREAT_HEALTH_POTIONS,
    name: "GREAT Health Potion",
    icon:
      "https://vignette.wikia.nocookie.net/2007scape/images/f/f6/Restore_potion%284%29.png/revision/latest?cb=20140201184224",
    food: {
      consumable: true,
      heal: {
        percentage: 1
      }
    }
  },
  // {
  //   name: "Pouch",
  //   equipment: {
  //     wearable: true,
  //     position: WEAR_POSITION.BACK,
  //     requirements: {
  //       level: 3
  //     },
  //     combat: {
  //       attackSpeed: 0
  //     },
  //     effect: {
  //       inventory: 5
  //     }
  //   } as EquipmentSchema
  // },
  // {
  //   name: "Backpack",
  //   equipment: {
  //     wearable: true,
  //     position: WEAR_POSITION.BACK,
  //     requirements: {
  //       level: 5
  //     },
  //     combat: {
  //       attackSpeed: -5
  //     },
  //     effect: {
  //       inventory: 10
  //     }
  //   } as EquipmentSchema
  // },
  // {
  //   name: "Rucksack",
  //   equipment: {
  //     wearable: true,
  //     position: WEAR_POSITION.BACK,
  //     requirements: {
  //       level: 10
  //     },
  //     combat: {
  //       attackSpeed: -10
  //     },
  //     effect: {
  //       inventory: 20
  //     }
  //   } as EquipmentSchema
  // },
  {
    id: 8,
    key: ITEMS.WOODEN_HELMET,
    name: "Wooden Helmet",
    icon:
      "https://vignette.wikia.nocookie.net/2007scape/images/3/31/Splitbark_helm.png/revision/latest?cb=20140726051922",
    equipment: {
      wearable: true,
      position: WEAR_POSITION.HEAD,
      combat: {
        defence: 1,
        movementSpeed: -2
      }
    }
  },
  {
    id: 9,
    key: ITEMS.WOODEN_PLATE_BODY,
    name: "Wooden Plate Body",
    icon:
      "https://vignette.wikia.nocookie.net/2007scape/images/6/60/Splitbark_body.png/revision/latest?cb=20140726051921",
    equipment: {
      wearable: true,
      position: WEAR_POSITION.BODY,
      combat: {
        defence: 2,
        movementSpeed: -5
      }
    }
  },
  {
    id: 10,
    key: ITEMS.WOODEN_PLATE_LEGS,
    name: "Wooden Plate Legs",
    icon:
      "https://vignette.wikia.nocookie.net/2007scape/images/8/80/Splitbark_legs.png/revision/latest?cb=20140726051923",
    equipment: {
      wearable: true,
      position: WEAR_POSITION.LEGS,
      combat: {
        defence: 2,
        movementSpeed: -5
      }
    }
  },
  {
    id: 11,
    key: ITEMS.WOODEN_SHIELD,
    name: "Wooden Shield",
    icon:
      "https://vignette.wikia.nocookie.net/2007scape/images/d/db/Wooden_shield.png/revision/latest?cb=20140323033102",
    equipment: {
      wearable: true,
      position: WEAR_POSITION.OFF_HAND,
      combat: {
        defence: 2,
        movementSpeed: -3
      }
    }
  },
  {
    id: 12,
    key: ITEMS.WOODEN_SWORD,
    name: "Wooden Sword",
    icon:
      "https://vignette.wikia.nocookie.net/2007scape/images/f/fd/Wooden_sword.png/revision/latest?cb=20140218221209",
    equipment: {
      wearable: true,
      position: WEAR_POSITION.MAIN_HAND,
      combat: {
        strength: 1
      }
    }
  },
  {
    id: 13,
    key: ITEMS.WOODEN_SPEAR,
    name: "Wooden Spear",
    icon:
      "https://vignette.wikia.nocookie.net/2007scape/images/2/23/Gilded_spear.png/revision/latest?cb=20160706155543",
    equipment: {
      wearable: true,
      position: WEAR_POSITION.MAIN_HAND,
      requirements: {
        twoHanded: true
      },
      combat: {
        strength: 3,
        movementSpeed: -3
      }
    }
  },
  {
    id: 14,
    key: ITEMS.BRONZE_HELMET,
    name: "Bronze Helmet",
    icon:
      "https://vignette.wikia.nocookie.net/2007scape/images/e/ef/Bronze_full_helm.png/revision/latest?cb=20131218080719",
    equipment: {
      wearable: true,
      position: WEAR_POSITION.HEAD,
      combat: {
        defence: 2,
        movementSpeed: -2
      }
    }
  },
  {
    id: 15,
    key: ITEMS.BRONZE_PLATE_BODY,
    name: "Bronze Plate Body",
    icon:
      "https://vignette.wikia.nocookie.net/2007scape/images/c/cd/Bronze_platebody.png/revision/latest?cb=20131218074731",
    equipment: {
      wearable: true,
      position: WEAR_POSITION.BODY,
      combat: {
        defence: 4,
        movementSpeed: -5
      }
    }
  },
  {
    id: 16,
    key: ITEMS.BRONZE_PLATE_LEGS,
    name: "Bronze Plate Legs",
    icon:
      "https://vignette.wikia.nocookie.net/2007scape/images/2/24/Bronze_platelegs.png/revision/latest?cb=20170603011603",
    equipment: {
      wearable: true,
      position: WEAR_POSITION.LEGS,
      combat: {
        defence: 4,
        movementSpeed: -5
      }
    }
  },
  {
    id: 17,
    key: ITEMS.BRONZE_SHIELD,
    name: "Bronze Shield",
    icon:
      "https://vignette.wikia.nocookie.net/2007scape/images/6/68/Bronze_kiteshield.png/revision/latest?cb=20131215210817",
    equipment: {
      wearable: true,
      position: WEAR_POSITION.OFF_HAND,
      combat: {
        defence: 4,
        movementSpeed: -3
      }
    }
  },
  {
    id: 18,
    key: ITEMS.BRONZE_SWORD,
    name: "Bronze Sword",
    icon:
      "https://vignette.wikia.nocookie.net/2007scape/images/b/b8/Bronze_sword.png/revision/latest?cb=20140510170952",
    equipment: {
      wearable: true,
      position: WEAR_POSITION.MAIN_HAND,
      combat: {
        strength: 2
      }
    }
  },
  {
    id: 19,
    key: ITEMS.BRONZE_BATTLE_AXE,
    name: "Bronze Battle Axe",
    icon:
      "https://vignette.wikia.nocookie.net/2007scape/images/0/0f/Bronze_battleaxe.png/revision/latest?cb=20130920174444",
    equipment: {
      wearable: true,
      position: WEAR_POSITION.MAIN_HAND,
      combat: {
        strength: 3,
        movementSpeed: -2
      }
    }
  },
  {
    id: 20,
    key: ITEMS.BRONZE_SPEAR,
    name: "Bronze Spear",
    icon:
      "https://vignette.wikia.nocookie.net/2007scape/images/4/41/Bronze_spear.png/revision/latest?cb=20130928222524",
    equipment: {
      wearable: true,
      position: WEAR_POSITION.MAIN_HAND,
      requirements: {
        twoHanded: true
      },
      combat: {
        strength: 6,
        movementSpeed: -3
      }
    }
  }
  // IRON_HELMET: {},
  // IRON_PLATE_BODY: {},
  // IRON_PLATE_LEGS: {},
  // IRON_SHIELD: {},
  // IRON_SWORD: {},
  // IRON_AXE: {},
  // IRON_SPEAR: {},
  // STEEL_HELMET: {},
  // STEEL_PLATE_BODY: {},
  // STEEL_PLATE_LEGS: {},
  // STEEL_SHIELD: {},
  // STEEL_SWORD: {},
  // STEEL_AXE: {},
  // STEEL_SPEAR: {},
  // SILVER_HELMET: {},
  // SILVER_PLATE_BODY: {},
  // SILVER_PLATE_LEGS: {},
  // SILVER_SHIELD: {},
  // SILVER_SWORD: {},
  // SILVER_AXE: {},
  // SILVER_SPEAR: {}
];

let FULL_ITEMS = rawData;

FULL_ITEMS = FULL_ITEMS.map(item => ({
  description: "Found nothing interesting.",
  ...item
}));

export default FULL_ITEMS;
