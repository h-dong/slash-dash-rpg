import FULL_ITEMS, {
  ITEM,
  ItemInterface,
  ItemCombatStatsInterface
} from "../database/items";
import { EquipmentsInterface } from "../machines/GameMachine";

export function getItemById(id: number) {
  return FULL_ITEMS.find(item => item.id === id);
}

export function getItemByKey(
  key: ITEM | undefined
): ItemInterface | undefined | null {
  if (!key) return null;
  return FULL_ITEMS.find(item => item.key === key);
}

export function getItemCombatStatsTextByKey(itemKey: ITEM): string {
  const fullItem = getItemByKey(itemKey);
  if (fullItem?.equipment?.combat) {
    return getItemCombatStatsText(fullItem.equipment.combat);
  }
  return "";
}

export function getItemCombatStatsText({
  attack,
  strength,
  defence,
  movementSpeed
}: ItemCombatStatsInterface): string {
  const msg = [];
  if (attack) {
    const sign = Math.sign(attack) < 0 ? "" : "+";
    msg.push(`${sign}${attack} att`);
  }
  if (strength) {
    const sign = Math.sign(strength) < 0 ? "" : "+";
    msg.push(`${sign}${strength} str`);
  }
  if (defence) {
    const sign = Math.sign(defence) < 0 ? "" : "+";
    msg.push(`${sign}${defence} def`);
  }
  if (movementSpeed) {
    const sign = Math.sign(movementSpeed) < 0 ? "" : "+";
    msg.push(`${sign}${movementSpeed} mv sp`);
  }

  return msg.length ? msg.join(", ") : "";
}

export function calcEquipmentsBonusStats(
  equipments: EquipmentsInterface
): ItemCombatStatsInterface {
  let bonusAttack = 0;
  let bonusStrength = 0;
  let bonusDefence = 0;
  let bonusMovementSpeed = 0;

  Object.entries(equipments).forEach(([_, itemKey]) => {
    const fullItem = getItemByKey(itemKey);
    if (fullItem?.equipment?.combat) {
      const {
        attack,
        strength,
        defence,
        movementSpeed
      } = fullItem.equipment.combat;
      if (attack) bonusAttack += attack;
      if (strength) bonusStrength += strength;
      if (defence) bonusDefence += defence;
      if (movementSpeed) bonusMovementSpeed += movementSpeed;
    }
  });

  return {
    attack: bonusAttack,
    strength: bonusStrength,
    defence: bonusDefence,
    movementSpeed: bonusMovementSpeed
  };
}
