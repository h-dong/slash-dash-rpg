const WEAR_POSITION = {
  HEAD: "HEAD" as WearPositions,
  BODY: "BODY" as WearPositions,
  LEGS: "LEGS" as WearPositions,
  MAIN_HAND: "MAIN_HAND" as WearPositions,
  OFF_HAND: "OFF_HAND" as WearPositions
  // BACK: "BACK"
};

const RARITY = {
  ALWAYS: 1, // 100%
  COMMON: 10, // 10%
  RARE: 100, // 1%
  EPIC: 1000, // 0.1%
  LEGENDARY: 10000 // 0.001%
};

type WearPositions = "HEAD" | "BODY" | "LEGS" | "MAIN_HAND" | "OFF_HAND";

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
  position: WearPositions;
  requirements?: {
    twoHanded?: boolean;
    level?: 1;
  };
  combat?: {
    attackSpeed?: number;
    damage?: number;
    armour?: number;
    attack?: number;
    strength?: number;
    defence?: number;
    criticalStrick?: number;
    criticalBlock?: number;
  };
  effect?: {
    inventory?: number;
  };
}

export interface Item {
  id: number;
  key?: string;
  name: string;
  icon: string;
  description?: string;
  food?: FoodSchema;
  equipment?: EquipmentSchema;
}

const rawData: Item[] = [
  {
    id: 1,
    key: "COIN",
    name: "Coins",
    icon:
      "https://vignette.wikia.nocookie.net/2007scape/images/b/b6/Coins_100.png/revision/latest?cb=20130321223939",
    description: "Shinny gold coins!"
  },
  {
    id: 2,
    key: "LOW_QUALITY_MEAT",
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
    key: "HIGH_QUALITY_MEAT",
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
    key: "SMALL_HEALTH_POTIONS",
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
    key: "MEDIUM_HEALTH_POTIONS",
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
    key: "LARGE_HEALTH_POTIONS",
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
    key: "GREAT_HEALTH_POTIONS",
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
    key: "WOODEN_HELMET",
    name: "Wooden Helmet",
    icon:
      "https://vignette.wikia.nocookie.net/2007scape/images/3/31/Splitbark_helm.png/revision/latest?cb=20140726051922",
    equipment: {
      wearable: true,
      position: WEAR_POSITION.HEAD,
      combat: {
        armour: 5
      }
    }
  },
  {
    id: 9,
    key: "WOODEN_PLATE_BODY",
    name: "Wooden Plate Body",
    icon:
      "https://vignette.wikia.nocookie.net/2007scape/images/6/60/Splitbark_body.png/revision/latest?cb=20140726051921",
    equipment: {
      wearable: true,
      position: WEAR_POSITION.BODY,
      combat: {
        armour: 10
      }
    }
  },
  {
    id: 10,
    key: "WOODEN_PLATE_LEGS",
    name: "Wooden Plate Legs",
    icon:
      "https://vignette.wikia.nocookie.net/2007scape/images/8/80/Splitbark_legs.png/revision/latest?cb=20140726051923",
    equipment: {
      wearable: true,
      position: WEAR_POSITION.LEGS,
      combat: {
        armour: 8
      }
    }
  },
  {
    id: 11,
    key: "WOODEN_SHIELD",
    name: "Wooden Shield",
    icon:
      "https://vignette.wikia.nocookie.net/2007scape/images/d/db/Wooden_shield.png/revision/latest?cb=20140323033102",
    equipment: {
      wearable: true,
      position: WEAR_POSITION.OFF_HAND,
      combat: {
        armour: 15
      }
    }
  },
  {
    id: 12,
    key: "WOODEN_SWORD",
    name: "Wooden Sword",
    icon:
      "https://vignette.wikia.nocookie.net/2007scape/images/f/fd/Wooden_sword.png/revision/latest?cb=20140218221209",
    equipment: {
      wearable: true,
      position: WEAR_POSITION.MAIN_HAND,
      combat: {
        attackSpeed: 10,
        damage: 10
      }
    }
  },
  {
    id: 13,
    key: "WOODEN_SPEAR",
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
        attackSpeed: -25,
        damage: 25
      }
    }
  },
  {
    id: 14,
    key: "BRONZE_HELMET",
    name: "Bronze Helmet",
    icon:
      "https://vignette.wikia.nocookie.net/2007scape/images/e/ef/Bronze_full_helm.png/revision/latest?cb=20131218080719",
    equipment: {
      wearable: true,
      position: WEAR_POSITION.HEAD,
      combat: {
        armour: 10
      }
    }
  },
  {
    id: 15,
    key: "BRONZE_PLATE_BODY",
    name: "Bronze Plate Body",
    icon:
      "https://vignette.wikia.nocookie.net/2007scape/images/c/cd/Bronze_platebody.png/revision/latest?cb=20131218074731",
    equipment: {
      wearable: true,
      position: WEAR_POSITION.BODY,
      combat: {
        armour: 20
      }
    }
  },
  {
    id: 16,
    key: "BRONZE_PLATE_LEGS",
    name: "Bronze Plate Legs",
    icon:
      "https://vignette.wikia.nocookie.net/2007scape/images/2/24/Bronze_platelegs.png/revision/latest?cb=20170603011603",
    equipment: {
      wearable: true,
      position: WEAR_POSITION.LEGS,
      combat: {
        armour: 16
      }
    }
  },
  {
    id: 17,
    key: "BRONZE_SHIELD",
    name: "Bronze Shield",
    icon:
      "https://vignette.wikia.nocookie.net/2007scape/images/6/68/Bronze_kiteshield.png/revision/latest?cb=20131215210817",
    equipment: {
      wearable: true,
      position: WEAR_POSITION.OFF_HAND,
      combat: {
        armour: 30
      }
    }
  },
  {
    id: 18,
    key: "BRONZE_SWORD",
    name: "Bronze Sword",
    icon:
      "https://vignette.wikia.nocookie.net/2007scape/images/b/b8/Bronze_sword.png/revision/latest?cb=20140510170952",
    equipment: {
      wearable: true,
      position: WEAR_POSITION.MAIN_HAND,
      combat: {
        attackSpeed: 20,
        damage: 20
      }
    }
  },
  {
    id: 19,
    key: "BRONZE_AXE",
    name: "Bronze Axe",
    icon:
      "https://vignette.wikia.nocookie.net/2007scape/images/0/0f/Bronze_battleaxe.png/revision/latest?cb=20130920174444",
    equipment: {
      wearable: true,
      position: WEAR_POSITION.MAIN_HAND,
      combat: {
        attackSpeed: 0,
        damage: 30
      }
    }
  },
  {
    id: 20,
    key: "BRONZE_SPEAR",
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
        attackSpeed: -25,
        damage: 50
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

const ITEMS = rawData;

ITEMS.map((item, index) => ({
  description: "Found nothing interesting.",
  ...item,
  id: index
}));

export { ITEMS as default, WEAR_POSITION, RARITY };
