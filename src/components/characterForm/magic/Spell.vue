<script>
import { mapMutations } from 'vuex';
import { Input, Modal } from '@/components/common';

export default {
   name: 'spell',

   data: () => ({
      modalOpen: false,
   }),

   methods: {
      ...mapMutations('character', ['deleteSpell']),

      handleDelete() {
         this.deleteSpell({ level: this.spellLevel, spellId: this.spell.id });
         this.handleModal();
      },

      handleModal() {
         this.modalOpen = !this.modalOpen;
      },
   },

   components: { Input, Modal },

   props: {
      spellLevel: Number,
      spell: Object,
      isHeader: { type: Boolean, default: false },
      night: { type: Boolean, default: false },
   },
};
</script>

<template>
   <div>
      <div v-if="isHeader" :class="['spell', 'head', { night }]">
         <div class="col">Name</div>
         <div class="col">Time</div>
         <div class="col">C.</div>
         <div class="col">Range</div>
      </div>
      <div v-else class="spell" @click="handleModal">
         <div class="col">{{ spell.title }}</div>
         <div class="col">{{ spell.time }}</div>
         <div class="col">{{ spell.conc ? 'x' : '' }}</div>
         <div class="col">{{ spell.range }}</div>
      </div>

      <Modal
         v-if="!isHeader"
         id="view-spell-modal"
         :show="modalOpen"
         :title="spell.title.toUpperCase()"
         primaryLabel="Close"
         secondaryLabel="Delete"
         @primary="handleModal"
         @secondary="handleDelete"
         top
         :night="night"
      >
         <Input
            textarea
            readonly
            height="400px"
            :value="spell.content"
            :night="night"
         />
      </Modal>
   </div>
</template>

<style lang="scss" scoped>
@import '@/_a-variables.scss';

.spell {
   min-height: 20px;
   width: 100%;
   display: grid;
   grid-template-columns: 30% 30% 10% 30%;
   border: 1px solid $grey;
   font-size: 12px;
   &:last-child { border-radius: 0px 0px 3px 3px; }
   &.head {
      height: 24px;
      background: #0004;
      border-radius: 3px 3px 0px 0px;
      &.night { background: #9400d344; }
   }

   & .col {
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      &:not(:last-child) {
         border-right: 1px solid $grey;
      }
   }
}
</style>
