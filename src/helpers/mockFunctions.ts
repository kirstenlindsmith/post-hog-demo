const allCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const numCharacters = '0123456789';
const letterCharacters = 'abcdefghijklmnopqrstuvwxyz';
const uuidCharacters = numCharacters + 'abcdef';
const uuidFourthSectionCharacters = '89ab';

export const randomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const randomBool = (trueRatio?: number) => Math.random() < (trueRatio ?? 0.5);

export const randomArrayItem = <T>(array: T[]) =>
  array[Math.ceil(Math.random() * array.length - 1)];

const insertRandomSpaces = (input: string, numberOfSpaces: number) => {
  const workingInput = input.split('');
  while (numberOfSpaces--) {
    const newSpaceLocation = randomNumber(2, workingInput.length - 1);
    if (workingInput[newSpaceLocation + 1] !== ' ' && workingInput[newSpaceLocation - 1] !== ' ') {
      workingInput.splice(newSpaceLocation, 0, ' ');
    }
  }
  workingInput
    .join('')
    .split(' ')
    .forEach((word, i) => {
      if (word.length > 20) {
        const spaceCount = Math.floor(word.length / 10);
        workingInput.splice(i, 1, insertRandomSpaces(word, spaceCount));
      }
    });
  return workingInput.join('');
};

const makeString = (length: number, characters: string = allCharacters) => {
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const makeText = (maxLength = 150, alwaysReturn = true, exactLength?: boolean) => {
  if (randomBool(0.25) && !alwaysReturn) return;
  const noteLength = exactLength ? maxLength : randomNumber(10, maxLength);
  const spaceCount = Math.floor(noteLength / 10);
  return insertRandomSpaces(makeString(noteLength, letterCharacters), spaceCount).slice(0, 1000);
};

export const makeUuid = () =>
  `${makeString(8, uuidCharacters)}-${makeString(4, uuidCharacters)}-4${makeString(
    3,
    uuidCharacters
  )}-${makeString(1, uuidFourthSectionCharacters)}${makeString(3, uuidCharacters)}-${makeString(
    12,
    uuidCharacters
  )}`;
