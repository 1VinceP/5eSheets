<script>
import { mapGetters, mapMutations } from 'vuex';
import startCase from 'lodash/startCase';
import MinusIcon from 'vue-material-design-icons/MinusCircleOutline.vue';
import { Input, Modal } from '@/components/common';
import Entry from '../Entry.vue';

export default {
   name: 'action',

   data: () => ({
      modalOpen: false,
   }),

   computed: {
      ...mapGetters('character', ['proficiencyBonus']),

      info() {
         const { actionTime, id } = this.action;
         return { actionTime, id };
      },

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
      ...mapMutations('character', ['removeAction', 'editAction']),

      handleDelete() {
         const { actionTime, id } = this.action;
         this.removeAction({ actionTime, id });
      },
   },

   components: { MinusIcon, Input, Modal, Entry },

   props: {
      abilities: Object,
      action: Object,
      night: { type: Boolean, default: false },
   },
};
</script>

<template>
   <div class="action">
      <div v-if="action.type === 'weapon'" class="action-container">
         <section class="remove">
            <div @click="handleDelete"><MinusIcon :size="18" fillColor="red" /></div>
         </section>

         <section class="content" @click="modalOpen = true">
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

      <div v-else class="action-container">
         <section class="remove">
            <div @click="handleDelete"><MinusIcon :size="18" fillColor="red" /></div>
         </section>

         <section class="content" @click="modalOpen = true">
            <span class="top other">
               <div class="title">{{ action.title }}</div>
            </span>
            <span class="bottom other">
               <div class="properties">{{ action.content }}</div>
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
         <div v-if="action.type === 'weapon'" class="modal-container">
            <div class="manage-properties">
               <div></div>
            </div>
            <Entry
               height="200px"
               :entry="action"
               :night="night"
               @titleInput="value => editAction({ ...info, prop: 'title', value })"
               @contentInput="value => editAction({ ...info, prop: 'content', value })"
            />
            <div class="inputs">
               <Input
                  class="input"
                  label="Damage"
                  name="damage"
                  :value="action.damage"
                  @input="value => editAction({ ...info, prop: 'damage', value })"
                  :night="night"
               />
               <Input
                  class="input"
                  label="Damage Type"
                  name="damageType"
                  :value="action.damageType"
                  @input="value => editAction({ ...info, prop: 'damageType', value })"
                  :night="night"
               />
            </div>
            <div class="inputs">
               <Input
                  class="input"
                  label="Weapon Bonus"
                  name="bonus"
                  type="number"
                  min="0"
                  :value="action.inherentBonus"
                  @input="value => editAction({
                     ...info,
                     prop: 'inherentBonus',
                     value: Number(value),
                  })"
                  :night="night"
               />
               <Input
                  class="input"
                  label="Range"
                  name="range"
                  :value="action.range"
                  @input="value => editAction({ ...info, prop: 'range', value })"
                  :night="night"
               />
            </div>
            <div class="handle-proficient">
               <div>Proficient</div>
               <input
                  type="checkbox"
                  name="proficient"
                  :checked="action.proficient"
                  @input="value => editAction({
                     ...info,
                     prop: 'proficient',
                     value: !action.proficient,
                  })"
               />
            </div>
         </div>
         <Entry
            v-else
            height="200px"
            :entry="action"
            :night="night"
            @titleInput="value => editAction({ ...info, prop: 'title', value })"
            @contentInput="value => editAction({ ...info, prop: 'content', value })"
         />
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
      margin-bottom: 20px;

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
            &.other { display: flex; }
         }

         & .bottom {
            width: 100%;
            display: grid;
            grid-template-columns: 77% 23%;
            &.other { grid-template-columns: 100%; }

            & .properties {
               height: 100%;
               width: 100%;
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

      & .inputs {
         width: 100%;
         display: flex;
         justify-content: space-between;
         align-items: center;

         & .input { width: 48%; }
      }

      & .handle-proficient {
         width: 100%;
         display: flex;
         justify-content: space-between;
         align-items: center;
      }
   }
}
</style>
