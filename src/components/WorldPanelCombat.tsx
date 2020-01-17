import React, { useState } from "react";
import styled from "styled-components";
import CollapseChevron from "../atomic/CollapseChevron";
import FULL_MONSTERS, { MONSTERS } from "../database/monsters";
import { CharacterInterface } from "../machines/GameMachine";
import { getLevel, generateStatsByLevel } from "../utils/levelHelper";
import ProgressBar from "../atomic/ProgressBar";
import CombatLevels from "../atomic/CombatLevels";

const CardHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CombatProfile = styled.div`
  .header {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;

    img {
      width: 3rem;
      height: 3rem;
      padding: 0.25rem;
    }

    h6 {
      margin-left: 0.25rem;
    }
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 1.5rem 0;
`;

type Props = {
  character: CharacterInterface;
  opponent: MONSTERS | null;
};

const WorldPanelCombat = ({ character, opponent }: Props) => {
  const [collapse, setCollapse] = useState<boolean>(false);

  function renderOpponent() {
    const fullMonster = FULL_MONSTERS.find(monster => monster.key === opponent);
    if (!fullMonster) return null;

    const title = `${fullMonster.name} (Level ${fullMonster.level})`;
    const monsterStats = generateStatsByLevel(fullMonster.level);

    return (
      <CombatProfile>
        <div className="header">
          <span className="border border-secondary">
            <img alt={fullMonster.name} src={fullMonster.icon} />
          </span>
          <h6>{title}</h6>
        </div>
        <ProgressBar now={monsterStats.hp} max={monsterStats.hp} />
        <CombatLevels
          attack={monsterStats.attack}
          strength={monsterStats.strength}
          defence={monsterStats.defence}
        />
      </CombatProfile>
    );
  }

  function renderActions() {
    return (
      <ButtonWrapper>
        <button className="btn btn-primary">Attack</button>
        <button className="btn btn-warning">Escape</button>
      </ButtonWrapper>
    );
  }

  function renderCharacter() {
    const level = getLevel(
      character.attack,
      character.strength,
      character.defence
    );
    const title = `${character.name} (Level ${level})`;
    return (
      <CombatProfile>
        <h6>{title}</h6>
        <ProgressBar now={character.health} max={character.health} />
        <CombatLevels
          attack={character.attack}
          strength={character.strength}
          defence={character.defence}
        />
      </CombatProfile>
    );
  }

  return (
    <div className="card border-secondary mb-3">
      <div className="card-header">
        <CardHeaderWrapper>
          <span>Fight!</span>
          <CollapseChevron collapse={collapse} setCollapse={setCollapse} />
        </CardHeaderWrapper>
      </div>
      {!collapse && (
        <div className="card-body">
          {renderOpponent()}
          {renderActions()}
          {renderCharacter()}
        </div>
      )}
    </div>
  );
};

export default WorldPanelCombat;
