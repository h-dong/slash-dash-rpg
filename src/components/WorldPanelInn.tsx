import React from "react";
import { Tooltip } from "react-tippy";
import styled from "styled-components";
import {
  ShopDataInterface,
  ShopDataItemInterface
} from "../machines/GameMachine";
import { getItemByKey } from "../utils/itemHelper";

const ShopWrapper = styled.div`
  .items {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    .item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 4rem;
      height: 4rem;
      margin: 0.25rem;

      &:hover {
        cursor: pointer;
      }
    }
  }
`;

const InnActionWrapper = styled.div`
  h6 {
    margin-top: 1rem;
  }

  .buttons {
    display: flex;
    justify-content: space-around;
  }
`;

type Props = {
  send: any;
  itemsInShop: ShopDataInterface;
};

const WorldPanelInn = ({ send, itemsInShop }: Props) => {
  console.log("CLG: WorldPanelInn -> itemsInShop", itemsInShop);

  const shopItems: ShopDataItemInterface[] = itemsInShop.items;
  const itemsForSale = shopItems.map(elem => {
    const fullItem = getItemByKey(elem.key);
    return (
      <Tooltip
        title={`${fullItem?.name} - ${fullItem?.description}`}
        position="right"
        trigger="mouseenter"
        key={fullItem?.id}
      >
        <div className="item border border-dark">
          <img alt={fullItem?.name} src={fullItem?.icon} />
          <span className="label label-default">({elem.quantity})</span>
        </div>
      </Tooltip>
    );
  });
  return (
    <React.Fragment>
      <ShopWrapper>
        <h6 className="text-center">Shop</h6>
        <div className="items">{itemsForSale}</div>
      </ShopWrapper>
      <InnActionWrapper>
        <h6 className="text-center">Inn Services</h6>
        <div className="buttons">
          <button type="button" className="btn btn-primary" disabled>
            Quests
          </button>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => send({ type: "HEAL_TO_FULL" })}
          >
            Heal
          </button>
        </div>
      </InnActionWrapper>
    </React.Fragment>
  );
};

export default WorldPanelInn;
