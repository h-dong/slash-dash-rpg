import React from "react";
import FULL_ITEMS, { ITEMS } from "../database/items";
import { Tooltip } from "react-tippy";
import styled from "styled-components";

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
  send: any,
};

const WorldPanelInn = ({ send }: Props) => {
  const itemsForSale = FULL_ITEMS.filter(elem => elem.key !== ITEMS.COIN).map(
    elem => (
      <Tooltip
        title={`${elem.name} - ${elem.description}`}
        position="right"
        trigger="mouseenter"
        key={elem.id}
      >
        <div className="item border border-dark">
          <img alt={elem.name} src={elem.icon} />
          <span className="label label-default">(0)</span>
        </div>
      </Tooltip>
    )
  );
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
          <button type="button" className="btn btn-success" onClick={() => send({ type: 'HEAL_TO_FULL' })}>
            Heal
          </button>
        </div>
      </InnActionWrapper>
    </React.Fragment>
  );
};

export default WorldPanelInn;
