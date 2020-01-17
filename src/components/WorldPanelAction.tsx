import React from "react";
import styled from "styled-components";
import { Tooltip } from "react-tippy";
import {
  getRandomNumByMinMax,
  getRandomBooleanByProbability
} from "../utils/random";
import FULL_MAPS, {
  MAPS,
  TreasureInterface,
  MapInterface
} from "../database/maps";
import FULL_MONSTERS, { MONSTERS } from "../database/monsters";

import "react-tippy/dist/tippy.css";
import { ItemDropsInterface } from "./WorldPanel";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  .explore {
    display: flex;
    justify-content: center;
    margin-top: 0.5rem;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    margin-top: 1rem;
    margin-bottom: 0;
    padding: 0.25rem;

    li {
      display: flex;
      list-style: none;
      border: 1px solid transparent;
      padding: 0.5rem;

      &:hover {
        cursor: pointer;
        border: 1px solid grey;
      }

      .monster {
        width: 3rem;
        height: 3rem;
      }
    }
  }
`;

interface WorldPanelActionsInterface {
  send: any;
  location: MAPS;
  setDrops: React.Dispatch<React.SetStateAction<ItemDropsInterface[]>>;
  monsters: MONSTERS[];
  setMonsters: React.Dispatch<React.SetStateAction<MONSTERS[]>>;
  setOpponent: React.Dispatch<React.SetStateAction<MONSTERS | null>>;
}

const WorldPanelActions = ({
  send,
  location,
  setDrops,
  monsters,
  setMonsters,
  setOpponent
}: WorldPanelActionsInterface) => {
  const generateMonsters = () => {
    const fullMap: MapInterface | null =
      FULL_MAPS.find(map => map.key === location) || null;
    const monstersOnMap = fullMap?.monsters;
    if (monstersOnMap) {
      const tempMonsters: MONSTERS[] = monstersOnMap.map(
        elem => elem.monsterKey
      );
      setMonsters(tempMonsters);
    }
  };

  const generateItems = () => {
    const treasure: TreasureInterface[] | null =
      FULL_MAPS.find(map => map.key === location)?.treasure || null;

    if (treasure) {
      const tempDrops: ItemDropsInterface[] = [];
      treasure.forEach(elem => {
        const showDrop = getRandomBooleanByProbability(elem.rarity);
        if (showDrop) {
          const quantity = getRandomNumByMinMax(
            elem.quantity.min,
            elem.quantity.max
          );
          tempDrops.push({ itemKey: elem.itemKey, quantity });
        }
      });
      setDrops(tempDrops);
    }
  };

  const generate = () => {
    generateItems();
    generateMonsters();
  };

  const monsterClicked = (index: number) => {
    setOpponent(monsters[index]);
    send({ type: "START_BATTLE", log: "Prepare for battle!" });
  };

  const renderMonsters = () => {
    return monsters.map((monsterKey, index) => {
      const fullMonster = FULL_MONSTERS.find(elem => elem.key === monsterKey);

      if (!fullMonster) return null;

      return (
        <Tooltip
          title={`Attack ${fullMonster.name} (Level ${fullMonster.level})`}
          position="bottom"
          trigger="mouseenter"
          key={monsterKey}
        >
          <li onClick={() => monsterClicked(index)}>
            <img
              className="monster"
              alt={fullMonster.name}
              src={fullMonster.icon}
            />
          </li>
        </Tooltip>
      );
    });
  };

  return (
    <Wrapper>
      <div className="explore">
        <button className="btn btn-primary" onClick={generate}>
          Explore
        </button>
      </div>
      <ul>{renderMonsters()}</ul>
    </Wrapper>
  );
};

export default WorldPanelActions;
