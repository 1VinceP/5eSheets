<script>
import { mapMutations } from 'vuex';

export default {
   name: 'ability-box',

   computed: {
      label() {
         return this.str ? 'Strength' // eslint-disable-next-line
            : this.dex ? 'Dexterity' // eslint-disable-next-line
            : this.con ? 'Constitution' // eslint-disable-next-line
            : this.int ? 'Intelligence' // eslint-disable-next-line
            : this.wis ? 'Wisdom' // eslint-disable-next-line
            : this.cha && 'Charisma';
      },

      shortLabel() {
         return this.label.toLowerCase().slice(0, 3);
      },

      proficient() {
         return this.ability.proficient;
      },
   },

   methods: {
      ...mapMutations('character', ['editAbility']),

      editScore({ target: { value } }) {
         this.editAbility({ ability: this.shortLabel, prop: 'score', value });
      },

      editProficient() {
         this.editAbility({ ability: this.shortLabel, prop: 'proficient' });
      },
   },

   props: {
      ability: { type: Object, default: () => ({}) },
      str: { type: Boolean, default: false },
      dex: { type: Boolean, default: false },
      con: { type: Boolean, default: false },
      int: { type: Boolean, default: false },
      wis: { type: Boolean, default: false },
      cha: { type: Boolean, default: false },
   },
};
</script>

<template>
   <div :class="['ability-box', { str, dex, con, int, wis, cha, proficient }]">
      <h1 :class="['label', { proficient }]" @click="editProficient">
         {{ label }}
      </h1>
      <div class="container">
         <div class="modifier">{{ ability.modifier > 0 ? '+' : '' }}{{ ability.modifier }}</div>
         <div class="score">
            <input
               name="score"
               :value="ability.score"
               @input="editScore"
               type="number"
               min="0"
               max="30"
            />
         </div>
      </div>
   </div>
</template>

<style lang="scss" scoped>
.ability-box {
   height: 200px;
   width: 100%;
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   align-items: center;
   margin: 6px;
   border: 1px solid #323231;
   border-radius: 3px;
   &.proficient { border-color: #fff; }

   & .label {
      height: 20px;
      width: 100%;
      background: #323231;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      &.proficient {
         background: #fff;
         color: #323231;
      }
   }
   & .container {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      position: relative;
      & .modifier {
         font-size: 72px;
      }
      & .score {
         height: 40px;
         width: 40px;
         background: #fff;
         display: flex;
         justify-content: center;
         align-items: center;
         border-radius: 50%;
         & input {
            width: 80%;
            border: none;
            text-align: center;
            font-size: 18px;
         }
      }
   }
}
</style>
