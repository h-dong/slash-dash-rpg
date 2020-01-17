import FULL_ITEMS, { WEAR_POSITION } from "../database/items";
import { equipToTakeOff } from "./itemActions";

describe("Item Actions", () => {
  describe("Hand Position Equipments", () => {
    const woodenSword = FULL_ITEMS.WOODEN_SWORD;
    const woodenShield = FULL_ITEMS.WOODEN_SHIELD;
    const woodenSpear = FULL_ITEMS.WOODEN_SPEAR;
    const bronzeSword = FULL_ITEMS.BRONZE_SWORD;
    const bronzeShield = FULL_ITEMS.BRONZE_SHIELD;
    const bronzeSpear = FULL_ITEMS.BRONZE_SPEAR;

    test.each`
      case  | currentMainHand | currentOffHand  | toEquip         | output
      ${1}  | ${null}         | ${null}         | ${woodenSword}  | ${[]}
      ${2}  | ${null}         | ${null}         | ${woodenShield} | ${[]}
      ${3}  | ${woodenSword}  | ${null}         | ${woodenShield} | ${[]}
      ${4}  | ${null}         | ${woodenShield} | ${woodenSword}  | ${[]}
      ${5}  | ${woodenSword}  | ${woodenShield} | ${bronzeSword}  | ${[woodenSword]}
      ${6}  | ${woodenSword}  | ${woodenShield} | ${bronzeShield} | ${[woodenShield]}
      ${7}  | ${woodenSword}  | ${woodenShield} | ${woodenSpear}  | ${[woodenSword, woodenShield]}
      ${8}  | ${woodenSpear}  | ${null}         | ${bronzeSpear}  | ${[woodenSpear]}
      ${9}  | ${woodenSpear}  | ${null}         | ${woodenSword}  | ${[woodenSpear]}
      ${10} | ${woodenSpear}  | ${null}         | ${woodenShield} | ${[woodenSpear]}
      ${11} | ${null}         | ${woodenShield} | ${woodenSpear}  | ${[woodenShield]}
    `(
      "should equip and unequip items correctly - variation $case",
      ({ toEquip, currentMainHand, currentOffHand, output }) => {
        const equipments = {
          [WEAR_POSITION.MAIN_HAND]: currentMainHand
            ? { item: currentMainHand }
            : undefined,
          [WEAR_POSITION.OFF_HAND]: currentOffHand
            ? { item: currentOffHand }
            : undefined
        };
        const result = equipToTakeOff(equipments, toEquip);
        expect(result).toEqual(output);
      }
    );
  });

  describe("Other Combat Equipments", () => {
    const woodenHelmet = FULL_ITEMS.WOODEN_HELMET;
    const woodenPlateBody = FULL_ITEMS.WOODEN_PLATE_BODY;
    const woodenPlateLegs = FULL_ITEMS.WOODEN_PLATE_LEGS;
    const bronzeHelmet = FULL_ITEMS.BRONZE_HELMET;
    const bronzePlateBody = FULL_ITEMS.BRONZE_PLATE_BODY;
    const bronzePlateLegs = FULL_ITEMS.BRONZE_PLATE_LEGS;

    test.each`
      case | currentEquipped    | toEquip            | output
      ${1} | ${null}            | ${woodenHelmet}    | ${[]}
      ${2} | ${null}            | ${woodenPlateBody} | ${[]}
      ${3} | ${null}            | ${woodenPlateLegs} | ${[]}
      ${4} | ${woodenHelmet}    | ${bronzeHelmet}    | ${[woodenHelmet]}
      ${5} | ${woodenPlateBody} | ${bronzePlateBody} | ${[woodenPlateBody]}
      ${6} | ${woodenPlateLegs} | ${bronzePlateLegs} | ${[woodenPlateLegs]}
    `(
      "should equip and unequip items correctly - variation $case",
      ({ toEquip, currentEquipped, output }) => {
        let equipments = {};
        if (currentEquipped) {
          equipments[currentEquipped.equipment.position] = {
            item: currentEquipped
          };
        }
        const result = equipToTakeOff(equipments, toEquip);
        expect(result).toEqual(output);
      }
    );
  });
});
