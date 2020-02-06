import React, { useState } from "react";
import styled from "styled-components";
import {
  getLevel,
  calcCharacterStatsWithItems,
  getMaxHpByLevel,
  getMaxLevel
} from "../utils/levelHelper";
import {
  CharacterInterface,
  EquipmentsInterface
} from "../machines/GameMachine";
import CollapseChevron from "../atomic/CollapseChevron";
import CharacterSkillStat from "../atomic/CharacterSkillStat";

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
  const {
    attack,
    strength,
    defence,
    movementSpeed
  } = calcCharacterStatsWithItems(character, equipments);

  return (
    <div className="card border-secondary mb-3">
      <div className="card-header">
        <CardHeaderWrapper>
          <div>
            {`${character.name} - Level ${characterLevel}`}
            <MaxLevelWrapper className="text-center">
              (Max level {getMaxLevel()})
            </MaxLevelWrapper>
          </div>
          <CollapseChevron collapse={collapse} setCollapse={setCollapse} />
        </CardHeaderWrapper>
      </div>
      {!collapse && (
        <div className="card-body">
          <LevelWrapper>
            <CharacterSkillStat
              label="HP"
              value={`${character.health} / ${getMaxHpByLevel(characterLevel)}`}
            />
            <CharacterSkillStat
              label="Attack"
              value={attack}
              xp={character.attack}
            />
            <CharacterSkillStat
              label="Strength"
              value={strength}
              xp={character.strength}
            />
            <CharacterSkillStat
              label="Defence"
              value={defence}
              xp={character.defence}
            />
            <CharacterSkillStat
              label="Movement Speed"
              value={`${movementSpeed}%`}
            />
          </LevelWrapper>
        </div>
      )}
    </div>
  );
};

export default LevelPanel;
