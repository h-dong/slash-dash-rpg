import React from "react";
import styled from "styled-components";
import { Tooltip } from "react-tippy";
import { getItemByKey } from "../utils/itemHelper";
import { ItemDropsInterface } from "./WorldPanel";

import "react-tippy/dist/tippy.css";

const Wrapper = styled.div`
  padding-top: 0.5rem;

  .drops {
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    border-top: 1px solid grey;
    padding: 1rem 0 0 0;

    li {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 3rem;
      height: 3.5rem;
      padding: 0.25rem;
      list-style: none;
      box-sizing: border-box;

      &:hover {
        cursor: pointer;
        border: 1px solid grey;
      }
    }
  }
`;

interface WorldPanelDropsInterface {
  send: any;
  drops: ItemDropsInterface[];
  setDrops: React.Dispatch<React.SetStateAction<ItemDropsInterface[]>>;
}

const WorldPanelDrops = ({
  send,
  drops,
  setDrops
}: WorldPanelDropsInterface) => {
  function itemClick(index: number) {
    const tempDrops: ItemDropsInterface[] = [...drops];
    const itemSelected: ItemDropsInterface = tempDrops[index];
    send({
      type: "PICK_UP_ITEM",
      itemKey: itemSelected.itemKey,
      itemQuantity: itemSelected.quantity
    });
    tempDrops.splice(index, 1);
    setDrops(tempDrops);
  }

  const renderItems = () => {
    return drops.map(({ itemKey, quantity }: ItemDropsInterface, index) => {
      const fullItem = getItemByKey(itemKey);

      if (!fullItem) return null;

      return (
        <Tooltip
          title={`Pick up ${fullItem.name}`}
          position="bottom"
          trigger="mouseenter"
          key={itemKey}
        >
          <li onClick={() => itemClick(index)}>
            <img alt={fullItem.name} src={fullItem.icon} />({quantity})
          </li>
        </Tooltip>
      );
    });
  };

  return (
    <Wrapper>
      {drops.length > 0 && <ul className="drops">{renderItems()}</ul>}
    </Wrapper>
  );
};

export default WorldPanelDrops;
