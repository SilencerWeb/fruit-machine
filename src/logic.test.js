import { FruitMachine } from './logic';

const fruitMachine = new FruitMachine();

describe('should pass spin tests', () => {
  test('without arguments', () => {
    expect(fruitMachine.spin()).toBeGreaterThanOrEqual(0);
    expect(fruitMachine.spin()).toBeGreaterThanOrEqual(0);
  });

  describe('with arguments', () => {
    test('3 same reels', () => {
      expect(fruitMachine.spin(['wild', 'wild', 'wild'])).toEqual(1000);
      expect(fruitMachine.spin(['cherry', 'cherry', 'cherry'])).toEqual(500);
    });

    test('2 same reels', () => {
      expect(fruitMachine.spin(['wild', 'wild', 'star'])).toEqual(100);
      expect(fruitMachine.spin(['cherry', 'king', 'cherry'])).toEqual(50);
      expect(fruitMachine.spin(['jack', 'queen', 'queen'])).toEqual(20);
    });

    test('2 same reels and wild', () => {
      expect(fruitMachine.spin(['king', 'king', 'wild'])).toEqual(60);
      expect(fruitMachine.spin(['bar', 'wild', 'bar'])).toEqual(80);
      expect(fruitMachine.spin(['wild', 'bell', 'bell'])).toEqual(160);
    });

    test('no same reels', () => {
      expect(fruitMachine.spin(['king', 'cherry', 'bell'])).toEqual(0);
      expect(fruitMachine.spin(['shell', 'wild', 'seven'])).toEqual(0);
    });
  });
});