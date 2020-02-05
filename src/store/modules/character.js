import uuid from 'uuid/v4';
import reduce from 'lodash/reduce';
import router from '@/router';
import classList from '@/constants/classes.constants';

const initialSkill = {
   proficient: false,
   score: 10,
   modifier: 0,
   skills: [],
   experts: [],
};

const initialState = () => ({
   name: '',
   hitDice: {
      6: { current: 0, max: 0, dieValue: 6 },
      8: { current: 0, max: 0, dieValue: 8 },
      10: { current: 0, max: 0, dieValue: 10 },
      12: { current: 0, max: 0, dieValue: 12 },
   },
   classes: [{ name: '', level: 0, subclass: '', hitDie: null }],
   race: '',
   proficiencyBonus: 2,
   abilities: {
      str: { ...initialSkill },
      dex: { ...initialSkill },
      con: { ...initialSkill },
      int: { ...initialSkill },
      wis: { ...initialSkill },
      cha: { ...initialSkill },
   },
   background: '',
   age: '',
   gender: '',
   height: '',
   weight: '',
   eyes: '',
   skin: '',
   appearance: '',
   personalityTraits: '',
   ideal: '',
   bond: '',
   flaw: '',
   story: '',
   creationDate: '',
   lastEdited: '',
});

function getNewHitDieValue(dieValue, classes) {
   return reduce(classes, (total, next) => {
      return next.hitDie === dieValue
         ? total + Number(next.level)
         : total;
   }, 0);
}

export default {
   namespaced: true,

   state: initialState,

   getters: {},

   mutations: {
      resetForm(state) {
         const s = initialState();
         Object.keys(s).forEach(key => { state[key] = s[key]; });
      },

      // called from the rootStore when the character page is loaded
      setCharacter(state, character) {
         Object.keys(character).forEach(key => {
            state[key] = character[key];
         });
      },

      editProp(state, { prop, value }) {
         state[prop] = value;
      },

      editHitDie(state, { direction, dieValue }) {
         const value = direction === 'decrease' ? -1 : 1;
         state.hitDice[dieValue].current += value;
      },

      editClassProp(state, { prop, value, index }) {
         state.classes[index][prop] = value;
         if (prop === 'name') {
            state.classes[index].hitDie = classList.find(c => c.name === value).hitDie;
         } else if (prop === 'level') {
            const dieValue = classList.find(c => c.name === state.classes[index].name).hitDie;
            const newValue = getNewHitDieValue(dieValue, state.classes);

            state.hitDice[dieValue].max = newValue;
            state.hitDice[dieValue].current = newValue;
         }
      },

      addClass(state) {
         state.classes = [...state.classes, initialState().classes[0]];
      },

      removeClass(state) {
         state.classes = state.classes.slice(0, -1);
         const lastClassIndex = state.classes.length - 1;
         if (state.classes[lastClassIndex].level) {
            const dieValue = classList
               .find(c => c.name === state.classes[lastClassIndex].name).hitDie;
            const newValue = getNewHitDieValue(dieValue, state.classes);

            state.hitDice[dieValue].max = newValue;
            state.hitDice[dieValue].current = newValue;
         }
      },

      editAbility(state, { ability, prop, value }) {
         const charAbility = state.abilities[ability];

         if (prop === 'score') {
            charAbility.score = value;
            charAbility.modifier = Math.floor((Number(value) - 10) / 2);
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
   },

   actions: {
      saveNewCharacter({ state, rootState }) {
         const id = uuid();
         const creationDate = new Date();
         const character = { ...state, id, creationDate };
         const newList = JSON.stringify([...rootState.characters, { ...character }]);
         localStorage.setItem('5e-characters', newList);
         router.push(`/characters/${id}`);
      },

      saveCharacter({ state, rootState }, id) {
         const lastEdited = new Date();
         const character = { ...state, lastEdited };
         const list = [...rootState.characters];
         const charIndex = list.findIndex(c => c.id === id);
         list.splice(charIndex, 1, character);
         localStorage.setItem('5e-characters', JSON.stringify(list));
      },

      deleteCharacter({ state, rootState, commit }) {
         const confirmed = window.confirm('Your character will be gone forever.');
         if (confirmed) {
            const newList = rootState.characters
               .filter(character => character.id !== state.id);
            localStorage.setItem('5e-characters', JSON.stringify(newList));
            commit('resetForm');
            router.push('/characters');
         }
      },
   },
};
