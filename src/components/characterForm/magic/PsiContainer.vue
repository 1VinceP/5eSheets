<script>
import { mapMutations } from 'vuex';
import PlusIcon from 'vue-material-design-icons/PlusCircleOutline.vue';
import { Modal } from '@/components/common';
import SpellEntry from './SpellEntry.vue';

export default {
   name: 'psi-container',

   data: () => ({
      modalOpen: false,
      newName: '',
      newContent: '',
   }),

   methods: {
      ...mapMutations('character', ['addTalent', 'addDiscipline']),

      closeModal() {
         this.modalOpen = false;
         this.newName = '';
         this.newcontent = '';
      },

      addPsionic() {
         if (this.isTalent) {
            this.addTalent({ title: this.newName, content: this.newContent });
         } else {
            this.addDiscipline({ title: this.newName, content: this.newContent });
         }

         this.closeModal();
      },
   },

   components: { Modal, PlusIcon, SpellEntry },

   props: {
      isTalent: { type: Boolean, default: false },
      night: { type: Boolean, default: false },
   },
};
</script>

<template>
   <div class="psi-container">
      <section class="header">
         <div class="title">{{ isTalent ? 'Talents' : 'Disciplines' }}</div>
         <PlusIcon :size="18" @click="modalOpen = true" />
      </section>

      <Modal
         :show="modalOpen"
         :title="`Add ${isTalent ? 'Talent' : 'Discipline'}`"
         primaryLabel="Save"
         secondaryLabel="Cancel"
         @primary="addPsionic"
         @secondary="closeModal"
         top
         :night="night"
      >
         <SpellEntry
            :contentPlaceholder="
               // eslint-disable-next-line max-len
               `Paste ${isTalent ? 'talent' : 'discipline'} data here. It will be parsed automagically.`
            "
            :entry="{ title: newName, content: newContent }"
            @titleInput="value => newName = value"
            @contentInput="value => newContent = value"
            :night="night"
         />
      </Modal>
   </div>
</template>

<style lang="scss" scoped>
.psi-container {
   width: 100%;

   & .header {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 6px;
      & .title {
         width: 45%;
         font-size: 18px;
      }
   }

   & .add-psionic {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-top: 6px;
      padding: 3px 6px;
   }
}
</style>
