import React, { useState } from "react";
import styled from "styled-components";
// import generateLevelStats from "../utils/generateLevelStats";
// import { StateContext, StateContextProvider } from "../StateContext";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;

  label {
    text-align: center;
  }

  input {
    width: 15rem;
    margin: 1rem auto;
  }

  button {
    width: 5rem;
    margin: 0 auto;
  }
`;

// function create(name, updateCharacter) {
// const levelStats = generateLevelStats({
//   level: 1,
//   hp: 20,
//   attack: 1,
//   strength: 1,
//   defence: 1
// });
// const character = {
//   name: name,
//   ...levelStats
// };
// updateCharacter(character);
// }

interface WelcomeProps {
  send: any;
  view: string;
}

const Welcome = ({ send, view }: WelcomeProps) => {
  const [name, setName] = useState("");

  return (
    <Wrapper>
      <label>
        Hello traveler, looks like you are new here! What is your name?
      </label>
      <input type="text" onChange={e => setName(e.target.value)} />
      <button onClick={() => send({ type: "CREATE_CHARACTER", view, name })}>
        Create
      </button>
    </Wrapper>
  );
};

export default Welcome;
