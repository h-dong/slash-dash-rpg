import React, { useState } from "react";
import WorldPanelShop from "./WorldPanelShop";
import WorldPanelDrops from "./WorldPanelDrops";
import FULL_MAPS, { MAPS } from "../database/maps";
import WorldPanelActions from "./WorldPanelAction";
import { ITEMS } from "../database/items";
import styled from "styled-components";
import CollapseChevron from "../atomic/CollapseChevron";
import WorldPanelCombat from "./WorldPanelCombat";

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
  state: any;
};

const WorldPanel = ({ send, state }: Props) => {
  const [collapse, setCollapse] = useState<boolean>(false);
  const { character, equipments, world, battle } = state.context;

  const renderActionsAndDrops = () => {
    if (world.location === MAPS.SHOP) {
      return <WorldPanelShop />;
    } else {
      return (
        <div>
          <WorldPanelActions
            send={send}
            location={world.location}
            monsters={world.monsters}
          />
          <WorldPanelDrops send={send} drops={world.drops} />
        </div>
      );
    }
  };

  const locationName = FULL_MAPS.find(elem => elem.key === world.location)
    ?.name;

  if (state.value === "battle") {
    return (
      <WorldPanelCombat
        send={send}
        battle={battle}
        character={character}
        equipments={equipments}
      />
    );
  } else {
    return (
      <React.Fragment>
        <div className="card border-secondary mb-3">
          <div className="card-header">
            <CardHeaderWrapper>
              <span>{`Current Location - ${locationName}`}</span>
              <CollapseChevron collapse={collapse} setCollapse={setCollapse} />
            </CardHeaderWrapper>
          </div>
          {!collapse && (
            <div className="card-body">{renderActionsAndDrops()}</div>
          )}
        </div>
      </React.Fragment>
    );
  }
};

export default WorldPanel;
