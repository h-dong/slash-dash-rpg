import {
  getLevel,
  getLevelFromExp,
  getMaxExp,
  getCurrentLevelBaseExp,
  getPreviousLevelExp,
  getNextLevelExp
} from "./levelHelper";

describe("Level Helper", () => {
  test.each`
    attack         | strength       | defence        | output
    ${1}           | ${1}           | ${1}           | ${1}
    ${getMaxExp()} | ${getMaxExp()} | ${getMaxExp()} | ${10}
  `(
    "with $attack Att, $strength Str and $defence Def should return Level $output",
    ({ attack, strength, defence, output }) => {
      expect(getLevel(attack, strength, defence)).toBe(output);
    }
  );

  test.each`
    experience | output
    ${0}       | ${1}
    ${83}      | ${2}
    ${174}     | ${3}
    ${276}     | ${4}
    ${388}     | ${5}
  `(
    "with $experience should return Level $output",
    ({ experience, output }) => {
      expect(getLevelFromExp(experience)).toBe(output);
    }
  );

  test.each`
    level | output
    ${1}  | ${0}
    ${2}  | ${83}
    ${3}  | ${174}
    ${5}  | ${388}
    ${10} | ${1154}
  `("with $level should return Level $output", ({ level, output }) => {
    expect(getCurrentLevelBaseExp(level)).toBe(output);
  });

  test.each`
    level | output
    ${1}  | ${0}
    ${2}  | ${0}
    ${3}  | ${83}
    ${5}  | ${276}
    ${10} | ${969}
  `("with $level should return Level $output", ({ level, output }) => {
    expect(getPreviousLevelExp(level)).toBe(output);
  });

  test.each`
    level | output
    ${1}  | ${83}
    ${2}  | ${174}
    ${3}  | ${276}
    ${5}  | ${512}
    ${10} | ${1154}
  `("with $level should return Level $output", ({ level, output }) => {
    expect(getNextLevelExp(level)).toBe(output);
  });
});
