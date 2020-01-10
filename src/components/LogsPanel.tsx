import React from "react";
import styled from "styled-components";
import PanelHeader from "./PanelHeader";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  .panel-body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 1px solid black;
    border-top: 0;

    ul {
      display: flex;
      justify-content: space-between;
      margin: 0;
      padding: 0.25rem 0.5rem 0 0.5rem;
      font-size: small;
      font-weight: bold;

      &:first-child {
        text-align: left;
      }

      &:last-child {
        text-align: right;
        padding-bottom: 0.25rem;
      }

      li {
        list-style-type: none;
      }
    }
  }
`;

const LogWrapper = styled.div`
  padding: 0.5rem;
  background-color: #e0e0e0;
  min-height: 20rem;
  max-height: 20rem;
  overflow: auto;
  border-radius: 4px;
  text-align: left;
`;

const log = "<div>Hello this is my default log</div>";

const LogsPanel = () => {
  return (
    <Wrapper className="log-panel">
      <PanelHeader name="Logs" />
      <div className="panel-body">
        <LogWrapper
          dangerouslySetInnerHTML={{ __html: log }}
          // ref={el => {
          //   this.messagesEnd = el;
          // }}
        />
      </div>
    </Wrapper>
  );
};

export default LogsPanel;
