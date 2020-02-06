<script>
import { Input } from '@/components/common';
import Entry from './Entry.vue';

export default {
   name: 'journal',

   data: () => ({
      tagFilter: '',
   }),

   computed: {
      filteredEntries() {
         const { journalEntries } = this.character;

         if (this.tagFilter !== '') {
            const filteredTags = this.tagFilter.split(' #');
            return journalEntries.filter(entry => {
               return entry.tags.some(tag => filteredTags.includes(tag));
            });
         }

         return journalEntries;
      },
   },

   components: { Input, Entry },

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
            night
         />
      </section>

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
