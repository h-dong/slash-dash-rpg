import React, { useState } from "react";
import styled from "styled-components";
import { Tooltip } from "react-tippy";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuestionCircle,
  faPlusSquare,
  faUtensils
} from "@fortawesome/free-solid-svg-icons";
import {
  getInventoryItemActions,
  InventoryItemActionInterface
} from "../utils/itemActions";
import { getItemByKey, getItemCombatStatsTextByKey } from "../utils/itemHelper";
import { InventoryItemInterface } from "../machines/GameMachine";
import CollapseChevron from "../atomic/CollapseChevron";

const CardHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const InventoryWrapper = styled.div`
  .empty {
    display: flex;
    justify-content: center;
  }

  .items {
    display: flex;
    flex-direction: column;
    text-align: left;
    font-size: small;

    .item-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0.5rem 0.25rem;

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

type Props = {
  send: any;
  inventory: InventoryItemInterface[];
};

const InventoryPanel = ({ send, inventory }: Props) => {
  const [collapse, setCollapse] = useState<boolean>(false);

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
      case "CONSUME_FOOD":
        return (
          <Tooltip
            title="Consume"
            position="right"
            trigger="mouseenter"
            key="consume"
            className="item-action"
          >
            <FontAwesomeIcon
              icon={faUtensils}
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

    const itemCombatStatsText = getItemCombatStatsTextByKey(itemKey);
    const tooltipText = itemCombatStatsText
      ? `${fullItem.name} (${itemCombatStatsText})`
      : fullItem.name;

    return (
      <div key={fullItem.id} className="item-row">
        <Tooltip title={tooltipText} position="right" trigger="mouseenter">
          <div className="item">
            <img alt={fullItem.name} src={fullItem.icon} />
            <span className="label label-default">({quantity})</span>
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
    <div className="card border-secondary mb-3">
      <div className="card-header">
        <CardHeaderWrapper>
          <span>Inventory</span>
          <CollapseChevron collapse={collapse} setCollapse={setCollapse} />
        </CardHeaderWrapper>
      </div>
      {!collapse && (
        <div className="card-body">
          <InventoryWrapper>{renderInventory()}</InventoryWrapper>
        </div>
      )}
    </div>
  );
};

export default InventoryPanel;
