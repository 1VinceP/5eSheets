import Spell from '../characterDefaults/Spell';
import Psionic from '../characterDefaults/Psionic';

const initialSpellList = {
   maxSlots: 0,
   currentSlots: 0,
   spells: [],
};

// function parseNewDiscipline(title, content) {
//    const orderReg = new RegExp(/(.*)( Discipline\n)/);
//    const focusReg = new RegExp(/(Psychic Focus\. )(.*)/g);

//    return {
//       title,
//       content,
//       order: orderReg.exec(content)[1] || '',
//       focus: {
//          title,
//          content: focusReg.exec(content)[2] || '',
//       },
//       id: shortId(),
//    };
// }

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
      const newListAtLevel = [...state.spellsList[level].spells];
      const spellIndex = newListAtLevel.findIndex(spell => spell.id === id);
      newListAtLevel.splice(spellIndex, 1);
      state.spellsList[level].spells = newListAtLevel;
   },

   editSpell(state, { level, id, prop, value }) {
      const spellIndex = state.spellsList[level].spells.findIndex(s => s.id === id);
      state.spellsList[level].spells[spellIndex][prop] = value;
   },

   addPsionic(state, psionic) {
      state[psionic] = [...state[psionic], new Psionic()];
   },

   removePsionic(state, { psiType, id }) {
      const index = state[psiType].findIndex(p => p.id === id);
      const newList = [...state[psiType]];
      newList.splice(index, 1);
      state[psiType] = newList;
   },

   editPsionic(state, { psiType, id, prop, value }) {
      const index = state[psiType].findIndex(p => p.id === id);
      state[psiType][index][prop] = value;
   },
};
