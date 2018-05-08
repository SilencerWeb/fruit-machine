import objectAssignDeep from 'object-assign-deep';
import lodashShuffle from 'lodash.shuffle';

import {
  generateRandomNumber,
  wait,
  addEventListener,
} from './helpers';


export const FruitMachine = function () {
  const REELS_SCORES = {
    wild: [1000, 100, 1000],
    star: [900, 90, 180],
    bell: [800, 80, 160],
    shell: [700, 70, 140],
    seven: [600, 60, 120],
    cherry: [500, 50, 100],
    bar: [400, 40, 80],
    king: [300, 30, 60],
    queen: [200, 20, 40],
    jack: [100, 10, 20],
  };

  const REEL_NAMES = Object.keys(REELS_SCORES);

  const REELS_AMOUNT = 3;

  const SPIN_COST = 30;

  const CREDIT_MIN_AMOUNT = 300;
  const CREDIT_MAX_AMOUNT = 1000;

  const REELS_SPINNING_ANIMATION_TIME = 1500;


  this.state = {
    spin: {
      reelNames: [],
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


  const getScore = (reelNames) => {
    let score = 0;

    const reelNamesMatchAmount = {};


    reelNames.forEach((reelName) => { // Counting how many times does every reel match
      reelNamesMatchAmount[reelName] = reelNamesMatchAmount[reelName] ?
        reelNamesMatchAmount[reelName] + 1 : 1;
    });


    const matchedReelNames = Object.keys(reelNamesMatchAmount);


    if (matchedReelNames.length === 1) { // If we have 3 same reel names in reelNames, e.g. ['wild', 'wild', 'wild']
      const reelName = matchedReelNames.join('');

      score = REELS_SCORES[reelName][0];
    } else if (matchedReelNames.length === 2) { // If we have 2 same reel names in reelNames, e.g. ['wild', 'wild', 'cherry']
      const firstReelName = matchedReelNames[0];
      const secondReelName = matchedReelNames[1];

      const winReel = reelNamesMatchAmount[firstReelName] > reelNamesMatchAmount[secondReelName] ?
        firstReelName : secondReelName; // 2 same reels
      const loseReel = reelNamesMatchAmount[firstReelName] < reelNamesMatchAmount[secondReelName] ?
        firstReelName : secondReelName; // 3rd reel


      if (loseReel === 'wild') {
        score = REELS_SCORES[winReel][2];
      } else {
        score = REELS_SCORES[winReel][1];
      }
    }

    return score;
  };


  const updateState = (newState) => {
    const state = this.state;

    this.state = objectAssignDeep(state, newState);
  };

  const updateUI = () => {
    const state = this.state;

    // .game
    const fruitMachine = document.querySelector('.fruit-machine');
    const spinCost = fruitMachine.querySelector('.spin-cost');
    const message = fruitMachine.querySelector('.message');

    // .info
    const currentScore = fruitMachine.querySelector('.current-score');
    const previousScore = fruitMachine.querySelector('.previous-score');
    const totalScore = fruitMachine.querySelector('.total-score');
    const bestScore = fruitMachine.querySelector('.best-score');

    const money = fruitMachine.querySelectorAll('.money');

    const credit = fruitMachine.querySelector('.credit');
    const repayCredit = fruitMachine.querySelectorAll('.repay-credit');

    const spinCount = fruitMachine.querySelector('.spin-amount');


    // .game
    spinCost.innerHTML = `Spin cost - <span>${SPIN_COST}$</span>`;
    message.innerHTML = state.message;

    // .info
    currentScore.innerHTML = `Your current score: <span>${state.score.current}</span>`;
    previousScore.innerHTML = `Your previous score: <span>${state.score.previous}</span>`;
    totalScore.innerHTML = `Your total score: <span>${state.score.total}</span>`;
    bestScore.innerHTML = `Your best score: <span>${state.score.best}</span>`;

    money.forEach((money) => {
      money.innerHTML = `Your money: <span>${state.money}$</span>`;
    });

    credit.innerHTML = `Your credit: <span>${state.credit}$</span>`;
    repayCredit.forEach((repayCredit) => {
      return repayCredit.style.display = state.credit === 0 ? 'none' : 'block';
    });

    spinCount.innerHTML = `Your spin count: <span>${state.spin.count}</span>`;
  };


  const getCredit = () => {
    const state = this.state;

    const creditAmount = prompt(`How much do You want? Not less than ${CREDIT_MIN_AMOUNT}$ and not more than ${CREDIT_MAX_AMOUNT}$!`);


    if (creditAmount === null) {
      return false;
    } else if (creditAmount >= CREDIT_MIN_AMOUNT && creditAmount <= CREDIT_MAX_AMOUNT) {
      const getCredit = document.querySelector('.get-credit');

      const money = state.money + +creditAmount;
      const message = `You successfully got credit for <span>${creditAmount}$</span> :) 
                      <br>
                      <br> 
                      Please, don't forget to repay it, otherwise you can't get another one`;


      updateState({
        money: money,
        credit: creditAmount,
        message: message,
      });

      getCredit.style.display = 'none';

      updateUI();
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

    updateUI();
  };


  const generateReels = () => {
    const reelsWrapper = document.querySelector('.reels-wrapper');
    const reels = reelsWrapper.querySelectorAll('.reel');

    const spinReelNames = this.state.spin.reelNames;


    if (reels.length) {
      reels.forEach((reel, i) => {
        const reelChildren = reel.children;

        reelChildren.item(reelChildren.length - 1).innerHTML = spinReelNames[i];

        setTimeout(() => {
          reelChildren.item(0).innerHTML = spinReelNames[i];
        }, REELS_SPINNING_ANIMATION_TIME / 2); // We have to change first item's text after the start and before the end of animation
      });
    } else {
      for (let i = 0; i < REELS_AMOUNT; i++) {
        const reel = document.createElement('div');
        reel.classList.add('reel');

        const shuffledReelItemNames = lodashShuffle(REEL_NAMES);


        shuffledReelItemNames.forEach((reelItemName) => {
          const item = document.createElement('div');
          item.innerHTML = reelItemName;

          if (reelItemName.toLowerCase() === spinReelNames[i].toLowerCase()) {
            reel.prepend(item.cloneNode(true));
            reel.appendChild(item.cloneNode(true)); // We have to insert winning reel in the start and in the end due to how animation works
          } else {
            reel.insertBefore(item, reel.children[2]); // But other reels we have to insert in any position except the start and the end
          }
        });

        reelsWrapper.appendChild(reel);
      }
    }
  };

  const animateReels = () => {
    const reels = document.querySelectorAll('.reel');

    const reelChildren = [...reels[0].children];

    const reelHeight = reelChildren.reduce((height, reelChild, i) => {
      return i < reelChildren.length - 1 ?
        height + reelChild.offsetHeight : height; // We don't need height of the last child due how animation works
    }, 0);


    reels.forEach((reelDOM) => {
      reelDOM.style.cssText =
        `top: -${reelHeight}px; 
         transition: ${REELS_SPINNING_ANIMATION_TIME}ms;`;

      setTimeout(() => reelDOM.style.cssText = '', REELS_SPINNING_ANIMATION_TIME); // Clear animation styles
    });
  };


  const generatePrizeTable = () => {
    const prizeTable = document.querySelector('.prize-table table');

    const prizeTbody = document.createElement('tbody');
    prizeTable.appendChild(prizeTbody);


    REEL_NAMES.forEach((reelItemName) => {
      const tr = document.createElement('tr');

      const td = document.createElement('td');
      td.innerHTML = reelItemName;

      tr.appendChild(td);


      REELS_SCORES[reelItemName].forEach((reelScore) => {
        const td = document.createElement('td');
        td.innerHTML = reelScore;

        tr.appendChild(td);
      });

      prizeTbody.appendChild(tr);
    });
  };


  const handleSpinButtonClick = async(e) => {
    e.preventDefault();

    const target = e.currentTarget;
    target.removeEventListener('click', handleSpinButtonClick);

    const state = this.state;


    if (state.money < SPIN_COST) {
      let message = `Sorry, You don't have enough money for playing :(`;
      const getCredit = document.querySelector('.get-credit');


      if (state.credit === 0) { // If no unpaid credit
        getCredit.style.display = '';
      } else {
        message += `<br><br> And I can't give You another credit because You haven't repaid for the last one :(`;
      }


      updateState({
        message: message,
      });

      updateUI();

      addEventListener(target, 'click', handleSpinButtonClick);

      return false;
    }


    let money = state.money - SPIN_COST;

    updateState({
      money: money,
    });

    updateUI();


    const score = this.spin();

    // .game
    let message = '';

    // .info
    const currentScore = score;
    const previousScore = state.score.current; // Because current score hasn't updated yet
    const totalScore = state.score.total + currentScore;
    const bestScore = state.score.best > currentScore ? state.score.best : currentScore;

    money += score;

    const credit = state.credit;


    if (score > 0) {
      message = score > 500 ?
        `Woooooow! Congratulations!
        <br>
        You won a lot - <span>${score}$</span>!` :
        `Woohoo! Congratulations!
        <br>
        You won <span>${score}$</span> :)`;
    } else {
      message = `Damn, You lost :( <br> Try again, I believe You will win next time :)`;
    }


    updateState({
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


    generateReels();

    animateReels();
    await wait(REELS_SPINNING_ANIMATION_TIME);

    updateUI();

    addEventListener(target, 'click', handleSpinButtonClick);
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

    const prizeTable = document.querySelector('.prize-table');

    if (prizeTable.classList.contains('hidden')) {
      prizeTable.classList.remove('hidden');
    } else {
      prizeTable.classList.add('hidden');
    }
  };

  const handleToggleInfoClick = (e) => {
    e.preventDefault();

    const info = document.querySelector('.info');

    if (info.classList.contains('hidden')) {
      info.classList.remove('hidden');
    } else {
      info.classList.add('hidden');
    }
  };


  this.spin = (spinReelNames = []) => {
    const state = this.state;


    if (!spinReelNames.length) {
      for (let i = 0; i < REELS_AMOUNT; i++) {
        const randomNumber = generateRandomNumber(1, REEL_NAMES.length);

        spinReelNames.push(REEL_NAMES[randomNumber]);
      }
    }


    updateState({
      spin: {
        reelNames: spinReelNames,
        count: state.spin.count++,
      },
    });


    return getScore(spinReelNames);
  };

  this.start = () => {
    this.spin();

    addEventListener('.spin-button', 'click', handleSpinButtonClick);
    addEventListener('.get-credit', 'click', handleGetCreditClick);
    addEventListener('.repay-credit', 'click', handleRepayCreditClick);
    addEventListener('.toggle-prize-table', 'click', handleTogglePrizeTableClick);
    addEventListener('.toggle-info', 'click', handleToggleInfoClick);

    generateReels();

    generatePrizeTable();

    updateUI();
  };
};