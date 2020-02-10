<script>
import { mapMutations, mapGetters } from 'vuex';
import { Button, Input } from '@/components/common';
import JournalEntry from './JournalEntry.vue';

export default {
   name: 'journal',

   data: () => ({
      tagFilter: '',
      tagFilterType: 'OR',
   }),

   computed: {
      ...mapGetters(['night']),

      filteredEntries() {
         let filteredEntries = [...this.character.journalEntries];

         if (this.tagFilter !== '') {
            const filteredTags = this.tagFilter.split(' ');

            if (this.tagFilterType === 'OR') {
               filteredEntries = filteredEntries.filter(entry => {
                  return entry.tags.some(tag => filteredTags.includes(tag));
               });
            } else if (this.tagFilterType === 'AND') {
               filteredEntries = filteredEntries.filter(entry => {
                  return filteredTags.every(tag => entry.tags.includes(tag));
               });
            }
         }

         return filteredEntries;
      },
   },

   methods: {
      ...mapMutations('character', ['addJournalEntry', 'editProp']),

      editField(value, prop) {
         this.editProp({ value, prop });
      },

      switchFilterType() {
         if (this.tagFilterType === 'AND') {
            this.tagFilterType = 'OR';
         } else {
            this.tagFilterType = 'AND';
         }
      },
   },

   components: { Button, Input, JournalEntry },

   props: {
      character: Object,
   },
};
</script>

<template>
   <div class="journal">
      <section class="tags">
         <Input
            name="filter"
            placeholder="Filter tags, excluding #"
            v-model="tagFilter"
            :buttonLabel="tagFilterType"
            @button="switchFilterType"
            :night="night"
         />
      </section>

      <Input
         textarea
         label="Quick Notes"
         :value="character.quickNotes"
         @input="editField"
         :night="night"
         height="140px"
         style="margin-top: 40px;"
      />

      <Button green full @click="addJournalEntry">Add Entry</Button>

      <section class="entries">
         <JournalEntry
            v-for="entry in filteredEntries"
            :key="entry.id"
            :entry="entry"
            :night="night"
         />
      </section>
   </div>
</template>

<style lang="scss" scoped>
.journal {
   width: 100%;

   & .tags {
      width: 100%;
      & .new-tag {
         width: 100%;
         display: flex;
         justify-content: space-between;
         align-items: center;
      }
   }

   & .entries {
      width: 100%;
   }
}
</style>
