import {
  generateRandomNumber,
  getShuffledReelsList,
} from './helpers';

import { reelsScore } from './constants';

import 'normalize.css/normalize.css';
import './assets/styles/main.css';


const FruitMachine = function () {
  this.state = {
    reels: [],
    spin: [],
    score: null,
  };


  const handleSpinButtonClick = (e) => {
    e.preventDefault();

    const state = this.state;


    const reels = getShuffledReelsList();
    const spin = this.spin(reels);
    const score = this.getSpinScore(reels, spin);


    this.state = Object.assign(state, {
      reels: reels,
      spin: spin,
      score: score,
    });


    this.updateUI();
  };


  this.spin = (reels) => {
    return reels.map(() => {
      return generateRandomNumber(1, reels.length);
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


  this.drawUI = (reelsAmount = 3) => {
    const state = this.state;


    const fruitMachine = document.querySelector('.fruit-machine');


    const reelsWrapper = document.createElement('div');
    reelsWrapper.classList.add('reels-wrapper');


    for (let i = 0; i < reelsAmount; i++) {
      const reel = document.createElement('div');
      reel.classList.add('reel');

      if (state.reels[i] && state.spin[i]) {
        reel.textContent = state.reels[i][state.spin[i]];
      }

      reelsWrapper.appendChild(reel);
    }


    const spinButton = document.createElement('button');
    spinButton.classList.add('spin-button');
    spinButton.textContent = 'Spin!';

    spinButton.addEventListener('click', handleSpinButtonClick);


    const score = document.createElement('span');
    score.classList.add('score');
    score.textContent = 'Press \'Spin!\'';


    fruitMachine.appendChild(reelsWrapper);
    fruitMachine.appendChild(score);
    fruitMachine.appendChild(spinButton);
  };

  this.updateUI = () => {
    const state = this.state;


    const fruitMachine = document.querySelector('.fruit-machine');
    const reels = fruitMachine.querySelectorAll('.reel');
    const spinButton = fruitMachine.querySelector('.spin-button');
    const score = fruitMachine.querySelector('.score');


    reels.forEach((reel, i) => {
      reel.textContent = state.reels[i][state.spin[i]];
    });


    score.textContent = `Your score: ${state.score}`;
  };


  this.start = () => {
    const state = this.state;


    const reels = getShuffledReelsList();
    const spin = this.spin(reels);
    const score = this.getSpinScore(reels, spin);


    this.state = Object.assign(state, {
      reels: reels,
      spin: spin,
      score: score,
    });


    this.drawUI();
  };
};


const fruitMachine = new FruitMachine();

fruitMachine.start();