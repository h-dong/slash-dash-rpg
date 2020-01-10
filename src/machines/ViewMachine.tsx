import { Machine } from "xstate";
import { getData, setData, clearData } from "../services/data";
import { Equipments, Character, InventoryItemInterface } from "./GameMachine";
import { WEAR_POSITION } from "../database/items";
import { assign } from "xstate";

export const VIEW = {
  DASHBOARD: "DASHBOARD",
  SETTINGS: "SETTINGS",
  WELCOME: "WELCOME"
};

const calcInitState = () => {
  const data = getData();
  return data?.character.name ? "game" : "welcome";
};

// const newCharacterStats = {
//   level: 1,
//   hp: 20,
//   attack: 1,
//   strength: 1,
//   defence: 1
// };

const testCharacterData = {
  character: {
    name: "asd",
    level: 1,
    hp: 20,
    attack: 1,
    strength: 1,
    defence: 1
  } as Character,
  equipments: {
    [WEAR_POSITION.MAIN_HAND]: 12
  } as Equipments,
  inventory: [
    {
      itemId: 1, // COIN
      quantity: 100000
    },
    {
      itemId: 11, // WOODEN_SHIELD
      quantity: 2
    },
    {
      itemId: 17, // BRONZE_SHIELD
      quantity: 1
    },
    {
      itemId: 16, // BRONZE_PLATE_LEGS
      quantity: 1
    },
    {
      itemId: 10, // WOODEN_PLATE_LEGS
      quantity: 1
    },
    {
      itemId: 13, // WOODEN_SPEAR
      quantity: 1
    }
  ] as InventoryItemInterface[]
};

const ViewMachine = Machine({
  id: "view",
  initial: "initialising",
  states: {
    initialising: {
      invoke: {
        id: "loadSavedData",
        src: new Promise((resolve, reject) => {
          const data = getData();
          if (data?.character?.name) return resolve();
          return reject();
        }),
        onDone: "game",
        onError: "welcome"
      }
    },
    welcome: {
      on: {
        CREATE_CHARACTER: {
          target: "game",
          actions: (context: any, { name }: { name: string }) => {
            testCharacterData.character.name = name;
            setData(testCharacterData);
          }
        }
      }
    },
    game: {
      on: {
        DELETE_CHARACTER: {
          target: "welcome",
          actions: () => clearData()
        }
      }
    }
  } as any
});

export default ViewMachine;
