export const generateRandomNumber = (min = 0, max = 9) => {
  return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min))) + Math.ceil(min);
};


export const wait = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};