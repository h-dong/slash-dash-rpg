import React, { useState } from "react";
import WorldPanelShop from "./WorldPanelShop";
import WorldPanelDrops from "./WorldPanelDrops";
import FULL_MAPS, { MAPS } from "../database/maps";
import { GameMachineContextInterface } from "../machines/GameMachine";
import WorldPanelActions from "./WorldPanelAction";
import { ITEMS } from "../database/items";

export interface ItemDropsInterface {
  itemKey: ITEMS;
  quantity: number;
}

const WorldPanel = ({
  send,
  state
}: {
  send: any;
  state: GameMachineContextInterface;
}) => {
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
      <div className="card-header">{`Current Location - ${locationName}`}</div>
      <div className="card-body">{renderActionsAndDrops()}</div>
    </div>
  );
};

export default WorldPanel;
