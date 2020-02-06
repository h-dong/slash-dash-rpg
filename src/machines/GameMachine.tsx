import { Machine, assign } from "xstate";
import {
  moveEquipmentItemToInventory,
  moveInventoryItemToEquipment,
  addItemToInventory,
  addItemToDrops,
  consumeInventoryFood,
  getHealAmountByItemKey,
  loseRandomInventoryOnDeath,
  removeItemFromInventory,
  sellItemFromInventory,
  addItemToShop,
  removeItemFromShop,
  addBoughtItemToInventory,
  addItemsToDrops
} from "../utils/itemActions";
import FULL_MAPS, { MAP } from "../database/maps";
import { ITEM } from "../database/items";
import { generateLog } from "../utils/logs";
import { setData } from "../services/data";
import { MONSTER } from "../database/monsters";
import {
  COMBATANT_TYPE,
  getStatsByMonsterKey,
  CombatStatsInterface
} from "../utils/combat";
import { getMonsterNameWithCombatantType } from "../utils/monster";
import { canAffordItem } from "../utils/shopHelper";
import { calcExpGain, getLevel, getMaxHpByLevel } from "../utils/levelHelper";

export interface CharacterInterface {
  health: number;
  name: string;
  attack: number;
  strength: number;
  defence: number;
}

export interface EquipmentsInterface {
  HEAD?: ITEM;
  BODY?: ITEM;
  LEGS?: ITEM;
  MAIN_HAND?: ITEM;
  OFF_HAND?: ITEM;
}

export interface InventoryItemInterface {
  itemKey: ITEM;
  quantity: number;
}

export interface BattleInterface {
  monsterKey: MONSTER;
  combatantType: COMBATANT_TYPE;
  health: number;
  stats: CombatStatsInterface;
}

export interface WorldDropsInterface {
  itemKey: ITEM;
  quantity: number;
}

export interface WorldInterface {
  location: MAP;
  monsters: MONSTER[];
  drops: WorldDropsInterface[];
}

export interface GameMachineContextInterface {
  character: CharacterInterface;
  equipments: EquipmentsInterface;
  inventory: InventoryItemInterface[];
  itemsInShop: ShopDataInterface;
  logs: string;
  world: WorldInterface;
  battle: BattleInterface | null;
}

export interface ShopDataItemInterface {
  key: ITEM;
  quantity: number;
}

export interface ShopDataInterface {
  date: Date;
  items: ShopDataItemInterface[];
}

interface GameMachineStateSchema {
  states: {
    explore: {};
    battle: {};
    dead: {};
  };
  actions: {};
  guards: {};
}

export type GameMachineEvents = {
  type:
    | "DIED"
    | "REVIVE"
    | "START_BATTLE"
    | "UPDATE_BATTLE"
    | "WON_BATTLE"
    | "UPDATE_EXP"
    | "LOST_BATTLE"
    | "ESCAPE_BATTLE"
    | "UNEQUIP_ITEM"
    | "EXAMINE_ITEM"
    | "EQUIP_ITEM"
    | "PICK_UP_ITEM"
    | "CONSUME_FOOD"
    | "HEAL_TO_FULL"
    | "SET_MONSTERS"
    | "SET_DROPS"
    | "DROP_ITEM"
    | "SELL_ITEM"
    | "BUY_ITEM"
    | "ADD_LOG"
    | "CHANGE_LOCATION";
  itemKey: ITEM;
  itemQuantity: number;
  log: string;
  location: MAP;
  monsters: MONSTER[];
  monsterKey: MONSTER;
  drops: WorldDropsInterface[];
  monsterHealth: number;
  playerHealth: number;
  attackExp: number;
  defenceExp: number;
  strengthExp: number;
};

const GameMachine = Machine<
  GameMachineContextInterface,
  GameMachineStateSchema,
  GameMachineEvents
