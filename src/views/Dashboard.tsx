import React from "react";
import styled from "styled-components";
import LevelPanel from "../components/LevelPanel";
import { useMachine } from "@xstate/react";
import GameMachine from "../machines/GameMachine";
import InventoryPanel from "../components/InventoryPanel";
import EquipmentsPanel from "../components/EquipmentsPanel";
import LogsPanel from "../components/LogsPanel";
import { getData } from "../services/data";
import { MAPS } from "../database/maps";
import WorldPanel from "../components/WorldPanel";

import "react-tippy/dist/tippy.css";
import { generateLog } from "../utils/logs";
import TravelPanel from "../components/TravelPanel";
import RevivePanel from "../components/RevivePanel";

const Wrapper = styled.div`
  padding: 1rem;

  .menu,
  .level-panel,
  .equipments-panel,
  .log-panel,
  .world-panel {
    margin-bottom: 1rem;
  }
`;

const Dashboard = ({ sendToViewMachine }: any) => {
  const MachineWithContext = GameMachine.withContext({
    ...getData(),
    logs: generateLog("", "Welcome back, traveller!"),
    battle: null,
    world: {
      location: MAPS.TRAINING_GROUND,
      monsters: [],
      drops: []
    }
  });
  const [state, send] = useMachine(MachineWithContext);

  if (!state.context) return null;

  const { character, equipments, inventory, world, logs } = state.context;

  return (
    <Wrapper className="container">
      <div className="row menu">
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
        <div className="col-lg-4 col-12">
          <LevelPanel character={character} equipments={equipments} />
          {state.value !== "dead" && (
            <React.Fragment>
              <EquipmentsPanel send={send} equipments={equipments} />
              <InventoryPanel send={send} inventory={inventory} />
            </React.Fragment>
          )}
        </div>
        <div className="col-lg-8 col-12">
          <LogsPanel logs={logs} />
          {state.value !== "dead" && <WorldPanel send={send} state={state} />}
          {state.value === "explore" && (
            <TravelPanel send={send} location={world.location} />
          )}
          {state.value === "dead" && <RevivePanel send={send} />}
        </div>
      </div>
    </Wrapper>
  );
};

export default Dashboard;
