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
    score: {
      current: 0,
      previous: 0,
      total: 0,
      best: 0,
    },
    spinAmount: 0,
    money: 30,
    spinCost: 3,
    message: 'Click \'Spin!\' for starting playing!',
  };


  const handleSpinButtonClick = (e) => {
    e.preventDefault();

    const state = this.state;


    if (state.money < state.spinCost) {
      const message = `Sorry, You don't have enough money for playing :(`;

      this.state = Object.assign(state, {
        message: message,
      });

      this.updateUI();

      return;
    }


    const reels = getShuffledReelsList();
    const spin = this.spin(reels);
    const score = this.getSpinScore(reels, spin);


    // .game
    let message = '';


    if (score > 0) {
      message = score > 50 ?
        `Woooooow! Congratulations! You won a lot - <span>${score}$</span>!` :
        `Woohoo! Congratulations! You won <span>${score}$</span> :)`;
    } else {
      message = `Damn, You lost :( <br/> Try again, I believe You will win next time :)`;
    }


    // .info
    const currentScore = score;
    const previousScore = state.score.current; // Because current score hasn't updated yet!
    const totalScore = state.score.total + currentScore;
    const bestScore = state.score.best > currentScore ? state.score.best : currentScore;

    const money = state.money - state.spinCost + currentScore;

    const spinAmount = state.spinAmount + 1;


    this.state = Object.assign(state, {
      reels: reels,
      spin: spin,
      score: {
        current: currentScore,
        previous: previousScore,
        total: totalScore,
        best: bestScore,
      },
      spinAmount: spinAmount,
      money: money,
      message: message,
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


  this.updateUI = () => {
    const state = this.state;


    // .game
    const fruitMachine = document.querySelector('.fruit-machine');
    const reels = fruitMachine.querySelectorAll('.reel');
    const spinCost = fruitMachine.querySelector('.spin-cost');
    const message = fruitMachine.querySelector('.message');

    // .info
    const currentScore = fruitMachine.querySelector('.current-score');
    const previousScore = fruitMachine.querySelector('.previous-score');
    const totalScore = fruitMachine.querySelector('.total-score');
    const bestScore = fruitMachine.querySelector('.best-score');

    const money = fruitMachine.querySelector('.money');

    const spinAmount = fruitMachine.querySelector('.spin-amount');


    reels.forEach((reel, i) => {
      reel.innerHTML = state.reels[i][state.spin[i]];
    });


    // .game
    spinCost.innerHTML = `Spin cost - <span>${state.spinCost}$</span>`;
    message.innerHTML = state.message;


    // .info
    currentScore.innerHTML = `Your current score: <span>${state.score.current}</span>`;
    previousScore.innerHTML = `Your previous score: <span>${state.score.previous}</span>`;
    totalScore.innerHTML = `Your total score: <span>${state.score.total}</span>`;
    bestScore.innerHTML = `Your best score: <span>${state.score.best}</span>`;

    money.innerHTML = `Your money: <span>${state.money}$</span>`;

    spinAmount.innerHTML = `Your spin count: <span>${state.spinAmount}</span>`;
  };


  this.start = () => {
    const state = this.state;


    const reels = getShuffledReelsList();
    const spin = this.spin(reels);


    this.state = Object.assign(state, {
      reels: reels,
      spin: spin,
    });


    const spinButton = document.querySelector('.spin-button');
    spinButton.addEventListener('click', handleSpinButtonClick);


    this.updateUI();
  };
};


const fruitMachine = new FruitMachine();

fruitMachine.start();