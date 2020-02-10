import shortId from '@/utils/generateId';

const initialSpellList = {
   maxSlots: 0,
   currentSlots: 0,
   spells: [],
};

function parseNewSpell(title, content) {
   const timeReg = new RegExp(/(Casting Time: )(.*)/g);
   const rangeReg = new RegExp(/(Range: )(.*)/g);
   const concRegex = new RegExp(/Duration: Concentration/g);

   return {
      title,
      content,
      time: timeReg.exec(content)[2] || '',
      conc: concRegex.test(content) || '',
      range: rangeReg.exec(content)[2] || '',
      id: shortId(),
   };
}

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

   addNewSpell(state, { title, content, level }) {
      const newSpell = parseNewSpell(title, content);
      const newSpellsList = [...state.spellsList];
      newSpellsList[level].spells = [...newSpellsList[level].spells, newSpell];
      state.spellsList = newSpellsList;
   },

   deleteSpell(state, { level, spellId }) {
      const newSpellsList = [...state.spellsList];
      const newListAtLevel = [...newSpellsList[level].spells];
      const spellIndex = newListAtLevel.findIndex(spell => spell.id === spellId);
      newListAtLevel.splice(spellIndex, 1);
      newSpellsList[level].spells = newListAtLevel;
      state.spellsList = newSpellsList;
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
