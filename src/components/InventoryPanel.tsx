import React from "react";
import styled from "styled-components";
import { Tooltip } from "react-tippy";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuestionCircle,
  faPlusSquare
} from "@fortawesome/free-solid-svg-icons";
import PanelHeader from "./PanelHeader";
import {
  getInventoryItemActions,
  InventoryItemActionInterface
} from "../utils/itemActions";
import { getItemByKey } from "../utils/findItem";
import { InventoryItemInterface } from "../machines/GameMachine";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  .empty {
    width: 100%;
    border: 1px solid black;
    border-top: 0;
    padding: 1rem;
    text-align: center;
  }

  .items {
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    border-top: 0;
    text-align: left;
    font-size: small;

    .item-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: 1px solid black;
      margin: 0.25rem;
      padding: 0.25rem;

      .item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 3rem;
        height: 3rem;

        &:hover {
          cursor: pointer;
        }
      }

      .item-action {
        height: 1.5rem;
        margin: 0.25rem;
        font-size: 1.5rem;
        color: #00695c;
        cursor: pointer;
      }
    }
  }
`;

const InventoryPanel = ({
  send,
  inventory
}: {
  send: any;
  inventory: InventoryItemInterface[];
}) => {
  const getIcon = (send: any, action: InventoryItemActionInterface) => {
    switch (action.type) {
      case "EXAMINE_ITEM":
        const fullItem = getItemByKey(action.itemKey);

        return (
          <Tooltip
            title="Examine"
            position="right"
            trigger="mouseenter"
            key="examine"
            className="item-action"
          >
            <FontAwesomeIcon
              icon={faQuestionCircle}
              onClick={() =>
                send({ type: action.type, log: fullItem?.description })
              }
            />
          </Tooltip>
        );
      case "EQUIP_ITEM":
        return (
          <Tooltip
            title="Equip"
            position="right"
            trigger="mouseenter"
            key="equip"
            className="item-action"
          >
            <FontAwesomeIcon
              icon={faPlusSquare}
              onClick={() =>
                send({ type: action.type, itemKey: action.itemKey })
              }
            />
          </Tooltip>
        );
      default:
        return null;
    }
  };

  const renderInventoryItem = ({
    itemKey,
    quantity
  }: InventoryItemInterface) => {
    const fullItem = getItemByKey(itemKey);

    if (!fullItem) return null;

    const actions = getInventoryItemActions(fullItem);

    const availableActions = actions
      .sort((a, b) => a.order - b.order)
      .map(action => getIcon(send, action));

    return (
      <div key={fullItem.id} className="item-row">
        <Tooltip title={fullItem.name} position="right" trigger="mouseenter">
          <div className="item">
            <img alt={fullItem.name} src={fullItem.icon} /> ({quantity})
          </div>
        </Tooltip>
        <div className="item-actions">{availableActions}</div>
      </div>
    );
  };

  const renderInventory = () => {
    if (inventory.length === 0) return <span className="empty">Empty</span>;

    const items = inventory.map((inventoryItem: InventoryItemInterface) =>
      renderInventoryItem(inventoryItem)
    );

    return <div className="items">{items}</div>;
  };

  return (
    <Wrapper className="inventory-panel">
      <PanelHeader name="Inventory" />
      {renderInventory()}
    </Wrapper>
  );
};

export default InventoryPanel;