>(
  {
    id: "game",
    initial: "explore",
    states: {
      explore: {
        on: {
          DIED: "dead",
          START_BATTLE: {
            target: "battle",
            actions: "setBattle"
          },
          SET_MONSTERS: {
            actions: "setMonsters"
          },
          SET_DROPS: {
            actions: "setDrops"
          },
          UNEQUIP_ITEM: {
            actions: ["unequipItem", "persist"]
          },
          EQUIP_ITEM: {
            actions: ["equipItem", "persist"]
          },
          EXAMINE_ITEM: {
            actions: "addLog"
          },
          PICK_UP_ITEM: {
            actions: ["pickUpItem", "persist"]
          },
          DROP_ITEM: {
            actions: ["dropItem", "persist"]
          },
          SELL_ITEM: {
            actions: ["sellItem", "persist"]
          },
          BUY_ITEM: [
            {
              actions: ["buyItem", "persist"],
              cond: "hasEnoughCoins"
            },
            {
              actions: "addNotEnoughCoinsLog",
              cond: "notEnoughCoins"
            }
          ],
          CONSUME_FOOD: {
            actions: ["consumeFood", "persist"]
          },
          HEAL_TO_FULL: {
            actions: ["healToFull", "persist"]
          },
          CHANGE_LOCATION: {
            actions: "changeLoction"
          }
        }
      },
      battle: {
        on: {
          UPDATE_BATTLE: {
            actions: ["updateBattle", "addLog", "persist"]
          },
          UPDATE_EXP: {
            actions: ["updateExp", "persist"]
          },
          LOST_BATTLE: {
            target: "dead",
            actions: "addLog"
          },
          ESCAPE_BATTLE: {
            target: "explore",
            actions: "addLog"
          },
          WON_BATTLE: {
            target: "explore",
            actions: ["addLog", "removeMonster", "addDrops"]
          },
          UNEQUIP_ITEM: {
            actions: ["unequipItem", "persist"]
          },
          EQUIP_ITEM: {
            actions: ["equipItem", "persist"]
          },
          EXAMINE_ITEM: {
            actions: "addLog"
          },
          PICK_UP_ITEM: {
            actions: ["pickUpItem", "persist"]
          },
          DROP_ITEM: {
            actions: ["dropItem", "persist"]
          },
          CONSUME_FOOD: {
            actions: ["consumeFood", "persist"]
          }
        }
      },
      dead: {
        on: {
          REVIVE: {
            target: "explore",
            actions: "onRevive"
          }
        }
      }
    }
  },
  {
    actions: {
      unequipItem: assign((context, { itemKey }) =>
        moveEquipmentItemToInventory(
          context.equipments,
          context.inventory,
          itemKey
        )
      ),
      equipItem: assign((context, { itemKey }) =>
        moveInventoryItemToEquipment(
          context.equipments,
          context.inventory,
          itemKey
        )
      ),
      emptyInventory: assign(_ => ({
        inventory: []
      })),
      resetWorld: assign((context, _) => ({
        world: { ...context.world, drops: [], monsters: [] }
      })),
      setMonsters: assign((context, { monsters }) => ({
        world: { ...context.world, monsters }
      })),
      removeMonster: assign((context, { monsterKey }) => {
        const newMonsters: MONSTER[] = context.world.monsters.filter(
          key => key !== monsterKey
        );
        return { world: { ...context.world, monsters: newMonsters } };
      }),
      addDrops: assign((context, { drops }) => ({
        world: {
          ...context.world,
          drops: addItemsToDrops(context.world.drops, drops)
        }
      })),
      setDrops: assign((context, { drops }) => ({
        world: { ...context.world, drops }
      })),
      pickUpItem: assign((context, { itemKey, itemQuantity }) => ({
        inventory: addItemToInventory(context.inventory, itemKey, itemQuantity)
      })),
      dropItem: assign((context, { itemKey }) => {
        const newDrops = addItemToDrops(context.world.drops, {
          itemKey,
          quantity: 1
        });
        const newInventory = removeItemFromInventory(
          context.inventory,
          itemKey
        );
        return {
          inventory: newInventory,
          world: {
            ...context.world,
            drops: newDrops
          }
        };
      }),
      sellItem: assign((context, { itemKey }) => ({
        itemsInShop: {
          ...context.itemsInShop,
          items: addItemToShop(context.itemsInShop.items, itemKey, 1)
        },
        inventory: sellItemFromInventory(context.inventory, itemKey)
      })),
      buyItem: assign((context, { itemKey }) => ({
        itemsInShop: {
          ...context.itemsInShop,
          items: removeItemFromShop(context.itemsInShop.items, itemKey, 1)
        },
        inventory: addBoughtItemToInventory(context.inventory, itemKey)
      })),
      consumeFood: assign((context, { itemKey }) => {
        const newInventory = consumeInventoryFood(context.inventory, itemKey);
        const level = getLevel(
          context.character.attack,
          context.character.strength,
          context.character.defence
        );
        const maxHp = getMaxHpByLevel(level);
        const healAmount = getHealAmountByItemKey(maxHp, itemKey);
        const newHp =
          healAmount + context.character.health <= maxHp
            ? healAmount + context.character.health
            : maxHp;

        return {
          character: {
            ...context.character,
            health: newHp
          },
          inventory: newInventory
        };
      }),
      healToFull: assign((context, _) => {
        const level = getLevel(
          context.character.attack,
          context.character.strength,
          context.character.defence
        );
        const maxHp = getMaxHpByLevel(level);
        return {
          character: {
            ...context.character,
            health: maxHp
          },
          log: "You have been fully healed!"
        };
      }),
      setBattle: assign((_, { monsterKey }) => {
        let battle = null;
        const monsterObj = getStatsByMonsterKey(monsterKey);
        const combatantType = monsterObj
          ? monsterObj.combatantType
          : COMBATANT_TYPE.NORMAL_MONSTER;
        const fullMonsterName = getMonsterNameWithCombatantType(
          monsterKey,
          combatantType
        );
        if (monsterObj) battle = monsterObj;
        return { battle, log: `Prepare for battle with ${fullMonsterName}!` };
      }),
      updateBattle: assign((context, { monsterHealth, playerHealth }) => {
        if (!context.battle) return { battle: null };
        const character = {
          ...context.character,
          health: playerHealth
        };
        const battle = {
          ...context.battle,
          health: monsterHealth
        };
        return {
          character,
          battle
        };
      }),
      updateExp: assign((context, { attackExp, defenceExp, strengthExp }) => ({
        character: {
          ...context.character,
          attack: calcExpGain(context.character.attack, attackExp),
          defence: calcExpGain(context.character.defence, defenceExp),
          strength: calcExpGain(context.character.strength, strengthExp)
        }
      })),
      onRevive: assign(context => {
        const level = getLevel(
          context.character.attack,
          context.character.strength,
          context.character.defence
        );
        const maxHp = getMaxHpByLevel(level);
        return {
          character: {
            ...context.character,
            health: maxHp
          },
          inventory: loseRandomInventoryOnDeath(context.inventory),
          log: "After some rest, you have recovered to your full strength!"
        };
      }),
      addLog: assign((context, { log }): any => ({
        logs: generateLog(context.logs, log)
      })),
      addNotEnoughCoinsLog: assign((context): any => ({
        logs: generateLog(
          context.logs,
          "Not enough coins to make the purchase!"
        )
      })),
      changeLoction: assign((context, { location }) => {
        const mapName = FULL_MAPS.find(map => map.key === location)?.name;
        return {
          world: { location, drops: [], monsters: [] },
          logs: generateLog(context.logs, `Fast travelled to ${mapName}`)
        };
      }),
      persist: ({ character, equipments, inventory, itemsInShop }, _) => {
        setData({ character, equipments, inventory, itemsInShop });
      }
    },
    guards: {
      hasEnoughCoins: (context, { itemKey }) =>
        canAffordItem(context.inventory, itemKey),
      notEnoughCoins: (context, { itemKey }) =>
        !canAffordItem(context.inventory, itemKey)
    }
  }
);

export default GameMachine;
