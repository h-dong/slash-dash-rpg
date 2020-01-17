import React, { useState } from "react";
import styled from "styled-components";
import { getLevel, getHealth } from "../utils/levelHelper";
import { MAX_LEVEL } from "../config";
import {
  CharacterInterface,
  EquipmentsInterface
} from "../machines/GameMachine";
import CollapseChevron from "../atomic/CollapseChevron";
import { calcEquipmentsBonusStats } from "../utils/itemHelper";

const MaxLevelWrapper = styled.small`
  margin-left: 0.5rem;
`;

const CardHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LevelWrapper = styled.div`
  display: flex;
  flex-direction: column;

  ul {
    display: flex;
    justify-content: space-between;
    margin: 0;
    padding: 0.25rem 0.5rem 0 0.5rem;
    font-size: small;
    font-weight: bold;

    &:first-child {
      text-align: left;
    }

    &:last-child {
      text-align: right;
      padding-bottom: 0.25rem;
    }

    li {
      list-style-type: none;
      font-size: 1rem;
    }
  }
`;

type Props = {
  character: CharacterInterface;
  equipments: EquipmentsInterface;
};

const LevelPanel = ({ character, equipments }: Props) => {
  const [collapse, setCollapse] = useState<boolean>(false);

  if (!character) return null;

  const characterLevel = getLevel(
    character.attack,
    character.strength,
    character.defence
  );

  const characterHealth = getHealth(
    character.attack,
    character.strength,
    character.defence
  );

  const equipmentBonusStats = calcEquipmentsBonusStats(equipments);

  const attack = character.attack + Number(equipmentBonusStats?.attack);
  const strength = character.strength + Number(equipmentBonusStats?.strength);
  const defence = character.defence + Number(equipmentBonusStats?.defence);
  const movementSpeed = 0 + Number(equipmentBonusStats?.movementSpeed);

  return (
    <div className="card border-secondary mb-3">
      <div className="card-header">
        <CardHeaderWrapper>
          <div>
            {`Level ${characterLevel}`}
            <MaxLevelWrapper className="text-center">
              (Max level {MAX_LEVEL})
            </MaxLevelWrapper>
          </div>
          <CollapseChevron collapse={collapse} setCollapse={setCollapse} />
        </CardHeaderWrapper>
      </div>
      {!collapse && (
        <div className="card-body">
          <LevelWrapper>
            <ul>
              <li>HP</li>
              <li>{characterHealth}</li>
            </ul>
            <ul>
              <li>Attack</li>
              <li>{attack}</li>
            </ul>
            <ul>
              <li>Strength</li>
              <li>{strength}</li>
            </ul>
            <ul>
              <li>Defence</li>
              <li>{defence}</li>
            </ul>
            <ul>
              <li>Movement Speed</li>
              <li>{movementSpeed}</li>
            </ul>
          </LevelWrapper>
        </div>
      )}
    </div>
  );
};

export default LevelPanel;
