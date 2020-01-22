import React from "react";
import styled from "styled-components";
import { Tooltip } from "react-tippy";
import {
  getRandomNumByMinMax,
  getRandomBooleanByProbability
} from "../utils/random";
import FULL_MAPS, {
  MAP,
  TreasureInterface,
  MapMonsterInterface
} from "../database/maps";
import FULL_MONSTERS, { MONSTER } from "../database/monsters";
import { WorldDropsInterface } from "../machines/GameMachine";

import "react-tippy/dist/tippy.css";

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
  location: MAP;
  monsters: MONSTER[];
}

const WorldPanelActions = ({
  send,
  location,
  monsters
}: WorldPanelActionsInterface) => {
  const generateMonsters = () => {
    const monstersOnMap: MapMonsterInterface[] | null =
      FULL_MAPS.find(map => map.key === location)?.monsters || null;

    if (monstersOnMap) {
      const monstersAppeared: MONSTER[] = [];
      monstersOnMap.forEach(elem => {
        const showMonster = getRandomBooleanByProbability(elem.chanceOfAppear);
        if (showMonster) {
          monstersAppeared.push(elem.monsterKey);
        }
      });
      send({ type: "SET_MONSTERS", monsters: monstersAppeared });
    }
  };

  const generateItems = () => {
    const treasure: TreasureInterface[] | null =
      FULL_MAPS.find(map => map.key === location)?.treasure || null;

    if (treasure) {
      const drops: WorldDropsInterface[] = [];
      treasure.forEach(elem => {
        const showDrop = getRandomBooleanByProbability(elem.rarity);
        if (showDrop) {
          const quantity: number = getRandomNumByMinMax(
            elem.quantity.min,
            elem.quantity.max
          );
          drops.push({ itemKey: elem.itemKey, quantity });
        }
      });
      send({ type: "SET_DROPS", drops });
    }
  };

  const generate = () => {
    generateItems();
    generateMonsters();
  };

  const monsterClicked = (index: number) => {
    send({
      type: "START_BATTLE",
      monsterKey: monsters[index]
    });
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
