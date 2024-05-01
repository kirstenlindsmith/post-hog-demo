import { makeText, makeUuid, randomArrayItem, randomBool, randomNumber } from './mockFunctions';

const realWords = [
  'Apple',
  'Banana',
  'Candy',
  'Dandelion',
  'Elephant',
  'French',
  'Gyrocopter',
  'Halloween',
  'Igloo',
  'Jurassic Park',
  'Kansas',
  'Lollipop',
  'Marine biologist',
  'Nancy Drew',
  'Octopus',
  'Polymorph',
  'Question',
  'Regular expressions',
  'Stylish',
  'Testing',
  'Ultraviolet',
  'Vegetarian',
  'Walrus',
  'Xenomorph',
  'Yesterday',
  'Zachary',
];

export const makeSearchData = () =>
  Array.from({ length: randomNumber(0, 10) }, () => ({
    id: makeUuid(),
    propertyA: randomBool(),
    propertyB: randomBool(),
    propertyC: randomBool(),
    text: makeText(randomNumber(20, 300)),
    name: Array.from({ length: randomNumber(5, realWords.length) }, () =>
      randomArrayItem(realWords)
    ).join(' '),
  }));
