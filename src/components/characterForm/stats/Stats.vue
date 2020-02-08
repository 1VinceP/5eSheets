<script>
import { mapGetters, mapMutations } from 'vuex';
import map from 'lodash/map';
import CloseIcon from 'vue-material-design-icons/Close.vue';
import { Input, Select } from '@/components/common';
import AbilityBox from './AbilityBox.vue';
import Skill from './Skill.vue';
import Counter from '../Counter.vue';
import classList from '@/constants/classes.constants';
import raceList from '@/constants/races.constants';
import { skillArray } from '@/constants/skills.constants';

export default {
   name: 'stats',

   data: () => ({
      classList,
      raceList,
      skillArray,
      sort: 'skill',
   }),

   computed: {
      ...mapGetters(['night']),
      ...mapGetters('character', ['proficiencyBonus', 'initiativeBonus']),

      sortedSkills() {
         if (this.sort === 'skill') {
            const newSkills = [...skillArray];
            return newSkills.sort((a, b) => {
               if (a.label < b.label) return -1;
               if (a.label > b.label) return 1;
               return 0;
            });
         }

         return skillArray;
      },

      hitDiceArray() {
         return map(this.character.hitDice).filter(hd => hd.max > 0);
      },
   },

   created() {
      if (localStorage.getItem('skillSort')) {
         const sort = JSON.parse(localStorage.getItem('skillSort'));
         this.sort = sort;
      }
   },

   methods: {
      ...mapMutations(
         'character',
         ['editProp', 'editHitDie', 'editClassProp', 'addClass', 'removeClass'],
      ),

      editField(value, prop) {
         this.editProp({ value, prop });
      },

      editClass(value, prop, type) {
         const index = prop.split('-')[1];
         this.editClassProp({ prop: type, value, index });
      },

      changeSort() {
         if (this.sort === 'skill') {
            this.sort = 'ability';
            localStorage.setItem('skillSort', JSON.stringify('ability'));
         } else {
            this.sort = 'skill';
            localStorage.setItem('skillSort', JSON.stringify('skill'));
         }
      },

      disableSubclass(className, classLevel) {
         if (className && classLevel >= 0) {
            return !(classLevel >= this.classList.find(c => c.name === className).subclassLevel);
         }

         return true;
      },

      findSubclasses(className) {
         if (className) {
            const { subclasses } = this.classList.find(c => c.name === className);
            return subclasses;
         }

         return [];
      },
   },

   components: {
      CloseIcon, Input, Select, AbilityBox, Skill, Counter,
   },

   props: {
      character: { type: Object },
      editing: { type: Boolean, default: true },
   },
};
</script>

