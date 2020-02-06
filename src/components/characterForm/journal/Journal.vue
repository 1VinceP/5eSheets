<script>
import { mapMutations } from 'vuex';
import { Button, Input } from '@/components/common';
import Entry from './Entry.vue';

export default {
   name: 'journal',

   data: () => ({
      tagFilter: '',
      tagFilterType: 'OR',
   }),

   computed: {
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
      ...mapMutations('character', ['addJournalEntry']),

      switchFilterType() {
         if (this.tagFilterType === 'AND') {
            this.tagFilterType = 'OR';
         } else {
            this.tagFilterType = 'AND';
         }
      },
   },

   components: { Button, Input, Entry },

   props: {
      character: Object,
   },
};
</script>

<template>
   <div class="global-page">
      <section class="tags">
         <Input
            name="filter"
            placeholder="Filter tags, leading with #"
            v-model="tagFilter"
            :buttonLabel="tagFilterType"
            @button="switchFilterType"
            night
         />
      </section>

      <Button green full @click="addJournalEntry">Add Entry</Button>

      <section class="entries">
         <Entry v-for="entry in filteredEntries" :key="entry.id" :entry="entry" />
      </section>
   </div>
</template>

<style lang="scss" scoped>
.tags {
   width: 100%;
   & .new-tag {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
   }
}

.entries {
   width: 100%;
}
</style>
