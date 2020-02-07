<script>
import { mapMutations } from 'vuex';
import moment from 'moment';
import PlusIcon from 'vue-material-design-icons/PlusCircleOutline.vue';
import { Input, Modal } from '@/components/common';

export default {
   name: 'entry',

   data() {
      return {
         date: moment(this.entry.date).format('DD MMM YYYY, h:mm:ss a'),
         modalOpen: false,
      };
   },

   methods: {
      ...mapMutations('character', [
         'editJournalEntry',
         'addJournalTag',
         'removeJournalTag',
         'removeJournalEntry',
      ]),

      editEntry(value, prop) {
         this.editJournalEntry({ value, prop, id: this.entry.id });
      },

      addTag(value) {
         if (value && !value.includes('#')) {
            this.addJournalTag({ value: value.toLowerCase(), id: this.entry.id });
            this.modalOpen = false;
         } else if (value.includes('#')) {
            window.alert('# will be added automatically.');
         }
      },

      removeTag(tag) {
         this.removeJournalTag({ tag, id: this.entry.id });
      },
   },

   components: { Input, Modal, PlusIcon },

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
         buttonLabel="Delete"
         name="title"
         :label="date"
         :value="entry.title"
         :inputStyle="{ paddingLeft: '8px' }"
         @input="editEntry"
         @button="removeJournalEntry(entry.id)"
         night
      />
      <Input
         textarea
         class="entry-content"
         placeholder="Content"
         name="content"
         :value="entry.content"
         @input="editEntry"
         night
      />
      <div class="tags">
         <div v-for="tag in entry.tags" :key="tag" class="tag" @click="removeTag(tag)">
            #{{ tag }}
         </div>
         <PlusIcon @click="modalOpen = true" :size="18" />
      </div>

      <Modal
         title="Add Tag"
         secondaryLabel="Cancel"
         :show="modalOpen"
         @primary="addTag"
         @secondary="modalOpen = false"
         top
         prompt
         night
      >
         {{ entry.title }}
      </Modal>
   </div>
</template>

<style lang="scss" scoped>
@import '@/_a-variables.scss';

.entry {
   width: 100%;
   margin-top: 40px;

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
