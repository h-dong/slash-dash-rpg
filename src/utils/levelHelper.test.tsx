import { getLevel } from "./levelHelper";

describe("Level Helper", () => {
  test.each`
    attack | strength | defence | output
    ${1}   | ${1}     | ${1}    | ${1}
    ${10}  | ${10}    | ${10}   | ${3}
    ${30}  | ${30}    | ${30}   | ${10}
  `(
    "with $attack, $strength and $defence should return Level $output",
    ({ attack, strength, defence, output }) => {
      expect(getLevel(attack, strength, defence)).toBe(output);
    }
  );
});