<template>
   <div class="stats">
      <Input
         autocomplete="off"
         name="name"
         label="Name"
         :value="character.name"
         @input="editField"
         :night="night"
         style="margin-top: 20px;"
      />

      <section class="top-stats">
         <div class="stat-container">
            <Input
               autocomplete="off"
               label="Armor Class"
               :inputStyle="{ textAlign: 'right' }"
               :night="night"
            />
         </div>
         <div class="stat-container">
            <Input
               autocomplete="off"
               label="Proficiency"
               :value="`+${proficiencyBonus}`"
               :inputStyle="{ textAlign: 'right' }"
               readonly
               :night="night"
            />
         </div>
         <div class="stat-container">
            <Input
               autocomplete="off"
               label="Initiative"
               :value="initiativeBonus"
               :inputStyle="{ textAlign: 'right' }"
               :night="night"
            />
         </div>
      </section>

      <div :class="['section-label', 'margin', { night }]">HP</div>
      <Counter
         name="hp"
         secondaryName="maxHp"
         label="/"
         :min="0"
         :max="character.maxHp"
         :value="character.hp"
         :secondaryValue="character.maxHp"
         :disableDecrease="character.hp <= 0"
         :disableIncrease="character.hp >= character.maxHp"
         @input="(value, name) => editField(Number(value), name)"
         @secondaryInput="(value, name) => editField(Number(value), name)"
         @onDecrease="(value, name) => editField(--character.hp, name)"
         @onIncrease="(value, name) => editField(++character.hp, name)"
         :night="night"
      />

      <div :class="['section-label', 'margin', { night }]">Temporary HP</div>
      <Counter
         name="tempHp"
         :min="0"
         :value="character.tempHp"
         :disableDecrease="character.tempHp === 0"
         @input="(value, name) => editField(Number(value), name)"
         @onDecrease="(value, name) => editField(--character.tempHp, name)"
         @onIncrease="(value, name) => editField(++character.tempHp, name)"
         :night="night"
      />

      <div
         v-if="hitDiceArray.some(hd => hd.max > 0)"
         :class="['section-label', 'margin', { night }]"
      >
         Hit Dice
      </div>
      <div class="hd-container">
         <div
            v-for="(dieSet, i) in hitDiceArray"
            :key="`hitdie-${i}`"
            :class="[
               'hit-die',
               { full: hitDiceArray.length === 1 && i === 0 },
            ]"
         >
            <Counter
               v-if="dieSet.max > 0"
               :key="i"
               :name="dieSet.dieValue.toString()"
               :value="dieSet.current"
               :min="0"
               :max="dieSet.max"
               :label="`d${dieSet.dieValue}`"
               :disableDecrease="dieSet.current === 0"
               :disableIncrease="dieSet.current >= dieSet.max"
               @input="(value) => editHitDie({
                  direction: 'calc',
                  dieValue: dieSet.dieValue,
                  value: Number(value),
               })"
               @onDecrease="editHitDie({ direction: 'decrease', dieValue: dieSet.dieValue })"
               @onIncrease="editHitDie({ direction: 'increase', dieValue: dieSet.dieValue })"
               :night="night"
            />
         </div>
      </div>

      <div :class="['section-label', { night }]">Death Saves</div>
      <section class="death-saves">
         <div class="saves-container success">
            <span>Successes</span>
            <span class="checkboxes">
               <CloseIcon :size="18" @click="editField(0, 'deathSucceeds')" />
               <input
                  type="checkbox"
                  name="deathSucceeds"
                  :disabled="character.deathSucceeds > 1"
                  :checked="character.deathSucceeds >= 1"
                  @change="() => editField(1, 'deathSucceeds')"
               />
               <input
                  type="checkbox"
                  name="deathSucceeds"
                  :disabled="character.deathSucceeds > 2"
                  :checked="character.deathSucceeds >= 2"
                  @change="() => editField(2, 'deathSucceeds')"
               />
               <input
                  type="checkbox"
                  name="deathSucceeds"
                  :checked="character.deathSucceeds === 3"
                  @change="() => editField(3, 'deathSucceeds')"
               />
            </span>
         </div>
         <div class="saves-container">
            <span>Failures</span>
            <span class="checkboxes">
               <CloseIcon :size="18" @click="editField(0, 'deathFails')" />
               <input
                  type="checkbox"
                  name="deathFails"
                  :disabled="character.deathFails > 1"
                  :checked="character.deathFails >= 1"
                  @change="() => editField(1, 'deathFails')"
               />
               <input
                  type="checkbox"
                  name="deathFails"
                  :disabled="character.deathFails > 2"
                  :checked="character.deathFails >= 2"
                  @change="() => editField(2, 'deathFails')"
               />
               <input
                  type="checkbox"
                  name="deathFails"
                  :checked="character.deathFails === 3"
                  @change="() => editField(3, 'deathFails')"
               />
            </span>
         </div>
      </section>

      <Select
         name="race"
         label="Race"
         :value="character.race"
         :options="raceList"
         @change="editField"
         :night="night"
      />

      <div class="class-select" v-for="(charClass, i) in character.classes" :key="`class-${i}`">
         <Select
            :name="`className-${i}`"
            :value="charClass.name"
            :options="classList"
            optionKey="name"
            mapOptions
            @change="(value, prop) => editClass(value, prop, 'name')"
            label="Class"
            :night="night"
            style="width: 45%;"
         />
         <Input
            autocomplete="off"
            :name="`classLevel-${i}`"
            :value="charClass.level"
            :disabled="!charClass.name"
            @input="(value, prop) => editClass(value, prop, 'level')"
            label="Level"
            type="number"
            min="0"
            :night="night"
            style="width: 45%;"
         />
         <Select
            :name="`classSubclass-${i}`"
            :value="charClass.subclass"
            :disabled="disableSubclass(charClass.name, charClass.level)"
            :options="findSubclasses(charClass.name)"
            optionKey="subclasses"
            @change="(value, prop) => editClass(value, prop, 'subclass')"
            label="Subclass"
            :night="night"
            style="margin-top: 2px;"
         />
      </div>
      <Counter
         label="Multiclass"
         :disableDecrease="character.classes.length <= 1"
         @onDecrease="removeClass"
         @onIncrease="addClass"
         :night="night"
      />

      <section class="abilities">
         <div :class="['section-label', { night }]">Abilities</div>
         <p class="global-tip">
            Tap labels to edit saving proficiencies, and scores to edit scores.
         </p>
         <div class="ability-row">
            <AbilityBox str :ability="character.abilities.str" :night="night" />
            <AbilityBox dex :ability="character.abilities.dex" :night="night" />
         </div>
         <div class="ability-row">
            <AbilityBox con :ability="character.abilities.con" :night="night" />
            <AbilityBox int :ability="character.abilities.int" :night="night" />
         </div>
         <div class="ability-row">
            <AbilityBox wis :ability="character.abilities.wis" :night="night" />
            <AbilityBox cha :ability="character.abilities.cha" :night="night" />
         </div>
      </section>

      <section class="skills">
         <div :class="['section-label', { night }]">Skills</div>
         <p class="global-tip">
            Left box proficient, right box expertise. Header changes sort.
         </p>
         <div @click="changeSort" >
            <Skill isHeader :night="night" :sort="sort" />
         </div>
         <Skill
            v-for="skill in sortedSkills"
            :key="skill.label"
            :skill="skill"
            :sort="sort"
         />
         <div class="passive-perception">
            Passive perception
            <span>{{ 10 + character.abilities.wis.modifier }}</span>
         </div>
      </section>

   </div>
