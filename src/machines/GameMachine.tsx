import { Machine, assign } from "xstate";
import { WEAR_POSITION } from "../database/items";
import { getData } from "../services/data";
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

interface Context {
  character: Character;
  equipments: Equipments;
  inventory: InventoryItemInterface[];
}

export type GameMachineEvents = {
  type: "DIE" | "REVIVE" | "UNEQUIP_ITEM" | "EXAMINE_ITEM" | "EQUIP_ITEM";
  itemId: number;
};

const GameMachine = Machine<Context, GameMachineEvents>(
  {
    id: "character",
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
