// import { Machine } from "xstate";

// interface LogMachineContext {
//   log: string;
// }

// interface LogMachineEvents {
//   type: "ADD_LOG" | "LOG_ADDED";
//   name: string;
// }

// const LogMachine = Machine<LogMachineContext, LogMachineEvents>({
//   id: "log",
//   initial: "idle",
//   context: {
//     log: ""
//   },
//   states: {
//     idle: {
//       on: {
//         ADD_LOG: "adding"
//       }
//     },
//     adding: {
//       on: {
//         LOG_ADDED: "idle"
//       }
//     }
//   }
// });

const LogStates = {
  id: "log",
  initial: "idle",
  // context: {
  //   log: ""
  // },
  states: {
    idle: {
      on: {
        ADD_LOG: "adding"
      }
    },
    adding: {
      on: {
        LOG_ADDED: "idle"
      }
    }
  }
};

export default LogStates;
