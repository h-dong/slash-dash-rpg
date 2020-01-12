import { Machine, assign } from "xstate";
import {
  moveEquipmentItemToInventory,
  moveInventoryItemToEquipment
} from "../utils/itemActions";
import FULL_MAPS, { MAPS } from "../database/maps";
import { ITEMS } from "../database/items";
import { generateLog } from "../utils/logs";

export interface Character {
  name: string;
  level: number;
  hp: number;
  attack: number;
  strength: number;
  defence: number;
}

export interface Equipments {
  HEAD: ITEMS;
  BODY: ITEMS;
  LEGS: ITEMS;
  MAIN_HAND: ITEMS;
  OFF_HAND: ITEMS;
}

export interface InventoryItemInterface {
  itemKey: ITEMS;
  quantity: number;
}

export interface GameMachineContextInterface {
  character: Character;
  equipments: Equipments;
  inventory: InventoryItemInterface[];
  logs: string;
  location: MAPS;
}

export type GameMachineEvents = {
  type:
    | "DIE"
    | "REVIVE"
    | "UNEQUIP_ITEM"
    | "EXAMINE_ITEM"
    | "EQUIP_ITEM"
    | "PICK_UP_ITEM"
    | "ADD_LOG"
    | "CHANGE_LOCATION";
  itemKey: ITEMS;
  log: string;
  location: MAPS;
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
          },
          CHANGE_LOCATION: {
            actions: "changeLoction"
          }
        }
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
      addLog: assign((context, { log }): any => ({
        logs: generateLog(context.logs, log)
      })),
      changeLoction: assign((context, { location }) => {
        const mapName = FULL_MAPS.find(map => map.key === location)?.name;
        return {
          location,
          logs: generateLog(context.logs, `Fast travelled to ${mapName}`)
        };
      })
    }
  }
);

export default GameMachine;
