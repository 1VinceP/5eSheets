<script>
import { mapMutations } from 'vuex';
import PlusIcon from 'vue-material-design-icons/PlusCircleOutline.vue';
import { Modal } from '@/components/common';
import Counter from '../Counter.vue';
import SpellEntry from './SpellEntry.vue';
import Spell from './Spell.vue';

export default {
   name: 'spell-container',

   data() {
      return {
         modalOpen: false,
         currentSlots: this.spellLevelData.currentSlots,
         maxSlots: this.spellLevelData.maxSlots,
         spellList: this.spellLevelData.spells,

         newSpellName: '',
         newSpellContent: '',
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
      ...mapMutations('character', ['editSpellLevelData', 'addNewSpell']),

      closeModal() {
         this.modalOpen = false;
         this.newSpellName = '';
         this.newSpellContent = '';
      },

      editSpellLevel(value, name) {
         this.editSpellLevelData({ prop: name, value: Number(value), index: this.spellLevel });
      },

      addSpell() {
         this.addNewSpell({
            title: this.newSpellName,
            content: this.newSpellContent,
            level: this.spellLevel,
         });
         this.closeModal();
      },
   },

   components: { PlusIcon, Modal, Counter, SpellEntry, Spell },

   props: {
      spellLevel: Number,
      spellLevelData: Object,
      night: { type: Boolean, default: false },
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
            @input="editSpellLevel"
            @secondaryInput="editSpellLevel"
            @onDecrease="(name) => editSpellLevel(--currentSlots, name)"
            @onIncrease="(name) => editSpellLevel(++currentSlots, name)"
            style="width: 50%;"
            :night="night"
         />
      </section>
      <Spell v-show="spellLevelData.spells.length > 0" isHeader :night="night" />
      <Spell
         v-for="spell in spellLevelData.spells"
         :key="spell.id"
         :spell="spell"
         :spellLevel="spellLevel"
         :night="night"
      />

      <span class="add-spell">
         <PlusIcon :size="18" @click="modalOpen = true" />
      </span>

      <Modal
         :show="modalOpen"
         title="Add Spell"
         primaryLabel="Save"
         secondaryLabel="Cancel"
         @primary="addSpell"
         @secondary="closeModal"
         top
         :night="night"
      >
         <SpellEntry
            contentPlaceholder="Paste spell data here. It will be parsed automagically."
            :entry="{ title: newSpellName, content: newSpellContent }"
            @titleInput="value => newSpellName = value"
            @contentInput="value => newSpellContent = value"
            :night="night"
         />
      </Modal>
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
      margin-bottom: 6px;
      & .title {
         width: 45%;
         font-size: 18px;
      }
   }

   & .add-spell {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-top: 6px;
      padding: 3px 6px;
   }
}
</style>
