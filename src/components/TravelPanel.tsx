import React from "react";
import styled from "styled-components";
import FULL_MAPS, { MAPS } from "../database/maps";

const TravelWrapper = styled.ul`
  display: flex;
  justify-content: space-evenly;
  margin: 0;
  padding: 0;

  li {
    display: flex;
    flex-direction: column;
    list-style-type: none;
    padding-bottom: 0;

    span {
      text-align: center;
    }
  }
`;

const TravelPanel = ({
  send,
  currentLocation
}: {
  send: any;
  currentLocation: MAPS;
}) => {
  const renderButtons = () => {
    return FULL_MAPS.map(map => (
      <li key={map.name}>
        <button
          type="button"
          className="btn btn-link btn-sm"
          disabled={map.key === currentLocation}
          onClick={() => send({ type: "CHANGE_LOCATION", location: map.key })}
        >
          {map.name}
        </button>
        <span>{map.levelGuide}</span>
      </li>
    ));
  };

  return (
    <div className="card border-secondary mb-3">
      <div className="card-header">Fast Travel</div>
      <div className="card-body">
        <TravelWrapper>{renderButtons()}</TravelWrapper>
      </div>
    </div>
  );
};

export default TravelPanel;
