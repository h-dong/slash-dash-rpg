import React from "react";
import styled from "styled-components";

const Header = styled.strong`
  width: 100%;
  padding: 0.25rem;
  text-align: center;
  background-color: lightgrey;
  border: 1px solid black;
`;

const PanelHeader = ({ name }: { name: string }) => {
  return <Header>{name}</Header>;
};

export default PanelHeader;
