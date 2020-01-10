// import React from "react";
// import styled from "styled-components";
// import { Tooltip } from "react-tippy";

// import "react-tippy/dist/tippy.css";

// const Wrapper = styled.div`
//   padding: 0.5rem;

//   .drops {
//     display: flex;
//     flex-wrap: wrap;
//     box-sizing: border-box;
//     border-top: 1px solid grey;
//     border-bottom: 1px solid grey;
//     padding: 0.25rem;

//     li {
//       display: flex;
//       flex-direction: column;
//       justify-content: center;
//       align-items: center;
//       width: 3rem;
//       height: 3.5rem;
//       padding: 0.25rem;
//       list-style: none;
//       box-sizing: border-box;

//       &:hover {
//         cursor: pointer;
//         border: 1px solid grey;
//       }
//     }
//   }
// `;

// const WorldPanelDrops = ({ inventory, pickUpItem, drops, setDrops }) => {
//   const itemClick = index => {
//     const tempDrops = [...drops];
//     const itemSelected = tempDrops[index];
//     pickUpItem(inventory, itemSelected.item, itemSelected.quantity);
//     tempDrops.splice(index, 1);
//     setDrops(tempDrops);
//   };

//   const renderItems = () => {
//     return drops.map(({ item, quantity }, index) => {
//       return (
//         <Tooltip
//           title={`Pick up ${item.name}`}
//           position="bottom"
//           trigger="mouseenter"
//           key={item.key}
//         >
//           <li onClick={() => itemClick(index)}>
//             <img alt={item.name} src={item.icon} />({quantity})
//           </li>
//         </Tooltip>
//       );
//     });
//   };

//   return (
//     <Wrapper>
//       {drops.length > 0 && <ul className="drops">{renderItems()}</ul>}
//     </Wrapper>
//   );
// };

const WorldPanelDrops = () => {};

export default WorldPanelDrops;
