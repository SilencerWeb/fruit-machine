export const generateRandomNumber = (min = 0, max = 9) => {
  return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min))) + Math.ceil(min);
};

export const wait = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const addEventListener = (target, event, callback) => {
  if (typeof target === 'string') {
    target = document.querySelectorAll(target);

    target.forEach((target) => {
      return target.addEventListener(event, callback);
    });
  } else if (Array.isArray(target)) {
    target.forEach((target) => {
      return target.addEventListener(event, callback);
    });
  } else {
    target.addEventListener(event, callback);
  }
};