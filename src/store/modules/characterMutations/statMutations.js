import classList from '@/constants/classes.constants';
import calcAbilityMod from '@/utils/calcAbilityMod';

const initialClass = { name: '', level: 0, subclass: '', hitDie: null, features: {} };

function getNewHitDieValue(dieValue, classes) {
   return classes.reduce((total, next) => {
      return next.hitDie === dieValue
         ? total + Number(next.level)
         : total;
   }, 0);
}

export default {
   editHitDie(state, { direction, dieValue, value }) {
      if (direction === 'calc') {
         state.hitDice[dieValue].current = value;
      } else {
         const sumValue = direction === 'decrease' ? -1 : 1;
         state.hitDice[dieValue].current += sumValue;
      }
   },

   editClassProp(state, { prop, value, index }) {
      state.classes[index][prop] = value;
      if (prop === 'name') {
         const ClassConstant = classList.find(c => c.name === value);
         state.classes[index].features = ClassConstant.features;

         const oldHitDie = state.classes[index].hitDie;
         const newHitDie = ClassConstant.hitDie;
         state.classes[index].hitDie = newHitDie;
         if (oldHitDie) {
            // update hit dice when a class is swapped
            const newValueForOldDice = getNewHitDieValue(oldHitDie, state.classes);
            state.hitDice[oldHitDie].max = newValueForOldDice;
            state.hitDice[oldHitDie].current = newValueForOldDice;
            const newValueForNewDice = getNewHitDieValue(newHitDie, state.classes);
            state.hitDice[newHitDie].max = newValueForNewDice;
            state.hitDice[newHitDie].current = newValueForNewDice;
         }
      } else if (prop === 'level') {
         const dieValue = classList.find(c => c.name === state.classes[index].name).hitDie;
         const newValue = getNewHitDieValue(dieValue, state.classes);

         state.hitDice[dieValue].max = newValue;
         state.hitDice[dieValue].current = newValue;
      }
   },

   addClass(state) {
      state.classes = [...state.classes, { ...initialClass }];
   },

   removeClass(state) {
      const oldClassName = state.classes[state.classes.length - 1].name;
      state.classes = state.classes.slice(0, -1);
      if (oldClassName) {
         const dieValue = classList
            .find(c => c.name === oldClassName).hitDie;
         const newValue = getNewHitDieValue(dieValue, state.classes);

         state.hitDice[dieValue].max = newValue;
         state.hitDice[dieValue].current = newValue;
      }
   },

   editAbility(state, { ability, prop, value }) {
      const charAbility = state.abilities[ability];

      if (prop === 'score') {
         charAbility.score = value;
         charAbility.modifier = calcAbilityMod(value);
      } else if (prop === 'proficient') {
         charAbility.proficient = !charAbility.proficient;
      } else if (prop === 'skills' || prop === 'experts') {
         const skillIndex = charAbility[prop].findIndex(skill => skill === value);
         if (skillIndex >= 0) {
            const newSkills = [...charAbility[prop]];
            newSkills.splice(skillIndex, 1);
            charAbility[prop] = newSkills;
         } else {
            charAbility[prop] = [...charAbility[prop], value];
         }
      }
   },
};
