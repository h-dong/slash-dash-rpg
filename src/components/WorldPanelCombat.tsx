import React, { useState } from "react";
import styled from "styled-components";
import CollapseChevron from "../atomic/CollapseChevron";
import { MONSTERS } from "../database/monsters";
import { CharacterInterface } from "../machines/GameMachine";

const CardHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CombatWrapper = styled.div`
  .section {
    margin-bottom: 1rem;
  }
`;

type Props = {
  character: CharacterInterface;
  opponent: MONSTERS | null;
};

const WorldPanelCombat = ({ character, opponent }: Props) => {
  const [collapse, setCollapse] = useState<boolean>(false);

  return (
    <div className="card bg-light border-secondary mb-3">
      <div className="card-header">
        <CardHeaderWrapper>
          <span>Fight!</span>
          <CollapseChevron collapse={collapse} setCollapse={setCollapse} />
        </CardHeaderWrapper>
      </div>
      {!collapse && (
        <div className="card-body">
          <CombatWrapper>
            <div className="section">
              <span>Opponent</span>
              <div className="progress">
                <div
                  className="progress-bar progress-bar-striped bg-danger"
                  role="progressbar"
                  style={{ width: "100%" }}
                  aria-valuenow={100}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  100/100
                </div>
              </div>
            </div>
            <div className="section">
              <button className="btn btn-primary">Attack</button>
              <button className="btn btn-primary">Escape</button>
            </div>
            <div className="section">
              <span>Character</span>
              <div className="progress">
                <div
                  className="progress-bar progress-bar-striped bg-danger"
                  role="progressbar"
                  style={{ width: "100%" }}
                  aria-valuenow={100}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  100/100
                </div>
              </div>
            </div>
          </CombatWrapper>
        </div>
      )}
    </div>
  );
};

export default WorldPanelCombat;
