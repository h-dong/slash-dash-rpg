import { Machine, assign } from "xstate";
import {
  moveEquipmentItemToInventory,
  moveInventoryItemToEquipment,
  addItemToInventory
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

export interface CharacterInterface {
  health: number;
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

export interface BattleMonsterInterface {
  monsterKey: MONSTERS;
  combatantType: COMBATANT_TYPE;
  health: number;
  stats: CombatStatsInterface;
}

export interface BattleInterface {
  monster: BattleMonsterInterface;
  player: {
    health: number;
  };
}

export interface WorldInterface {
  location: MAPS;
  monsters: MONSTERS[];
  drops: ITEMS[];
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
  drops: ITEMS[];
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
          CHANGE_LOCATION: {
            actions: "changeLoction"
          }
        }
      },
      battle: {
        on: {
          UPDATE_BATTLE: {
            actions: "updateBattle"
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
            actions: "addLog"
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
          }
        }
      },
      dead: {
        on: {
          REVIVE: {
            target: "explore",
            actions: "emptyInventory"
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
      setDrops: assign((context, { drops }) => ({
        world: { ...context.world, drops }
      })),
      pickUpItem: assign((context, { itemKey, itemQuantity }) => ({
        inventory: addItemToInventory(context.inventory, itemKey, itemQuantity)
      })),
      setBattle: assign((context, { monsterKey }) => {
        let battle = null;
        const monsterObj = getStatsByMonsterKey(monsterKey);
        if (monsterObj) {
          battle = {
            monster: monsterObj,
            player: {
              health: context.character.health
            }
          };
        }
        return { battle, log: "Prepare for battle!" };
      }),
      updateBattle: assign((context, { monsterHealth, playerHealth }) => {
        if (!context.battle) return { battle: null };
        const player = {
          ...context.battle.player,
          health: playerHealth
        };
        const monster = {
          ...context.battle.monster,
          health: monsterHealth
        };
        return {
          battle: {
            player,
            monster
          }
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
