import React from "react";
import styled from "styled-components";
import PanelHeader from "./PanelHeader";

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

const LogWrapper = styled.div`
  padding: 0.5rem;
  background-color: #e0e0e0;
  min-height: 20rem;
  max-height: 20rem;
  overflow: auto;
  border-radius: 4px;
  text-align: left;
`;

const LogsPanel = ({ logs }: { logs: string }) => (
  <Wrapper className="log-panel">
    <PanelHeader name="Logs" />
    <div className="panel-body">
      <LogWrapper
        dangerouslySetInnerHTML={{ __html: logs }}
        // ref={el => {
        //   this.messagesEnd = el;
        // }}
      />
    </div>
  </Wrapper>
);

export default LogsPanel;
