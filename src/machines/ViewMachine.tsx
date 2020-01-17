import { Machine } from "xstate";
import { getData, setData, clearData, DataInterface } from "../services/data";
import { getHealth } from "../utils/levelHelper";

export enum VIEW {
  DASHBOARD = "DASHBOARD",
  SETTINGS = "SETTINGS",
  WELCOME = "WELCOME"
}

const newCharacterStats: DataInterface = {
  character: {
    health: getHealth(1, 1, 1),
    name: "",
    attack: 1,
    strength: 1,
    defence: 1
  },
  equipments: {},
  inventory: []
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
