import React from "react";
import { useMachine } from "@xstate/react";
import ViewMachine, { VIEW } from "./machines/ViewMachine";
import Welcome from "./views/Welcome";
import Dashboard from "./views/Dashboard";

const App = () => {
  const [state, send] = useMachine(ViewMachine);

  return (
    <React.Fragment>
      {state.matches("welcome") ? (
        <Welcome send={send} view={VIEW.DASHBOARD} />
      ) : null}
      {state.matches("game") ? <Dashboard sendToViewMachine={send} /> : null}
    </React.Fragment>
  );
};

export default App;
