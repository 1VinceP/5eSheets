<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import orderBy from 'lodash/orderBy';
import { Button, Input, Select } from '@/components/common';
import SpellContainer from './SpellContainer.vue';
import Counter from '@/components/characterForm/Counter.vue';

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
         const bonus = spellAbility
            ? abilities[spellAbility].modifier + proficiencyBonus
            : '';
         const symbol = bonus >= 0 ? '+' : '';
         return symbol + bonus;
      },

      isSorcerer() {
         return this.character.classes.findIndex(cl => cl.name === 'Sorcerer') >= 0;
      },
   },

   created() {
      if (this.character.spellsKnown === undefined) {
         this.editProp({ prop: 'spellsKnown', value: 0 });
      }
      if (this.character.cantripsKnown === undefined) {
         this.editProp({ prop: 'cantripsKnown', value: 0 });
      }
   },

   methods: {
      ...mapMutations('character', ['editProp', 'addSpellList', 'removeSpellList']),

      editField(value, prop) {
         this.editProp({ value, prop });
      },

      orderSpellList(spellList) {
         const newSpellList = {
            ...spellList,
            spells: orderBy(
               spellList.spells,
               [
                  'permanentlyPrepared',
                  'prepared',
                  'title',
               ],
               ['desc', 'desc', 'asc'],
            ),
         };
         return newSpellList;
      },
   },

   components: { Button, Input, Select, SpellContainer, Counter },

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

      <section class="spell-counters">
         <div class="container">
            <div :class="['section-label', 'margin', { night }]">
               Max cantrips
            </div>
            <Counter
               name="cantripsKnown"
               :min="0"
               :value="character.cantripsKnown"
               :disableDecrease="character.cantripsKnown <= 0"
               @input="(value, name) => editField(Number(value), name)"
               @onDecrease="(value, name) => editField(--character.cantripsKnown, name)"
               @onIncrease="(value, name) => editField(++character.cantripsKnown, name)"
               :night="night"
            />
         </div>
         <div class="container">
            <div :class="['section-label', 'margin', { night }]">
               Max spells
            </div>
            <Counter
               name="spellsKnown"
               :min="0"
               :value="character.spellsKnown"
               :disableDecrease="character.spellsKnown <= 0"
               @input="(value, name) => editField(Number(value), name)"
               @onDecrease="(value, name) => editField(--character.spellsKnown, name)"
               @onIncrease="(value, name) => editField(++character.spellsKnown, name)"
               :night="night"
            />
         </div>
      </section>

      <section class="points">
         <div v-show="isSorcerer" :class="['section-label', 'margin', { night }]">
            Sorcery Points
         </div>
         <Counter
            v-show="isSorcerer"
            name="sorceryPoints"
            secondaryName="maxSorceryPoints"
            label="/"
            :min="0"
            :max="character.maxSorceryPoints"
            :value="character.sorceryPoints"
            :secondaryValue="character.maxSorceryPoints"
            :disableDecrease="character.sorceryPoints <= 0"
            :disableIncrease="character.sorceryPoints >= character.maxSorceryPoints"
            @input="(value, name) => editField(Number(value), name)"
            @secondaryInput="(value, name) => editField(Number(value), name)"
            @onDecrease="(value, name) => editField(--character.sorceryPoints, name)"
            @onIncrease="(value, name) => editField(++character.sorceryPoints, name)"
            :night="night"
         />
      </section>

      <section class="spells">
         <SpellContainer
            v-for="(spellList, i) in spellsList"
            :key="i"
            :spellLevel="i"
            :spellLevelData="orderSpellList(spellList)"
            :night="night"
         />
      </section>

      <Button
         v-show="character.spellsList.length <= 9"
         full
         green
         @click="addSpellList"
      >
            Add Spell Level
      </Button>
   </div>
</template>

<style lang="scss" scoped>
@import '../../../a-variables';

.spells-view {
   width: 100%;

   .spell-skills {
      width: 100%;

      .displays {
         width: 100%;
         display: flex;
         justify-content: space-between;
         margin-top: -20px;
      }
   }

   .spell-counters {
      width: 100%;
      display: flex;
      justify-content: space-between;

      .container {
         width: 48%;
      }
   }

   .points { margin-bottom: 20px; }

   .section-label {
      width: 100%;
      margin-bottom: 6px;
      font-size: 14px;
      color: $navy;
      &.margin + div { margin-bottom: 16px; }
      &.night { color: $grey; }
   }
}
</style>
