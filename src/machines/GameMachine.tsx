import { Machine, assign } from "xstate";
// import LogStates from "./LogStates";
import {
  moveEquipmentItemToInventory,
  moveInventoryItemToEquipment
} from "../utils/itemActions";
import { getTimestamp } from "../utils/dateAndTime";

export interface Character {
  name: string;
  level: number;
  hp: number;
  attack: number;
  strength: number;
  defence: number;
}

export interface Equipments {
  HEAD?: number;
  BODY?: number;
  LEGS?: number;
  MAIN_HAND?: number;
  OFF_HAND?: number;
}

export interface InventoryItemInterface {
  itemId: number;
  quantity: number;
}

export interface GameMachineContextInterface {
  character: Character;
  equipments: Equipments;
  inventory: InventoryItemInterface[];
  logs: string;
}

export type GameMachineEvents = {
  type:
    | "DIE"
    | "REVIVE"
    | "UNEQUIP_ITEM"
    | "EXAMINE_ITEM"
    | "EQUIP_ITEM"
    | "ADD_LOG"
    | "LOG_ADDED";
  itemId: number;
  log: string;
};

const GameMachine = Machine<GameMachineContextInterface, GameMachineEvents>(
  {
    id: "game",
    initial: "alive",
    states: {
      alive: {
        on: {
          DIE: "dead",
          UNEQUIP_ITEM: {
            actions: "unequipItem"
          },
          EQUIP_ITEM: {
            actions: "equipItem"
          },
          EXAMINE_ITEM: {
            actions: "addLog"
          }
        }
        // ...LogStates
      },
      dead: {
        on: {
          REVIVE: "alive"
        }
      }
    }
  },
  {
    actions: {
      unequipItem: assign((context, { itemId }) =>
        moveEquipmentItemToInventory(
          context.equipments,
          context.inventory,
          itemId
        )
      ),
      equipItem: assign((context, { itemId }) =>
        moveInventoryItemToEquipment(
          context.equipments,
          context.inventory,
          itemId
        )
      ),
      addLog: assign((context, { log }): any => ({
        logs: `<span>${getTimestamp()} - ${log}</span><br />${context.logs}`
      }))
    }
  }
);

export default GameMachine;
