import { Machine, assign } from "xstate";
import {
  moveEquipmentItemToInventory,
  moveInventoryItemToEquipment,
  addItemToInventory,
  addItemToDrops,
  consumeInventoryFood,
  getHealAmountByItemKey,
  loseRandomInventoryOnDeath
} from "../utils/itemActions";
import FULL_MAPS, { MAPS } from "../database/maps";
import { ITEMS } from "../database/items";
import { generateLog } from "../utils/logs";
import { setData } from "../services/data";
import { MONSTERS } from "../database/monsters";
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
  HEAD?: ITEMS;
  BODY?: ITEMS;
  LEGS?: ITEMS;
  MAIN_HAND?: ITEMS;
  OFF_HAND?: ITEMS;
}

export interface InventoryItemInterface {
  itemKey: ITEMS;
  quantity: number;
}

export interface BattleInterface {
  monsterKey: MONSTERS;
  combatantType: COMBATANT_TYPE;
  health: number;
  stats: CombatStatsInterface;
}

export interface WorldDropsInterface {
  itemKey: ITEMS;
  quantity: number;
}

export interface WorldInterface {
  location: MAPS;
  monsters: MONSTERS[];
  drops: WorldDropsInterface[];
}

export interface GameMachineContextInterface {
  character: CharacterInterface;
  equipments: EquipmentsInterface;
  inventory: InventoryItemInterface[];
  logs: string;
  world: WorldInterface;
  battle: BattleInterface | null;
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
    | "ADD_LOG"
    | "CHANGE_LOCATION";
  itemKey: ITEMS;
  itemQuantity: number;
  log: string;
  location: MAPS;
  monsters: MONSTERS[];
  monsterKey: MONSTERS;
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
          CONSUME_FOOD: {
            actions: "consumeFood"
          },
          HEAL_TO_FULL: {
            actions: "healToFull"
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
        const newMonsters: MONSTERS[] = context.world.monsters.filter(
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
      persist: ({ character, equipments, inventory }, _) => {
        setData({ character, equipments, inventory });
      }
    }
  }
);

export default GameMachine;
