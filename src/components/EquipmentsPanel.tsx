import React from "react";
import styled from "styled-components";
import { Tooltip } from "react-tippy";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusSquare } from "@fortawesome/free-solid-svg-icons";
import { WEAR_POSITION } from "../database/items";
import {
  getEquippedItemActions,
  EquipmentItemActionInterface
} from "../utils/itemActions";
import { getItemByKey } from "../utils/findItem";

const EquipmentsWrapper = styled.div`
  .slot {
    margin-bottom: 0.5rem;

    &-filled {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .item-name {
        margin: 0.25rem;
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

const EquipmentsPanel = ({ send, equipments }: any) => {
  const equipmentSlots = [
    {
      name: "Head",
      position: WEAR_POSITION.HEAD,
      itemKey: null
    },
    {
      name: "Body",
      position: WEAR_POSITION.BODY,
      itemKey: null
    },
    {
      name: "Legs",
      position: WEAR_POSITION.LEGS,
      itemKey: null
    },
    {
      name: "Main-hand",
      position: WEAR_POSITION.MAIN_HAND,
      itemKey: null
    },
    {
      name: "Off-hand",
      position: WEAR_POSITION.OFF_HAND,
      itemKey: null
    }
  ];

  // fill equipments into slot
  Object.keys(equipments).forEach(key => {
    const itemKey = equipments[key];
    const fullItem = getItemByKey(itemKey);
    const itemSlot: any = equipmentSlots.find(slot =>
      fullItem?.equipment
        ? slot.position === fullItem.equipment.position
        : false
    );
    itemSlot.itemKey = itemKey;
  });

  const renderItemActions = (actions: EquipmentItemActionInterface[]) => {
    if (!actions) return null;

    return actions.map(({ type, itemKey }: EquipmentItemActionInterface) => (
      <Tooltip
        title="Examine"
        position="right"
        trigger="mouseenter"
        key="examine"
        className="item-action"
      >
        <FontAwesomeIcon
          icon={faMinusSquare}
          onClick={() => send({ type, itemKey })}
        />
      </Tooltip>
    ));
  };

  const renderEquipments = () => {
    return equipmentSlots.map(({ name, itemKey }: any) => {
      const fullItem = getItemByKey(itemKey);

      if (!itemKey || !fullItem || !fullItem.equipment) {
        return (
          <div key={name} className="slot">
            <strong>{name}</strong>
            <div>Empty</div>
          </div>
        );
      }

      // const { position } = fullItem.equipment;
      const actions = getEquippedItemActions(itemKey);

      return (
        <div key={name} className="slot">
          <strong>{name}</strong>
          <div className="slot-filled">
            <Tooltip
              title={fullItem.name}
              position="right"
              trigger="mouseenter"
              className="item-name"
              key={fullItem.id}
            >
              <div className="item">
                <img alt={fullItem.name} src={fullItem.icon} />
              </div>
            </Tooltip>
            <div>{renderItemActions(actions)}</div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="card border-secondary mb-3">
      <div className="card-header">Equipments</div>
      <div className="card-body">
        <EquipmentsWrapper>{renderEquipments()}</EquipmentsWrapper>
      </div>
    </div>
  );
};

export default EquipmentsPanel;
