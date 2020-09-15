import toastr from 'toastr';
import uuid from 'uuid/v4';
import shortId from '@/utils/generateId';
import router from '@/router';
import {
   statMutations,
   actionMutations,
   gearMutations,
   magicMutations,
   featureMutations,
   journalMutations,
   friendMutations,
} from './characterMutations';
import EquipmentItem from './characterDefaults/EquipmentItem';

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

const initialFeature = {
   title: '',
   content: '',
   type: 'entry',
   id: '',
};

const initialState = () => ({
   /* stats */
   name: '',
   walkSpeed: 0,
   climbSpeed: 0,
   flySpeed: 0,
   swimSpeed: 0,
   ac: 0,
   initiativeBonus: 0,
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
      dex: { ...initialSkill },
      con: { ...initialSkill },
      int: { ...initialSkill },
      wis: { ...initialSkill },
      cha: { ...initialSkill },
   },
   /* actions */
   actions: [],
   bonusActions: [],
   reactions: [],
   /* gear */
   cp: 0,
   sp: 0,
   gp: 0,
   pp: 0,
   equipment: [new EquipmentItem()],
   specialItems: [],
   treasure: '',
   /* magic */
   magicDisplay: 'spells',
   spellAbility: '',
   spellsList: [
      { ...initialSpellList },
   ],
   sorceryPoints: 0,
   maxSorceryPoints: 0,
   psiPoints: 0,
   maxPsiPoints: 0,
   psiFocus: { title: '', focus: '' },
   psiTalents: [],
   psiDisciplines: [],
   /* features */
   features: [{ ...initialFeature, id: shortId() }],
   // classFeatures: [],
   // racialFeatures: [],
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
   quickNotes: '',
   journalEntries: [],
   id: '',
   /* friends */
   friends: [],
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
   },

   mutations: {
      ...statMutations,
      ...actionMutations,
      ...gearMutations,
      ...featureMutations,
      ...magicMutations,
      ...journalMutations,
      ...friendMutations,

      resetForm(state) {
         const s = initialState();
         Object.keys(s).forEach(key => {
            state[key] = s[key];
         });
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
   },

   actions: {
      saveNewCharacter({ state, rootState }) {
         const id = uuid();
         const creationDate = new Date();
         const character = { ...state, id, creationDate };
         state.id = id;
         state.creationDate = creationDate;
         const newList = JSON.stringify([...rootState.characters, { ...character }]);
         localStorage.setItem('5e-characters', newList);
         router.push(`/characters/${id}`);
         toastr.success(`${character.name} has been saved.`);
      },

      saveCharacter({ state, rootState }, id) {
         const lastEdited = new Date();
         const character = { ...state, lastEdited };
         state.lastEdited = lastEdited;
         const list = [...rootState.characters];
         const charIndex = list.findIndex(c => c.id === id);
         if (charIndex >= 0) {
            list.splice(charIndex, 1, character);
            localStorage.setItem('5e-characters', JSON.stringify(list));
            toastr.success(`${character.name} has been saved.`);
         } else {
            toastr.error('Something went wrong... Export your character for safety, and try again.');
         }
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

      importCharacter({ rootState, dispatch }, character) {
         const newList = JSON.stringify([...rootState.characters, { ...character }]);
         localStorage.setItem('5e-characters', newList);
         dispatch('getCharacters', null, { root: true });
         toastr.success(`${character.name} has been imported.`);
      },
   },
};