</template>

<style lang="scss" scoped>
@import '@/_a-variables.scss';

.stats {
   height: 100%;
   width: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;
}

.section-label {
   width: 100%;
   margin-bottom: 6px;
   font-size: 14px;
   color: $navy;
   &.margin + div { margin-bottom: 16px; }
   &.night { color: $grey; }
}

.top-stats {
   width: 100%;
   display: flex;
   justify-content: space-between;
   & .stat-container {
      width: 30%;
      & .input { text-align: right !important; }
   }
}

.hd-container {
   width: 100%;
   display: flex;
   flex-wrap: wrap;
   justify-content: space-between;
   & .hit-die {
      width: 47%;
      margin-bottom: 6px;
      &.full { width: 100%; }
   }
}

.death-saves {
   width: 100%;
   border: 1px solid $grey;
   border-radius: 10px;
   border-top-left-radius: 0px;
   margin-bottom: 16px;
   padding: 6px;
   & .saves-container {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &.success {margin-bottom: 6px; }
      & .checkboxes {
         display: flex;
         align-items: center;
         & span, input:not(:last-child) { margin-right: 6px; }
         & span { padding-top: 3px; }
      }
   }
}

.class-select {
   width: 100%;
   display: flex;
   flex-wrap: wrap;
   justify-content: space-between;
}

.multiclass-buttons {
   height: 30px;
   width: 100%;
   display: flex;
   & span {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      &.label { background: #0004; }
      &.remove-class {
         background: $red;
         &.disabled { background: $grey; }
      }
      &.add-class { background: $green; }
   }
}

.abilities {
   width: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;
   margin-top: 30px;
   & .ability-row {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
   }
}

.skills {
   width: 100%;
   margin-top: 30px;
   & .passive-perception {
      width: 100%;
      display: flex;
      justify-content: space-between;
   }
}
</style>
