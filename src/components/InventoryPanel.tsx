import React, { useState } from "react";
import styled from "styled-components";
import { Tooltip } from "react-tippy";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuestionCircle,
  faPlusSquare,
  faUtensils,
  faTrashAlt,
  faCoins
} from "@fortawesome/free-solid-svg-icons";
import {
  getInventoryItemActions,
  InventoryItemActionInterface
} from "../utils/itemActions";
import { getItemByKey } from "../utils/itemHelper";
import { InventoryItemInterface } from "../machines/GameMachine";
import CollapseChevron from "../atomic/CollapseChevron";
import { toNumberWithUnits } from "../utils/shopHelper";
import ItemDetails from "../atomic/ItemDetails";
import SHOP from "../database/shop";

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
  isInShop: boolean;
};

const InventoryPanel = ({ send, inventory, isInShop }: Props) => {
  const [collapse, setCollapse] = useState<boolean>(false);

  const getIcon = (send: any, action: InventoryItemActionInterface) => {
    const fullItem = getItemByKey(action.itemKey);
    switch (action.type) {
      case "EXAMINE_ITEM":
        return (
          <Tooltip
            title="Examine"
            position="top"
            trigger="mouseenter"
            key="examine"
            className="item-action"
            arrow
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
            position="top"
            trigger="mouseenter"
            key="equip"
            className="item-action"
            arrow
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
            position="top"
            trigger="mouseenter"
            key="consume"
            className="item-action"
            arrow
          >
            <FontAwesomeIcon
              icon={faUtensils}
              onClick={() =>
                send({ type: action.type, itemKey: action.itemKey })
              }
            />
          </Tooltip>
        );
      case "DROP_ITEM":
        return (
          <Tooltip
            title={`Drop ${fullItem?.name}`}
            position="top"
            trigger="mouseenter"
            key="drop"
            className="item-action"
            arrow
          >
            <FontAwesomeIcon
              icon={faTrashAlt}
              onClick={() =>
                send({ type: action.type, itemKey: action.itemKey })
              }
            />
          </Tooltip>
        );
      case "SELL_ITEM":
        const shopItem = SHOP.items.find(elem => elem.key === action.itemKey);
        if (!shopItem) break;
        return (
          <Tooltip
            title={`Sell ${fullItem?.name} for ${shopItem.price.sell} gp`}
            position="top"
            trigger="mouseenter"
            key="sell"
            className="item-action"
            arrow
          >
            <FontAwesomeIcon
              icon={faCoins}
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

    const actions = getInventoryItemActions(fullItem, isInShop);
    const availableActions = actions
      .sort((a, b) => a.order - b.order)
      .map(action => getIcon(send, action));
    const formattedQuantity = quantity ? toNumberWithUnits(quantity) : "?";
    const html = (
      <ItemDetails itemKey={itemKey} name={fullItem.name} quantity={quantity} />
    );

    return (
      <div key={fullItem.id} className="item-row">
        <Tooltip position="right" trigger="mouseenter" html={html} arrow>
          <div className="item">
            <img alt={fullItem.name} src={fullItem.icon} />
            <span className="label label-default">({formattedQuantity})</span>
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
