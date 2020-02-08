<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import { Button, Input, Select } from '@/components/common';
import SpellContainer from './SpellContainer.vue';

export default {
   name: 'magic-view',

   computed: {
      ...mapGetters(['night']),
      ...mapState('character', ['abilities', 'spellAbility', 'spellsList']),
      ...mapGetters('character', ['proficiencyBonus']),

      spellSaveDC() {
         const { abilities, spellAbility, proficiencyBonus } = this;
         return spellAbility
            ? 8 + abilities[spellAbility].modifier + proficiencyBonus
            : '';
      },

      spellAttackBonus() {
         const { abilities, spellAbility, proficiencyBonus } = this;
         return spellAbility
            ? abilities[spellAbility].modifier + proficiencyBonus
            : '';
      },
   },

   methods: {
      ...mapMutations('character', ['editProp', 'addSpellList', 'removeSpellList']),

      editField(value, prop) {
         this.editProp({ value, prop });
      },
   },

   components: { Button, Input, Select, SpellContainer },

   props: {
      character: Object,
   },
};
</script>

<template>
   <div class="spells-view">
      <div class="spell-skills">
         <Select
            name="spellAbility"
            label="Spellcasting ability"
            :value="spellAbility"
            :options="['str', 'dex', 'con', 'int', 'wis', 'cha']"
            @change="editField"
            :night="night"
         />
         <div class="displays">
            <Input
               label="Spell Save DC"
               :inputStyle="{ textAlign: 'right' }"
               :value="spellSaveDC"
               readonly
               :night="night"
               style="width: 48%;"
            />
            <Input
               label="Spell Attack Bonus"
               :value="spellAttackBonus"
               :inputStyle="{ textAlign: 'right' }"
               readonly
               :night="night"
               style="width: 48%;"
            />
         </div>
      </div>

      <section class="spells">
         <SpellContainer
            v-for="(spellList, i) in spellsList"
            :key="i"
            :spellLevel="i"
            :spellLevelData="spellList"
            :night="night"
         />
      </section>

      <Button full green @click="addSpellList">Add Spell Level</Button>
   </div>
</template>

<style lang="scss" scoped>
.spells-view {
   width: 100%;

   & .spell-skills {
      width: 100%;
      & .displays {
         width: 100%;
         display: flex;
         justify-content: space-between;
         margin-top: -20px;
      }
   }
}
</style>
