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
  addItemToShop
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

export interface CharacterHealthInterface {
  current: number;
  max: number;
}

export interface CharacterInterface {
  health: CharacterHealthInterface;
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

export type GameMachineEvents = {
  type:
    | "DIED"
    | "REVIVE"
    | "START_BATTLE"
    | "UPDATE_BATTLE"
    | "WON_BATTLE"
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
};

const GameMachine = Machine<GameMachineContextInterface, GameMachineEvents>(
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
          SELL_ITEM: {
            actions: ["sellItem", "persist"]
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
      addDrops: assign((context, { drops }) => {
        const newDrops = addItemToDrops(context.world.drops, drops[0]);
        return {
          world: { ...context.world, drops: newDrops }
        };
      }),
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
      sellItem: assign((context, { itemKey }) => {
        return {
          itemsInShop: {
            ...context.itemsInShop,
            items: addItemToShop(context.itemsInShop.items, itemKey, 1)
          },
          inventory: sellItemFromInventory(context.inventory, itemKey)
        };
      }),
      consumeFood: assign((context, { itemKey }) => {
        const newInventory = consumeInventoryFood(context.inventory, itemKey);
        const healAmount = getHealAmountByItemKey(
          context.character.health.max,
          itemKey
        );
        const { current, max } = context.character.health;
        const heal = healAmount + current <= max ? healAmount + current : max;

        return {
          character: {
            ...context.character,
            health: {
              ...context.character.health,
              current: heal
            }
          },
          inventory: newInventory
        };
      }),
      healToFull: assign((context, _) => ({
        character: {
          ...context.character,
          health: {
            ...context.character.health,
            current: context.character.health.max
          }
        },
        log: "You have been fully healed!"
      })),
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
          health: {
            ...context.character.health,
            current: playerHealth
          }
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
      onRevive: assign((context, _) => {
        return {
          character: {
            ...context.character,
            health: {
              ...context.character.health,
              current: context.character.health.max
            }
          },
          inventory: loseRandomInventoryOnDeath(context.inventory),
          log: "After some rest, you have recovered to your full strength!"
        };
      }),
      addLog: assign((context, { log }): any => ({
        logs: generateLog(context.logs, log)
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
    }
  }
);

export default GameMachine;
