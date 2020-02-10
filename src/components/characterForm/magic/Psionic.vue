<script>
import { mapMutations } from 'vuex';
import { Modal } from '@/components/common';

export default {
   name: 'psionic',

   data: () => ({
      modalOpen: false,
   }),

   computed: {
      formattedContent() {
         return this.psionic.content.split('\n').join('<br />');
      },
   },

   methods: {
      ...mapMutations('character', ['removeTalent', 'removeDiscipline']),

      handleModal() {
         this.modalOpen = !this.modalOpen;
      },

      handleDelete() {
         const confirmed = window.confirm(`${this.psionic.title} will be deleted forever`);
         if (confirmed) {
            if (this.isTalent) this.removeTalent(this.psionic.id);
            else this.removeDiscipline(this.psionic.id);
         }
      },
   },

   components: { Modal },

   props: {
      psionic: Object,
      isHeader: { type: Boolean, default: false },
      isTalent: { type: Boolean, default: false },
      night: { type: Boolean, default: false },
   },
};
</script>

<template>
   <div>
      <div v-if="isHeader" :class="['psionic', 'head', { isTalent, night }]">
         <div class="col" @click="$emit('sort', 'title')">Name</div>
         <div v-show="!isTalent" class="col" @click="$emit('sort', 'order')">Order</div>
      </div>
      <div v-else :class="['psionic', { isTalent }]" @click="handleModal">
         <div class="col title">{{ psionic.title }}</div>
         <div v-show="!isTalent" class="col">{{ psionic.order }}</div>
      </div>

      <Modal
         v-if="!isHeader"
         id="view-psionic-modal"
         :show="modalOpen"
         :title="psionic.title.toUpperCase()"
         primaryLabel="Close"
         secondaryLabel="Delete"
         @primary="handleModal"
         @secondary="handleDelete"
         top
         :night="night"
      >
         <div class="psi-content" v-html="formattedContent" />
      </Modal>
   </div>
</template>

<style lang="scss" scoped>
@import '@/_a-variables.scss';

.psionic {
   min-height: 20px;
   width: 100%;
   display: grid;
   grid-template-columns: 75% 25%;
   border: 1px solid $grey;
   font-size: 12px;
   &:last-child { border-radius: 0px 0px 3px 3px; }
   &.head {
      height: 24px;
      background: #0004;
      border-radius: 3px 3px 0px 0px;
      &.night { background: #9400d344; }
   }
   &.isTalent {
      display: flex;
      grid-template-columns: auto;
      justify-content: center;
      align-items: center;
   }

   & .col {
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 0px 6px;
      &.title { justify-content: flex-start; }
      &:not(:last-child) {
         border-right: 1px solid $grey;
      }
   }
}

.psi-content {
   max-height: 400px;
   width: 100%;
   overflow-y: scroll;
}
</style>
