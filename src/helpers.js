import lodashShuffle from 'lodash.shuffle';

import { REELS_SCORES } from './constants';

export const generateRandomNumber = (min = 0, max = 9) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min)) + min;
};

export const getShuffledReel = () => {
  const reelsNames = Object.keys(REELS_SCORES);

  return lodashShuffle(reelsNames);
};

export const getShuffledReelsList = (reelsAmount = 3) => {
  const reels = [];

  for (let i = 0; i < reelsAmount; i++) {
    reels.push(getShuffledReel());
  }

  return reels;
};