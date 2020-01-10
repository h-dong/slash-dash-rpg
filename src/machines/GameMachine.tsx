import { Machine, assign } from "xstate";
import LogStates from "./LogStates";
import {
  moveEquipmentItemToInventory,
  moveInventoryItemToEquipment
} from "../utils/itemActions";

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
            actions: (ctx, event) => {
              console.log("EXAMINE_ITEM", event);
            }
          }
        },
        ...LogStates
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
      examineItem: (context, event) => console.log("examined an item")
    }
  }
);

export default GameMachine;
