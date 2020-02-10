import shuffle from 'lodash/shuffle';

const chars = 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz'.split('');
const nums = '12345678901234567890'.split('');

export default (length = 4) => {
   const set1 = shuffle(chars).slice(0, length);
   const set2 = shuffle(nums).slice(0, length);
   return shuffle([...set1, ...set2]).join('');
};
