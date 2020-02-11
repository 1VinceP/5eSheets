import toastr from 'toastr';
import JournalEntry from '../characterDefaults/JournalEntry';

export default {
   addJournalEntry(state) {
      state.journalEntries = [new JournalEntry(), ...state.journalEntries];
   },

   addJournalTag(state, { value, id }) {
      const index = state.journalEntries.findIndex(entry => entry.id === id);
      const newTags = [...state.journalEntries[index].tags, value];
      state.journalEntries[index].tags = newTags;
   },

   removeJournalTag(state, { tag, id }) {
      const entryIndex = state.journalEntries.findIndex(entry => entry.id === id);
      const tagIndex = state.journalEntries[entryIndex].tags
         .findIndex(t => t === tag);
      const newTags = [...state.journalEntries[entryIndex].tags];
      newTags.splice(tagIndex, 1);
      state.journalEntries[entryIndex].tags = newTags;
   },

   editJournalEntry(state, { prop, value, id }) {
      const index = state.journalEntries.findIndex(entry => entry.id === id);
      state.journalEntries[index][prop] = value;
   },

   removeJournalEntry(state, { id }) {
      const confirmed = window.confirm('You will lose this entry forever.');
      if (confirmed) {
         const newEntries = [...state.journalEntries];
         const index = newEntries.findIndex(entry => entry.id === id);
         newEntries.splice(index, 1);
         state.journalEntries = newEntries;
         toastr.success('Your entry has been deleted.');
      }
   },
};
