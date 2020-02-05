<script>
import moment from 'moment';
import PlusIcon from 'vue-material-design-icons/PlusCircleOutline.vue';
import { Input } from '@/components/common';

export default {
   name: 'entry',

   data() {
      return {
         date: moment(this.entry.date).format('DD MMM YYYY'),
      };
   },

   components: { Input, PlusIcon },

   props: {
      entry: Object,
   },
};
</script>

<template>
   <div class="entry">
      <Input
         class="entry-title"
         placeholder="Title"
         :label="date"
         :name="`entryTitle-${entry.id}`"
         :value="entry.title"
         night
      />
      <Input
         textarea
         class="entry-content"
         placeholder="Content"
         :name="`entryContent-${entry.id}`"
         :value="entry.content"
         night
      />
      <div class="tags">
         <div v-for="tag in entry.tags" :key="tag" class="tag">#{{ tag }}</div>
         <PlusIcon :size="18" />
      </div>
   </div>
</template>

<style lang="scss" scoped>
@import '@/_a-variables.scss';

.entry {
   width: 100%;

   & .entry-title {
      padding-left: -8px;
      padding-right: 0px;
      border-bottom: none;
      border-top-right-radius: 10px;
      border-bottom-left-radius: 0px;
      border-bottom-right-radius: 0px;
   }

   & .entry-content {
      margin-top: -20px;
      margin-bottom: 10px;
      border-top-right-radius: 0px;
      border-top-left-radius: 0px;
   }

   & .tags {
      width: 100%;
      display: flex;
      & .tag {
         background: #323231;
         border-radius: 3px;
         margin-right: 6px;
         margin-bottom: 3px;
         padding: 3px 6px;
         color: $blue;
         font-size: 13px;
      }
   }
}
</style>
