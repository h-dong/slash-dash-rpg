// import React from "react";
// import styled from "styled-components";
// import MAPS from "../database/maps";

// const Wrapper = styled.ul`
//   display: flex;
//   justify-content: space-evenly;
//   margin: 0;
//   padding: 0;

//   li {
//     display: flex;
//     flex-direction: column;
//     list-style-type: none;
//     padding-bottom: 0;
//   }
// `;

// const WorldPanelNavigation = ({ setLocation, setDrops }) => {
//   const navigate = locationKey => {
//     setLocation(locationKey);
//     setDrops([]);
//   };

//   const renderButtons = () => {
//     return Object.keys(MAPS).map(key => {
//       const map = MAPS[key];
//       return (
//         <li key={map.name}>
//           <button
//             type="button"
//             className="btn btn-link btn-sm"
//             onClick={() => navigate(key)}
//           >
//             {map.name}
//           </button>
//           <span>{map.levelGuide}</span>
//         </li>
//       );
//     });
//   };

//   return <Wrapper>{renderButtons()}</Wrapper>;
// };

const WorldPanelNavigation = () => {};

export default WorldPanelNavigation;
