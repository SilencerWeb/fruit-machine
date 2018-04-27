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
    currentScore: 0,
    previousScore: 0,
    totalScore: 0,
    spinAmount: 0,
  };


  const handleSpinButtonClick = (e) => {
    e.preventDefault();

    const state = this.state;


    const reels = getShuffledReelsList();
    const spin = this.spin(reels);
    const currentScore = this.getSpinScore(reels, spin);
    const previousScore = state.currentScore;
    const totalScore = state.totalScore + currentScore;
    const spinAmount = state.spinAmount + 1;


    this.state = Object.assign(state, {
      reels: reels,
      spin: spin,
      currentScore: currentScore,
      previousScore: previousScore,
      totalScore: totalScore,
      spinAmount: spinAmount,
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


    const footer = document.createElement('div');
    footer.classList.add('footer');

    const footerSideInfo = document.createElement('div');
    footerSideInfo.classList.add('side-info');

    const footerSideButton = document.createElement('div');
    footerSideButton.classList.add('side-button');


    const currentScore = document.createElement('span');
    currentScore.classList.add('current-score');
    currentScore.textContent = 'Press \'Spin!\'';

    const previousScore = document.createElement('span');
    previousScore.classList.add('previous-score');

    const totalScore = document.createElement('span');
    totalScore.classList.add('total-score');

    const spinAmount = document.createElement('span');
    spinAmount.classList.add('spin-amount');


    const spinButton = document.createElement('button');
    spinButton.classList.add('spin-button');
    spinButton.textContent = 'Spin!';

    spinButton.addEventListener('click', handleSpinButtonClick);


    footerSideInfo.appendChild(currentScore);
    footerSideInfo.appendChild(previousScore);
    footerSideInfo.appendChild(totalScore);
    footerSideInfo.appendChild(spinAmount);

    footerSideButton.appendChild(spinButton);

    footer.appendChild(footerSideInfo);
    footer.appendChild(footerSideButton);


    fruitMachine.appendChild(reelsWrapper);
    fruitMachine.appendChild(footer);
  };

  this.updateUI = () => {
    const state = this.state;


    const fruitMachine = document.querySelector('.fruit-machine');
    const reels = fruitMachine.querySelectorAll('.reel');
    const currentScore = fruitMachine.querySelector('.current-score');
    const previousScore = fruitMachine.querySelector('.previous-score');
    const totalScore = fruitMachine.querySelector('.total-score');
    const spinAmount = fruitMachine.querySelector('.spin-amount');
    const spinButton = fruitMachine.querySelector('.spin-button');


    reels.forEach((reel, i) => {
      reel.textContent = state.reels[i][state.spin[i]];
    });


    currentScore.textContent = `Your current score: ${state.currentScore}`;
    previousScore.textContent = `Your previous score: ${state.previousScore}`;
    totalScore.textContent = `Your total score: ${state.totalScore}`;
    spinAmount.textContent = `Your spin count: ${state.spinAmount}`;
  };


  this.start = () => {
    const state = this.state;


    const reels = getShuffledReelsList();
    const spin = this.spin(reels);


    this.state = Object.assign(state, {
      reels: reels,
      spin: spin,
    });


    this.drawUI();
  };
};


const fruitMachine = new FruitMachine();

fruitMachine.start();