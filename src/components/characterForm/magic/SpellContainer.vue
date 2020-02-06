<script>
import { mapMutations } from 'vuex';
import Counter from '../Counter.vue';

export default {
   name: 'spell-container',

   data() {
      return {
         currentSlots: this.spellLevelData.currentSlots,
         maxSlots: this.spellLevelData.maxSlots,
         spellList: this.spellLevelData.spells,
      };
   },

   computed: {
      title() {
         if (this.spellLevel === 0) return 'Cantrips';
         else if (this.spellLevel === 1) return '1st Level';
         else if (this.spellLevel === 2) return '2nd Level';
         else if (this.spellLevel === 3) return '3rd Level';
         else return `${this.spellLevel}th Level`;
      },
   },

   methods: {
      ...mapMutations('character', ['editSpellList']),

      editSpell(value, name) {
         this.editSpellList({ prop: name, value: Number(value), index: this.spellLevel });
      },
   },

   components: { Counter },

   props: {
      spellLevel: Number,
      spellLevelData: Object,
   },
};
</script>

<template>
   <div class="spell-container">
      <section class="header">
         <div class="title">{{ title }}</div>
         <Counter
            v-show="spellLevel > 0"
            label="/"
            name="currentSlots"
            secondaryName="maxSlots"
            :min="0"
            :max="maxSlots"
            :value="currentSlots"
            :secondaryValue="maxSlots"
            :disableDecrease="currentSlots <= 0"
            :disableIncrease="currentSlots >= maxSlots"
            @input="editSpell"
            @secondaryInput="editSpell"
            @onDecrease="(name) => editSpell(--currentSlots, name)"
            @onIncrease="(name) => editSpell(++currentSlots, name)"
            style="width: 50%;"
         />
      </section>
   </div>
</template>

<style lang="scss" scoped>
.spell-container {
   width: 100%;
   margin-bottom: 20px;
   padding: 3px;
   border-radius: 3px;

   & .header {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      & .title {
         width: 45%;
         font-size: 18px;
      }
   }

}
</style>
