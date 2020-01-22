import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10rem;

  span {
    text-align: center;
  }

  input {
    width: 20rem;
    margin: 1rem auto;
  }

  button {
    margin: 0 auto;
  }
`;

interface WelcomeProps {
  send: any;
  view: string;
}

const Welcome = ({ send, view }: WelcomeProps) => {
  const [name, setName] = useState("");

  return (
    <Wrapper>
      <span>
        Hello traveler, looks like you are new here! What is your name?
      </span>
      <input
        className="form-control"
        type="text"
        placeholder="Enter name..."
        onChange={e => setName(e.target.value)}
      ></input>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => send({ type: "CREATE_CHARACTER", view, name })}
      >
        Enter World
      </button>
    </Wrapper>
  );
};

export default Welcome;
