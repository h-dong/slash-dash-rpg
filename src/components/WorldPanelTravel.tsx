import React, { useState } from "react";
import styled from "styled-components";
import FULL_MAPS, { MAPS } from "../database/maps";
import CollapseChevron from "../atomic/CollapseChevron";
import { ItemDropsInterface } from "./WorldPanel";
import { MONSTERS } from "../database/monsters";

const CardHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TravelWrapper = styled.ul`
  display: flex;
  justify-content: space-evenly;
  margin: 0;
  padding: 0;

  li {
    display: flex;
    flex-direction: column;
    list-style-type: none;
    padding-bottom: 0;

    span {
      text-align: center;
    }
  }
`;

type Props = {
  send: any;
  currentLocation: MAPS;
  setDrops: React.Dispatch<React.SetStateAction<ItemDropsInterface[]>>;
  setMonsters: React.Dispatch<React.SetStateAction<MONSTERS[]>>;
};

const WorldPanelTravel = ({
  send,
  currentLocation,
  setDrops,
  setMonsters
}: Props) => {
  const [collapse, setCollapse] = useState<boolean>(false);

  const renderButtons = () => {
    return FULL_MAPS.map(map => (
      <li key={map.name}>
        <button
          type="button"
          className="btn btn-link btn-sm"
          disabled={map.key === currentLocation}
          onClick={() => {
            setDrops([]);
            setMonsters([]);
            send({ type: "CHANGE_LOCATION", location: map.key });
          }}
        >
          {map.name}
        </button>
        <span>{map.levelGuide}</span>
      </li>
    ));
  };

  return (
    <div className="card border-secondary mb-3">
      <div className="card-header">
        <CardHeaderWrapper>
          <span>Fast Travel</span>
          <CollapseChevron collapse={collapse} setCollapse={setCollapse} />
        </CardHeaderWrapper>
      </div>
      {!collapse && (
        <div className="card-body">
          <TravelWrapper>{renderButtons()}</TravelWrapper>
        </div>
      )}
    </div>
  );
};

export default WorldPanelTravel;
