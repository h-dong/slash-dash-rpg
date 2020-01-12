import React from "react";
import styled from "styled-components";
import PanelHeader from "./PanelHeader";
import FULL_MAPS, { MAPS } from "../database/maps";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  scroll-behavior: smooth;

  .panel-body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 1px solid black;
    border-top: 0;
  }
`;

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
    <Wrapper className="log-panel">
      <PanelHeader name="Fast Travel" />
      <div className="panel-body">
        <TravelWrapper>{renderButtons()}</TravelWrapper>
      </div>
    </Wrapper>
  );
};

export default TravelPanel;
