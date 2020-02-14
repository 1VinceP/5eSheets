import Spell from '../characterDefaults/Spell';
import shortId from '@/utils/generateId';

const initialSpellList = {
   maxSlots: 0,
   currentSlots: 0,
   spells: [],
};

// function parseNewSpell(title, content) {
//    const timeReg = new RegExp(/(Casting Time: )(.*)/g);
//    const rangeReg = new RegExp(/(Range: )(.*)/g);
//    const concRegex = new RegExp(/Duration: Concentration/g);
//    const ritualRegex = new RegExp(/\(ritual\)/g);

//    return {
//       title,
//       content,
//       prepared: false,
//       time: timeReg.exec(content)[2] || '',
//       range: rangeReg.exec(content)[2] || '',
//       conc: concRegex.test(content),
//       ritual: ritualRegex.test(content),
//       id: shortId(),
//    };
// }

function parseNewDiscipline(title, content) {
   const orderReg = new RegExp(/(.*)( Discipline\n)/);
   const focusReg = new RegExp(/(Psychic Focus\. )(.*)/g);

   return {
      title,
      content,
      order: orderReg.exec(content)[1] || '',
      focus: {
         title,
         content: focusReg.exec(content)[2] || '',
      },
      id: shortId(),
   };
}

export default {
   addSpellList(state) {
      if (state.spellsList.length < 10) {
         state.spellsList = [...state.spellsList, { ...initialSpellList }];
      }
   },

   editSpellLevelData(state, { prop, value, index }) {
      const newList = [...state.spellsList];
      newList[index][prop] = value;
      state.spellsList = newList;
   },

   removeSpellList(state) {
      if (state.spellsList.length > 1) {
         state.spellsList = state.spellsList.slice(0, -1);
      }
   },

   addSpell(state, { level }) {
      state.spellsList[level].spells = [
         ...state.spellsList[level].spells,
         new Spell(),
      ];
   },

   deleteSpell(state, { level, id }) {
      // const newSpellsList = [...state.spellsList];
      const newListAtLevel = [...state.spellsList[level].spells];
      const spellIndex = newListAtLevel.findIndex(spell => spell.id === id);
      newListAtLevel.splice(spellIndex, 1);
      state.spellsList[level].spells = newListAtLevel;
      // newSpellsList[level].spells = newListAtLevel;
      // state.spellsList = newSpellsList;
   },

   editSpell(state, { level, id, prop, value }) {
      const spellIndex = state.spellsList[level].spells.findIndex(s => s.id === id);
      state.spellsList[level].spells[spellIndex][prop] = value;
   },

   addTalent(state, talent) {
      const newTalents = [...state.psiTalents, { ...talent, id: shortId() }];
      state.psiTalents = newTalents;
   },

   addDiscipline(state, { title, content }) {
      const newDiscipline = parseNewDiscipline(title, content);
      const newDisciplines = [...state.psiDisciplines, newDiscipline];
      state.psiDisciplines = newDisciplines;
   },

   removeTalent(state, id) {
      const index = state.psiTalents.findIndex(d => d.id === id);
      const newTalents = [...state.psiTalents];
      newTalents.splice(index, 1);
      state.psiTalents = newTalents;
   },

   removeDiscipline(state, id) {
      const index = state.psiDisciplines.findIndex(d => d.id === id);
      const newDisciplines = [...state.psiDisciplines];
      newDisciplines.splice(index, 1);
      state.psiDisciplines = newDisciplines;
   },
};
