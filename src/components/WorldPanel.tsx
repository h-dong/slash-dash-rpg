// import React, { useState } from "react";
// import styled from "styled-components";
// import PanelHeader from "./PanelHeader";
// import fight from "../utils/combat";
// import WorldPanelNavigation from "./WorldPanelNavigation";
// import WorldPanelLogs from "./WorldPanelLogs";
// import WorldPanelShop from "./WorldPanelShop";
// import WorldPanelActions from "./WorldPanelActions";
// import WorldPanelDrops from "./WorldPanelDrops";
// import MAPS from "../database/maps";

// const Wrapper = styled.div`
//   display: flex;
//   flex-direction: column;

//   .panel-body {
//     display: flex;
//     flex-direction: column;
//     justify-content: space-between;
//     border: 1px solid black;
//     border-top: 0;
//     padding: 0.25rem 0.5rem;
//     font-size: small;
//   }
// `;

// const WorldPanel = ({ character, state, log, setLog }) => {
//   const { inventory, pickUpItem } = state;

//   const [drops, setDrops] = useState([]);
//   // const [location, setLocation] = useState(MAPS.SHOP.key);
//   const [location, setLocation] = useState(MAPS.TRAINING_GROUND.key);

//   const renderActionsAndDrops = () => {
//     if (location === MAPS.SHOP.key) {
//       return <WorldPanelShop />;
//     } else {
//       return (
//         <div>
//           <WorldPanelActions
//             character={character}
//             location={location}
//             setDrops={setDrops}
//             setLog={setLog}
//           />
//           <WorldPanelDrops
//             inventory={inventory}
//             pickUpItem={pickUpItem}
//             drops={drops}
//             setDrops={setDrops}
//           />
//         </div>
//       );
//     }
//   };

//   return (
//     <Wrapper className="world-panel">
//       <PanelHeader name={"World"} />
//       <div className="panel-body">
//         <div>
//           <h6>Logs</h6>
//           <WorldPanelLogs log={log} />
//         </div>
//         <div>
//           <hr />
//           <h6>Location - {MAPS[location].name}</h6>
//           {renderActionsAndDrops()}
//         </div>
//         <div>
//           <hr />
//           <h6>Fast Travel</h6>
//           <WorldPanelNavigation setLocation={setLocation} setDrops={setDrops} />
//         </div>
//       </div>
//     </Wrapper>
//   );
// };
const WorldPanel = () => {};

export default WorldPanel;
