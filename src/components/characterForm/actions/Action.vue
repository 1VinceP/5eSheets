<script>
import { mapGetters, mapMutations } from 'vuex';
import startCase from 'lodash/startCase';
import MinusIcon from 'vue-material-design-icons/MinusCircleOutline.vue';
import { Modal } from '@/components/common';
import Entry from '../Entry.vue';

export default {
   name: 'action',

   data: () => ({
      modalOpen: false,
   }),

   computed: {
      ...mapGetters('character', ['proficiencyBonus']),

      abilityMod() {
         const { str, dex } = this.abilities;
         const isFinesse = this.action.properties.includes('finesse');
         const isRanged = this.action.properties.includes('ranged');

         if (isRanged) return dex.modifier;

         return isFinesse
            ? dex.modifier >= str.modifier ? dex.modifier : str.modifier
            : str.modifier;
      },

      attackBonus() {
         const profBonus = this.action.proficient ? this.proficiencyBonus : 0;
         const total = 0 + this.abilityMod + profBonus + this.action.inherentBonus;
         const symbol = total >= 0 ? '+' : '';
         return `${symbol}${total}`;
      },

      damageBonus() {
         const total = 0 + this.abilityMod + this.action.inherentBonus;
         const symbol = total > 0 ? ' + ' : ' - ';
         // convert to positive for display
         const bonus = total < 0 ? total * -1 : total;
         return bonus === 0 ? '' : `${symbol}${bonus}`;
      },

      properties() {
         return this.action.properties.map(p => startCase(p)).join(', ');
      },
   },

   methods: {
      ...mapMutations('character', ['removeAction']),

      handleDelete() {
         this.removeAction(this.action.id);
      },
   },

   components: { MinusIcon, Modal, Entry },

   props: {
      abilities: Object,
      action: Object,
      isHeader: { type: Boolean, default: false },
      night: { type: Boolean, default: false },
   },
};
</script>

<template>
   <div class="action">
      <div class="action-container" @click="modalOpen = true">
         <section class="remove">
            <div @click="handleDelete"><MinusIcon :size="18" fillColor="red" /></div>
         </section>

         <section class="content">
            <span class="top">
               <div class="col title">{{ action.title }}</div>
               <div class="col">{{ attackBonus }}</div>
               <div class="col">{{ action.damage }}{{ damageBonus }}</div>
               <div class="col">{{ action.damageType }}</div>
            </span>
            <span class="bottom">
               <div class="properties">{{ properties }}</div>
               <div v-show="action.range" class="col range">{{ action.range }}ft.</div>
            </span>
         </section>
      </div>

      <Modal
         top
         :show="modalOpen"
         :night="night"
         :title="action.title"
         primaryLabel="Close"
         @primary="modalOpen = false"
      >
         <div class="modal-container">
            <Entry
               :entry="action"
               :night="night"
            />
         </div>
      </Modal>
   </div>
</template>

<style lang="scss" scoped>
.action {
   width: 100%;

   & .action-container {
      height: 40px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-bottom: 30px;

      & .remove {
         height: 100%;
         width: 30px;
         display: flex;
         align-items: center;
      }

      & .content {
         height: 100%;
         width: 100%;
         display: grid;
         grid-template-rows: repeat(2, 1fr);

         & .top {
            width: 100%;
            display: grid;
            grid-template-columns: 47% 13% 20% 20%;
            border-bottom: 1px solid #ccc;
         }

         & .bottom {
            width: 100%;
            display: grid;
            grid-template-columns: 77% 23%;

            & .properties {
               height: 100%;
               display: flex;
               align-items: center;
               font-size: 11px;
               font-style: italic;
               white-space: nowrap;
               overflow-x: scroll;
            }
         }

         & .col {
            font-size: 14px;
            display: flex;
            justify-content: center;
            align-items: center;
            &.title {
               justify-content: flex-start;
               padding-right: 3px;
               overflow-x: scroll;
               white-space: nowrap;
            }
            &.range {
               display: flex;
               justify-content: flex-end;
               align-items: center;
               border-left: 1px solid #ccc;
            }
         }
      }
   }

   & .modal-container {
      width: 100%;
   }
}
</style>
