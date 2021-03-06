<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import { Input, Select } from '@/components/common';
import Counter from '@/components/characterForm/Counter.vue';
import PsiContainer from './PsiContainer.vue';

export default {
   name: 'psionics-view',

   computed: {
      ...mapGetters(['night']),
      ...mapState('character', ['abilities']),
      ...mapGetters('character', ['proficiencyBonus']),

      disciplineSaveDC() {
         const { abilities, proficiencyBonus } = this;
         return 8 + abilities.int.modifier + proficiencyBonus;
      },

      disciplineAttackBonus() {
         const { abilities, proficiencyBonus } = this;
         const bonus = abilities.int.modifier + proficiencyBonus;
         const symbol = bonus >= 0 ? '+' : '';
         return symbol + bonus;
      },

      focusOptions() {
         return this.character.psiDisciplines
            .filter(d => d.title && d.focus)
            .map(d => ({ title: d.title, focus: d.focus }))
            .sort((a, b) => {
               if (a.title < b.title) return -1;
               if (a.title > b.title) return 1;
               return 0;
            });
      },
   },

   methods: {
      ...mapMutations('character', ['editProp']),

      editField(value, prop) {
         this.editProp({ value, prop });
      },

      editFocus(value) {
         if (value === '') {
            this.editProp({ prop: 'psiFocus', value: { title: '', focus: '' } });
         } else {
            const focus = this.focusOptions.find(option => option.title === value);
            this.editProp({ value: focus, prop: 'psiFocus' });
         }
      },
   },

   components: { Input, Select, Counter, PsiContainer },

   props: {
      character: Object,
   },
};
</script>

<template>
   <div class="psionics-view">
      <div class="psi-skills">
         <Input
            label="Discipline Save DC"
            :inputStyle="{ textAlign: 'right' }"
            :value="disciplineSaveDC"
            :night="night"
            readonly
            style="width: 48%;"
         />
         <Input
            label="Discipline Attack Bonus"
            :inputStyle="{ textAlign: 'right' }"
            :value="disciplineAttackBonus"
            :night="night"
            readonly
            style="width: 48%;"
         />
      </div>

         <div :class="['section-label', 'margin', { night }]">
            Psi Points
         </div>
         <Counter
            name="psiPoints"
            secondaryName="maxPsiPoints"
            label="/"
            :min="0"
            :max="character.maxPsiPoints"
            :value="character.psiPoints"
            :secondaryValue="character.maxPsiPoints"
            :disableDecrease="character.psiPoints <= 0"
            :disableIncrease="character.psiPoints >= character.maxPsiPoints"
            @input="(value, name) => editField(Number(value), name)"
            @secondaryInput="(value, name) => editField(Number(value), name)"
            @onDecrease="editField(--character.psiPoints, 'psiPoints')"
            @onIncrease="editField(++character.psiPoints, 'psiPoints')"
            :night="night"
         />

         <section class="focus">
            <Select
               name="psiFocus"
               label="Psychic Focus"
               class="focus-select"
               :disabled="focusOptions.length <= 0"
               :value="character.psiFocus.title"
               :options="focusOptions"
               optionKey="title"
               @change="editFocus"
               :night="night"
            />
            <Input
               textarea
               readonly
               class="focus-content"
               name="focusContent"
               placeholder="No focus selected"
               :disabled="!character.psiFocus.focus"
               :value="character.psiFocus.focus"
               :night="night"
            />
         </section>

         <PsiContainer isTalent :psionicData="character.psiTalents" :night="night" />
         <PsiContainer :psionicData="character.psiDisciplines" :night="night" />
   </div>
</template>

<style lang="scss" scoped>
@import '../../../a-variables';

.psionics-view {
   width: 100%;

   & .psi-skills {
      width: 100%;
      display: flex;
      justify-content: space-between;
   }

   & .section-label {
      width: 100%;
      margin-bottom: 6px;
      font-size: 14px;
      color: $navy;
      &.margin + div { margin-bottom: 16px; }
      &.night { color: $grey; }
   }

   & .focus {
      margin-top: 36px;
      & .focus-select {
         border-top-right-radius: 10px;
         border-bottom-left-radius: 0px;
         border-bottom-right-radius: 0px;
      }
      & .focus-content {
         margin-top: -20px;
         border-top: none;
         border-top-right-radius: 0px;
         border-top-left-radius: 0px;
      }
   }
}
</style>
