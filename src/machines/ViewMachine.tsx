import { Machine } from "xstate";
import { getData, setData, clearData } from "../services/data";
import { Equipments, Character, InventoryItemInterface } from "./GameMachine";
import { WEAR_POSITION, ITEMS } from "../database/items";

export enum VIEW {
  DASHBOARD = "DASHBOARD",
  SETTINGS = "SETTINGS",
  WELCOME = "WELCOME"
}

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
    hp: 20,
    attack: 3,
    strength: 3,
    defence: 3
  } as Character,
  equipments: {
    [WEAR_POSITION.MAIN_HAND]: ITEMS.WOODEN_SWORD
  } as Equipments,
  inventory: [
    {
      itemKey: ITEMS.COIN,
      quantity: 100000
    },
    {
      itemKey: ITEMS.WOODEN_SHIELD,
      quantity: 2
    },
    {
      itemKey: ITEMS.BRONZE_SHIELD,
      quantity: 1
    },
    {
      itemKey: ITEMS.BRONZE_PLATE_LEGS,
      quantity: 1
    },
    {
      itemKey: ITEMS.WOODEN_PLATE_LEGS,
      quantity: 1
    },
    {
      itemKey: ITEMS.WOODEN_SPEAR,
      quantity: 1
    }
  ] as InventoryItemInterface[]
};

const hasData = () =>
  new Promise((resolve, reject) => {
    const data = getData();
    if (data?.character?.name) return resolve();
    return reject();
  });

interface ViewMachineEvents {
  type: "CREATE_CHARACTER" | "DELETE_CHARACTER";
  name: string;
}

const ViewMachine = Machine<{}, ViewMachineEvents>({
  id: "view",
  initial: "initialising",
  states: {
    initialising: {
      invoke: {
        id: "loadSavedData",
        src: hasData,
        onDone: {
          target: "game"
        },
        onError: {
          target: "welcome"
        }
      }
    },
    welcome: {
      on: {
        CREATE_CHARACTER: {
          target: "game",
          actions: (_, { name }) => {
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
  }
});

export default ViewMachine;
