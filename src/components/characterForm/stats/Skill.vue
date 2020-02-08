<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import ChevronDown from 'vue-material-design-icons/ChevronDown.vue';

export default {
   name: 'skill',

   computed: {
      ...mapState('character', ['abilities']),
      ...mapGetters('character', ['proficiencyBonus']),

      ability() {
         return this.abilities[this.skill.type];
      },

      proficient() {
         return this.ability.skills.findIndex(a => a === this.skill.label) >= 0;
      },

      expert() {
         return this.ability.experts.findIndex(a => a === this.skill.label) >= 0;
      },

      bonus() {
         let total = 0;
         if (this.expert) {
            total += ((this.proficiencyBonus * 2) + (this.ability.modifier * 1));
         } else if (this.proficient) {
            total += (this.proficiencyBonus + (this.ability.modifier * 1));
         } else {
            total += (this.ability.modifier * 1);
         }
         return total;
      },

      isSeperator() {
         return this.skill.isLastOfType && this.sort === 'ability';
      },
   },

   methods: {
      ...mapMutations('character', ['editAbility']),

      handleChange(prop) {
         this.editAbility({ ability: this.skill.type, prop, value: this.skill.label });
      },
   },

   components: { ChevronDown },

   props: {
      sort: String,
      skill: Object,
      isHeader: { type: Boolean, default: false },
      night: { type: Boolean, default: false },
   },
};
</script>

<template>
   <div v-if="!isHeader" class="skill-container">
      <div :class="['skill', { hasSeperator: isSeperator }]">
         <div class="label container left">
            {{ skill.label }}
         </div>
         <div class="type container left">
            <i>{{ skill.type.toUpperCase() }}</i>
         </div>
         <div class="radios container">
            <input
               type="checkbox"
               :checked="proficient || expert"
               :disabled="expert"
               @change="handleChange('skills')"
            />
            <input
               type="checkbox"
               :checked="expert"
               :disabled="!proficient"
               @change="handleChange('experts')"
            />
         </div>
         <div class="bonus container right">{{ bonus >= 0 ? '+' : '' }}{{ bonus }}</div>
      </div>
      <div v-show="isSeperator" class="seperator" />
   </div>

   <div v-else :class="['skill', { isHeader, night }]">
      <div class="label container left">
         Skill
         <ChevronDown v-if="sort === 'skill'" :size="12" />
      </div>
      <div class="container left">
         Ability
         <ChevronDown v-if="sort === 'ability'" :size="12" />
      </div>
      <div class="radios container">Proficient</div>
      <div class="bonus container right">Bonus</div>
   </div>
</template>

<style lang="scss" scoped>
@import '@/_a-variables.scss';

.skill-container {
   width: 100%;
   display: flex;
   flex-direction: column;
   & .seperator {
      width: 100%;
      margin-bottom: 8px;
      border-bottom: 1px solid $grey;
   }
}

.skill {
   height: 20px;
   width: 100%;
   display: flex;
   justify-content: space-between;
   align-items: center;
   margin-bottom: 16px;
   font-size: 12px;
   &.isHeader {
      border-bottom: 1px solid #323231;
      &.night { border-color: #fff; }
   }
   &.hasSeperator { margin-bottom: 8px; }

   & .container {
      flex: 1;
      display: flex;
      justify-content: center;
      &.label { flex: 2; }
      &.left { justify-content: flex-start; }
      &.right { justify-content: flex-end; }
   }

   & .type {
      margin-left: 6px;
      font-size: 8px;
      align-self: center;
   }
}
</style>
