import { Machine } from "xstate";
import { getData, setData, clearData, DataInterface } from "../services/data";
import { getHealthByLevel } from "../utils/levelHelper";
import { ITEM } from "../database/items";
import { generateShopItems } from "../utils/shopHelper";

export enum VIEW {
  DASHBOARD = "DASHBOARD",
  SETTINGS = "SETTINGS",
  WELCOME = "WELCOME"
}

const newCharacterStats: DataInterface = {
  character: {
    health: {
      current: getHealthByLevel(1),
      max: getHealthByLevel(1)
    },
    name: "",
    attack: 0,
    strength: 0,
    defence: 0
  },
  equipments: {},
  inventory: [
    {
      itemKey: ITEM.WOODEN_SWORD,
      quantity: 1
    },
    {
      itemKey: ITEM.WOODEN_SHIELD,
      quantity: 1
    }
  ],
  itemsInShop: generateShopItems()
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
            newCharacterStats.character.name = name;
            setData(newCharacterStats);
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
