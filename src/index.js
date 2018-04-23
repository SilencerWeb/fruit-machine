import {
  generateRandomNumber,
  getShuffledReelsList,
} from './helpers';

import { reelsScore } from './constants';

import 'normalize.css/normalize.css';
import './assets/styles/main.css';

const FruitMachine = function () {
  this.spin = (reels) => {
    return reels.map(() => {
      return generateRandomNumber(1, 10);
    });
  };

  this.getSpinScore = (reels, spins) => {
    let score = 0;

    const spinResultReels = {};

    spins.forEach((spin, i) => {
      const reel = reels[i][spin].toLowerCase();

      spinResultReels[reel] = spinResultReels[reel] ? spinResultReels[reel] + 1 : 1;
    });

    const matchReels = Object.keys(spinResultReels);

    if (matchReels.length === 1) {
      const reel = matchReels[0];

      score = reelsScore[reel][0];
    } else if (matchReels.length === 2) {
      const firstReel = matchReels[0];
      const secondReel = matchReels[1];

      const winReel = spinResultReels[firstReel] > spinResultReels[secondReel] ? firstReel : secondReel;
      const loseReel = spinResultReels[firstReel] < spinResultReels[secondReel] ? firstReel : secondReel;

      if (loseReel === 'wild') {
        score = reelsScore[winReel][2];
      } else {
        score = reelsScore[winReel][1];
      }
    }

    return score;
  };
};

const fruitMachine = new FruitMachine();

const reels = getShuffledReelsList();
const spin = fruitMachine.spin(reels);
const score = fruitMachine.getSpinScore(reels, spin);

console.log(reels, spin);
console.log(`Your score: ${score}`);