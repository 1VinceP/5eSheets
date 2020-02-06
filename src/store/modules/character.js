import toastr from 'toastr';
import uuid from 'uuid/v4';
import router from '@/router';
import { statMutations, journalMutations } from './characterMutations';

const initialSkill = {
   proficient: false,
   score: 10,
   modifier: 0,
   skills: [],
   experts: [],
};

const initialSpellList = {
   maxSlots: 0,
   currentSlots: 0,
   spells: [],
};

const initialState = () => ({
   /* stats */
   name: '',
   hp: 0,
   maxHp: 0,
   tempHp: 0,
   hitDice: {
      6: { current: 0, max: 0, dieValue: 6 },
      8: { current: 0, max: 0, dieValue: 8 },
      10: { current: 0, max: 0, dieValue: 10 },
      12: { current: 0, max: 0, dieValue: 12 },
   },
   deathSucceeds: 0,
   deathFails: 0,
   race: '',
   classes: [{ name: '', level: 0, subclass: '', hitDie: null }],
   proficiencyBonus: 2,
   abilities: {
      str: { ...initialSkill },
   },
   /* magic */
   magicDisplay: 'magic',
   spellAbility: '',
   spellsList: [
      { ...initialSpellList },
   ],
   /* life */
   playerName: '',
   xp: 0,
   background: '',
   alignment: '',
   age: '',
   gender: '',
   height: '',
   weight: '',
   size: '',
   hair: '',
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
   /* journal */
   journalEntries: [],
});

export default {
   namespaced: true,

   state: initialState,

   getters: {
      proficiencyBonus: state => {
         const totalLevel = state.classes.reduce((total, charClass) => {
            return total + Number(charClass.level);
         }, 0);

         if (totalLevel <= 4) return 2;
         else if (totalLevel <= 8) return 3;
         else if (totalLevel <= 12) return 4;
         else if (totalLevel <= 16) return 5;
         else return 6;
      },

      initiativeBonus: state => {
         const dexMod = state.abilities.dex.modifier;
         const symbol = dexMod >= 0 ? '+' : '';
         return `${symbol}${dexMod}`;
      },
   },

   mutations: {
      ...statMutations,
      ...journalMutations,

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

      addSpellList(state) {
         if (state.spellsList.length < 10) {
            state.spellsList = [...state.spellsList, { ...initialSpellList }];
         }
      },

      editSpellList(state, { prop, value, index }) {
         // const newList = { ...state.spellsList[index] };
         // newList[prop] = value;
         // state.spellsList[index] = newList;
         const newList = [...state.spellsList];
         console.log(newList);
         newList[index][prop] = value;
         state.spellsList = newList;
      },

      removeSpellList(state) {
         if (state.spellsList.length > 1) {
            state.spellsList = state.spellsList.slice(0, -1);
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
         toastr.success(`${character.name} has been saved.`);
      },

      saveCharacter({ state, rootState }, id) {
         const lastEdited = new Date();
         const character = { ...state, lastEdited };
         const list = [...rootState.characters];
         const charIndex = list.findIndex(c => c.id === id);
         list.splice(charIndex, 1, character);
         localStorage.setItem('5e-characters', JSON.stringify(list));
         toastr.success(`${character.name} has been saved.`);
      },

      deleteCharacter({ state, rootState, commit }) {
         const confirmed = window.confirm('Your character will be gone forever.');
         if (confirmed) {
            const newList = rootState.characters
               .filter(character => character.id !== state.id);
            localStorage.setItem('5e-characters', JSON.stringify(newList));
            commit('resetForm');
            router.push('/characters');
            toastr.success('Your character has been deleted.');
         }
      },
   },
};
