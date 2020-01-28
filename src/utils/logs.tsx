import { getTimestamp } from "./dateAndTime";
import { AttackType, AttackOutcome } from "./combat";

function generateLog(logs: string, log: string): string {
  return `<span>${getTimestamp()} - ${log}</span><br />${logs}`;
}

const generatePlayerCombatLog = (attackType: AttackType, monsterName: string, attackDamage: number, attackOutcome: AttackOutcome) => {
  let firstPart;
  let secondPart;
  switch(attackType) {
    case (AttackType.normal): {
      firstPart = `You attack ${monsterName} `;
      break;
    } 
    case (AttackType.quick): {
      firstPart = `You lunge swiftly at ${monsterName} `;
      break;
    } 
    case (AttackType.defensive): {
      firstPart = `You slash cautiously at ${monsterName} `;
      break;
    }
    case (AttackType.strong): {
      firstPart = `You launch a heavy swing at ${monsterName} `;
      break;
    } 
  }
  switch(attackOutcome) {
    case (AttackOutcome.miss): {
      secondPart = `but miss!`;
      break;
    } 
    case (AttackOutcome.block): {
      secondPart = `but they block the attack and take ${attackDamage} damage!`;
      break;
    }
    case (AttackOutcome.crit): {
      secondPart = `and score a critical hit for ${attackDamage} damage!`;
      break;
    }
    case (AttackOutcome.hit): {
      secondPart = `for ${attackDamage}!`;
      break;
    }
  }
  return `${firstPart}${secondPart}`
}

const generateMonsterCombatLog = (monsterName: string, attackDamage: number, attackOutcome: AttackOutcome) => {
  switch(attackOutcome) {
    case (AttackOutcome.miss): return `You dodge ${monsterName}'s attack!`
    case (AttackOutcome.block): return `You block ${monsterName}'s attack and take ${attackDamage} damage! `
    case (AttackOutcome.crit): return `${monsterName} crits you for ${attackDamage}!`;
    case (AttackOutcome.hit): return `${monsterName} hits you for ${attackDamage}!`;
  }
}

export {generateLog, generateMonsterCombatLog, generatePlayerCombatLog}
