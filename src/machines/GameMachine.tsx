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

export interface GameMachineContextInterface {
  character: CharacterInterface;
  equipments: EquipmentsInterface;
  inventory: InventoryItemInterface[];
  logs: string;
  location: MAPS;
}

export type GameMachineEvents = {
  type:
    | "DIE"
    | "REVIVE"
    | "START_BATTLE"
    | "END_BATTLE"
    | "UNEQUIP_ITEM"
    | "EXAMINE_ITEM"
    | "EQUIP_ITEM"
    | "PICK_UP_ITEM"
    | "ADD_LOG"
    | "CHANGE_LOCATION";
  itemKey: ITEMS;
  itemQuantity: number;
  log: string;
  location: MAPS;
};

const GameMachine = Machine<GameMachineContextInterface, GameMachineEvents>(
  {
    id: "game",
    initial: "battle",
    states: {
      explore: {
        on: {
          DIE: "dead",
          START_BATTLE: {
            target: "battle",
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
          },
          CHANGE_LOCATION: {
            actions: "changeLoction"
          }
        }
      },
      battle: {
        on: {
          DIE: "dead",
          END_BATTLE: "explore",
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
        }
      },
      dead: {
        on: {
          REVIVE: "explore"
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
      pickUpItem: assign((context, { itemKey, itemQuantity }) => ({
        inventory: addItemToInventory(context.inventory, itemKey, itemQuantity)
      })),
      addLog: assign((context, { log }): any => ({
        logs: generateLog(context.logs, log)
      })),
      changeLoction: assign((context, { location }) => {
        const mapName = FULL_MAPS.find(map => map.key === location)?.name;
        return {
          location,
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
