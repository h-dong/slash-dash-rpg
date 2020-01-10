import React, { useState } from "react";
import styled from "styled-components";
import LevelPanel from "../components/LevelPanel";
import { useMachine } from "@xstate/react";
import GameMachine from "../machines/GameMachine";
import InventoryPanel from "../components/InventoryPanel";
import EquipmentsPanel from "../components/EquipmentsPanel";
import { getData } from "../services/data";
// import WorldPanel from "../components/WorldPanel";

const Wrapper = styled.div`
  padding: 1rem;

  .level-panel {
    width: 15rem;
    margin-bottom: 1rem;
  }
  .equipments-panel {
    width: 15rem;
    margin-bottom: 1rem;
  }
  .inventory-panel {
    width: 15rem;
  }
  .world-panel {
    width: 100%;
  }
`;

const Dashboard = ({ sendToViewMachine }: any) => {
  const MachineWithContext = GameMachine.withContext(getData());
  const [state, send] = useMachine(MachineWithContext);
  // const [log, setLog] = useState("");

  return (
    <Wrapper className="container-fluid">
      <div className="row">
        <div className="col-12 text-center">
          <button
            type="button"
            className="btn btn-danger"
            onClick={(): void =>
              sendToViewMachine({ type: "DELETE_CHARACTER" })
            }
          >
            Delete Character
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-4">
          <LevelPanel character={state.context.character} />
          <EquipmentsPanel send={send} equipments={state.context.equipments} />
          <InventoryPanel send={send} inventory={state.context.inventory} />
        </div>
        <div className="col-8">
          {/* <WorldPanel state={state} log={log} setLog={setLog} /> */}
        </div>
      </div>
    </Wrapper>
  );
};

export default Dashboard;
