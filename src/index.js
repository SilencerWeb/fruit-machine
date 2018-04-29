import objectAssignDeep from 'object-assign-deep';

import {
  generateRandomNumber,
  getShuffledReelsList,
} from './helpers';

import { REELS_SCORES } from './constants';

import 'normalize.css/normalize.css';
import './assets/styles/main.css';


const FruitMachine = function () {
  const SPIN_COST = 30;

  const CREDIT_MIN_AMOUNT = 300;
  const CREDIT_MAX_AMOUNT = 1000;


  this.state = {
    reels: [],
    spin: {
      reels: [],
      count: 0,
    },
    score: {
      current: 0,
      previous: 0,
      total: 0,
      best: 0,
    },
    money: 300,
    credit: 0,
    message: 'Click \'Spin\' for starting playing!',
  };


  const updateState = (newState) => {
    const state = this.state;

    this.state = objectAssignDeep(state, newState);
  };


  const getCredit = () => {
    const state = this.state;


    const creditAmount = prompt(`How much do You want? Not less than ${CREDIT_MIN_AMOUNT}$ and not more than ${CREDIT_MAX_AMOUNT}$!`);


    if (creditAmount === null) return;


    if (creditAmount >= CREDIT_MIN_AMOUNT && creditAmount <= CREDIT_MAX_AMOUNT) {
      const money = state.money + +creditAmount;
      const message = `You successfully got credit for <span class="green">${creditAmount}$</span> :) 
                      <br>
                      <br> 
                      Please, don't forget to repay it, otherwise you can't get another one`;

      const getCredit = document.querySelector('.get-credit');


      updateState({
        money: money,
        credit: creditAmount,
        message: message,
      });


      getCredit.style.display = 'none';

      this.updateUI();
    } else if (creditAmount > CREDIT_MAX_AMOUNT) {
      alert('That\'s too much, don\'t be so impudent! -_-');

      getCredit();
    } else if (creditAmount < CREDIT_MIN_AMOUNT) {
      alert('That\'s too little, don\'t be so shy to get more :)');

      getCredit();
    }
  };

  const repayCredit = () => {
    const state = this.state;


    const money = state.money;
    const credit = state.credit;

    const canRepay = money >= credit;


    updateState({
      money: canRepay ? money - credit : money,
      credit: canRepay ? 0 : credit,
      message: canRepay ?
        'You successfully repaid your credit :)' :
        `Oh, you don't have enough money for repaying your credit :(
        <br>
        <br>
         You need <span>${credit - money}$</span> more`,
    });


    this.updateUI();
  };

  const togglePrizeTable = () => {
    const togglePrizeTableButton = document.querySelector('.toggle-prize-table');

    const prizeTable = document.querySelector('.prize-table table');


    if (prizeTable.classList.contains('hidden')) {
      togglePrizeTableButton.innerHTML = 'Hide prize table';

      prizeTable.classList.remove('hidden');
    } else {
      togglePrizeTableButton.innerHTML = 'Show prize table';

      prizeTable.classList.add('hidden');
    }
  };


  const handleSpinButtonClick = (e) => {
    e.preventDefault();

    const state = this.state;


    if (state.money < SPIN_COST) {
      let message = `Sorry, You don't have enough money for playing :(`;
      const getCredit = document.querySelector('.get-credit');

      if (state.credit === 0) { // If no unpaid credit
        getCredit.style.display = '';
      } else {
        message += `<br><br> And I can't give You another credit because You haven't repay for the last one :(`;
      }

      updateState({
        message: message,
      });

      this.updateUI();

      return;
    }


    const reels = getShuffledReelsList();
    const spin = this.spin(reels);
    const score = this.getSpinScore(reels, spin);
    const prize = score * 10;


    // .game
    let message = '';

    if (score > 0) {
      message = prize > 500 ?
        `Woooooow! Congratulations! You won a lot - <span class="green">${prize}$</span>!` :
        `Woohoo! Congratulations! You won <span class="green">${prize}$</span> :)`;
    } else {
      message = `Damn, You lost :( <br> Try again, I believe You will win next time :)`;
    }


    // .info
    const currentScore = score;
    const previousScore = state.score.current; // Because current score hasn't updated yet
    const totalScore = state.score.total + currentScore;
    const bestScore = state.score.best > currentScore ? state.score.best : currentScore;

    const money = state.money - SPIN_COST + prize;

    const credit = state.credit;

    const spinCount = state.spin.count + 1;


    updateState({
      reels: reels,
      spin: {
        reels: spin,
        count: spinCount,
      },
      score: {
        current: currentScore,
        previous: previousScore,
        total: totalScore,
        best: bestScore,
      },
      money: money,
      credit: credit,
      message: message,
    });


    this.updateUI();
  };

  const handleGetCreditClick = (e) => {
    e.preventDefault();

    getCredit();
  };

  const handleRepayCreditClick = (e) => {
    e.preventDefault();

    repayCredit();
  };

  const handleTogglePrizeTableClick = (e) => {
    e.preventDefault();

    togglePrizeTable();
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

      score = REELS_SCORES[reel][0];
    } else if (matchReels.length === 2) {
      const firstReel = matchReels[0];
      const secondReel = matchReels[1];

      const winReel = spinResultReels[firstReel] > spinResultReels[secondReel] ? firstReel : secondReel;
      const loseReel = spinResultReels[firstReel] < spinResultReels[secondReel] ? firstReel : secondReel;

      if (loseReel === 'wild') {
        score = REELS_SCORES[winReel][2];
      } else {
        score = REELS_SCORES[winReel][1];
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

    const credit = fruitMachine.querySelector('.credit');
    const repayCredit = fruitMachine.querySelector('.repay-credit');

    const spinCount = fruitMachine.querySelector('.spin-amount');


    reels.forEach((reel, i) => {
      reel.innerHTML = state.reels[i][state.spin.reels[i]];
    });


    // .game
    spinCost.innerHTML = `Spin cost - <span>${SPIN_COST}$</span>`;
    message.innerHTML = state.message;


    // .info
    currentScore.innerHTML = `Your current score: <span>${state.score.current}</span>`;
    previousScore.innerHTML = `Your previous score: <span>${state.score.previous}</span>`;
    totalScore.innerHTML = `Your total score: <span>${state.score.total}</span>`;
    bestScore.innerHTML = `Your best score: <span>${state.score.best}</span>`;

    money.innerHTML = `Your money: <span>${state.money}$</span>`;

    credit.innerHTML = `Your credit: <span>${state.credit}$</span>`;
    repayCredit.style.display = state.credit === 0 ? 'none' : 'block';

    spinCount.innerHTML = `Your spin count: <span>${state.spin.count}</span>`;
  };

  this.generatePrizeTable = () => {
    const prizeTable = document.querySelector('.prize-table table');

    const prizeTbody = document.createElement('tbody');
    prizeTable.appendChild(prizeTbody);


    const reelsItems = Object.keys(REELS_SCORES);

    reelsItems.forEach((reelItem) => {
      const tr = document.createElement('tr');

      const td = document.createElement('td');
      td.innerHTML = reelItem;

      tr.appendChild(td);


      REELS_SCORES[reelItem].forEach((reelScore) => {
        const td = document.createElement('td');
        td.innerHTML = reelScore;

        tr.appendChild(td);
      });

      prizeTbody.appendChild(tr);
    });
  };


  this.start = () => {
    const reels = getShuffledReelsList();
    const spin = this.spin(reels);

    updateState({
      reels: reels,
      spin: {
        reels: spin,
      },
    });


    const fruitMachine = document.querySelector('.fruit-machine');


    const spinButton = fruitMachine.querySelector('.spin-button');
    spinButton.addEventListener('click', handleSpinButtonClick);

    const getCredit = fruitMachine.querySelector('.get-credit');
    getCredit.addEventListener('click', handleGetCreditClick);

    const repayCredit = fruitMachine.querySelector('.repay-credit');
    repayCredit.addEventListener('click', handleRepayCreditClick);

    const togglePrizeTable = fruitMachine.querySelector('.toggle-prize-table');
    togglePrizeTable.addEventListener('click', handleTogglePrizeTableClick);


    this.generatePrizeTable();

    this.updateUI();
  };
};


const fruitMachine = new FruitMachine();

fruitMachine.start();