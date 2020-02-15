<script>
// import { Input } from '@/components/common';
import { mapGetters, mapMutations } from 'vuex';
import { Input, Modal } from '@/components/common';
import Counter from '@/components/characterForm/Counter.vue';
import Equipment from './Equipment.vue';

export default {
   name: 'gear',

   data: () => ({
      showModal: false,
   }),

   computed: {
      ...mapGetters(['night']),

      currentWeight() {
         let weight = [...this.character.equipment];
         weight = weight.reduce((total, next) => {
            /* eslint-disable indent */
            switch (next.location) {
               case 'donned':
               case 'backpack':
               case 'pocket':
                  return total + (next.weight * next.quantity);

               default:
                  return total;
            }
            /* eslint-enable indent */
         }, 0);
         return weight;
      },

      weightCapacity() {
         const { score } = this.character.abilities.str;

         return {
            enc: score * 5,
            heavyEnc: score * 10,
            max: score * 15,
            move: score * 30,
         };
      },
   },

   methods: {
      ...mapMutations('character', ['editProp']),

      editField(value, prop) {
         this.editProp({ value, prop });
      },
   },

   components: { Input, Modal, Counter, Equipment },

   props: {
      character: Object,
   },
};
</script>

<template>
   <div class="gear">
      <section class="money">
         <Counter
            label="cp"
            name="cp"
            :value="character.cp"
            :min="0"
            :disableDecrease="character.cp === 0"
            @input="(value, prop) => editField(Number(value), prop)"
            @onDecrease="editField(--character.cp, 'cp')"
            @onIncrease="editField(++character.cp, 'cp')"
            :night="night"
         />
         <Counter
            label="sp"
            name="sp"
            :value="character.sp"
            :min="0"
            :disableDecrease="character.sp === 0"
            @input="(value, prop) => editField(Number(value), prop)"
            @onDecrease="editField(--character.sp, 'sp')"
            @onIncrease="editField(++character.sp, 'sp')"
            :night="night"
         />
         <Counter
            label="gp"
            name="gp"
            :value="character.gp"
            :min="0"
            :disableDecrease="character.gp === 0"
            @input="(value, prop) => editField(Number(value), prop)"
            @onDecrease="editField(--character.gp, 'gp')"
            @onIncrease="editField(++character.gp, 'gp')"
            :night="night"
         />
         <Counter
            label="pp"
            name="pp"
            :value="character.pp"
            :min="0"
            :disableDecrease="character.pp === 0"
            @input="(value, prop) => editField(Number(value), prop)"
            @onDecrease="editField(--character.pp, 'pp')"
            @onIncrease="editField(++character.pp, 'pp')"
            :night="night"
         />
      </section>

      <span class="current-weight">
         <div>Total Weight:</div>
         <div>{{ currentWeight }} lbs.</div>
      </span>
      <section class="carry-weight" @click="showModal = true">
         <div :class="['weight', 'encumbered', { heavy: currentWeight >= weightCapacity.enc }]">
            <div class="container head">Encumbered</div>
            <div :class="['container', 'body', { night }]">
               {{ weightCapacity.enc }} lbs.
            </div>
            <div class="container foot">STR x5</div>
         </div>
         <div :class="['weight', 'heavy-enc', { heavy: currentWeight >= weightCapacity.heavyEnc }]">
            <div class="container head">Heavily Enc.</div>
            <div :class="['container', 'body', { night }]">
               {{ weightCapacity.heavyEnc }} lbs.
            </div>
            <div class="container foot">STR x10</div>
         </div>
         <div :class="['weight', 'max', { heavy: currentWeight >= weightCapacity.max }]">
            <div class="container head">Max Carry</div>
            <div :class="['container', 'body', { night }]">
               {{ weightCapacity.max }} lbs.
            </div>
            <div class="container foot">STR x15</div>
         </div>
         <div class="weight move">
            <div class="container head">Push/Drag/Lift</div>
            <div :class="['container', 'body', { night }]">
               {{ weightCapacity.move }}
            </div>
            <div class="container foot">STR x30</div>
         </div>
      </section>

      <Equipment :items="character.equipment" :night="night" />

      <Input
         textarea
         autocomplete="off"
         name="treasure"
         label="Treasure"
         height="400px"
         :value="character.treasure"
         @input="editField"
         :night="night"
      />

      <Modal
         title="Encumbrance"
         :show="showModal"
         :night="night"
         @primary="showModal = false"
         top
      >
         <div>
            <b>Encumbered:</b> Speed -10ft.
            <br /><br />
            <b>Heavily Encumbered:</b> Speed -20ft.
            <br />Disadvantage on STR, DEX or CON ability checks, attack rolls and saving throws.
            <br /><br />
            <b>Overweight:</b> Speed is 0.
         </div>
      </Modal>
   </div>
</template>

<style lang="scss" scoped>
@import '@/_a-variables.scss';

.gear {
   width: 100%;

   & .section-label {
      width: 100%;
      margin-bottom: 6px;
      font-size: 14px;
      color: $navy;
      &.margin { margin-top: 16px; }
      &.night { color: $grey; }
   }

   & .money {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      & > div {
         width: 48%;
         margin-top: 16px;
      }
   }

   & .current-weight {
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      margin-bottom: 6px;
      font-size: 18px;
   }

   & .carry-weight {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: 80px;
      grid-column-gap: 10px;

      & .weight {
         height: 100%;
         width: 100%;
         display: flex;
         flex-direction: column;
         justify-content: space-between;
         border: 1px solid #323231;
         border-radius: 2px;
         color: #eee;
         &.heavy {
            border: 1px solid $red;
         }
         & .container {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            &.head {
               height: 20px;
               background: #323231;
               font-size: 11px;
            }
            &.body {
               height: 100%;
               width: 100%;
               font-size: 18px;
               color: $navy;
               &.night { color: #eee; }
            }
            &.foot {
               height: 18px;
               width: 100%;
               background: #323231;
               font-size: 8px
            }
         }
      }
   }
}
</style>
