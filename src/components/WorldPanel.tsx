import React, { useState } from "react";
import WorldPanelShop from "./WorldPanelShop";
import WorldPanelDrops from "./WorldPanelDrops";
import FULL_MAPS, { MAPS } from "../database/maps";
import { GameMachineContextInterface } from "../machines/GameMachine";
import WorldPanelActions from "./WorldPanelAction";
import { ITEMS } from "../database/items";
import styled from "styled-components";
import CollapseChevron from "../atomic/CollapseChevron";

export interface ItemDropsInterface {
  itemKey: ITEMS;
  quantity: number;
}

const CardHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

type Props = {
  send: any;
  state: GameMachineContextInterface;
};

const WorldPanel = ({ send, state }: Props) => {
  const [collapse, setCollapse] = useState<boolean>(false);
  const { character, location } = state;
  const [drops, setDrops] = useState<ItemDropsInterface[]>([]);

  const renderActionsAndDrops = () => {
    if (location === MAPS.SHOP) {
      return <WorldPanelShop />;
    } else {
      return (
        <div>
          <WorldPanelActions
            send={send}
            character={character}
            location={location}
            setDrops={setDrops}
          />
          <WorldPanelDrops send={send} drops={drops} setDrops={setDrops} />
        </div>
      );
    }
  };

  const locationName = FULL_MAPS.find(elem => elem.key === location)?.name;

  return (
    <div className="card border-secondary mb-3">
      <div className="card-header">
        <CardHeaderWrapper>
          <span>{`Current Location - ${locationName}`}</span>
          <CollapseChevron collapse={collapse} setCollapse={setCollapse} />
        </CardHeaderWrapper>
      </div>
      {!collapse && <div className="card-body">{renderActionsAndDrops()}</div>}
    </div>
  );
};

export default WorldPanel;
