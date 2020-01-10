import { getRandomNumByMinMax } from "./random";

/*
protagonist bless +10% of all level effect
primal rage (boss) +50% of all level effect

Attack speed: 100% + item boosts

Strike: 50 + log(attack * 2) (max 85%)
Damage: (own strength * 2) + own item boosts - opponent defence - opponent item block boosts
Crit %: 5% + (10% * own strength) + item boosts (max 50%) (dmg * 2)
block %: 5% + (10% * own defence) + item boosts (max 20%) (no dmg taken)
Damage Taken: (opponent strength * 5) + item boosts - own defence

defence xp:
* block (2x dmg would have taken) or dmg taken (1x dmg)

strength xp:
* dmg delt * 2
* crit * 1

attack xp:
* land attack (attack level) + (50% * dmg delt)

*/

// function exchangeAttacks() {}

// function fight(characterA, characterB) {
//   while (characterA.hp > 0 && characterB.hp > 0) {
//     exchangeAttacks();
//   }
// }

// export default fight;

function shouldPlayerOneAttaskFirst() {
  if (getRandomNumByMinMax(1, 2)) return true;
  return false;
}

function attack(playerA: any, playerB: any) {
  let attackLog = "";
  const probabilityOfLandingAttack =
    getRandomNumByMinMax(0, 100) + playerA.attack - playerB.defence;
  const isAttackSuccessful =
    getRandomNumByMinMax(0, 100) <= probabilityOfLandingAttack;
  if (!isAttackSuccessful) {
    attackLog += "<p>Missed!</p>";
  } else {
    let calcDamage = getRandomNumByMinMax(1, playerA.strength);
    const criticalHit = getRandomNumByMinMax(1, 100) < 5;
    if (criticalHit) {
      attackLog += "<p>OMG, it was a critical hit!<p>";
      calcDamage *= 2;
    }

    attackLog += `<p>-${calcDamage}HP<p>`;
    playerB.hp -= calcDamage;
  }
  return attackLog;
}

export default function fight(player1: any, player2: any) {
  let logs = "";
  let roundNum = 1;
  while (player1.hp > 0 && player2.hp > 0) {
    //emergencyStop
    if (roundNum > 10000) break;

    logs += `<p>Round ${roundNum}!</p>`;
    if (shouldPlayerOneAttaskFirst()) {
      logs += `<p>Player: ${player1.name} attacks first</p>`;
      logs += attack(player1, player2);
      if (player2.hp <= 0) {
        logs += `<p>Player: ${player2.name} has fainted!</p>`;
        logs += "<p>Round ended!</p>";
        break;
      }
      logs += `<p>Player: ${player2.name} returns attacks</p>`;
      attack(player2, player1);
    } else {
      logs += `<p>Player: ${player2.name} attacks first</p>`;
      attack(player2, player1);
      if (player1.hp <= 0) {
        logs += "<p>Player 1 has fainted!</p>";
        logs += "<p>Round ended!</p>";
        break;
      }
      logs += `<p>Player: ${player1.name} returns attacks</p>`;
      attack(player1, player2);
    }
    roundNum++;
    logs += "<p>Round ended!</p>";
    logs += `<p>Player: ${player1.name}</p>`;
    logs += `<p>Player: ${player2.name}</p>`;

    if (player1.hp < 0) logs += `<p>Player: ${player1.name} has fainted!</p>`;
    if (player2.hp < 0) logs += `<p>Player: ${player2.name} has fainted!</p>`;
  }

  if (player1.hp > 0)
    logs += `<p>Player: ${player1.name} has won the fight!</p>`;
  if (player2.hp > 0)
    logs += `<p>Player: ${player2.name} has won the fight!</p>`;

  return logs;
}
