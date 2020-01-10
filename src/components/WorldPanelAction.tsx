// import React, { useState } from "react";
// import styled from "styled-components";
// import { Tooltip } from "react-tippy";
// import ITEMS from "../database/items";
// import { getRandomNumByMinMax } from "../utils/random";
// import MAPS from "../database/maps";
// import MONSTERS from "../database/monsters";
// import fight from "../utils/combat";

// import "react-tippy/dist/tippy.css";

// const Wrapper = styled.div`
//   display: flex;
//   flex-direction: column;

//   .explore {
//     margin-top: 0.5rem;
//   }

//   ul {
//     display: flex;
//     flex-wrap: wrap;
//     margin-top: 1rem;
//     margin-bottom: 0;
//     padding: 0.25rem;

//     li {
//       display: flex;
//       list-style: none;
//       border: 1px solid transparent;
//       padding: 0.5rem;

//       &:hover {
//         cursor: pointer;
//         border: 1px solid grey;
//       }

//       .monster {
//         width: 3rem;
//         height: 3rem;
//       }
//     }
//   }
// `;

// const WorldPanelActions = ({ character, location, setDrops, setLog }) => {
//   const [monsters, setMonsters] = useState([]);

//   const generateMonsters = () => {
//     const { monsters: monstersOnMap } = MAPS[location];
//     if (monstersOnMap) {
//       const tempMonsters = monstersOnMap.map(elem => MONSTERS[elem.monster]);
//       setMonsters(tempMonsters);
//     }
//   };

//   const generateItems = () => {
//     const { treasure } = MAPS[location];
//     if (treasure) {
//       const tempDrops = [];
//       treasure.forEach(elem => {
//         // const showDrop = getRandomBooleanByProbability(elem.rarity);
//         const showDrop = true;
//         if (showDrop) {
//           const quantity = getRandomNumByMinMax(
//             elem.quantity.min,
//             elem.quantity.max
//           );
//           const item = ITEMS[elem.item];
//           tempDrops.push({ item, quantity });
//         }
//       });
//       setDrops(tempDrops);
//     }
//   };

//   const generate = () => {
//     generateItems();
//     generateMonsters();
//   };

//   const monsterClicked = index => {
//     console.log("attack!");
//     const monster = monsters[index];
//     console.log(monster);
//     const fightLog = fight(character, monster);
//     console.log(fightLog);
//     setLog(fightLog);
//   };

//   const renderMonsters = () => {
//     return monsters.map((monster, index) => (
//       <Tooltip
//         title={`Attack ${monster.name} (Level ${monster.level})`}
//         position="bottom"
//         trigger="mouseenter"
//         key={monster.key}
//       >
//         <li onClick={() => monsterClicked(index)}>
//           <img className="monster" alt={monster.name} src={monster.icon} />
//         </li>
//       </Tooltip>
//     ));
//   };

//   return (
//     <Wrapper>
//       <div className="explore">
//         <button onClick={generate}>Explore</button>
//       </div>
//       <ul>{renderMonsters()}</ul>
//     </Wrapper>
//   );
// };

const WorldPanelActions = () => {};

export default WorldPanelActions;
